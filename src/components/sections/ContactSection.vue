<script setup lang="ts">
import { ref } from 'vue'
import { resumeData } from '../../data/resume'
import { observeElements } from '../../composables/useIntersectionObserver'

observeElements('.contact-info, .contact-form-wrapper')

const contactMethods = resumeData.contactMethods
const formName = ref('')
const formEmail = ref('')
const formMessage = ref('')

function handleSubmit() {
  showToast('感谢您的留言！我会尽快回复您。')
  formName.value = ''
  formEmail.value = ''
  formMessage.value = ''
}

function showToast(message: string) {
  const toast = document.createElement('div')
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 32px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    border-radius: 12px;
    font-size: 0.9rem;
    z-index: 10000;
    animation: slideDown 0.3s ease;
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
  `
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease forwards'
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">06.</span>
        <span class="title-text">联系我</span>
        <span class="title-line"></span>
      </h2>
      <div class="contact-grid">
        <div class="contact-info">
          <h3>期待与您合作</h3>
          <p>如果您有合适的前端岗位机会或项目合作需求，欢迎随时联系我。我目前在职，对新的机会持开放态度。</p>
          <div class="contact-methods">
            <component
              v-for="method in contactMethods"
              :key="method.label"
              :is="method.href ? 'a' : 'div'"
              :href="method.href"
              class="contact-method"
            >
              <div class="method-icon"><i :class="method.icon"></i></div>
              <div class="method-info">
                <span class="method-label">{{ method.label }}</span>
                <span class="method-value">{{ method.value }}</span>
              </div>
            </component>
          </div>
        </div>
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input id="name" v-model="formName" type="text" placeholder=" " required />
              <label for="name">您的姓名</label>
            </div>
            <div class="form-group">
              <input id="email" v-model="formEmail" type="email" placeholder=" " required />
              <label for="email">电子邮箱</label>
            </div>
            <div class="form-group">
              <textarea id="message" v-model="formMessage" rows="5" placeholder=" " required></textarea>
              <label for="message">留言内容</label>
            </div>
            <button type="submit" class="btn btn-primary btn-full">
              <i class="fas fa-paper-plane"></i> 发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
