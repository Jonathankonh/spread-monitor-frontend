export function berechneSpreadUeberZeit(rohdaten) {
  const zeitpunkte = [...new Set(rohdaten.map((d) => d.bucket_start))].sort()

  return zeitpunkte.map((zeit) => {
    const preise = rohdaten
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
