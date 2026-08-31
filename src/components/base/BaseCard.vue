<script setup lang="js">
defineProps({
  padding: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
  },
})
</script>

<template>
  <div class="card" :class="`card--padding-${padding}`">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  width: 100%;
  box-sizing: border-box;
}
.card--padding-sm {
  padding: var(--space-sm);
}

.card--padding-md {
  padding: var(--space-md);
}

.card--padding-lg {
  padding: var(--space-lg);
}
</style>
