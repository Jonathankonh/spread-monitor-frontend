import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LineChart from './LineChart.vue'

describe('LineChart', () => {
  const beispielDaten = [
    { boerse: 'gettex', bucket_start: '2026-08-26T09:00:00Z', close: 100 },
    { boerse: 'gettex', bucket_start: '2026-08-26T09:01:00Z', close: 101 },
    { boerse: 'xetra', bucket_start: '2026-08-26T09:00:00Z', close: 99 },
    { boerse: 'xetra', bucket_start: '2026-08-26T09:01:00Z', close: 100 },
  ]

  it('gruppiert die Rohdaten nach Börse in separate Datasets', () => {
    const wrapper = mount(LineChart, { props: { rohdaten: beispielDaten } })
    const chartDaten = wrapper.vm.chartDaten
    expect(chartDaten.datasets).toHaveLength(2)
  })

  it('benennt jedes Dataset nach seiner Börse', () => {
    const wrapper = mount(LineChart, { props: { rohdaten: beispielDaten } })
    const labels = wrapper.vm.chartDaten.datasets.map((d) => d.label)
    expect(labels).toContain('gettex')
    expect(labels).toContain('xetra')
  })

  it('zeigt eine leere Zeitachse bei leeren Rohdaten, ohne Fehler', () => {
    const wrapper = mount(LineChart, { props: { rohdaten: [] } })
    expect(wrapper.vm.chartDaten.labels).toHaveLength(0)
  })
})
