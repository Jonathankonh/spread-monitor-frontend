<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { holeBoersenFarbe, basisLinienOptionen } from '@/charts/chartTheme.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler)

const props = defineProps({
  rohdaten: { type: Array, required: true },
})

const chartDaten = computed(() => {
  const boersen = [...new Set(props.rohdaten.map((d) => d.boerse))]
  const zeitpunkte = [...new Set(props.rohdaten.map((d) => d.bucket_start))].sort()

  const datasets = boersen.map((boerse) => {
    const werte = zeitpunkte.map((zeit) => {
      const treffer = props.rohdaten.find((d) => d.boerse === boerse && d.bucket_start === zeit)
      return treffer ? treffer.close : null
    })

    const farbe = holeBoersenFarbe(boerse)

    return {
      label: boerse,
      data: werte,
      borderColor: farbe,
      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart
        if (!chartArea) return farbe
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, farbe + '40')
        gradient.addColorStop(1, farbe + '00')
        return gradient
      },
      fill: true,
      spanGaps: true,
    }
  })

  return {
    labels: zeitpunkte.map((z) => new Date(z).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })),
    datasets,
  }
})

defineExpose({ chartDaten })
</script>

<template>
  <div class="line-chart">
    <Line :data="chartDaten" :options="basisLinienOptionen" />
  </div>
</template>

<style scoped>
.line-chart {
  height: 280px;
}
</style>
