import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProjectCardProps {
  name: string;
  period: string;
  badge?: string;
  icon: string;
  role: string;
  description: string;
  duties: string[];
  techTags: string[];
}

function ProjectCard({
  name,
  period,
  badge,
  icon,
  role,
  description,
  duties,
  techTags,
}: ProjectCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>();

  return (
    <div ref={ref} className={`project-card fade-in${isVisible ? ' visible' : ''}`}>
      {badge && <div className="project-badge">{badge}</div>}
      <div className="project-header">
        <div className="project-icon">
          <i className={icon} />
        </div>
        <span className="project-date">{period}</span>
      </div>
      <h3 className="project-name">{name}</h3>
      <p className="project-role">{role}</p>
      <p className="project-desc">{description}</p>
      <div className="project-duties">
        <ul>
          {duties.map((duty, idx) => (
            <li key={idx}>{duty}</li>
          ))}
        </ul>
      </div>
      <div className="project-tech">
        {techTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { projects } = resumeData;

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">04.</span>
          <span className="title-text">项目经验</span>
          <span className="title-line" />
        </h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
