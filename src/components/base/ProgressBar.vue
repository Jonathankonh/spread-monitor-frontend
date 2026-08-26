<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, required: true },
})

const prozent = computed(() => {
  const roh = (props.value / props.max) * 100
  return Math.min(roh, 100)
})
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: `${prozent}%` }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}
</style>
