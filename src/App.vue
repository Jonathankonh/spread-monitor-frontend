<script setup>
import AppHeader from './components/base/AppHeader.vue'
import Dashboard from './views/Dashboard.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <Dashboard />
  </div>
</template>

<style>
.app-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 34px 40px;
  background: var(--bg);
  border-radius: var(--radius-page);
}
</style>
