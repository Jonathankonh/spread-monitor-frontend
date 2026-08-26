import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar.vue'

describe('ProgressBar', () => {
  it('berechnet die Füllbreite korrekt aus value und max', () => {
    const wrapper = mount(ProgressBar, { props: { value: 8, max: 12 } })
    const fill = wrapper.find('.progress-bar__fill')
    expect(fill.attributes('style')).toContain('66.666')
  })

  it('begrenzt die Füllung auf maximal 100%, auch bei value > max', () => {
    const wrapper = mount(ProgressBar, { props: { value: 20, max: 12 } })
    const fill = wrapper.find('.progress-bar__fill')
    expect(fill.attributes('style')).toContain('100%')
  })
})
