import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<string>(localStorage.getItem('theme') || 'dark')

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    applyTheme()
  }

  // Apply on init
  applyTheme()

  watch(theme, () => {
    applyTheme()
  })

  return { theme, toggleTheme }
})
