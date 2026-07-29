import { useCallback, useRef, useState } from 'react';
import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface MatchResult {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: string[];
}

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
];

function generateSuggestions(matched: string[], missing: string[], jdText: string): string[] {
  const suggestions: string[] = [];

  if (matched.length === 0) {
    suggestions.push('JD中未检测到明确的技术关键词，建议仔细阅读岗位要求');
  }

  if (missing.length > 0) {
    suggestions.push(
      `建议在简历中补充以下技能的学习或项目经验：${missing.slice(0, 3).join('、')}`
    );
  }

  if (jdText.includes('中后台') || jdText.includes('admin') || jdText.includes('后台管理')) {
    suggestions.push(
      '您的中后台系统开发经验与此岗位高度匹配，建议突出零代码平台和数据分析平台的项目经验'
    );
  }

  if (jdText.includes('低代码') || jdText.includes('零代码') || jdText.includes('no-code')) {
    suggestions.push(
      '您在零代码平台的开发经验是核心优势，建议详细描述技术架构和业务价值'
    );
  }

  if (jdText.includes('数据可视化') || jdText.includes('echarts') || jdText.includes('大屏')) {
    suggestions.push(
      '建议突出ECharts和Antv的使用经验，以及数据分析平台的可视化成果'
    );
  }

  if (jdText.includes('架构') || jdText.includes('资深') || jdText.includes('高级')) {
    suggestions.push(
      '建议强调从0到1搭建项目框架的经验，以及技术选型和工程化实践'
    );
  }

  if (matched.length >= 5) {
    suggestions.push('技能匹配度较高，建议投递时附上项目作品链接或GitHub地址');
  }

  if (suggestions.length === 0) {
    suggestions.push('整体匹配情况良好，建议根据JD调整简历中项目经验的描述重点');
  }

  return suggestions;
}

function showToast(message: string) {
  const toast = document.createElement('div');
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
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

export default function JDMatcherSection() {
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const scoreCircleRef = useRef<SVGCircleElement>(null);
  const { ref: inputRef, isVisible: inputVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: resultRef, isVisible: resultVisible } = useIntersectionObserver<HTMLDivElement>();

  const analyze = useCallback(() => {
    const text = jdText.trim().toLowerCase();
    if (!text) {
      showToast('请先粘贴职位描述内容');
      return;
    }

    const matched: string[] = [];
    const missing: string[] = [];

    resumeData.jdSkills.forEach((skill) => {
      if (text.includes(skill.toLowerCase())) {
        matched.push(skill);
      }
    });

    commonJDSkills.forEach((skill) => {
      if (text.includes(skill.toLowerCase()) && !matched.includes(skill)) {
        missing.push(skill);
      }
    });

    const totalKeywords = matched.length + missing.length;
    const score = totalKeywords > 0 ? Math.round((matched.length / totalKeywords) * 100) : 0;
    const suggestions = generateSuggestions(matched, missing, text);

    setResult({ score, matched, missing, suggestions });

    // Animate score number
    const duration = 1500;
    const startTime = performance.now();
    const animateScore = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScoreDisplay(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animateScore);
    };
    requestAnimationFrame(animateScore);
  }, [jdText]);

  const circumference = 2 * Math.PI * 45;
  const scoreColor =
    result && result.score >= 80
      ? '#22c55e'
      : result && result.score >= 60
        ? '#f59e0b'
        : result
          ? '#ef4444'
          : 'url(#scoreGradient)';
  const dashOffset = result
    ? circumference - (result.score / 100) * circumference
    : circumference;

  return (
    <section id="jd-matcher" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">05.</span>
          <span className="title-text">JD智能匹配</span>
          <span className="title-line" />
        </h2>
        <div className="jd-matcher-wrapper">
          <div
            ref={inputRef}
            className={`jd-input-area fade-in${inputVisible ? ' visible' : ''}`}
          >
            <div className="jd-header">
              <h3>
                <i className="fas fa-magic" /> 粘贴职位描述，智能分析匹配度
              </h3>
              <p>将目标岗位的JD粘贴到下方，系统将自动分析技能匹配情况并给出优化建议</p>
            </div>
            <textarea
              id="jdInput"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder={`请粘贴职位描述（JD）内容...\n\n例如：\n1. 熟练掌握Vue3、TypeScript等前端技术\n2. 有中后台系统开发经验\n3. 熟悉前端工程化、组件化开发\n...`}
            />
            <button className="btn btn-primary" onClick={analyze}>
              <i className="fas fa-search" /> 开始分析
            </button>
          </div>
          <div
            ref={resultRef}
            className={`jd-result-area fade-in${resultVisible ? ' visible' : ''}`}
            style={{ display: result ? 'block' : 'none' }}
          >
            <div className="match-score">
              <div className="score-circle">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <circle className="score-bg" cx="50" cy="50" r="45" />
                  <circle
                    ref={scoreCircleRef}
                    className="score-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={scoreColor}
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset: dashOffset,
                    }}
                  />
                </svg>
                <span className="score-text">{scoreDisplay}%</span>
              </div>
              <span className="score-label">匹配度</span>
            </div>
            {result && (
              <div className="match-details">
                <div className="match-section">
                  <h4>
                    <i className="fas fa-check-circle" /> 已匹配技能
                  </h4>
                  <div className="match-tags">
                    {result.matched.map((s) => (
                      <span key={s} className="match-tag matched">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="match-section">
                  <h4>
                    <i className="fas fa-exclamation-circle" /> 待补充技能
                  </h4>
                  <div className="match-tags">
                    {result.missing.map((s) => (
                      <span key={s} className="match-tag missing">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="match-section" id="suggestions">
                  <h4>
                    <i className="fas fa-lightbulb" /> 优化建议
                  </h4>
                  <ul>
                    {result.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
