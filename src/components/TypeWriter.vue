<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  texts: string[]
  wait?: number
}>(), {
  wait: 2500,
})

const displayText = ref('')
let textIndex = 0
let charIndex = 0
let isDeleting = false
let timeoutId = 0

function type() {
  const currentText = props.texts[textIndex]
  const speed = isDeleting ? 40 : 80

  if (isDeleting) {
    charIndex--
  } else {
    charIndex++
  }

  displayText.value = currentText.substring(0, charIndex)

  if (!isDeleting && charIndex === currentText.length) {
    timeoutId = window.setTimeout(() => {
      isDeleting = true
      type()
    }, props.wait)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % props.texts.length
  }

  timeoutId = window.setTimeout(() => type(), speed)
}

onMounted(() => {
  type()
})

onUnmounted(() => {
  clearTimeout(timeoutId)
})
</script>

<template>
  <span class="typed-text">{{ displayText }}</span>
</template>
