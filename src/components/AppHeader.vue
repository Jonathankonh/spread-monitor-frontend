<script setup>
import { ref } from 'vue'
import { formatiereStatus } from '@/utils/statusText.js'

const props = defineProps({
  marketOpen: { type: Boolean, default: true },
  lastUpdate: { type: String, default: () => new Date().toISOString() },
})

const emit = defineEmits(['navigate', 'search'])

const navItems = ['Vergleich', 'Wertpapier', 'Handelsplätze']
const aktiverTab = ref('Vergleich')

function waehleTab(item) {
  aktiverTab.value = item
  emit('navigate', item)
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <span class="app-header__brand">Spread Monitor</span>
      <nav class="app-header__nav">
        <button
          v-for="item in navItems"
          :key="item"
          class="app-header__nav-item"
          :class="{ 'app-header__nav-item--active': item === aktiverTab }"
          @click="waehleTab(item)"
        >
          {{ item }}
        </button>
      </nav>
    </div>

    <div class="app-header__right">
      <label class="app-header__search">
        <span class="app-header__search-icon" aria-hidden="true"></span>
        <input
          type="text"
          placeholder="Wertpapier suchen – ISIN oder Name"
          @input="emit('search', $event.target.value)"
        />
      </label>

      <div class="app-header__status">
        <span
          class="app-header__status-dot"
          :class="{ 'app-header__status-dot--live': marketOpen }"
        ></span>
        <span>{{ formatiereStatus({ marketOpen, lastUpdate }) }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 28px;
}

.app-header__brand {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--fg);
}

.app-header__nav {
  display: flex;
  gap: 4px;
  background: var(--surface);
  border-radius: var(--radius-pill);
  padding: 4px;
}

.app-header__nav-item {
  padding: 7px 15px;
  font-size: 13px;
  border: none;
  background: transparent;
  border-radius: var(--radius-pill);
  color: var(--fg3);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.app-header__nav-item--active {
  background: var(--surface-sel);
  color: oklch(0.85 0.09 300);
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-header__search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 320px;
  background: var(--surface);
  border-radius: var(--radius-pill);
  padding: 11px 18px;
  border: 1.5px solid transparent;
  transition: border-color 0.15s;
}

.app-header__search:focus-within {
  border-color: var(--accent);
}

.app-header__search-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid oklch(0.5 0.012 300);
  flex-shrink: 0;
}

.app-header__search input {
  border: none;
  background: transparent;
  outline: none;
  color: var(--fg);
  font-size: 13.5px;
  width: 100%;
}

.app-header__search input::placeholder {
  color: var(--fg4);
}

.app-header__status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border-radius: var(--radius-pill);
  padding: 10px 16px;
  font-size: 12.5px;
  color: var(--fg2);
  white-space: nowrap;
}

.app-header__status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--fg4);
}

.app-header__status-dot--live {
  background: var(--accent);
  animation: puls 2.4s ease-in-out infinite;
}

@keyframes puls {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

@media (max-width: 900px) {
  .app-header {
    flex-wrap: wrap;
    height: auto;
    gap: 12px;
    padding-bottom: 12px;
  }

  .app-header__search {
    width: 100%;
    order: 3;
  }
}
</style>
