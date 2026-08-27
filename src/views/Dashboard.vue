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

const spreads = ref([])
const topMover = ref([])
const meistgehandelt = ref([])
const ladeFehler = ref(null)
const ausgewaehlteIsin = ref('')

async function ladeAlles() {
  try {
    const [spreadDaten, moverDaten, gehandeltDaten] = await Promise.all([
      holeSpreads(),
      holeTagesveraenderung(),
      holeMeistgehandelt(),
    ])
    spreads.value = spreadDaten
    topMover.value = moverDaten.slice(0, 5)
    meistgehandelt.value = gehandeltDaten.slice(0, 5)
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

const marktbreite = computed(() => {
  const positive = topMover.value.filter((m) => m.veraenderung_prozent >= 0).length
  return { value: positive, max: topMover.value.length }
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
  <div class="dashboard">
    <p v-if="ladeFehler" class="dashboard__fehler">Fehler beim Laden: {{ ladeFehler }}</p>

    <template v-else>
      <div class="dashboard__kpi-row">
        <StatCard
          v-if="groessterSpread"
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

@media (max-width: 1200px) {
  .dashboard__main-grid {
    grid-template-columns: 1fr;
  }

  .dashboard__kpi-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .dashboard {
    padding: 20px 16px 32px;
  }
}
</style>
