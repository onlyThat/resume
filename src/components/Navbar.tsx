import { useCallback, useEffect, useRef, useState } from 'react';
import { useThemeStore } from '../store/theme';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { resumeData } from '../data/resume';

const navItems = [
  { href: '#home', label: '首页' },
  { href: '#about', label: '关于' },
  { href: '#skills', label: '技能' },
  { href: '#experience', label: '经历' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const scrollY = useScrollPosition();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionsRef.current = Array.from(
      document.querySelectorAll('section[id]')
    ) as HTMLElement[];
  }, []);

  useEffect(() => {
    let current = '';
    sectionsRef.current.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id') || '';
      }
    });
    if (current) setActiveSection(current);
  }, [scrollY]);

  const handleNavClick = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  const handleDownload = useCallback(() => {
    window.print();
  }, []);

  const isScrolled = scrollY > 50;

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-brand">
          <span className="brand-bracket">{'{'}</span>
          <span className="brand-name">ZJ</span>
          <span className="brand-bracket">{'}'}</span>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="切换主题"
          >
            <i className="fas fa-moon" />
            <i className="fas fa-sun" />
          </button>
          <button
            className="btn-download"
            onClick={handleDownload}
            aria-label="下载简历"
          >
            <i className="fas fa-download" />
          </button>
          <button
            className={`nav-toggle${mobileOpen ? ' active' : ''}`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' active' : ''}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
