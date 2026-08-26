import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  it('zeigt das Label an', () => {
    const wrapper = mount(Badge, { props: { label: 'gettex' } })
    expect(wrapper.text()).toContain('gettex')
  })

  it('wendet die Börsen-spezifische Farbklasse an', () => {
    const wrapper = mount(Badge, { props: { label: 'gettex', boerse: 'gettex' } })
    expect(wrapper.classes()).toContain('badge--gettex')
  })
})
