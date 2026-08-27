<script setup>
import { useTheme } from './composables/useTheme.js'
import AppHeader from './components/AppHeader.vue'
import Dashboard from './views/Dashboard.vue'

useTheme() // aktiviert Dark Mode als Standard, auch ohne den Button zu benutzen
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
