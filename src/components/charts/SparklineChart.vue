<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  werte: { type: Array, required: true },
})

const istPositiv = computed(() => {
  if (props.werte.length < 2) return true
  return props.werte[props.werte.length - 1] >= props.werte[0]
})

const chartDaten = computed(() => ({
  labels: props.werte.map((_, i) => i),
  datasets: [
    {
      data: props.werte,
      borderColor: istPositiv.value ? '#22c55e' : '#ef4444',
      borderWidth: 1.5,
      fill: false,
    },
  ],
}))

const optionen = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
}

defineExpose({ chartDaten })
</script>

<template>
  <div class="sparkline">
    <Line :data="chartDaten" :options="optionen" />
  </div>
</template>

<style scoped>
.sparkline {
  width: 80px;
  height: 32px;
}
</style>
