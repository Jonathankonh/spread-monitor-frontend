<script setup>
import SparklineChart from '@/components/charts/SparklineChart.vue'

defineProps({
  isin: { type: String, required: true },
  name: { type: String, required: true },
  venues: { type: Array, required: true },
  preis: { type: Number, required: true },
  veraenderungProzent: { type: Number, default: null },
  spreadProzent: { type: Number, required: true },
  sparklineWerte: { type: Array, default: () => [] },
  ausgewaehlt: { type: Boolean, default: false },
})

defineEmits(['select'])
</script>

<template>
  <div
    class="price-row"
    :class="{ 'price-row--ausgewaehlt': ausgewaehlt }"
    role="button"
    tabindex="0"
    @click="$emit('select', isin)"
  >
    <div class="price-row__name-block">
      <p class="price-row__name">{{ name }}</p>
      <p class="price-row__isin">{{ isin }}</p>
    </div>

    <div class="price-row__badges">
      <span
        v-for="v in venues"
        :key="v"
        class="price-row__venue-badge"
        :style="{ background: `var(--venue-${v})` }"
      >
        {{ v.toUpperCase() }}
      </span>
    </div>

    <div class="price-row__sparkline">
      <SparklineChart v-if="sparklineWerte.length > 1" :werte="sparklineWerte" />
    </div>

    <div class="price-row__price-block">
      <p class="price-row__price">{{ preis.toFixed(2) }} €</p>
      <p
        v-if="veraenderungProzent !== null"
        class="price-row__change"
        :class="veraenderungProzent >= 0 ? 'price-row__change--up' : 'price-row__change--down'"
      >
        {{ veraenderungProzent >= 0 ? '+' : '−' }}{{ Math.abs(veraenderungProzent).toFixed(2) }}%
      </p>
    </div>

    <p class="price-row__spread">{{ spreadProzent.toFixed(2) }}%</p>
  </div>
</template>

<style scoped>
.price-row {
  display: grid;
  grid-template-columns: 1fr 110px 108px 96px 92px;
  gap: 18px;
  align-items: center;
  padding: 14px 20px;
  border-radius: var(--radius-row);
  background: var(--surface);
  cursor: pointer;
  transition: background 0.15s;
}

.price-row:hover {
  background: var(--raised);
}

.price-row--ausgewaehlt {
  background: var(--surface-sel);
}

.price-row__name-block {
  overflow: hidden;
}

.price-row__name {
  margin: 0;
  font-size: 14.5px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-row__isin {
  margin: 2px 0 0 0;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--fg4);
}

.price-row__badges {
  display: flex;
  gap: 4px;
}

.price-row__venue-badge {
  padding: 3px 6px;
  border-radius: var(--radius-badge);
  color: oklch(0.18 0.02 300);
  font-size: 9.5px;
  font-weight: 500;
  font-family: var(--font-mono);
}

.price-row__price-block {
  text-align: right;
}

.price-row__price {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-mono);
}

.price-row__change {
  margin: 2px 0 0 0;
  font-size: 11.5px;
  font-weight: 500;
  font-family: var(--font-mono);
}

.price-row__change--up {
  color: var(--up);
}

.price-row__change--down {
  color: var(--down);
}

.price-row__spread {
  margin: 0;
  text-align: right;
  font-size: 17px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent-text);
}

@media (max-width: 760px) {
  .price-row {
    grid-template-columns: 1fr 90px;
    grid-template-rows: auto auto auto;
    row-gap: 6px;
    column-gap: 12px;
  }

  .price-row__name-block {
    grid-column: 1;
    grid-row: 1;
  }

  .price-row__badges {
    grid-column: 1;
    grid-row: 2;
  }

  .price-row__sparkline {
    grid-column: 2;
    grid-row: 1;
  }

  .price-row__price-block {
    grid-column: 2;
    grid-row: 2;
    text-align: right;
  }

  .price-row__spread {
    grid-column: 1 / -1;
    grid-row: 3;
    text-align: left;
    margin-top: 4px;
  }
}
</style>
