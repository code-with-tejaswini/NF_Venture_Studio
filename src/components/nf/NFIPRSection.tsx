import React from 'react';
import {
  FileCheck2,
  ShieldCheck,
  Scale,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface NFIPRSectionProps {
  onOpenApplication?: (track?: string) => void;
  isDark?: boolean;
}

export const NFIPRSection: React.FC<NFIPRSectionProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const pillars = [
    {
      title: 'Patent Drafting & Filing',
      desc: 'Dedicated Technology Transfer Office (TTO) support for prior-art search, provisional drafting, and international PCT filings.',
      icon: FileCheck2,
    },
    {
      title: 'Founder-First IP Charters',
      desc: 'AICTE-NISP compliant equity and intellectual property policies protecting student and faculty inventor rights from day zero.',
      icon: ShieldCheck,
    },
    {
      title: 'Commercial Licensing',
      desc: 'Transparent revenue-sharing and technology transfer agreements that reward creators while benefiting institutional stakeholders.',
      icon: Scale,
    },
  ];

  return (
    <section
      id="ipr-governance"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B1F3A] border-slate-800 text-white' : 'bg-[#F7F9FC] border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
            Intellectual Property Governance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Founder-First IP &amp; Patent Protection
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Safeguarding laboratory inventions with structured legal frameworks and AICTE-NISP institutional compliance.
          </p>
        </div>

        {/* 3 Clean Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 text-slate-100'
                    : 'bg-white border-[#DCE3EC] hover:border-slate-300 text-slate-900'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400">
                    <Icon className="w-6 h-6 text-[#D9A72E]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
            isDark ? 'bg-slate-900/60 border-slate-700/80' : 'bg-white border-[#DCE3EC]'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-[#D9A72E] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              Compliant with national innovation policies, AICTE-NISP guidelines, and MoE institutional mandates.
            </span>
          </div>

          {onOpenApplication && (
            <button
              type="button"
              onClick={() => onOpenApplication('institutional')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-colors shrink-0 cursor-pointer"
            >
              <span>Consult with Legal Team</span>
              <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
