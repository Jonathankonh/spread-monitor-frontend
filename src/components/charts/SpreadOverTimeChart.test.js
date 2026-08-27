import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SpreadOverTimeChart from './SpreadOverTimeChart.vue'

describe('SpreadOverTimeChart', () => {
  const reihe = [
    { zeit: '2026-08-27T09:00:00Z', spreadProzent: 0.2 },
    { zeit: '2026-08-27T09:01:00Z', spreadProzent: 0.35 },
  ]

  it('übernimmt die Spread-Werte als Chart-Daten', () => {
    const wrapper = mount(SpreadOverTimeChart, { props: { reihe } })
    expect(wrapper.vm.chartDaten.datasets[0].data).toEqual([0.2, 0.35])
  })

  it('formatiert die Zeitstempel als Labels', () => {
    const wrapper = mount(SpreadOverTimeChart, { props: { reihe } })
    expect(wrapper.vm.chartDaten.labels).toHaveLength(2)
  })
})
