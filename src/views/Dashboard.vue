<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import StatCard from '@/components/base/StatCard.vue'
import Badge from '@/components/base/Badge.vue'
import ProgressBar from '@/components/base/ProgressBar.vue'
import { holeSpreads, holeTagesveraenderung, holeMeistgehandelt } from '@/services/api.js'
import { holeName } from '@/data/instrumentNamen.js'
import SpreadRankingRow from '@/components/base/SpreadRankingRow.vue'

const spreads = ref([])
const topMover = ref([])
const meistgehandelt = ref([])
const ladeFehler = ref(null)

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

const chartDaten = computed(() => ({
  eintraege: topSechsSpreads.value.map((s) => ({
    label: holeName(s.isin),
    wert: Math.abs(s.spread_prozent),
  })),
}))

const marktbreite = computed(() => {
  const positive = topMover.value.filter((m) => m.veraenderung_prozent >= 0).length
  return { value: positive, max: topMover.value.length }
})

onMounted(() => {
  ladeAlles()
})
</script>

<template>
  <div class="dashboard">
    <p v-if="ladeFehler" class="dashboard__fehler">Fehler beim Laden: {{ ladeFehler }}</p>

    <div v-else class="dashboard__grid">
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

      <BaseCard padding="lg" class="dashboard__wide">
        <h2 class="dashboard__heading">Preisunterschiede zwischen den Handelsplätzen</h2>
        <p class="dashboard__subheading">Die sechs Wertpapiere mit dem größten Unterschied zwischen zwei Börsen</p>
        <SpreadRankingRow
          v-for="s in topSechsSpreads"
          :key="s.isin + s.boerse_a + s.boerse_b"
          :name="holeName(s.isin)"
          :boerse-a="s.boerse_a"
          :boerse-b="s.boerse_b"
          :spread-prozent="Math.abs(s.spread_prozent)"
          :max-spread="Math.abs(topSechsSpreads[0]?.spread_prozent) || 1"
        />
      </BaseCard>

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

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.dashboard__wide {
  grid-column: span 3;
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
</style>
