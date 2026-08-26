<script setup>
import { ref, onMounted } from 'vue'
import { holeMeistgehandelt } from '../services/api.js'

const emit = defineEmits(['auswahl-geaendert'])

const isinListe = ref([])
const gewaehlteIsin = ref('')

async function ladeIsinListe() {
  const daten = await holeMeistgehandelt()
  const einzigartige = [...new Set(daten.map((d) => d.isin))]
  isinListe.value = einzigartige
  if (einzigartige.length > 0) {
    gewaehlteIsin.value = einzigartige[0]
    emit('auswahl-geaendert', gewaehlteIsin.value)
  }
}

function beiAenderung() {
  emit('auswahl-geaendert', gewaehlteIsin.value)
}

onMounted(() => {
  ladeIsinListe()
})
</script>

<template>
  <label>
    ISIN wählen:
    <select v-model="gewaehlteIsin" @change="beiAenderung">
      <option v-for="isin in isinListe" :key="isin" :value="isin">{{ isin }}</option>
    </select>
  </label>
</template>
