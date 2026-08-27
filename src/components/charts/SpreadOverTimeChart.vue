<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler)

const props = defineProps({
  reihe: { type: Array, required: true }, // [{ zeit, spreadProzent }]
})

const chartDaten = computed(() => ({
  labels: props.reihe.map((r) =>
    new Date(r.zeit).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  ),
  datasets: [
    {
      data: props.reihe.map((r) => r.spreadProzent),
      borderColor: '#8b5cf6',
      backgroundColor: (context) => {
        const { ctx, chartArea } = context.chart
        if (!chartArea) return '#8b5cf6'
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, '#8b5cf640')
        gradient.addColorStop(1, '#8b5cf600')
        return gradient
      },
      fill: true,
      spanGaps: true,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
    },
  ],
}))

const optionen = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { display: false },
    y: { display: false, min: 0 },
  },
}

defineExpose({ chartDaten })
</script>

<template>
  <div class="spread-over-time-chart">
    <Line :data="chartDaten" :options="optionen" />
  </div>
</template>

<style scoped>
.spread-over-time-chart {
  height: 72px;
}
</style>
