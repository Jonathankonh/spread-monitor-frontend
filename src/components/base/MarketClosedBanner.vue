<script setup>
defineProps({
  letztesUpdate: { type: Date, required: true },
})
</script>

<template>
  <div class="market-closed">
    <span class="market-closed__dot"></span>
    <div>
      <p class="market-closed__title">Markt aktuell geschlossen</p>
      <p class="market-closed__subtitle">
        Letzte Daten von {{ letztesUpdate.toLocaleDateString('de-DE') }},
        {{ letztesUpdate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }} Uhr.
      </p>
    </div>
  </div>
</template>

<style scoped>
.market-closed {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: var(--radius-row);
  background: var(--surface);
  border: 1px solid oklch(0.75 0.15 70 / 0.3);
  margin-bottom: 24px;
}

.market-closed__dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: oklch(0.75 0.15 70);
}

.market-closed__title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.market-closed__subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: var(--fg3);
}
</style>
