<script setup>
import BaseCard from './BaseCard.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, default: '' },
})
</script>

<template>
  <BaseCard padding="lg" class="stat-card">
    <p class="stat-card__label">{{ label }}</p>
    <p class="stat-card__value">
      {{ value }}<span v-if="unit" class="stat-card__unit">{{ unit }}</span>
    </p>
    <div class="stat-card__extra">
      <slot />
    </div>
  </BaseCard>
</template>

<style scoped>
.stat-card__label {
  margin: 0 0 var(--space-sm) 0;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.stat-card__value {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1.1;
}

.stat-card__unit {
  font-size: 1.5rem;
  margin-left: 2px;
}

.stat-card__extra {
  margin-top: var(--space-sm);
}
</style>
