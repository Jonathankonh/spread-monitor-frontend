import { describe, it, expect } from 'vitest'
import { berechneSpreadUeberZeit } from './spreadBerechnung.js'

describe('berechneSpreadUeberZeit', () => {
  it('berechnet den Spread aus min/max innerhalb desselben 15-Minuten-Fensters', () => {
    const rohdaten = [
      { boerse: 'gettex', bucket_start: '2026-08-27T09:03:00Z', close: 100 },
      { boerse: 'xetra', bucket_start: '2026-08-27T09:07:00Z', close: 102 },
    ]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis).toHaveLength(1)
    expect(ergebnis[0].spreadProzent).toBeCloseTo(2, 1)
  })

  it('gibt null zurück, wenn im Zeitfenster nur eine Börse Daten hat', () => {
    const rohdaten = [{ boerse: 'gettex', bucket_start: '2026-08-27T09:03:00Z', close: 100 }]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis[0].spreadProzent).toBeNull()
  })

  it('sortiert die Zeitfenster aufsteigend', () => {
    const rohdaten = [
      { boerse: 'gettex', bucket_start: '2026-08-27T10:00:00Z', close: 100 },
      { boerse: 'gettex', bucket_start: '2026-08-27T09:00:00Z', close: 100 },
    ]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(new Date(ergebnis[0].zeit).getTime()).toBeLessThan(new Date(ergebnis[1].zeit).getTime())
  })

  it('gruppiert Zeitpunkte im selben 15-Minuten-Fenster zusammen', () => {
    const rohdaten = [
      { boerse: 'gettex', bucket_start: '2026-08-27T09:01:00Z', close: 100 },
      { boerse: 'xetra', bucket_start: '2026-08-27T09:14:00Z', close: 101 },
    ]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis).toHaveLength(1)
  })
})
