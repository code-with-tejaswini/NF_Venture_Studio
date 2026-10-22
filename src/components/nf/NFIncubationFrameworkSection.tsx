import React, { useState, useEffect, useRef } from 'react';
import {
  Lightbulb,
  FlaskConical,
  Target,
  LayoutTemplate,
  Users,
  CheckCircle,
  Flag,
  ClipboardList,
  Landmark,
  Coins,
  FileText,
  Handshake,
  Search,
  Rocket,
  TrendingUp,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';

interface NFIncubationFrameworkSectionProps {
  isDark?: boolean;
}

export const NFIncubationFrameworkSection: React.FC<NFIncubationFrameworkSectionProps> = ({
  isDark = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const preIncubationPoints = [
    { text: 'Idea identification and problem discovery', icon: Lightbulb },
    { text: 'Solution development and validation', icon: FlaskConical },
    { text: 'Understanding market needs', icon: Target },
    { text: 'Business model exploration', icon: LayoutTemplate },
    { text: 'Entrepreneurial mindset and team building', icon: Users },
    { text: 'Refining the idea into a viable concept', icon: CheckCircle },
  ];

  const incubationPoints = [
    { text: 'Startup formation and establishment', icon: Flag },
    { text: 'Business planning and strategy', icon: ClipboardList },
    { text: 'Guidance on government schemes', icon: Landmark },
    { text: 'Support in grants and funding opportunities', icon: Coins },
    { text: 'Startup profile and brochure development', icon: FileText },
    { text: 'Mentoring, networking and growth support', icon: Handshake },
  ];

  const progressSteps = [
    {
      step: '01',
      prefix: 'Idea',
      text: 'Identify a real problem or opportunity',
      icon: Lightbulb,
      color: 'gold',
    },
    {
      step: '02',
      prefix: 'Concept',
      text: 'Refine and validate the solution',
      icon: Search,
      color: 'gold',
    },
    {
      step: '03',
      prefix: 'Develop',
      text: 'Build the business model and plan',
      icon: Users,
      color: 'navy',
    },
    {
      step: '04',
      prefix: 'Launch',
      text: 'Convert into a startup',
      icon: Rocket,
      color: 'blue',
    },
    {
      step: '05',
      prefix: 'Grow',
      text: 'Scale with support and opportunities',
      icon: TrendingUp,
      color: 'blue',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="from-idea-to-startup"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B1F3A] border-slate-800 text-white' : 'bg-[#F7F9FC] border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animated-bullet,
          .bullet-badge,
          .bullet-badge-icon,
          .step-card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <div className="section-shell space-y-12 sm:space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A826]">
            FROM IDEA TO STARTUP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Our Two-Stage Incubation Support
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            NF Venture Studio supports innovators at every stage of their journey, from exploring an idea to building a scalable and sustainable startup.
          </p>
        </div>

        {/* Two Equal Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Connector arrow between cards on desktop */}
          <div
            className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center border shadow-md pointer-events-none transition-colors duration-300 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-[#D9A826]'
                : 'bg-white border-slate-200 text-[#123B73]'
            }`}
            aria-hidden="true"
          >
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* CARD 01: PRE-INCUBATION */}
          <div
            className={`p-7 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${
              isDark
                ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 text-slate-100'
                : 'bg-white border-[#DCE3EC] hover:border-slate-300 text-slate-900'
            }`}
          >
            <div className="space-y-6">
              <div className={`flex items-start justify-between gap-4 border-b pb-5 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    PRE-INCUBATION
                  </h3>
                  <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-[#D9A826]' : 'text-[#B45309]'}`}>
                    Idea to Ideology for Startup
                  </p>
                </div>
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#D9A826] select-none leading-none">
                  01
                </span>
              </div>

              <ul className="space-y-2 pt-1">
                {preIncubationPoints.map((point, idx) => {
                  const Icon = point.icon;
                  return (
                    <li
                      key={idx}
                      className={`animated-bullet group flex items-start gap-4 p-2 rounded-xl transition-all duration-300 hover:translate-x-1.5 ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      } ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${idx * 80 + 100}ms` : '0ms',
                      }}
                    >
                      <div
                        className="bullet-badge w-10 h-10 shrink-0 rounded-lg rotate-45 flex items-center justify-center bg-[#D9A826] shadow-[0_0_12px_rgba(217,168,38,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-[55deg] group-hover:shadow-[0_0_18px_rgba(217,168,38,0.6)]"
                        aria-hidden="true"
                      >
                        <Icon className="bullet-badge-icon w-5 h-5 text-[#0B1F3A] -rotate-45 transition-transform duration-300 group-hover:-rotate-[55deg] stroke-[2.2]" />
                      </div>
                      <span className={`text-sm sm:text-base font-medium leading-relaxed pt-1.5 transition-colors duration-200 ${
                        isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-950'
                      }`}>
                        {point.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* CARD 02: INCUBATION */}
          <div
            className={`p-7 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md ${
              isDark
                ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 text-slate-100'
                : 'bg-white border-[#DCE3EC] hover:border-slate-300 text-slate-900'
            }`}
          >
            <div className="space-y-6">
              <div className={`flex items-start justify-between gap-4 border-b pb-5 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    INCUBATION
                  </h3>
                  <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-[#38BDF8]' : 'text-[#123B73]'}`}>
                    Convert to Startup
                  </p>
                </div>
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#D9A826] select-none leading-none">
                  02
                </span>
              </div>

              <ul className="space-y-2 pt-1">
                {incubationPoints.map((point, idx) => {
                  const Icon = point.icon;
                  return (
                    <li
                      key={idx}
                      className={`animated-bullet group flex items-start gap-4 p-2 rounded-xl transition-all duration-300 hover:translate-x-1.5 ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      } ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${idx * 80 + 100}ms` : '0ms',
                      }}
                    >
                      <div
                        className={`bullet-badge w-10 h-10 shrink-0 rounded-lg rotate-45 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-[55deg] ${
                          isDark
                            ? 'bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_18px_rgba(56,189,248,0.6)]'
                            : 'bg-[#123B73] shadow-[0_0_12px_rgba(18,59,115,0.3)] group-hover:shadow-[0_0_18px_rgba(18,59,115,0.5)]'
                        }`}
                        aria-hidden="true"
                      >
                        <Icon
                          className={`bullet-badge-icon w-5 h-5 -rotate-45 transition-transform duration-300 group-hover:-rotate-[55deg] stroke-[2.2] ${
                            isDark ? 'text-[#0B1F3A]' : 'text-white'
                          }`}
                        />
                      </div>
                      <span className={`text-sm sm:text-base font-medium leading-relaxed pt-1.5 transition-colors duration-200 ${
                        isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-950'
                      }`}>
                        {point.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL 5-STAGE VENTURE LIFECYCLE PATHWAY */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
            isDark
              ? 'bg-slate-900/90 border-slate-700/80 shadow-md shadow-slate-950/40'
              : 'bg-white border-[#DCE3EC] shadow-xs'
          }`}
        >
          {/* Pathway Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#D9A826]">
                Venture Lifecycle Pathway
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                5-Stage Progressive Pathway
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D9A826]" />
                Stage 01: Pre-Incubation
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="inline-flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#38BDF8]' : 'bg-[#123B73]'}`} />
                Stage 02: Incubation
              </span>
            </div>
          </div>

          {/* 5 Pathway Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {progressSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPreInc = step.color === 'gold';
              const isBridge = step.color === 'navy';
              
              return (
                <div
                  key={idx}
                  className={`step-card relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-100'
                      : 'bg-[#F7F9FC] border-[#DCE3EC] hover:border-slate-300 text-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Icon Badge */}
                    <div className="flex justify-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 shadow-xs ${
                          isPreInc
                            ? isDark
                              ? 'bg-[#D9A826]/15 border border-[#D9A826]/40 text-[#D9A826]'
                              : 'bg-amber-100/70 border border-amber-300/60 text-[#B45309]'
                            : isBridge
                            ? isDark
                              ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400'
                              : 'bg-[#123B73]/10 border border-[#123B73]/30 text-[#123B73]'
                            : isDark
                            ? 'bg-sky-500/20 border border-sky-400/40 text-[#38BDF8]'
                            : 'bg-sky-100/70 border border-sky-300/60 text-[#0284C7]'
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    {/* Step Number & Title */}
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 block mb-0.5">
                        PHASE {step.step}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {step.prefix}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {step.text}
                    </p>
                  </div>

                  {/* Desktop connector arrow on edge */}
                  {idx < progressSteps.length - 1 && (
                    <div
                      className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs pointer-events-none text-slate-400 dark:text-slate-500"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}

                  {/* Mobile downward connector */}
                  {idx < progressSteps.length - 1 && (
                    <div
                      className="flex md:hidden justify-center pt-2 text-slate-400 dark:text-slate-500"
                      aria-hidden="true"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
