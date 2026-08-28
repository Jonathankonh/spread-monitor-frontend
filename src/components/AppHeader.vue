<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'
import { formatiereStatus } from '@/utils/statusText.js'
import { instrumentNamen } from '@/data/instrumentNamen.js'

defineProps({
  marketOpen: { type: Boolean, default: true },
  lastUpdate: { type: String, default: () => new Date().toISOString() },
})

const { theme, toggle } = useTheme()
const router = useRouter()

const suchbegriff = ref('')
const suchfeldFokussiert = ref(false)

const treffer = computed(() => {
  if (suchbegriff.value.length < 2) return []
  const suche = suchbegriff.value.toLowerCase()
  return Object.entries(instrumentNamen)
    .filter(([isin, name]) => isin.toLowerCase().includes(suche) || name.toLowerCase().includes(suche))
    .slice(0, 6)
})

function waehleIsin(isin) {
  router.push(`/wertpapier/${isin}`)
  suchbegriff.value = ''
  suchfeldFokussiert.value = false
}

function beiEnter() {
  if (treffer.value.length > 0) {
    waehleIsin(treffer.value[0][0])
  }
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <span class="app-header__brand">Spread Monitor</span>
      <nav class="app-header__nav">
        <router-link to="/" class="app-header__nav-item" active-class="app-header__nav-item--active">
          Vergleich
        </router-link>
        <router-link to="/wertpapier" class="app-header__nav-item" active-class="app-header__nav-item--active">
          Wertpapier
        </router-link>
        <router-link to="/handelsplaetze" class="app-header__nav-item" active-class="app-header__nav-item--active">
          Handelsplätze
        </router-link>
      </nav>
    </div>

    <div class="app-header__right">
      <div class="app-header__search-wrapper">
        <label class="app-header__search">
          <span class="app-header__search-icon" aria-hidden="true"></span>
          <input
            v-model="suchbegriff"
            type="text"
            placeholder="Wertpapier suchen – ISIN oder Name"
            @focus="suchfeldFokussiert = true"
            @blur="setTimeout(() => (suchfeldFokussiert = false), 150)"
            @keyup.enter="beiEnter"
          />
        </label>

        <div v-if="suchfeldFokussiert && treffer.length > 0" class="app-header__dropdown">
          <button
            v-for="[isin, name] in treffer"
            :key="isin"
            class="app-header__dropdown-item"
            @click="waehleIsin(isin)"
          >
            <span>{{ name }}</span>
            <span class="app-header__dropdown-isin">{{ isin }}</span>
          </button>
        </div>
      </div>

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

.app-header__nav-item,
.app-header__nav-item:visited {
  padding: 7px 15px;
  font-size: 13px;
  border: none;
  background: transparent;
  border-radius: var(--radius-pill);
  color: var(--fg3);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: none;
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

  .app-header__nav-item {
    text-decoration: none;
  }
}

.app-header__search-wrapper {
  position: relative;
}

.app-header__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--raised);
  border-radius: var(--radius-row);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.app-header__dropdown-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--fg);
  cursor: pointer;
  text-align: left;
  font-size: 13.5px;
}

.app-header__dropdown-item:hover {
  background: var(--surface-sel);
}

.app-header__dropdown-isin {
  font-family: var(--font-mono);
  color: var(--fg4);
  font-size: 11.5px;
}
</style>
