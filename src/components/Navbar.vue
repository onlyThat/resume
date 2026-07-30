<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import { resumeData } from '../data/resume'

const themeStore = useThemeStore()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

const sections = computed(() => resumeData.navLinks)

function onScroll() {
  isScrolled.value = window.scrollY > 50
  updateActiveLink()
}

function updateActiveLink() {
  let current = ''
  const sectionElements = document.querySelectorAll('section[id]')
  sectionElements.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop - 100
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id') || ''
    }
  })
  activeSection.value = current
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

function handleDownload() {
  window.print()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav id="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-brand">
      <span class="brand-bracket">{</span>
      <span class="brand-name">ZJ</span>
      <span class="brand-bracket">}</span>
    </div>
    <ul class="nav-links">
      <li v-for="link in sections" :key="link.href">
        <a
            :href="link.href"
            :class="{ active: activeSection === link.href.replace('#', '') }"
            @click="closeMobileMenu"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" aria-label="切换主题" @click="themeStore.toggleTheme">
        <i class="fas fa-moon"></i>
        <i class="fas fa-sun"></i>
      </button>
      <button class="btn-download" aria-label="下载简历" @click="handleDownload">
        <i class="fas fa-download"></i>
      </button>
      <button
          class="nav-toggle"
          :class="{ active: isMobileMenuOpen }"
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
    <ul>
      <li v-for="link in sections" :key="link.href">
        <a :href="link.href" @click="closeMobileMenu">{{ link.label }}</a>
      </li>
    </ul>
  </div>
</template>
