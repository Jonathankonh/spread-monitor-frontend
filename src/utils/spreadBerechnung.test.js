import { describe, it, expect } from 'vitest'
import { berechneSpreadUeberZeit } from './spreadBerechnung.js'

describe('berechneSpreadUeberZeit', () => {
  it('berechnet den Spread aus min/max pro Zeitpunkt', () => {
    const rohdaten = [
      { boerse: 'gettex', bucket_start: 't1', close: 100 },
      { boerse: 'xetra', bucket_start: 't1', close: 102 },
    ]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis[0].spreadProzent).toBeCloseTo(2, 1)
  })

  it('gibt null zurück, wenn nur eine Börse Daten hat', () => {
    const rohdaten = [{ boerse: 'gettex', bucket_start: 't1', close: 100 }]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis[0].spreadProzent).toBeNull()
  })

  it('sortiert die Zeitpunkte aufsteigend', () => {
    const rohdaten = [
      { boerse: 'gettex', bucket_start: 't2', close: 100 },
      { boerse: 'gettex', bucket_start: 't1', close: 100 },
    ]
    const ergebnis = berechneSpreadUeberZeit(rohdaten)
    expect(ergebnis.map((r) => r.zeit)).toEqual(['t1', 't2'])
  })
})
