<script setup>
import BaseCard from './BaseCard.vue'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit: { type: String, default: '' },
  variant: { type: String, default: 'standard' }, // 'standard' | 'hero'
})
</script>

<template>
  <BaseCard padding="lg" class="stat-card" :class="`stat-card--${variant}`">
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
  color: var(--fg2);
  font-size: 13px;
  font-weight: 500;
}

.stat-card__value {
  margin: 0;
  font-size: 38px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--fg);
  line-height: 1.1;
}

.stat-card__unit {
  font-size: 17px;
  margin-left: 2px;
  font-weight: 500;
}

.stat-card__extra {
  margin-top: var(--space-sm);
}

.stat-card--hero {
  background: var(--grad-hero);
}

.stat-card--hero .stat-card__label {
  color: oklch(0.85 0.08 300);
}

.stat-card--hero .stat-card__value {
  font-size: 60px;
  letter-spacing: -0.04em;
  line-height: 0.88;
  color: var(--accent-text);
}

.stat-card--hero .stat-card__unit {
  font-size: 22px;
}
</style>
