<script setup>
defineProps({
  daten: { type: Object, required: true },
})

const boersenNamen = {
  gettex: 'gettex',
  xetra: 'Xetra',
  ls: 'LS Exchange',
  eix: 'EIX',
}
</script>

<template>
  <div class="venue-activity">
    <div v-for="(anteil, boerse) in daten" :key="boerse" class="venue-activity__row">
      <div class="venue-activity__label">
        <span class="venue-activity__dot" :style="{ background: `var(--venue-${boerse})` }"></span>
        <span>{{ boersenNamen[boerse] || boerse }}</span>
      </div>
      <span class="venue-activity__percent">{{ anteil.toFixed(0) }} %</span>
    </div>
    <div class="venue-activity__bar">
      <div
        v-for="(anteil, boerse) in daten"
        :key="boerse"
        class="venue-activity__segment"
        :style="{ width: `${anteil}%`, background: `var(--venue-${boerse})` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.venue-activity__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12.5px;
}

.venue-activity__label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--fg2);
}

.venue-activity__dot {
  width: 9px;
  height: 9px;
  border-radius: 3px;
}

.venue-activity__percent {
  font-family: var(--font-mono);
  color: var(--fg);
}

.venue-activity__bar {
  display: flex;
  height: 7px;
  border-radius: var(--radius-pill);
  overflow: hidden;
  margin-top: 8px;
  gap: 2px;
}

.venue-activity__segment {
  height: 100%;
}
</style>
