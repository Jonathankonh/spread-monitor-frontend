<script setup>
import { ref, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { holeVerlauf } from '../services/api.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  isin: { type: String, required: true },
})

const chartDaten = ref(null)
const ladeFehler = ref(null)

async function ladeVerlauf() {
  try {
    const rohdaten = await holeVerlauf(props.isin)

    const boersen = [...new Set(rohdaten.map((d) => d.boerse))]
    const zeitpunkte = [...new Set(rohdaten.map((d) => d.bucket_start))].sort()

    const datasets = boersen.map((boerse) => {
      const werte = zeitpunkte.map((zeit) => {
        const treffer = rohdaten.find((d) => d.boerse === boerse && d.bucket_start === zeit)
        return treffer ? treffer.close : null
      })
      return { label: boerse, data: werte, borderWidth: 2, spanGaps: true }
    })

    chartDaten.value = {
      labels: zeitpunkte.map((z) => new Date(z).toLocaleTimeString()),
      datasets,
    }
    ladeFehler.value = null
  } catch (fehler) {
    ladeFehler.value = fehler.message
  }
}

watch(() => props.isin, ladeVerlauf, { immediate: true })
</script>

<template>
  <div>
    <p v-if="ladeFehler">Fehler: {{ ladeFehler }}</p>
    <Line v-if="chartDaten" :data="chartDaten" :key="isin" />
  </div>
</template>
