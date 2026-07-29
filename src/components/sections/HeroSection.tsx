import { resumeData } from '../../data/resume';
import TypeWriter from '../TypeWriter';

export default function HeroSection() {
  const { personalInfo, typeWriterTexts } = resumeData;

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-greeting">
          <span className="line" />
          <span className="greeting-text">你好，我是</span>
        </div>
        <h1 className="hero-name">
          <span className="name-cn">{personalInfo.name}</span>
          <span className="name-en">{personalInfo.nameEn}</span>
        </h1>
        <TypeWriter texts={typeWriterTexts} waitTime={2000} />
        <p className="hero-motto">{personalInfo.motto}</p>
        <div className="hero-info">
          <span className="info-item">
            <i className="fas fa-map-marker-alt" /> {personalInfo.city}
          </span>
          <span className="info-item">
            <i className="fas fa-briefcase" /> {personalInfo.experience}经验
          </span>
          <span className="info-item">
            <i className="fas fa-graduation-cap" /> 本科在读
          </span>
          {personalInfo.salary && (
            <span className="info-item">
              <i className="fas fa-money-bill-wave" /> {personalInfo.salary}
            </span>
          )}
          <span className="info-item status-available">
            <i className="fas fa-circle" /> {personalInfo.status}
          </span>
        </div>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            <i className="fas fa-envelope" /> 联系我
          </a>
          <a href="#projects" className="btn btn-outline">
            <i className="fas fa-code" /> 查看项目
          </a>
          <a href="#jd-matcher" className="btn btn-ghost">
            <i className="fas fa-magic" /> JD匹配
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="code-window">
          <div className="code-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="code-title">developer.ts</span>
          </div>
          <div className="code-body">
            <pre>
              <code>
                <span className="keyword">interface</span>{' '}
                <span className="type">Developer</span>
                {' {\n'}
                {'  '}
                <span className="property">name</span>:{' '}
                <span className="string">"{personalInfo.name}"</span>;{'\n'}
                {'  '}
                <span className="property">role</span>:{' '}
                <span className="string">"{personalInfo.position}"</span>;{'\n'}
                {'  '}
                <span className="property">experience</span>:{' '}
                <span className="number">5</span>{' '}
                <span className="comment">// 年</span>;{'\n'}
                {'  '}
                <span className="property">location</span>:{' '}
                <span className="string">"{personalInfo.city}"</span>;{'\n'}
                {'  '}
                <span className="property">skills</span>:{' '}
                <span className="keyword">readonly</span> [{'\n'}
                {'    '}
                <span className="string">"Vue3"</span>,{' '}
                <span className="string">"TypeScript"</span>,{'\n'}
                {'    '}
                <span className="string">"React"</span>,{' '}
                <span className="string">"Vite"</span>
                {'\n'}{'  '}]{'\n'}
                {'  '}
                <span className="property">focus</span>:{' '}
                <span className="string">"企业级中后台系统"</span>;{'\n'}
                {'  '}
                <span className="method">createValue</span>():{' '}
                <span className="type">Promise</span>
                {'<'}
                <span className="type">Success</span>
                {'>'}
                ;{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
