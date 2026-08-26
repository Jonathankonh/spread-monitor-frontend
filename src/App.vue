<script setup lang="js">
import { ref } from 'vue'
import IsinAuswahl from './components/IsinAuswahl.vue'
import VerlaufChart from './components/VerlaufChart.vue'

const aktuelleIsin = ref('')

function beiAuswahlGeaendert(isin) {
  aktuelleIsin.value = isin
}
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 20px">
    <h1>Spread Monitor</h1>
    <IsinAuswahl @auswahl-geaendert="beiAuswahlGeaendert" />
    <VerlaufChart v-if="aktuelleIsin" :isin="aktuelleIsin" />
  </div>
</template>
