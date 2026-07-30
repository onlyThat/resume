import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): { target: Ref<HTMLElement | null>; isVisible: Ref<boolean> } {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          isVisible.value = true
        }
      })
    }, defaultOptions)

    if (target.value) {
      target.value.classList.add('fade-in')
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { target, isVisible }
}

export function observeElements(selector: string, options?: IntersectionObserverInit) {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  }

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')

          // Handle skill progress bars
          if (entry.target.classList.contains('skill-card')) {
            const progress = entry.target.querySelector('.skill-progress') as HTMLElement
            if (progress) {
              setTimeout(() => progress.classList.add('animate'), 200)
            }
          }

          // Handle number counters
          if (entry.target.classList.contains('highlight-card')) {
            const numberEl = entry.target.querySelector('.highlight-number') as HTMLElement
            if (numberEl) animateNumber(numberEl)
          }
        }
      })
    }, defaultOptions)

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // 兜底：3秒后强制显示所有未被观察到的元素，避免内容始终不可见
    setTimeout(() => {
      elements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible')
        }
      })
    }, 3000)

    onUnmounted(() => {
      observer.disconnect()
    })
  })
}

function animateNumber(element: HTMLElement) {
  const target = parseInt(element.getAttribute('data-count') || '0')
  const duration = 2000
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    element.textContent = Math.floor(target * eased).toString()

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target + '+'
    }
  }

  requestAnimationFrame(update)
}
