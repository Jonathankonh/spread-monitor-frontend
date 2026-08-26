import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from './BaseCard.vue'

describe('Card', () => {
  it('rendert den übergebenen Inhalt', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Testinhalt' },
    })
    expect(wrapper.text()).toContain('Testinhalt')
  })

  it('hat die Basis-CSS-Klasse für Card-Styling', () => {
    const wrapper = mount(Card)
    expect(wrapper.classes()).toContain('card')
  })
})
