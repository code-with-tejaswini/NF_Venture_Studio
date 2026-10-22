import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  TrendingUp,
} from 'lucide-react';
import founderMentorshipImg from '../../assets/founder_mentorship.jpg';

interface NFAboutIntroSectionProps {
  isDark?: boolean;
}

export const NFAboutIntroSection: React.FC<NFAboutIntroSectionProps> = ({ isDark = false }) => {
  const pillars = [
    {
      title: 'Turnkey Campus Infrastructure',
      desc: 'Rapid prototyping test benches for AI, IoT, robotics, and embedded hardware installed on campus.',
      icon: Cpu,
    },
    {
      title: 'Governance & IP Protection',
      desc: 'Complete legal structuring, AICTE-NISP compliant cap-tables, and provisional patent drafting.',
      icon: ShieldCheck,
    },
    {
      title: 'Capital & Pilot Syndication',
      desc: 'Direct linkages to non-dilutive central grants (NIDHI, BIRAC), corporate pilots, and seed syndicates.',
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="about-nfvs"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#08182D] border-slate-800 text-white' : 'bg-white border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Mentorship Photography */}
          <div className="lg:col-span-5 relative">
            <div
              className={`rounded-2xl overflow-hidden border shadow-lg transition-all duration-300 ${
                isDark ? 'border-slate-700 shadow-slate-950/60' : 'border-[#DCE3EC] shadow-slate-200/80'
              }`}
            >
              <img
                src={founderMentorshipImg}
                alt="NF Venture Studio - Startup mentorship session"
                className="w-full h-[320px] sm:h-[400px] object-cover object-center block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Clean Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2.5">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
                About NF Venture Studio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Bridging Higher Education &amp; Commercial Venture Building
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                NF Venture Studio partners with colleges and universities to build self-sustaining campus incubation centers. We transform academic research into scalable enterprises, supporting founders from validation to seed funding.
              </p>
            </div>

            {/* 3 Clean Key Advantages */}
            <div className="space-y-4 pt-1">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#D9A72E]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clean Action Link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#123B73] dark:text-sky-400 hover:underline"
              >
                <span>Read our full institutional mission &amp; philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
