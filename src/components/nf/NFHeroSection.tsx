import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Rocket,
  Building2,
  Users,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import ventureStudioHub from '../../assets/venture_studio_hub.jpg';
import nfLogoTransparent from '../../assets/nf-logo-transparent.png';

interface NFHeroSectionProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFHeroSection: React.FC<NFHeroSectionProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const highlights = [
    { label: 'Turnkey Prototyping Labs', icon: Cpu },
    { label: '₹3Cr+ Seed Grant Linkages', icon: Building2 },
    { label: '50+ Industry CXO Mentors', icon: Users },
  ];

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden transition-colors duration-300">
      {/* Background Photography with Subtle Navy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ventureStudioHub}
          alt="NF Venture Studio Innovation Hub"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Navy Gradient Overlay for optimal readability in both themes */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-[#071326]/95 via-[#0B1F3A]/90 to-[#071326]/85 backdrop-blur-[2px]'
              : 'bg-gradient-to-r from-slate-950/85 via-[#0B1F3A]/80 to-[#123B73]/75 backdrop-blur-[2px]'
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-24 text-center text-white space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Brand Emblem */}
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-transform duration-300 hover:scale-105">
          <img
            src={nfLogoTransparent}
            alt="NF Venture Studio"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow"
          />
        </div>

        {/* Clear, Powerful Headline */}
        <div className="space-y-3">
          <span className="inline-block text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D9A72E] font-bold">
            Institutional Startup Incubation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-balance text-white">
            Building Ideas. Incubating Startups. <br />
            <span className="text-[#D9A72E]">Enabling Growth.</span>
          </h1>
        </div>

        {/* Short, Concise Description */}
        <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal text-balance">
          We partner with universities and colleges to establish structured incubation centres, guide innovators on intellectual property, and support student and faculty founders from idea to a growing startup.
        </p>

        {/* Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={() => onOpenApplication('student')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-[#0B1F3A] bg-[#D9A72E] hover:bg-[#F0B838] active:bg-[#C49525] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-[#0B1F3A]" />
            <span>Apply for Incubation</span>
            <ArrowRight className="w-4 h-4 text-[#0B1F3A]" />
          </button>

          <button
            type="button"
            onClick={() => onOpenApplication('institutional')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 active:bg-white/15 border border-white/30 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#D9A72E]" />
            <span>Schedule Campus Assessment</span>
          </button>
        </div>

        {/* Clean, Non-Cluttered Value Highlights */}
        <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-200 font-medium">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A72E] shrink-0" />
                <span>{h.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
