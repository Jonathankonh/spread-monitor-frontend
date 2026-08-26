<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({
  eintraege: { type: Array, required: true }, // [{ label, wert }]
})

const chartDaten = computed(() => ({
  labels: props.eintraege.map((e) => e.label),
  datasets: [
    {
      data: props.eintraege.map((e) => e.wert),
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
      barThickness: 12,
    },
  ],
}))

const optionen = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9a9aa2' } },
    y: { grid: { display: false }, ticks: { color: '#f5f5f7' } },
  },
}

defineExpose({ chartDaten })
</script>

<template>
  <div class="horizontal-bar-chart">
    <Bar :data="chartDaten" :options="optionen" />
  </div>
</template>

<style scoped>
.horizontal-bar-chart {
  height: 280px;
}
</style>
