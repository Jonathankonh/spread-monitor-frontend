<script setup>
import { ref, onMounted } from 'vue'

const preise = ref([])
const ladeFehler = ref(null)

async function ladeDaten() {
  try {
    const antwort = await fetch('http://178.105.153.4:3001/api/aktuelle-preise')
    if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
    preise.value = await antwort.json()
  } catch (fehler) {
    ladeFehler.value = fehler.message
  }
}

onMounted(() => {
  ladeDaten()
})
</script>

<template>
  <div>
    <h1>Spread Monitor</h1>

    <p v-if="ladeFehler">Fehler beim Laden: {{ ladeFehler }}</p>

    <table v-else>
      <thead>
      <tr>
        <th>ISIN</th>
        <th>Börse</th>
        <th>Preis</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="eintrag in preise" :key="eintrag.isin + eintrag.boerse">
        <td>{{ eintrag.isin }}</td>
        <td>{{ eintrag.boerse }}</td>
        <td>{{ eintrag.aktueller_preis }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
