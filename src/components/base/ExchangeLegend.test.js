import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExchangeLegend from './ExchangeLegend.vue'

describe('ExchangeLegend', () => {
  const eintraege = [
    { boerse: 'gettex', preis: 178.42 },
    { boerse: 'xetra', preis: 177.86 },
  ]

  it('rendert einen Chip pro Börse', () => {
    const wrapper = mount(ExchangeLegend, { props: { eintraege } })
    expect(wrapper.findAll('.exchange-legend__chip')).toHaveLength(2)
  })

  it('zeigt den Preis formatiert an', () => {
    const wrapper = mount(ExchangeLegend, { props: { eintraege } })
    expect(wrapper.text()).toContain('178.42')
  })

  it('emittiert "toggle" mit der Börse beim Klick', async () => {
    const wrapper = mount(ExchangeLegend, { props: { eintraege } })
    await wrapper.find('.exchange-legend__chip').trigger('click')
    expect(wrapper.emitted('toggle')[0]).toEqual(['gettex'])
  })

  it('markiert ausgeblendete Börsen als inaktiv', () => {
    const wrapper = mount(ExchangeLegend, {
      props: { eintraege, ausgeblendet: ['gettex'] },
    })
    const chips = wrapper.findAll('.exchange-legend__chip')
    expect(chips[0].classes()).not.toContain('exchange-legend__chip--aktiv')
    expect(chips[1].classes()).toContain('exchange-legend__chip--aktiv')
  })
})
