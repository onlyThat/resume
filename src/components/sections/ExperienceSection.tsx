import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function renderStarParagraph(label: string, text: string) {
  return (
    <p>
      <strong>{label}</strong>
      {text}
    </p>
  );
}

export default function ExperienceSection() {
  const { workExperience, achievements } = resumeData;
  const { ref: cardRef, isVisible: cardVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span>
          <span className="title-text">工作经历</span>
          <span className="title-line" />
        </h2>
        <div
          ref={cardRef}
          className={`experience-card fade-in${cardVisible ? ' visible' : ''}`}
        >
          <div className="exp-header">
            <div className="exp-company">
              <div className="company-icon">
                <i className="fas fa-building" />
              </div>
              <div className="company-info">
                <h3>{workExperience.company}</h3>
                <span className="exp-role">{workExperience.role}</span>
              </div>
            </div>
            <div className="exp-date">
              <i className="far fa-calendar-alt" />
              {workExperience.period}
            </div>
          </div>
          <div className="exp-content">
            <div className="exp-section">
              <h4>
                <i className="fas fa-tasks" /> 工作职责
              </h4>
              <ul>
                {workExperience.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="exp-section">
              <h4>
                <i className="fas fa-trophy" /> 核心业绩（STAR法则）
              </h4>
              <div className="achievement-cards">
                {achievements.map((ach) => (
                  <div className="achievement-card" key={ach.title}>
                    <div className="achievement-icon">
                      <i className={ach.icon} />
                    </div>
                    <div className="achievement-content">
                      <h5>{ach.title}</h5>
                      {renderStarParagraph('情境：', ach.situation)}
                      {renderStarParagraph('任务：', ach.task)}
                      {renderStarParagraph('行动：', ach.action)}
                      <p>
                        <strong>成果：</strong>
                        {ach.result.split(/(\d+[%+]*)/).map((part, i) =>
                          /^\d+[%+]*$/.test(part) ? (
                            <span key={i} className="metric">
                              {part}
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
