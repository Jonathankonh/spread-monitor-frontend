import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PriceRow from './PriceRow.vue'

describe('PriceRow', () => {
  const props = {
    isin: 'US67066G1040',
    name: 'Nvidia',
    venues: ['gettex', 'ls'],
    preis: 178.42,
    veraenderungProzent: 1.86,
    spreadProzent: 0.83,
  }

  it('zeigt Name und ISIN an', () => {
    const wrapper = mount(PriceRow, { props })
    expect(wrapper.text()).toContain('Nvidia')
    expect(wrapper.text()).toContain('US67066G1040')
  })

  it('zeigt beide Börsen-Badges an', () => {
    const wrapper = mount(PriceRow, { props })
    expect(wrapper.findAll('.price-row__venue-badge')).toHaveLength(2)
  })

  it('formatiert eine positive Veränderung mit Pluszeichen', () => {
    const wrapper = mount(PriceRow, { props })
    expect(wrapper.text()).toContain('+1.86%')
  })

  it('emittiert "select" mit der ISIN beim Klick', async () => {
    const wrapper = mount(PriceRow, { props })
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')[0]).toEqual(['US67066G1040'])
  })

  it('zeigt keine Veränderung an, wenn sie null ist', () => {
    const wrapper = mount(PriceRow, { props: { ...props, veraenderungProzent: null } })
    expect(wrapper.find('.price-row__change').exists()).toBe(false)
  })
})
