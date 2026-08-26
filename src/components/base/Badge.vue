<script setup>
defineProps({
  label: { type: String, required: true },
  boerse: { type: String, default: '' },
})
</script>

<template>
  <span class="badge" :class="boerse ? `badge--${boerse}` : ''">
    {{ label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--color-surface-hover);
  color: var(--color-text-muted);
}

.badge--gettex {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.badge--xetra {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.badge--ls {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.badge--eix {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}
</style>
