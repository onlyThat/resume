import { useCallback, useRef } from 'react';
import { resumeData } from '../../data/resume';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 32px;
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
  }, 3000);
}

export default function ContactSection() {
  const { personalInfo } = resumeData;
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: infoRef, isVisible: infoVisible } = useIntersectionObserver<HTMLDivElement>();
  const { ref: formWrapperRef, isVisible: formVisible } = useIntersectionObserver<HTMLDivElement>();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      showToast('感谢您的留言！我会尽快回复您。');
      formRef.current?.reset();
    },
    []
  );

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">06.</span>
          <span className="title-text">联系我</span>
          <span className="title-line" />
        </h2>
        <div className="contact-grid">
          <div
            ref={infoRef}
            className={`contact-info fade-in${infoVisible ? ' visible' : ''}`}
          >
            <h3>期待与您合作</h3>
            <p>
              如果您有合适的前端岗位机会或项目合作需求，欢迎随时联系我。我目前在职，对新的机会持开放态度。
            </p>
            <div className="contact-methods">
              <a href={`tel:${personalInfo.phone}`} className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-phone-alt" />
                </div>
                <div className="method-info">
                  <span className="method-label">电话</span>
                  <span className="method-value">{personalInfo.phone}</span>
                </div>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="method-info">
                  <span className="method-label">邮箱</span>
                  <span className="method-value">{personalInfo.email}</span>
                </div>
              </a>
              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="method-info">
                  <span className="method-label">所在地</span>
                  <span className="method-value">{personalInfo.city}</span>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-money-bill-wave" />
                </div>
                <div className="method-info">
                  <span className="method-label">期望薪资</span>
                  <span className="method-value">{personalInfo.salary}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={formWrapperRef}
            className={`contact-form-wrapper fade-in${formVisible ? ' visible' : ''}`}
          >
            <form
              ref={formRef}
              className="contact-form"
              id="contactForm"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">您的姓名</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" placeholder=" " required />
                <label htmlFor="email">电子邮箱</label>
              </div>
              <div className="form-group">
                <textarea id="message" rows={5} placeholder=" " required />
                <label htmlFor="message">留言内容</label>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fas fa-paper-plane" /> 发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
