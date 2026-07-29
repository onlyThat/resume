import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useNumberCounter } from '../../hooks/useNumberCounter';

interface HighlightCardProps {
  icon: string;
  count: number;
  label: string;
}

function HighlightCard({ icon, count, label }: HighlightCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();
  const value = useNumberCounter({ target: count, trigger: isVisible });

  return (
    <div ref={ref} className={`highlight-card fade-in${isVisible ? ' visible' : ''}`}>
      <div className="highlight-icon">
        <i className={icon} />
      </div>
      <div className="highlight-number">{value}+</div>
      <div className="highlight-label">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { education } = resumeData;
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: detailsRef, isVisible: detailsVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span>
          <span className="title-text">关于我</span>
          <span className="title-line" />
        </h2>
        <div className="about-grid">
          <div
            ref={textRef}
            className={`about-text fade-in${textVisible ? ' visible' : ''}`}
          >
            <p className="about-intro">
              拥有<strong>5年前端开发经验</strong>的工程师，专注于
              <strong>企业级中后台系统</strong>与<strong>低代码平台</strong>
              的研发。擅长基于Vue3生态体系构建高性能、可维护的前端应用，在零代码平台、数据分析平台等复杂业务场景中积累了丰富的实践经验。
            </p>
            <p className="about-detail">
              具备从0到1搭建项目架构的能力，熟练运用TypeScript保障代码质量，善于通过组件化与模块化思维提升开发效率。注重团队协作与技术分享，持续关注前端前沿技术发展趋势。
            </p>
            <div className="about-highlights">
              <HighlightCard icon="fas fa-code-branch" count={5} label="年开发经验" />
              <HighlightCard icon="fas fa-project-diagram" count={6} label="个核心项目" />
              <HighlightCard icon="fas fa-layer-group" count={15} label="项技术栈" />
            </div>
          </div>
          <div
            ref={detailsRef}
            className={`about-details fade-in${detailsVisible ? ' visible' : ''}`}
          >
            <div className="detail-card education">
              <h3>
                <i className="fas fa-graduation-cap" /> 教育背景
              </h3>
              <div className="timeline-mini">
                {education.map((edu) => (
                  <div className="timeline-item" key={edu.period}>
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <span className="timeline-date">{edu.period}</span>
                      <h4>{edu.school}</h4>
                      <p>
                        {edu.major}{' '}
                        <span className="tag-inline">{edu.degree}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="detail-card career-goal">
              <h3>
                <i className="fas fa-bullseye" /> 职业目标
              </h3>
              <div className="goal-tags">
                <span className="goal-tag">
                  <i className="fas fa-code" /> 前端架构师
                </span>
                <span className="goal-tag">
                  <i className="fas fa-puzzle-piece" /> 低代码平台
                </span>
                <span className="goal-tag">
                  <i className="fas fa-chart-line" /> 数据可视化
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
