import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useTheme } from './useTheme.js'

describe('useTheme', () => {
  beforeEach(async () => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    const { theme } = useTheme()
    theme.value = 'dark'
    await nextTick()
  })

  it('startet standardmäßig mit dark theme', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('dark')
  })

  it('wechselt von dark zu light beim Umschalten', () => {
    const { theme, toggle } = useTheme()
    theme.value = 'dark'
    toggle()
    expect(theme.value).toBe('light')
  })

  it('setzt das data-theme Attribut auf dem html-Element', async () => {
    const { theme } = useTheme()
    theme.value = 'light'
    await nextTick()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('speichert das Theme in localStorage', async () => {
    const { theme } = useTheme()
    theme.value = 'light'
    await nextTick()
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
