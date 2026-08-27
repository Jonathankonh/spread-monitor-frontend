import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VenueActivityBar from './VenueActivityBar.vue'

describe('VenueActivityBar', () => {
  const daten = { gettex: 28, xetra: 47, ls: 17, eix: 8 }

  it('zeigt eine Zeile pro Börse', () => {
    const wrapper = mount(VenueActivityBar, { props: { daten } })
    expect(wrapper.findAll('.venue-activity__row')).toHaveLength(4)
  })

  it('zeigt den gerundeten Prozentwert', () => {
    const wrapper = mount(VenueActivityBar, { props: { daten } })
    expect(wrapper.text()).toContain('28 %')
  })
})
