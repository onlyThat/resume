import { resumeData } from '../../data/resume';

export default function FooterSection() {
  const { personalInfo } = resumeData;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-bracket">{'{'}</span>
            <span className="brand-name">ZJ</span>
            <span className="brand-bracket">{'}'}</span>
          </div>
          <p className="footer-text">用心构建每一个像素，用技术创造价值</p>
          <div className="footer-social">
            <a href={`tel:${personalInfo.phone}`} aria-label="Phone">
              <i className="fas fa-phone-alt" />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <p className="footer-copyright">
            &copy; 2025 {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
