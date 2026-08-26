<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  boerseA: { type: String, required: true },
  boerseB: { type: String, required: true },
  spreadProzent: { type: Number, required: true },
  maxSpread: { type: Number, required: true },
})

const balkenBreite = computed(() => {
  return Math.min((props.spreadProzent / props.maxSpread) * 100, 100)
})
</script>

<template>
  <div class="spread-row">
    <div class="spread-row__label">
      <p class="spread-row__name">{{ name }}</p>
      <p class="spread-row__pair">{{ boerseA }} / {{ boerseB }}</p>
    </div>
    <div class="spread-row__bar">
      <div class="spread-row__bar-fill" :style="{ width: `${balkenBreite}%` }"></div>
    </div>
    <p class="spread-row__value">{{ spreadProzent.toFixed(2) }}%</p>
  </div>
</template>

<style scoped>
.spread-row {
  display: grid;
  grid-template-columns: 200px 1fr 70px;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
}

.spread-row__label {
  overflow: hidden;
}

.spread-row__name {
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spread-row__pair {
  margin: 2px 0 0 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.spread-row__bar {
  height: 6px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.spread-row__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent) 0%, #c4b5fd 100%);
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}

.spread-row__value {
  margin: 0;
  text-align: right;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
}
</style>
