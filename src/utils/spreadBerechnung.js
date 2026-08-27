function rundeAuf15Minuten(isoZeit) {
  const datum = new Date(isoZeit)
  const minuten = datum.getMinutes()
  const gerundet = Math.floor(minuten / 15) * 15
  datum.setMinutes(gerundet, 0, 0)
  return datum.toISOString()
}

export function berechneSpreadUeberZeit(rohdaten) {
  const gruppiert = rohdaten.map((d) => ({ ...d, bucket_start: rundeAuf15Minuten(d.bucket_start) }))
  const zeitpunkte = [...new Set(gruppiert.map((d) => d.bucket_start))].sort()

  return zeitpunkte.map((zeit) => {
    const preise = gruppiert
      .filter((d) => d.bucket_start === zeit)
      .map((d) => d.close)
      .filter((p) => p != null)

    if (preise.length < 2) {
      return { zeit, spreadProzent: null }
    }

    const max = Math.max(...preise)
    const min = Math.min(...preise)
    const spreadProzent = ((max - min) / min) * 100

    return { zeit, spreadProzent: Number(spreadProzent.toFixed(3)) }
  })
}
