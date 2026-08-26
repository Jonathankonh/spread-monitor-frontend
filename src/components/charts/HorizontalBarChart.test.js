import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HorizontalBarChart from './HorizontalBarChart.vue'

describe('HorizontalBarChart', () => {
  const eintraege = [
    { label: 'NVIDIA Corp.', wert: 0.83 },
    { label: 'Tesla Inc.', wert: 0.71 },
  ]

  it('übernimmt die Labels aus den Einträgen', () => {
    const wrapper = mount(HorizontalBarChart, { props: { eintraege } })
    expect(wrapper.vm.chartDaten.labels).toEqual(['NVIDIA Corp.', 'Tesla Inc.'])
  })

  it('übernimmt die Werte aus den Einträgen', () => {
    const wrapper = mount(HorizontalBarChart, { props: { eintraege } })
    expect(wrapper.vm.chartDaten.datasets[0].data).toEqual([0.83, 0.71])
  })
})
