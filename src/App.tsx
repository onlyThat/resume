import { useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useThemeStore } from './store/theme';
import { useScrollPosition } from './hooks/useScrollPosition';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import JDMatcherSection from './components/sections/JDMatcherSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';

function BackToTop() {
  const scrollY = useScrollPosition();
  const visible = scrollY > 500;

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      id="backToTop"
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up" />
    </button>
  );
}

export default function App() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme from localStorage on mount
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  return (
    <BrowserRouter>
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <JDMatcherSection />
        <ContactSection />
      </main>
      <FooterSection />
      <BackToTop />
    </BrowserRouter>
  );
}
