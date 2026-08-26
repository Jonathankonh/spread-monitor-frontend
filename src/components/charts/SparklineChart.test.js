import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SparklineChart from './SparklineChart.vue'

describe('SparklineChart', () => {
  it('baut ein einzelnes Dataset aus den übergebenen Werten', () => {
    const wrapper = mount(SparklineChart, { props: { werte: [1, 2, 3, 2, 4] } })
    expect(wrapper.vm.chartDaten.datasets[0].data).toEqual([1, 2, 3, 2, 4])
  })

  it('färbt die Linie grün bei positivem Trend', () => {
    const wrapper = mount(SparklineChart, { props: { werte: [1, 2, 3] } })
    expect(wrapper.vm.chartDaten.datasets[0].borderColor).toBe('#22c55e')
  })

  it('färbt die Linie rot bei negativem Trend', () => {
    const wrapper = mount(SparklineChart, { props: { werte: [3, 2, 1] } })
    expect(wrapper.vm.chartDaten.datasets[0].borderColor).toBe('#ef4444')
  })
})
