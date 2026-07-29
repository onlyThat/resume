<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'
import Navbar from './components/Navbar.vue'

const showBackToTop = ref(false)

function onScroll() {
  showBackToTop.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <ParticleBackground />
  <Navbar />
  <router-view />
  <button
    id="backToTop"
    class="back-to-top"
    :class="{ visible: showBackToTop }"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <i class="fas fa-chevron-up"></i>
  </button>
</template>
