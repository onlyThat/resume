<script setup lang="ts">
import { resumeData } from '../../data/resume'
import TypeWriter from '../TypeWriter.vue'

const info = resumeData.personalInfo
</script>

<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <div class="hero-greeting">
        <span class="line"></span>
        <span class="greeting-text">你好，我是</span>
      </div>
      <h1 class="hero-name">
        <span class="name-cn">{{ info.name }}</span>
        <span class="name-en">{{ info.nameEn }}</span>
      </h1>
      <div class="hero-title">
        <span class="typed-prefix">&gt;&gt; </span>
        <TypeWriter :texts="resumeData.typeWriterTexts" :wait="2000" />
        <span class="cursor">|</span>
      </div>
      <p class="hero-motto">"{{ info.motto }}"</p>
      <div class="hero-info">
        <span class="info-item"><i class="fas fa-map-marker-alt"></i> {{ info.city }}</span>
        <span class="info-item"><i class="fas fa-briefcase"></i> {{ info.experience }}年经验</span>
        <span class="info-item"><i class="fas fa-graduation-cap"></i> {{ info.education }}</span>
        <span class="info-item"><i class="fas fa-money-bill-wave"></i> {{ info.salary }}</span>
        <span class="info-item status-available"><i class="fas fa-circle"></i> {{ info.status }}</span>
      </div>
      <div class="hero-actions">
        <a href="#contact" class="btn btn-primary">
          <i class="fas fa-envelope"></i> 联系我
        </a>
        <a href="#projects" class="btn btn-outline">
          <i class="fas fa-code"></i> 查看项目
        </a>
        <a href="#jd-matcher" class="btn btn-ghost">
          <i class="fas fa-magic"></i> JD匹配
        </a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="code-window">
        <div class="code-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="code-title">developer.ts</span>
        </div>
        <div class="code-body">
          <pre><code><span class="keyword">interface</span> <span class="type">Developer</span> {
  <span class="property">name</span>: <span class="string">"周建"</span>;
  <span class="property">role</span>: <span class="string">"高级前端工程师"</span>;
  <span class="property">experience</span>: <span class="number">5</span> <span class="comment">// 年</span>;
  <span class="property">location</span>: <span class="string">"天津"</span>;
  <span class="property">skills</span>: <span class="keyword">readonly</span> [
    <span class="string">"Vue3"</span>, <span class="string">"TypeScript"</span>,
    <span class="string">"React"</span>, <span class="string">"Vite"</span>
  ];
  <span class="property">focus</span>: <span class="string">"企业级中后台系统"</span>;
  <span class="method">createValue</span>(): <span class="type">Promise</span>&lt;<span class="type">Success</span>&gt;;
}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>
