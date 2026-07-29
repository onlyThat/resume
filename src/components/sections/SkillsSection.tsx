import { useEffect, useRef, useState } from 'react';
import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SkillCardProps {
  name: string;
  level: number;
  proficiency: string;
  icon: string;
  detail: string;
}

function SkillCard({ name, level, proficiency, icon, detail }: SkillCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const levelClass = proficiency === '精通' ? 'expert' : 'proficient';

  return (
    <div ref={ref} className={`skill-card fade-in${isVisible ? ' visible' : ''}`}>
      <div className="skill-icon">
        <i className={icon} />
      </div>
      <div className="skill-info">
        <h3>{name}</h3>
        <span className={`skill-level ${levelClass}`}>{proficiency}</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-progress${animate ? ' animate' : ''}`}
          style={{ '--target-width': `${level}%` } as React.CSSProperties}
        />
      </div>
      <p className="skill-detail">{detail}</p>
    </div>
  );
}

interface SkillCategorySectionProps {
  title: string;
  icon: string;
  skills: Array<{
    name: string;
    level: number;
    proficiency: string;
    icon: string;
    detail: string;
  }>;
}

function SkillCategorySection({ title, icon, skills }: SkillCategorySectionProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <div ref={ref} className={`skill-category fade-in${isVisible ? ' visible' : ''}`}>
      <h3 className="category-title">
        <i className={icon} /> {title}
      </h3>
      <div className="skills-grid">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { skillCategories, techTags } = resumeData;
  const { ref: cloudRef, isVisible: cloudVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span>
          <span className="title-text">专业技能</span>
          <span className="title-line" />
        </h2>

        <div className="skills-categories">
          {skillCategories.map((cat) => (
            <SkillCategorySection
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              skills={cat.skills}
            />
          ))}
        </div>

        <div
          ref={cloudRef}
          className={`skills-tech tech-cloud fade-in${cloudVisible ? ' visible' : ''}`}
        >
          <h3 className="tech-title">
            <i className="fas fa-th" /> 技术栈全景
          </h3>
          <div className="tech-cloud">
            {techTags.map((tag) => (
              <span
                key={tag.name}
                className={`tech-tag${tag.highlight ? ' highlight' : ''}`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
