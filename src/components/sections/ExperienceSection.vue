<script setup lang="ts">
import { resumeData } from '../../data/resume'
import { observeElements } from '../../composables/useIntersectionObserver'

observeElements('.experience-card, .achievement-card')

const exp = resumeData.workExperience

function formatResult(result: string): string {
  return result.replace(/(\d+\+?%?)/g, '<span class="metric">$1</span>')
}
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">03.</span>
        <span class="title-text">工作经历</span>
        <span class="title-line"></span>
      </h2>
      <div class="experience-card">
        <div class="exp-header">
          <div class="exp-company">
            <div class="company-icon"><i :class="exp.companyIcon"></i></div>
            <div class="company-info">
              <h3>{{ exp.company }}</h3>
              <span class="exp-role">{{ exp.role }}</span>
            </div>
          </div>
          <div class="exp-date">
            <i class="far fa-calendar-alt"></i>
            {{ exp.period }}
          </div>
        </div>
        <div class="exp-content">
          <div class="exp-section">
            <h4><i class="fas fa-tasks"></i> 工作职责</h4>
            <ul>
              <li v-for="(resp, idx) in exp.responsibilities" :key="idx">{{ resp }}</li>
            </ul>
          </div>
          <div class="exp-section">
            <h4><i class="fas fa-trophy"></i> 核心业绩（STAR法则）</h4>
            <div class="achievement-cards">
              <div v-for="(ach, idx) in exp.achievements" :key="idx" class="achievement-card">
                <div class="achievement-icon"><i :class="ach.icon"></i></div>
                <div class="achievement-content">
                  <h5>{{ ach.title }}</h5>
                  <p class="star-situation"><strong>情境：</strong>{{ ach.situation }}</p>
                  <p class="star-task"><strong>任务：</strong>{{ ach.task }}</p>
                  <p class="star-action"><strong>行动：</strong>{{ ach.action }}</p>
                  <p class="star-result"><strong>成果：</strong><span v-html="formatResult(ach.result)"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
