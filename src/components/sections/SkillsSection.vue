<script setup lang="ts">
import { resumeData } from '../../data/resume'
import { observeElements } from '../../composables/useIntersectionObserver'

observeElements('.skill-category, .tech-cloud')

const categories = resumeData.skillCategories
const techTags = resumeData.techTags
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">02.</span>
        <span class="title-text">专业技能</span>
        <span class="title-line"></span>
      </h2>

      <div class="skills-categories">
        <div v-for="category in categories" :key="category.title" class="skill-category">
          <h3 class="category-title"><i :class="category.icon"></i> {{ category.title }}</h3>
          <div class="skills-grid">
            <div v-for="skill in category.skills" :key="skill.name" class="skill-card" :data-level="skill.level">
              <div class="skill-icon"><i :class="skill.icon"></i></div>
              <div class="skill-info">
                <h3>{{ skill.name }}</h3>
                <span class="skill-level" :class="skill.levelClass">{{ skill.levelText }}</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ '--target-width': skill.level + '%' }"></div>
              </div>
              <p class="skill-detail">{{ skill.detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="skills-tech">
        <h3 class="tech-title"><i class="fas fa-th"></i> 技术栈全景</h3>
        <div class="tech-cloud">
          <span
            v-for="tag in techTags"
            :key="tag.name"
            class="tech-tag"
            :class="{ highlight: tag.highlight }"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
