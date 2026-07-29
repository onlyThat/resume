<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { resumeData } from '../../data/resume'

const jdInput = ref('')
const showResult = ref(false)
const scoreValue = ref(0)
const matchedSkills = ref<string[]>([])
const missingSkills = ref<string[]>([])
const suggestions = ref<string[]>([])

const commonJDSkills = [
  'node', 'nodejs', 'next.js', 'nuxt', 'ssr', '微前端', 'micro-frontend',
  'docker', 'ci/cd', 'jenkins', 'nginx',
  'jest', 'vitest', '单元测试', 'unit test', 'cypress', 'e2e',
  'graphql', 'websocket', 'pwa',
  'flutter', 'dart', 'electron', 'tauri',
  'tailwind', 'windicss', 'styled-components',
  'docker', 'kubernetes', 'k8s',
  '敏捷开发', 'agile', 'scrum',
  '设计模式', 'design patterns',
  '算法', 'algorithm', '数据结构',
  'linux', 'shell',
  '后端', 'java', 'python', 'go', 'node',
  '数据库', 'mysql', 'mongodb', 'redis',
]

function analyze() {
  const jdText = jdInput.value.trim().toLowerCase()
  if (!jdText) {
    showToast('请先粘贴职位描述内容')
    return
  }

  const matched: string[] = []
  const missing: string[] = []

  resumeData.jdResumeSkills.forEach((skill) => {
    if (jdText.includes(skill.toLowerCase())) {
      matched.push(skill)
    }
  })

  commonJDSkills.forEach((skill) => {
    if (jdText.includes(skill.toLowerCase()) && !matched.includes(skill)) {
      missing.push(skill)
    }
  })

  const totalKeywords = matched.length + missing.length
  const score = totalKeywords > 0 ? Math.round((matched.length / totalKeywords) * 100) : 0

  matchedSkills.value = matched
  missingSkills.value = missing
  scoreValue.value = score
  suggestions.value = generateSuggestions(matched, missing, jdText)
  showResult.value = true

  nextTick(() => {
    const resultArea = document.getElementById('jdResult')
    if (resultArea) {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

function generateSuggestions(matched: string[], missing: string[], jdText: string): string[] {
  const result: string[] = []

  if (matched.length === 0) {
    result.push('JD中未检测到明确的技术关键词，建议仔细阅读岗位要求')
  }

  if (missing.length > 0) {
    result.push(`建议在简历中补充以下技能的学习或项目经验：${missing.slice(0, 3).join('、')}`)
  }

  if (jdText.includes('中后台') || jdText.includes('admin') || jdText.includes('后台管理')) {
    result.push('您的中后台系统开发经验与此岗位高度匹配，建议突出零代码平台和数据分析平台的项目经验')
  }

  if (jdText.includes('低代码') || jdText.includes('零代码') || jdText.includes('no-code')) {
    result.push('您在零代码平台的开发经验是核心优势，建议详细描述技术架构和业务价值')
  }

  if (jdText.includes('数据可视化') || jdText.includes('echarts') || jdText.includes('大屏')) {
    result.push('建议突出ECharts和Antv的使用经验，以及数据分析平台的可视化成果')
  }

  if (jdText.includes('架构') || jdText.includes('资深') || jdText.includes('高级')) {
    result.push('建议强调从0到1搭建项目框架的经验，以及技术选型和工程化实践')
  }

  if (matched.length >= 5) {
    result.push('技能匹配度较高，建议投递时附上项目作品链接或GitHub地址')
  }

  if (result.length === 0) {
    result.push('整体匹配情况良好，建议根据JD调整简历中项目经验的描述重点')
  }

  return result
}

function showToast(message: string) {
  const toast = document.createElement('div')
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
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
  }, 2000)
}

function getScoreColor(): string {
  if (scoreValue.value >= 80) return '#22c55e'
  if (scoreValue.value >= 60) return '#f59e0b'
  return '#ef4444'
}

const circumference = 2 * Math.PI * 45
</script>

<template>
  <section id="jd-matcher" class="section">
    <div class="container">
      <h2 class="section-title">
        <span class="title-number">05.</span>
        <span class="title-text">JD智能匹配</span>
        <span class="title-line"></span>
      </h2>
      <div class="jd-matcher-wrapper">
        <div class="jd-input-area">
          <div class="jd-header">
            <h3><i class="fas fa-magic"></i> 粘贴职位描述，智能分析匹配度</h3>
            <p>将目标岗位的JD粘贴到下方，系统将自动分析技能匹配情况并给出优化建议</p>
          </div>
          <textarea
            v-model="jdInput"
            placeholder="请粘贴职位描述（JD）内容...

例如：
1. 熟练掌握Vue3、TypeScript等前端技术
2. 有中后台系统开发经验
3. 熟悉前端工程化、组件化开发
..."
          ></textarea>
          <button class="btn btn-primary" @click="analyze">
            <i class="fas fa-search"></i> 开始分析
          </button>
        </div>
        <div v-if="showResult" id="jdResult" class="jd-result-area">
          <div class="match-score">
            <div class="score-circle">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#a855f7" />
                  </linearGradient>
                </defs>
                <circle class="score-bg" cx="50" cy="50" r="45"></circle>
                <circle
                  class="score-fill"
                  cx="50"
                  cy="50"
                  r="45"
                  :stroke="getScoreColor()"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - (scoreValue / 100) * circumference"
                ></circle>
              </svg>
              <span class="score-text">{{ scoreValue }}%</span>
            </div>
            <span class="score-label">匹配度</span>
          </div>
          <div class="match-details">
            <div class="match-section" id="matchedSkills">
              <h4><i class="fas fa-check-circle"></i> 已匹配技能</h4>
              <div class="match-tags">
                <span v-for="skill in matchedSkills" :key="skill" class="match-tag matched">{{ skill }}</span>
              </div>
            </div>
            <div class="match-section" id="missingSkills">
              <h4><i class="fas fa-exclamation-circle"></i> 待补充技能</h4>
              <div class="match-tags">
                <span v-for="skill in missingSkills" :key="skill" class="match-tag missing">{{ skill }}</span>
              </div>
            </div>
            <div class="match-section" id="suggestions">
              <h4><i class="fas fa-lightbulb"></i> 优化建议</h4>
              <ul>
                <li v-for="(s, idx) in suggestions" :key="idx">{{ s }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
