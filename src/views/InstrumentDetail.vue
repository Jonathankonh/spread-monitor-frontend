<script setup>
import { ref, computed, watch } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import PriceHeader from '@/components/base/PriceHeader.vue'
import ExchangeLegend from '@/components/base/ExchangeLegend.vue'
import LineChart from '@/components/charts/LineChart.vue'
import SpreadOverTimeChart from '@/components/charts/SpreadOverTimeChart.vue'
import { holeVerlauf } from '@/services/api.js'
import { holeName } from '@/data/instrumentNamen.js'
import { berechneSpreadUeberZeit } from '@/utils/spreadBerechnung.js'

const props = defineProps({
  isin: { type: String, required: true },
})

const rohdaten = ref([])
const ladeFehler = ref(null)

async function lade() {
  try {
    const alleDaten = await holeVerlauf(props.isin)
    const heute = new Date().toISOString().split('T')[0]
    rohdaten.value = alleDaten.filter((d) => d.bucket_start.startsWith(heute))
    ladeFehler.value = null
  } catch (fehler) {
    ladeFehler.value = fehler.message
  }
}

watch(() => props.isin, lade, { immediate: true })

const legende = computed(() => {
  const boersen = [...new Set(rohdaten.value.map((d) => d.boerse))]
  return boersen.map((boerse) => {
    const eintraege = rohdaten.value
      .filter((d) => d.boerse === boerse)
      .sort((a, b) => new Date(a.bucket_start) - new Date(b.bucket_start))
    const letzter = eintraege[eintraege.length - 1]
    return { boerse, preis: letzter ? letzter.close : 0 }
  })
})

const aktuellerPreis = computed(() => {
  if (rohdaten.value.length === 0) return 0
  const sortiert = [...rohdaten.value].sort((a, b) => new Date(a.bucket_start) - new Date(b.bucket_start))
  return sortiert[sortiert.length - 1].close
})

const spreadReihe = computed(() => berechneSpreadUeberZeit(rohdaten.value))

const spitzenSpread = computed(() => {
  const werte = spreadReihe.value.map((r) => r.spreadProzent).filter((w) => w != null)
  return werte.length ? Math.max(...werte) : 0
})
</script>

<template>
  <BaseCard padding="lg">
    <p v-if="ladeFehler">Fehler: {{ ladeFehler }}</p>

    <template v-else>
      <PriceHeader
        :title="`Preisverlauf ${holeName(isin)} – vier Handelsplätze, heute`"
        subtitle="Eine Linie pro Handelsplatz. Laufen die Linien auseinander, wächst der Spread."
        :preis="aktuellerPreis"
        :isin="isin"
      />
      <ExchangeLegend :eintraege="legende" />
      <LineChart :rohdaten="rohdaten" />

      <div class="instrument-detail__divider"></div>

      <div class="instrument-detail__spread-header">
        <h3 class="instrument-detail__spread-title">Spread über den Tag – {{ holeName(isin) }}</h3>
        <span class="instrument-detail__spitze">Spitze {{ spitzenSpread.toFixed(2) }} %</span>
      </div>
      <SpreadOverTimeChart :reihe="spreadReihe" />
    </template>
  </BaseCard>
</template>

<style scoped>
.instrument-detail__divider {
  height: 1px;
  background: var(--line);
  margin: 24px 0;
}

.instrument-detail__spread-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.instrument-detail__spread-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.instrument-detail__spitze {
  font-size: 12.5px;
  font-family: var(--font-mono);
  color: var(--fg2);
}
</style>
