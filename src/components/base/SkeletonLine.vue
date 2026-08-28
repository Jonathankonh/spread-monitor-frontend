<template>
  <div class="skeleton-line" :style="{ width: width, height: height }"></div>
</template>

<script setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '16px' },
})
</script>

<style scoped>
.skeleton-line {
  background: var(--track);
  border-radius: var(--radius-sm);
  animation: puls 1.6s ease-in-out infinite;
}

@keyframes puls {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
