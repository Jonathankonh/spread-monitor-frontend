<script setup>
const boersenFarben = {
  gettex: 'var(--venue-gettex)',
  xetra: 'var(--venue-xetra)',
  ls: 'var(--venue-ls)',
  eix: 'var(--venue-eix)',
}

defineProps({
  eintraege: { type: Array, required: true },
  ausgeblendet: { type: Array, default: () => [] },
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="exchange-legend">
    <button
      v-for="e in eintraege"
      :key="e.boerse"
      class="exchange-legend__chip"
      :class="{ 'exchange-legend__chip--aktiv': !ausgeblendet.includes(e.boerse) }"
      @click="emit('toggle', e.boerse)"
    >
      <span class="exchange-legend__dot" :style="{ background: boersenFarben[e.boerse] }"></span>
      <span class="exchange-legend__name">{{ e.boerse }}</span>
      <span class="exchange-legend__preis">{{ e.preis.toFixed(2) }} €</span>
    </button>
  </div>
</template>

<style scoped>
.exchange-legend {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.exchange-legend__chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  border-radius: var(--radius-pill);
  border: none;
  background: transparent;
  color: var(--fg4);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.exchange-legend__chip--aktiv {
  background: var(--accent-soft);
  color: var(--fg);
}

.exchange-legend__dot {
  width: 9px;
  height: 9px;
  border-radius: 3px;
  flex-shrink: 0;
}

.exchange-legend__name {
  font-size: 12px;
  font-weight: 500;
}

.exchange-legend__preis {
  font-size: 11.5px;
  font-family: var(--font-mono);
  opacity: 0.7;
}
</style>
