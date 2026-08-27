<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  preis: { type: Number, required: true },
  isin: { type: String, required: true },
})
</script>

<template>
  <div class="price-header">
    <div>
      <h2 class="price-header__title">{{ title }}</h2>
      <p v-if="subtitle" class="price-header__subtitle">{{ subtitle }}</p>
    </div>
    <div class="price-header__price-block">
      <p class="price-header__price">{{ preis.toFixed(2) }} €</p>
      <p class="price-header__isin">{{ isin }}</p>
    </div>
  </div>
</template>

<style scoped>
.price-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.price-header__title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.price-header__subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: var(--fg3);
}

.price-header__price-block {
  text-align: right;
}

.price-header__price {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  font-family: var(--font-mono);
}

.price-header__isin {
  margin: 2px 0 0 0;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--fg3);
}
</style>
