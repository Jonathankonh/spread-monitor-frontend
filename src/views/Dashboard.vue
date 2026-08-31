<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import StatCard from '@/components/base/StatCard.vue'
import Badge from '@/components/base/Badge.vue'
import ProgressBar from '@/components/base/ProgressBar.vue'
import { holeSpreads, holeTagesveraenderung, holeMeistgehandelt } from '@/services/api.js'
import { holeName } from '@/data/instrumentNamen.js'
import SpreadRankingRow from '@/components/base/SpreadRankingRow.vue'
import InstrumentDetail from '@/views/InstrumentDetail.vue'
import SecurityListCard from '@/components/SecurityListCard.vue'
import { holeSparklines } from '@/services/api.js'
import VenueActivityBar from '@/components/base/VenueActivityBar.vue'
import { holeHandelsaktivitaet } from '@/services/api.js'
import SkeletonLine from '@/components/base/SkeletonLine.vue'
import { holeLetztesUpdate } from '@/services/api.js'
import MarketClosedBanner from '@/components/base/MarketClosedBanner.vue'


const spreads = ref([])
const topMover = ref([])
const meistgehandelt = ref([])
const ladeFehler = ref(null)
const ausgewaehlteIsin = ref('')
const sparklines = ref({})
const handelsaktivitaet = ref({})
const datenluecken = ref('Keine Datenlücken seit 9:00.')
const istGeladen = ref(false)
const alleVeraenderungen = ref([])
const zeigeInfo = ref(false)
const letztesUpdate = ref(null)
const marktGeschlossen = computed(() => {
  if (!letztesUpdate.value) return false
  const minutenVergangen = (Date.now() - letztesUpdate.value.getTime()) / 60000
  return minutenVergangen > 20
})


async function ladeAlles() {
  try {
    const [spreadDaten, moverDaten, gehandeltDaten, aktivitaetDaten, letztesUpdateDaten] = await Promise.all([
      holeSpreads(),
      holeTagesveraenderung(),
      holeMeistgehandelt(),
      holeHandelsaktivitaet(),
      holeLetztesUpdate(),
    ])
    spreads.value = spreadDaten
    alleVeraenderungen.value = moverDaten
    topMover.value = moverDaten.slice(0, 5)
    meistgehandelt.value = gehandeltDaten.slice(0, 5)
    handelsaktivitaet.value = aktivitaetDaten
    ladeSparklines([...new Set(spreadDaten.map((s) => s.isin))])
    istGeladen.value = true
    letztesUpdate.value = letztesUpdateDaten
  } catch (fehler) {
    ladeFehler.value = fehler.message
  }
}

const groessterSpread = computed(() => {
  if (spreads.value.length === 0) return null
  return [...spreads.value].sort((a, b) => Math.abs(b.spread_prozent) - Math.abs(a.spread_prozent))[0]
})

const topSechsSpreads = computed(() =>
  [...spreads.value]
    .sort((a, b) => Math.abs(b.spread_prozent) - Math.abs(a.spread_prozent))
    .slice(0, 6)
)

const proIsinMaxSpread = computed(() => {
  const gruppen = {}
  for (const e of spreads.value) {
    const bestehender = gruppen[e.isin]
    if (!bestehender || Math.abs(e.spread_prozent) > Math.abs(bestehender.spread_prozent)) {
      gruppen[e.isin] = e
    }
  }
  return Object.values(gruppen)
})

const durchschnittlicherSpread = computed(() => {
  const werte = proIsinMaxSpread.value.map((e) => Math.abs(e.spread_prozent))
  if (werte.length === 0) return 0
  return werte.reduce((a, b) => a + b, 0) / werte.length
})

async function ladeSparklines(isins) {
  try {
    sparklines.value = await holeSparklines(isins)
  } catch {
    sparklines.value = {}
  }
}

const marktbreite = computed(() => {
  const positive = alleVeraenderungen.value.filter((m) => m.veraenderung_prozent >= 0).length
  return { value: positive, max: alleVeraenderungen.value.length }
})

watch(topSechsSpreads, (neueSpreads) => {
  if (!ausgewaehlteIsin.value && neueSpreads.length > 0) {
    ausgewaehlteIsin.value = neueSpreads[0].isin
  }
})

onMounted(() => {
  ladeAlles()
})
</script>

<template>
  <div class="dashboard__intro">
    <h1 class="dashboard__intro-title">Preisvergleich deutscher Börsenplätze</h1>
    <p class="dashboard__intro-subtitle">
      Live-Analyse echter Marktdaten von gettex, Xetra, LS Exchange und EIX —
      <button class="dashboard__intro-info-toggle" @click="zeigeInfo = !zeigeInfo">
        mehr zu den Daten
      </button>
    </p>
  </div>

  <div v-if="zeigeInfo" class="dashboard__info-box">
    <p>
      Diese Auswertung basiert auf <strong>Post-Trade-Daten</strong> (tatsächlich
      ausgeführte Handelsgeschäfte) aller vier Handelsplätze sowie
      <strong>Pre-Trade-Quotes</strong> (Bid/Ask-Kurse) von Xetra als
      Vergleichsreferenz. Die Daten werden automatisiert im Minutentakt erfasst
      und stammen aus den öffentlichen, MiFID-II-konformen Delayed-Data-Feeds der
      Börsen (verzögert, i. d. R. bis zu 15 Minuten) — kein Echtzeit-Feed für
      Trading-Entscheidungen.
    </p>
  </div>

  <div class="dashboard">
    <p v-if="ladeFehler" class="dashboard__fehler">...</p>

    <div v-else-if="!istGeladen" class="dashboard__loading">
      <BaseCard padding="lg" v-for="n in 3" :key="n">
        <SkeletonLine width="60%" height="14px" />
        <SkeletonLine width="40%" height="38px" />
      </BaseCard>
    </div>

    <MarketClosedBanner v-if="marktGeschlossen" :letztes-update="letztesUpdate" />

    <template v-else>
      <div class="dashboard__kpi-row">
        <StatCard
          v-if="groessterSpread"
          variant="hero"
          label="Größter Preisunterschied gerade jetzt"
          :value="groessterSpread.spread_prozent.toFixed(2)"
          unit="%"
        >
          {{ holeName(groessterSpread.isin) }} · {{ groessterSpread.boerse_a }} vs. {{ groessterSpread.boerse_b }}
        </StatCard>

        <BaseCard padding="lg">
          <p class="dashboard__label">Marktbreite heute</p>
          <p class="dashboard__value">{{ marktbreite.value }} von {{ marktbreite.max }} im Plus</p>
          <ProgressBar :value="marktbreite.value" :max="marktbreite.max" />
        </BaseCard>

        <BaseCard padding="lg">
          <p class="dashboard__label">Durchschnittlicher Spread</p>
          <p class="dashboard__subheading" style="margin-bottom: 8px">über alle beobachteten Werte</p>
          <p class="dashboard__value" style="font-size: 38px; font-family: var(--font-mono)">
            {{ durchschnittlicherSpread.toFixed(2) }}<span style="font-size: 17px; color: var(--fg2)">%</span>
          </p>
        </BaseCard>
      </div>

      <div class="dashboard__main-grid">
        <div class="dashboard__main-column">
          <BaseCard padding="lg">
            <h2 class="dashboard__heading">Preisunterschiede zwischen den Handelsplätzen</h2>
            <p class="dashboard__subheading">Die sechs Wertpapiere mit dem größten Unterschied zwischen zwei Börsen</p>
            <SpreadRankingRow
              v-for="s in topSechsSpreads"
              :key="s.isin + s.boerse_a + s.boerse_b"
              :isin="s.isin"
              :name="holeName(s.isin)"
              :boerse-a="s.boerse_a"
              :boerse-b="s.boerse_b"
              :spread-prozent="Math.abs(s.spread_prozent)"
              :max-spread="Math.abs(topSechsSpreads[0]?.spread_prozent) || 1"
              @select="ausgewaehlteIsin = $event"
            />
          </BaseCard>

          <InstrumentDetail v-if="ausgewaehlteIsin" :isin="ausgewaehlteIsin" />


          <SecurityListCard
            :eintraege="spreads"
            :sparklines="sparklines"
            :ausgewaehlte-isin="ausgewaehlteIsin"
            @select="ausgewaehlteIsin = $event"
          />
        </div>


        <div class="dashboard__sidebar">
          <BaseCard padding="lg">
            <h2 class="dashboard__heading">Top Mover</h2>
            <div v-for="mover in topMover" :key="mover.isin + mover.boerse" class="dashboard__row">
              <span class="dashboard__row-name">{{ holeName(mover.isin) }}</span>
              <Badge :label="mover.boerse" :boerse="mover.boerse" />
              <span
                class="dashboard__row-value"
                :class="mover.veraenderung_prozent >= 0 ? 'dashboard__positiv' : 'dashboard__negativ'"
              >
                {{ mover.veraenderung_prozent.toFixed(2) }}%
              </span>
            </div>
          </BaseCard>

          <BaseCard padding="lg">
            <h2 class="dashboard__heading">Meistgehandelt</h2>
            <div v-for="eintrag in meistgehandelt" :key="eintrag.isin + eintrag.boerse" class="dashboard__row">
              <span class="dashboard__row-name">{{ holeName(eintrag.isin) }}</span>
              <Badge :label="eintrag.boerse" :boerse="eintrag.boerse" />
              <span class="dashboard__row-value">{{ eintrag.gesamt_trades }}</span>
            </div>
          </BaseCard>

          <BaseCard padding="lg">
            <h2 class="dashboard__heading">Handelsaktivität je Handelsplatz</h2>
            <p class="dashboard__subheading">Anteil aller heute erfassten Trades</p>
            <VenueActivityBar :daten="handelsaktivitaet" />
          </BaseCard>

          <BaseCard padding="lg" style="background: var(--footer)">
            <p class="dashboard__footnote">
              Daten von gettex, Xetra, LS Exchange und EIX, Abfrage im Minutentakt.
              {{ datenluecken }}
            </p>
          </BaseCard>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px clamp(16px, 4vw, 34px) 40px;
}

.dashboard__intro {
  margin-bottom: 24px;
}

.dashboard__intro-title {
  margin: 0 0 6px 0;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.dashboard__intro-subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--fg3);
}

.dashboard__intro-info-toggle {
  background: none;
  border: none;
  padding: 0;
  color: var(--accent-text);
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}

.dashboard__info-box {
  margin-bottom: 24px;
  padding: 16px 20px;
  border-radius: var(--radius-row);
  background: var(--surface);
  border: 1px solid var(--line);
}

.dashboard__info-box p {
  margin: 0;
  font-size: 13px;
  color: var(--fg2);
  line-height: 1.6;
}

.dashboard__intro {
  margin-top: 34px;
  margin-bottom: 24px;
}

.dashboard__kpi-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 34px;
}

.dashboard__main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  align-items: start;
}

.dashboard__main-column {
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.dashboard__sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard__heading {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.dashboard__subheading {
  margin: 0 0 var(--space-md) 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.dashboard__label {
  margin: 0 0 var(--space-sm) 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.dashboard__value {
  margin: 0 0 var(--space-md) 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.dashboard__row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.dashboard__row:last-child {
  border-bottom: none;
}

.dashboard__row-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9rem;
}

.dashboard__row-value {
  text-align: right;
  font-variant-numeric: tabular-nums;
  min-width: 60px;
}

.dashboard__positiv {
  color: var(--color-positive);
}

.dashboard__negativ {
  color: var(--color-negative);
}

.dashboard__fehler {
  padding: var(--space-lg);
  text-align: center;
  color: var(--color-negative);
}

@media (max-width: 640px) {
  .dashboard__kpi-row {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    .dashboard__value {
      font-size: 1rem;
    }
  }

  .dashboard__kpi-row > *:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 760px) {
  .dashboard {
    padding: 20px 16px 32px;
  }
}

.dashboard__footnote {
  margin: 0;
  font-size: 12px;
  line-height: 1.65;
  color: var(--fg4);
}

.dashboard__loading {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 480px) {
  .dashboard__intro-title {
    font-size: 28px;
  }
  .dashboard {
    padding: 16px 14px 32px;
  }
}
</style>
