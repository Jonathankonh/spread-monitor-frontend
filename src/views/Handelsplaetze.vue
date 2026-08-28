<script setup>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { holeHandelsaktivitaet } from '@/services/api.js'

const aktivitaet = ref({})

const boersen = [
  {
    key: 'gettex',
    name: 'gettex',
    beschreibung: 'Börse München, öffentlich-rechtlich betrieben. Keine Ordergebühr und kein Handelsplatzentgelt bei Scalable Capital (0,99 € bis 31.08.2026, danach 1,99 €).',
    handelszeit: '8:00 – 22:00 Uhr',
    gebuehr: '0,99 € (bis 31.08.2026), danach 1,99 €',
  },
  {
    key: 'xetra',
    name: 'Xetra',
    beschreibung: 'Deutsche Börse, das liquideste deutsche Handelssystem. Dient in diesem Projekt als Referenzmarkt für Trade-Through-Vergleiche.',
    handelszeit: '9:00 – 17:30 Uhr',
    gebuehr: '1,99 €, kein Handelsplatzentgelt (Stand 28.08.2026)',
  },
  {
    key: 'ls',
    name: 'LS Exchange',
    beschreibung: 'Lang & Schwarz, wichtigster Ausführungsplatz für Trade Republic und mehrere weitere Neobroker.',
    handelszeit: '7:30 – 23:00 Uhr',
    gebuehr: 'Abhängig vom jeweiligen Broker, meist im Orderpreis enthalten',
  },
  {
    key: 'eix',
    name: 'EIX',
    beschreibung: 'European Investor Exchange, betrieben von Scalable Capital gemeinsam mit der Börse Hannover. Scalable ist hier selbst Market Maker.',
    handelszeit: '7:30 – 23:00 Uhr',
    gebuehr: '0,99 € (0 € mit PRIME+ ab 250 € Ordervolumen)',
  },
]

async function lade() {
  aktivitaet.value = await holeHandelsaktivitaet()
}

onMounted(() => {
  lade()
})
</script>

<template>
  <div class="handelsplaetze-seite">
    <BaseCard v-for="boerse in boersen" :key="boerse.key" padding="lg" style="margin-bottom: 16px">
      <div class="handelsplatz-karte">
        <div>
          <h2 class="handelsplatz-karte__name">
            <span class="handelsplatz-karte__dot" :style="{ background: `var(--venue-${boerse.key})` }"></span>
            {{ boerse.name }}
          </h2>
          <p class="handelsplatz-karte__beschreibung">{{ boerse.beschreibung }}</p>
          <div class="handelsplatz-karte__fakten">
            <span><strong>Handelszeit:</strong> {{ boerse.handelszeit }}</span>
            <span><strong>Gebühr (Scalable):</strong> {{ boerse.gebuehr }}</span>
          </div>
        </div>
        <div class="handelsplatz-karte__anteil">
          <p class="handelsplatz-karte__anteil-wert">{{ aktivitaet[boerse.key]?.toFixed(0) ?? '–' }}%</p>
          <p class="handelsplatz-karte__anteil-label">Anteil heutiger Trades</p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.handelsplatz-karte {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.handelsplatz-karte__name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px 0;
  font-size: 17px;
}

.handelsplatz-karte__dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.handelsplatz-karte__beschreibung {
  margin: 0 0 12px 0;
  color: var(--fg3);
  font-size: 13.5px;
  max-width: 560px;
}

.handelsplatz-karte__fakten {
  display: flex;
  gap: 24px;
  font-size: 12.5px;
  color: var(--fg2);
}

.handelsplatz-karte__anteil {
  text-align: right;
  flex-shrink: 0;
}

.handelsplatz-karte__anteil-wert {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent-text);
}

.handelsplatz-karte__anteil-label {
  margin: 0;
  font-size: 11px;
  color: var(--fg4);
}

.handelsplaetze-seite {
  margin-top: 34px;
}
</style>
