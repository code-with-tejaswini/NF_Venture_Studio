import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Lightbulb,
  Sparkles,
  Target,
  ArrowRight,
  TrendingUp,
  Users,
  Check,
  ChevronRight,
  Telescope,
} from 'lucide-react';
import ventureStudioHub from '../assets/venture_studio_hub.jpg';
import { useNFTheme } from '../hooks/useNFTheme';

export const NFAboutPage: React.FC = () => {
  const { theme, isDark, toggleTheme } = useNFTheme();

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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

  // 4 Foundational Pillars (Unique institutional philosophy)
  const fourPillars = [
    {
      title: 'Ideas',
      subtitle: 'From Curiosity to Opportunity',
      desc: 'Screening academic inquiries, capstone projects, and student discoveries into clearly defined, market-validated venture opportunities.',
      icon: Lightbulb,
      highlight: 'Discovery & Screening',
    },
    {
      title: 'Innovation',
      subtitle: 'Ecosystem & Lab Building',
      desc: 'Deploying turnkey campus technology hubs with high-performance hardware test benches, IIC schedules, and dedicated venture mentors.',
      icon: Sparkles,
      highlight: 'Turnkey Campus Infrastructure',
    },
    {
      title: 'Solutions',
      subtitle: 'Market-Ready Engineering',
      desc: 'Validating problem-solution fit through deep-tech prototyping, low-latency APIs, and field pilots that solve real-world industry challenges.',
      icon: Target,
      highlight: 'Validated Prototypes & MVPs',
    },
    {
      title: 'Growth',
      subtitle: 'Sustainable Enterprise Building',
      desc: 'Equipping campus ventures with statutory compliance, non-dilutive grant syndication, angel investor demo days, and scalable business models.',
      icon: TrendingUp,
      highlight: 'Capital & Pilot Syndication',
    },
  ];



  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#081528] text-slate-100' : 'bg-[#F7F9FC] text-[#172334]'
      }`}
    >
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 w-full pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="section-shell space-y-14 sm:space-y-18">

          {/* Section 1: Editorial Hero with Image Split */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border bg-[#EAF1F9] dark:bg-slate-800 text-[#123B73] dark:text-sky-300 border-[#DCE3EC] dark:border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A72E]" />
                <span className="uppercase tracking-wider font-bold">Institutional Profile &amp; Mission</span>
              </div>

              <h1
                className="font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
                style={{ fontSize: 'clamp(2rem, 3.8vw + 0.5rem, 3.2rem)' }}
              >
                A Platform for <span className="text-[#D9A72E]">Ideas, Innovation &amp; Venture Impact</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                NF Venture Studio operates at the intersection of higher-education research, engineering curiosity, and institutional venture capital. We partner with universities to establish self-sustaining campus incubation centers that empower students and faculty to solve real-world industrial challenges.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/team"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-all shadow-sm cursor-pointer"
                >
                  <span>Meet Leadership Team</span>
                  <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenApplication('institutional')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                >
                  <span>Explore Partnership</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#DCE3EC] dark:border-slate-700 shadow-xl">
                <img
                  src={ventureStudioHub}
                  alt="NF Venture Studio - Collaborative Innovation Campus"
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center block"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#D9A72E] font-bold">
                    Turnkey Incubation Infrastructure
                  </div>
                  <div className="text-sm sm:text-base font-bold leading-snug">
                    Academic Incubation &amp; Venture Hub
                  </div>
                  <p className="text-xs text-slate-200">
                    Bridging laboratory research and commercial enterprise scale.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Vision & Mission Dual Pillars (Exact Reference Statements) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Vision */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col transition-all duration-200 shadow-xs ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#DCE3EC] text-slate-900'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400">
                    <Telescope className="w-5 h-5 text-[#D9A72E]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    Our Vision
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  To build an accessible, collaborative and sustainable startup ecosystem that enables innovators and entrepreneurs to transform ideas into impactful ventures.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col transition-all duration-200 shadow-xs ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#DCE3EC] text-slate-900'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400">
                    <Target className="w-5 h-5 text-[#D9A72E]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    Our Mission
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  To connect academic innovation, entrepreneurial startup industry expertise and business resources through structured incubation and startup support.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: The Four Foundational Pillars (Unique Philosophical Foundation) */}
          <section className="space-y-6">
            <div className="text-center space-y-1.5 max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[#123B73] dark:text-sky-400 uppercase tracking-wider font-mono">
                Organizational Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                The Four Foundational Pillars
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Guiding every campus venture from early curiosity to sustainable commercial scale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {fourPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-[#DCE3EC] text-slate-900'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400">
                          <Icon className="w-5 h-5 text-[#D9A72E]" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {p.title}
                        </h3>
                        <div className="text-xs text-[#D9A72E] font-semibold mt-0.5">
                          {p.subtitle}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-[#123B73] dark:text-sky-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#D9A72E]" />
                      <span>{p.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Leadership & Institutional Governance Teaser */}
          <section
            className={`p-6 sm:p-8 rounded-2xl border transition-colors ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-[#EAF1F9]/70 border-[#DCE3EC]'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#123B73] dark:text-sky-300">
                  <Users className="w-4 h-4 text-[#D9A72E]" />
                  <span>Leadership &amp; Institutional Governance</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Guided by Experienced Institutional Leadership
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                  Meet the leadership team, advisory board, and CXO operators driving NF Venture Studio incubation operations across campuses.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/team"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-all shadow-xs cursor-pointer"
                >
                  <span>View Leadership Team</span>
                  <ChevronRight className="w-4 h-4 text-[#D9A72E]" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <NFFooter
        onOpenApplication={handleOpenApplication}
        isDark={isDark}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTrack={selectedTrack}
        isDark={isDark}
      />
    </div>
  );
};
