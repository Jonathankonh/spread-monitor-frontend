import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Wertpapier from '@/views/Wertpapier.vue'
import Handelsplaetze from '@/views/Handelsplaetze.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'vergleich', component: Dashboard },
    { path: '/wertpapier/:isin?', name: 'wertpapier', component: Wertpapier, props: true },
    { path: '/handelsplaetze', name: 'handelsplaetze', component: Handelsplaetze },
  ],
})

export default router
