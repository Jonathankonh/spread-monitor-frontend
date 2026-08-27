import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PriceHeader from './PriceHeader.vue'

describe('PriceHeader', () => {
  const props = {
    title: 'Preisverlauf Nvidia – vier Handelsplätze, heute',
    preis: 178.42,
    isin: 'US67066G1040',
  }

  it('zeigt den Titel an', () => {
    const wrapper = mount(PriceHeader, { props })
    expect(wrapper.text()).toContain('Preisverlauf Nvidia')
  })

  it('zeigt den formatierten Preis an', () => {
    const wrapper = mount(PriceHeader, { props })
    expect(wrapper.text()).toContain('178.42')
  })

  it('zeigt die ISIN an', () => {
    const wrapper = mount(PriceHeader, { props })
    expect(wrapper.text()).toContain('US67066G1040')
  })

  it('zeigt die Unterzeile nur, wenn sie übergeben wird', () => {
    const wrapper = mount(PriceHeader, { props })
    expect(wrapper.find('.price-header__subtitle').exists()).toBe(false)
  })
})
