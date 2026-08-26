import { describe, it, expect } from 'vitest'
import { formatiereStatus } from './statusText.js'

describe('formatiereStatus', () => {
  it('zeigt "Handel läuft" mit Uhrzeit, wenn Markt offen', () => {
    const text = formatiereStatus({ marketOpen: true, lastUpdate: '2026-08-26T09:41:00Z' })
    expect(text).toContain('Handel läuft')
  })

  it('zeigt "Markt geschlossen" mit letztem Datenstand, wenn Markt zu', () => {
    const text = formatiereStatus({ marketOpen: false, lastUpdate: '2026-08-22T17:35:00Z' })
    expect(text).toContain('Markt geschlossen')
  })
})
