<script setup lang="ts">
import { resumeData } from '../../data/resume'

const info = resumeData.personalInfo
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="brand-bracket">{</span>
          <span class="brand-name">ZJ</span>
          <span class="brand-bracket">}</span>
        </div>
        <p class="footer-text">用心构建每一个像素，用技术创造价值</p>
        <div class="footer-social">
          <a :href="'tel:' + info.phone" aria-label="Phone"><i class="fas fa-phone-alt"></i></a>
          <a :href="'mailto:' + info.email" aria-label="Email"><i class="fas fa-envelope"></i></a>
        </div>
        <p class="footer-copyright">&copy; 2025 {{ info.name }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
