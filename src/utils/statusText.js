export function formatiereStatus({ marketOpen, lastUpdate }) {
  const datum = new Date(lastUpdate)
  const uhrzeit = datum.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

  if (marketOpen) {
    return `Handel läuft · Stand ${uhrzeit}`
  }

  const tagMonat = datum.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
  return `Markt geschlossen · letzte Daten ${tagMonat}, ${uhrzeit}`
}
