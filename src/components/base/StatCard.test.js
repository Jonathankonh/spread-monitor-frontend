import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatCard from './StatCard.vue'

describe('StatCard', () => {
  it('zeigt den übergebenen Wert an', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Größter Spread', value: '0,83', unit: '%' },
    })
    expect(wrapper.text()).toContain('0,83')
    expect(wrapper.text()).toContain('%')
  })

  it('zeigt das übergebene Label an', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Größter Spread', value: '0,83' },
    })
    expect(wrapper.text()).toContain('Größter Spread')
  })

  it('zeigt Zusatzinhalt über den Slot, wenn vorhanden', () => {
    const wrapper = mount(StatCard, {
      props: { label: 'Test', value: '1' },
      slots: { default: 'NVIDIA Corp.' },
    })
    expect(wrapper.text()).toContain('NVIDIA Corp.')
  })
})
