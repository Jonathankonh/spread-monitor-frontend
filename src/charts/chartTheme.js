export const boersenFarben = {
  gettex: '#8b5cf6',
  xetra: '#3b82f6',
  ls: '#22c55e',
  eix: '#f97316',
}

export function holeBoersenFarbe(boerse) {
  return boersenFarben[boerse] || '#9a9aa2'
}

export function erzeugeVerlaufsgradient(ctx, chartArea, farbHex) {
  if (!chartArea) return farbHex

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
  gradient.addColorStop(0, hexZuRgba(farbHex, 0.25))
  gradient.addColorStop(1, hexZuRgba(farbHex, 0))
  return gradient
}

function hexZuRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const basisLinienOptionen = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1a1a1f',
      titleColor: '#f5f5f7',
      bodyColor: '#f5f5f7',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#9a9aa2', maxTicksLimit: 6 },
    },
    y: {
      grid: { color: 'rgba(154,154,162,0.1)' },
      ticks: { color: '#9a9aa2' },
    },
  },
  elements: {
    point: { radius: 0, hoverRadius: 4 },
    line: { tension: 0.3 },
  },
}
