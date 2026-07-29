<script setup lang="ts">
import { resumeData } from '../../data/resume'
import { observeElements } from '../../composables/useIntersectionObserver'

observeElements('.project-card')

const projects = resumeData.projects
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">04.</span>
        <span class="title-text">项目经验</span>
        <span class="title-line"></span>
      </h2>
      <div class="projects-grid">
        <div
          v-for="project in projects"
          :key="project.name"
          class="project-card"
          :class="{ featured: project.featured }"
        >
          <div v-if="project.badge" class="project-badge">{{ project.badge }}</div>
          <div class="project-header">
            <div class="project-icon"><i :class="project.icon"></i></div>
            <span class="project-date">{{ project.period }}</span>
          </div>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-role">{{ project.role }}</p>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-duties">
            <ul>
              <li v-for="(duty, idx) in project.duties" :key="idx">{{ duty }}</li>
            </ul>
          </div>
          <div class="project-tech">
            <span v-for="tag in project.techTags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
