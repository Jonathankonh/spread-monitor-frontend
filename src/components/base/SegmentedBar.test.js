import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SegmentedBar from './SegmentedBar.vue'

describe('SegmentedBar', () => {
  it('rendert ein Segment pro Eintrag', () => {
    const wrapper = mount(SegmentedBar, {
      props: {
        segmente: [
          { boerse: 'gettex', anteil: 28 },
          { boerse: 'xetra', anteil: 47 },
          { boerse: 'ls', anteil: 18 },
          { boerse: 'eix', anteil: 7 },
        ],
      },
    })
    expect(wrapper.findAll('.segmented-bar__segment')).toHaveLength(4)
  })

  it('setzt die Breite jedes Segments anhand des Anteils', () => {
    const wrapper = mount(SegmentedBar, {
      props: { segmente: [{ boerse: 'gettex', anteil: 50 }] },
    })
    const segment = wrapper.find('.segmented-bar__segment')
    expect(segment.attributes('style')).toContain('50%')
  })
})
