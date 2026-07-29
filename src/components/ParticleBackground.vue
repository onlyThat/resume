<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const themeStore = useThemeStore()
let particles: Particle[] = []
let mouse = { x: null as number | null, y: null as number | null }
let animationId = 0

function getParticleCount() {
  return window.innerWidth < 768 ? 30 : 60
}

function initParticles(canvas: HTMLCanvasElement) {
  particles = []
  const count = getParticleCount()
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    })
  }
}

function animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
  const color = isDark ? '99, 102, 241' : '79, 70, 229'

  particles.forEach((p, i) => {
    p.x += p.speedX
    p.y += p.speedY
    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${color}, ${p.opacity})`
    ctx.fill()

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - dist / 150)})`
        ctx.lineWidth = 0.5
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        const force = (120 - dist) / 120
        p.x += dx * force * 0.02
        p.y += dy * force * 0.02
      }
    }
  })

  animationId = requestAnimationFrame(() => animate(ctx, canvas))
}

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas)
  animate(ctx, canvas)

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvasRef" id="particles"></canvas>
</template>
