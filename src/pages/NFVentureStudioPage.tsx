import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFHeroSection } from '../components/nf/NFHeroSection';
import { NFAboutIntroSection } from '../components/nf/NFAboutIntroSection';
import { NFIncubationFrameworkSection } from '../components/nf/NFIncubationFrameworkSection';
import { NFTracksSection } from '../components/nf/NFTracksSection';
import { NFArchitectureAndProcess } from '../components/nf/NFArchitectureAndProcess';
import { NFIPRSection } from '../components/nf/NFIPRSection';
import { NFIICSection } from '../components/nf/NFIICSection';
import { NFWhyPartnerSection } from '../components/nf/NFWhyPartnerSection';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { NFLabModal } from '../components/nf/NFLabModal';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';
import { useNFTheme } from '../hooks/useNFTheme';

export const NFVentureStudioPage: React.FC = () => {
  const { theme, isDark, toggleTheme } = useNFTheme();

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [activeLabDomain, setActiveLabDomain] = useState<'AI' | 'IoT' | 'Robotics' | 'Electronics'>('AI');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const location = useLocation();

  useScrollReveal();
  useCountUp();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplication = (track: string = 'student') => {
    setSelectedTrack(track);
    setIsAppModalOpen(true);
  };

  const handleOpenLab = (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => {
    setActiveLabDomain(domain);
    setIsLabModalOpen(true);
  };

  const handleApplyFromLab = (domain: string) => {
    setSelectedTrack('student');
    setIsAppModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#123B73] selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0B1F3A] text-slate-100' : 'bg-[#F7F9FC] text-[#172334]'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Top sticky Navbar with Theme Toggle and Buttons */}
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Spacer below fixed navbar */}
        <div className="h-[64px] sm:h-[76px]" aria-hidden="true" />
        
        {/* 1. Hero Section */}
        <NFHeroSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* 2. About NFVS Storytelling Section */}
        <NFAboutIntroSection isDark={isDark} />

        {/* 3. Incubation Journey: Visual Process Flow & 2-Stage Framework */}
        <NFIncubationFrameworkSection isDark={isDark} />

        {/* 4. Tracks and Programs: 3 Specialized Pathways */}
        <NFTracksSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* 6. Campus Architecture & 12-Month Rollout Roadmap */}
        <NFArchitectureAndProcess
          onOpenApplication={handleOpenApplication}
          onOpenLabDetails={handleOpenLab}
          isDark={isDark}
        />

        {/* 7. Intellectual Property Rights (IPR) Framework */}
        <NFIPRSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* 8. Institution's Innovation Council (IIC) Calendar */}
        <NFIICSection onOpenApplication={handleOpenApplication} isDark={isDark} />

        {/* 9. Why Partner & Institutional Accreditation Matrix */}
        <NFWhyPartnerSection onOpenApplication={handleOpenApplication} isDark={isDark} />
      </main>

      {/* Footer */}
      <NFFooter
        onOpenApplication={handleOpenApplication}
        isDark={isDark}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Interactive Application Modal */}
      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTrack={selectedTrack}
        isDark={isDark}
      />

      {/* Interactive Lab Details Modal */}
      <NFLabModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        activeDomain={activeLabDomain}
        onSelectDomain={(d) => setActiveLabDomain(d)}
        onApply={handleApplyFromLab}
        isDark={isDark}
      />
    </div>
  );
};
