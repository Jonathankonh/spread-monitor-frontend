const API_BASE = 'https://spread-monitor-backend.duckdns.org/api'

export async function holeAktuellePreise() {
  const antwort = await fetch(`${API_BASE}/aktuelle-preise`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeMeistgehandelt() {
  const antwort = await fetch(`${API_BASE}/meistgehandelt`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeVerlauf(isin) {
  const antwort = await fetch(`${API_BASE}/verlauf/${isin}`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeSpreads() {
  const antwort = await fetch(`${API_BASE}/spreads`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeTagesveraenderung() {
  const antwort = await fetch(`${API_BASE}/tagesveraenderung`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeSparklines(isins) {
  const antwort = await fetch(`${API_BASE}/sparklines?isins=${isins.join(',')}`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeHandelsaktivitaet() {
  const antwort = await fetch(`${API_BASE}/handelsaktivitaet`)
  if (!antwort.ok) throw new Error('Serverfehler: ' + antwort.status)
  return antwort.json()
}

export async function holeLetztesUpdate() {
  const daten = await holeAktuellePreise()
  if (daten.length === 0) return null
  const zeitpunkte = daten.map((d) => new Date(d.bucket_start).getTime())
  return new Date(Math.max(...zeitpunkte))
}
