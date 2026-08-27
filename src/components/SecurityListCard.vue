<script setup>
import { ref, computed } from 'vue'
import BaseCard from './base/BaseCard.vue'
import PriceRow from './base/PriceRow.vue'
import { holeName } from '@/data/instrumentNamen.js'

const props = defineProps({
  eintraege: { type: Array, required: true }, // spreads-Daten
  sparklines: { type: Object, default: () => ({}) },
  ausgewaehlteIsin: { type: String, default: '' },
})

const proWertpapierGruppiert = computed(() => {
  const gruppen = {}

  for (const eintrag of props.eintraege) {
    const bisheriger = gruppen[eintrag.isin]
    if (!bisheriger || Math.abs(eintrag.spread_prozent) > Math.abs(bisheriger.spread_prozent)) {
      gruppen[eintrag.isin] = eintrag
    }
  }

  return Object.values(gruppen)
})

const emit = defineEmits(['select'])

const pairFilter = ref('alle')
const showAll = ref(false)

const filterOptionen = computed(() => {
  const paare = new Set(props.eintraege.map((e) => `${e.boerse_a} / ${e.boerse_b}`))
  return ['alle', ...paare]
})

const gefiltert = computed(() => {
  if (pairFilter.value === 'alle') return proWertpapierGruppiert.value
  return proWertpapierGruppiert.value.filter(
    (e) => `${e.boerse_a} / ${e.boerse_b}` === pairFilter.value
  )
})
const sichtbareEintraege = computed(() => {
  return showAll.value ? gefiltert.value : gefiltert.value.slice(0, 5)
})
</script>

<template>
  <BaseCard padding="lg">
    <div class="security-list__header">
      <div>
        <h2 class="security-list__title">Wertpapiere im Detail</h2>
        <p class="security-list__subtitle">Kurs, Tagesverlauf und aktueller Spread je Wertpapier</p>
      </div>
      <div class="security-list__filters">
        <button
          v-for="option in filterOptionen"
          :key="option"
          class="security-list__chip"
          :class="{ 'security-list__chip--aktiv': option === pairFilter }"
          @click="pairFilter = option"
        >
          {{ option === 'alle' ? 'Alle' : option }}
        </button>
      </div>
    </div>

    <div class="security-list__rows">
      <PriceRow
        v-for="eintrag in sichtbareEintraege"
        :key="eintrag.isin + eintrag.boerse_a + eintrag.boerse_b"
        :isin="eintrag.isin"
        :name="holeName(eintrag.isin)"
        :venues="[eintrag.boerse_a, eintrag.boerse_b]"
        :preis="eintrag.preis_a"
        :spread-prozent="Math.abs(eintrag.spread_prozent)"
        :sparkline-werte="sparklines[eintrag.isin] || []"
        :ausgewaehlt="eintrag.isin === ausgewaehlteIsin"
        @select="emit('select', $event)"
      />
    </div>

    <button
      v-if="gefiltert.length > 5"
      class="security-list__toggle"
      @click="showAll = !showAll"
    >
      {{ showAll ? 'Weniger anzeigen' : `Alle ${gefiltert.length} Wertpapiere anzeigen` }}
    </button>
  </BaseCard>
</template>

<style scoped>
.security-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.security-list__title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.security-list__subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: var(--fg3);
}

.security-list__filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.security-list__chip {
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  border: none;
  background: var(--raised);
  color: var(--fg2);
  font-size: 12px;
  cursor: pointer;
}

.security-list__chip--aktiv {
  background: var(--accent);
  color: oklch(0.16 0.02 300);
}

.security-list__rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.security-list__toggle {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border-radius: 16px;
  border: none;
  background: var(--raised);
  color: oklch(0.85 0.09 300);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
}
</style>
