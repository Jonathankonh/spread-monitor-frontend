const API_BASE = 'http://178.105.153.4:3001/api'

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
