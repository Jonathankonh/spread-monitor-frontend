import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SpreadRankingRow from './SpreadRankingRow.vue'

describe('SpreadRankingRow', () => {
  const props = {
    name: 'NVIDIA Corp.',
    boerseA: 'gettex',
    boerseB: 'LS Exchange',
    spreadProzent: 0.83,
    maxSpread: 1.0,
  }

  it('zeigt den Namen an', () => {
    const wrapper = mount(SpreadRankingRow, { props })
    expect(wrapper.text()).toContain('NVIDIA Corp.')
  })

  it('zeigt das Börsen-Paar an', () => {
    const wrapper = mount(SpreadRankingRow, { props })
    expect(wrapper.text()).toContain('gettex')
    expect(wrapper.text()).toContain('LS Exchange')
  })

  it('berechnet die Balkenbreite relativ zum Maximalwert', () => {
    const wrapper = mount(SpreadRankingRow, { props })
    const balken = wrapper.find('.spread-row__bar-fill')
    expect(balken.attributes('style')).toContain('83%')
  })
})
