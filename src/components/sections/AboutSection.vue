<script setup lang="ts">
import { onMounted } from 'vue'
import { resumeData } from '../../data/resume'
import { observeElements } from '../../composables/useIntersectionObserver'

observeElements(
  '.section-title, .about-text, .about-details, .highlight-card, .detail-card'
)

const info = resumeData.personalInfo
const education = resumeData.education
const goals = resumeData.goalTags
</script>

<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">01.</span>
        <span class="title-text">关于我</span>
        <span class="title-line"></span>
      </h2>
      <div class="about-grid">
        <div class="about-text">
          <p class="about-intro">
            拥有<strong>{{ info.experience }}年前端开发经验</strong>的工程师，专注于<strong>企业级中后台系统</strong>与<strong>低代码平台</strong>的研发。擅长基于Vue3生态体系构建高性能、可维护的前端应用，在零代码平台、数据分析平台等复杂业务场景中积累了丰富的实践经验。
          </p>
          <p class="about-detail">
            具备从0到1搭建项目架构的能力，熟练运用TypeScript保障代码质量，善于通过组件化与模块化思维提升开发效率。注重团队协作与技术分享，持续关注前端前沿技术发展趋势。
          </p>
          <div class="about-highlights">
            <div class="highlight-card">
              <div class="highlight-icon"><i class="fas fa-code-branch"></i></div>
              <div class="highlight-number" data-count="5">0</div>
              <div class="highlight-label">年开发经验</div>
            </div>
            <div class="highlight-card">
              <div class="highlight-icon"><i class="fas fa-project-diagram"></i></div>
              <div class="highlight-number" data-count="6">0</div>
              <div class="highlight-label">个核心项目</div>
            </div>
            <div class="highlight-card">
              <div class="highlight-icon"><i class="fas fa-layer-group"></i></div>
              <div class="highlight-number" data-count="15">0</div>
              <div class="highlight-label">项技术栈</div>
            </div>
          </div>
        </div>
        <div class="about-details">
          <div class="detail-card education">
            <h3><i class="fas fa-graduation-cap"></i> 教育背景</h3>
            <div class="timeline-mini">
              <div v-for="edu in education" :key="edu.school" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ edu.period }}</span>
                  <h4>{{ edu.school }}</h4>
                  <p>{{ edu.major }} <span class="tag-inline">{{ edu.degree }}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-card career-goal">
            <h3><i class="fas fa-bullseye"></i> 职业目标</h3>
            <div class="goal-tags">
              <span v-for="goal in goals" :key="goal.text" class="goal-tag">
                <i :class="goal.icon"></i> {{ goal.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
