<script setup>
defineProps({
  segmente: {
    type: Array, // [{ boerse: 'gettex', anteil: 28 }, ...]
    required: true,
  },
})
</script>

<template>
  <div class="segmented-bar">
    <div
      v-for="segment in segmente"
      :key="segment.boerse"
      class="segmented-bar__segment"
      :class="`segmented-bar__segment--${segment.boerse}`"
      :style="{ width: `${segment.anteil}%` }"
    ></div>
  </div>
</template>

<style scoped>
.segmented-bar {
  display: flex;
  width: 100%;
  height: 6px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  gap: 2px;
}

.segmented-bar__segment {
  height: 100%;
  border-radius: var(--radius-sm);
}

.segmented-bar__segment--gettex {
  background: #8b5cf6;
}
.segmented-bar__segment--xetra {
  background: #3b82f6;
}
.segmented-bar__segment--ls {
  background: #22c55e;
}
.segmented-bar__segment--eix {
  background: #f97316;
}
</style>
