<script setup>
import { useTheme } from './composables/useTheme.js'
import AppHeader from './components/AppHeader.vue'

useTheme()
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <router-view />
  </div>
</template>

<style>
.app-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px clamp(16px, 4vw, 34px) 40px;
  background: var(--bg);
  border-radius: var(--radius-page);
}
</style>
