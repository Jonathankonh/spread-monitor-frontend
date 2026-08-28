<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import InstrumentDetail from './InstrumentDetail.vue'
import { instrumentNamen, holeName } from '@/data/instrumentNamen.js'
import { holeTagesveraenderung } from '@/services/api.js'

const route = useRoute()
const router = useRouter()
const suchbegriff = ref('')
const treffer = computed(() => {
  if (suchbegriff.value.length < 2) return []

  const suche = suchbegriff.value.toLowerCase()
  return Object.entries(instrumentNamen)
    .filter(([isin, name]) => isin.toLowerCase().includes(suche) || name.toLowerCase().includes(suche))
    .slice(0, 8)
})
const aktuelleIsin = computed(() => route.params.isin)
const vorschlaege = ref([])

function waehleIsin(isin) {
  router.push(`/wertpapier/${isin}`)
  suchbegriff.value = ''
}

function beiEnter() {
  if (treffer.value.length > 0) {
    waehleIsin(treffer.value[0][0])
  }
}

async function ladeVorschlaege() {
  const daten = await holeTagesveraenderung()
  vorschlaege.value = daten.slice(0, 6)
}

onMounted(() => {
  ladeVorschlaege()
})
</script>

<template>
  <div class="wertpapier-seite">
    <BaseCard padding="lg">
      <h1 class="wertpapier-seite__title">Wertpapier suchen</h1>
      <input
        v-model="suchbegriff"
        type="text"
        class="wertpapier-seite__search"
        placeholder="ISIN oder Name eingeben..."
        @keyup.enter="beiEnter"
      />
      <div v-if="treffer.length > 0" class="wertpapier-seite__treffer">
        <button
          v-for="[isin, name] in treffer"
          :key="isin"
          class="wertpapier-seite__treffer-item"
          @click="waehleIsin(isin)"
        >
          <span>{{ name }}</span>
          <span class="wertpapier-seite__treffer-isin">{{ isin }}</span>
        </button>
      </div>
    </BaseCard>

    <InstrumentDetail v-if="aktuelleIsin" :isin="aktuelleIsin" style="margin-top: 16px" />

    <template v-else>
      <p class="wertpapier-seite__hinweis">Oder wähle ein häufig bewegtes Wertpapier:</p>
      <div class="wertpapier-seite__vorschlaege">
        <button
          v-for="v in vorschlaege"
          :key="v.isin + v.boerse"
          class="wertpapier-seite__vorschlag"
          @click="router.push(`/wertpapier/${v.isin}`)"
        >
          <span>{{ holeName(v.isin) }}</span>
          <span :class="v.veraenderung_prozent >= 0 ? 'wertpapier-seite__up' : 'wertpapier-seite__down'">
        {{ v.veraenderung_prozent >= 0 ? '+' : '−' }}{{ Math.abs(v.veraenderung_prozent).toFixed(2) }}%
      </span>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.wertpapier-seite__title {
  margin: 0 0 16px 0;
  font-size: 17px;
  font-weight: 600;
}

.wertpapier-seite__search {
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--line);
  background: var(--surface-sel);
  color: var(--fg);
  font-size: 14px;
  box-sizing: border-box;
}

.wertpapier-seite__search:focus {
  outline: none;
  border-color: var(--accent);
}

.wertpapier-seite__treffer {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wertpapier-seite__treffer-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: var(--radius-row);
  border: none;
  background: var(--raised);
  color: var(--fg);
  cursor: pointer;
  text-align: left;
  font-size: 14px;
}

.wertpapier-seite__treffer-item:hover {
  background: var(--surface-sel);
}

.wertpapier-seite__treffer-isin {
  font-family: var(--font-mono);
  color: var(--fg4);
  font-size: 12px;
}

.wertpapier-seite__hinweis {
  margin-top: 24px;
  text-align: center;
  color: var(--fg3);
  font-size: 14px;
}

.wertpapier-seite {
  margin-top: 34px;
}

.wertpapier-seite__vorschlaege {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.wertpapier-seite__vorschlag {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: var(--radius-row);
  border: none;
  background: var(--raised);
  color: var(--fg);
  cursor: pointer;
  font-size: 14px;
}

.wertpapier-seite__vorschlag:hover {
  background: var(--surface-sel);
}

.wertpapier-seite__up {
  color: var(--up);
}

.wertpapier-seite__down {
  color: var(--down);
}

</style>
