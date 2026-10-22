import React from 'react';
import {
  Trophy,
  Settings2,
  GitPullRequest,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface NFWhyPartnerSectionProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFWhyPartnerSection: React.FC<NFWhyPartnerSectionProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const values = [
    {
      title: 'Accreditation & Ranking Uplift',
      desc: 'Generates verifiable, audit-ready data for student startups, patents, and funded research aligned with NAAC, NBA, and NIRF Innovation criteria.',
      icon: Trophy,
    },
    {
      title: 'Turnkey Campus Operations',
      desc: 'Zero administrative overhead for university faculty. NF Venture Studio oversees facility setup, mentor scheduling, and incubation operations.',
      icon: Settings2,
    },
    {
      title: 'Industry & Capital Syndication',
      desc: 'Connects campus inventors with our network of 50+ CXO mentors, non-dilutive government grant pipelines, and corporate pilot opportunities.',
      icon: GitPullRequest,
    },
  ];

  return (
    <section
      id="why-partner"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B1F3A] border-slate-800 text-white' : 'bg-[#F7F9FC] border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
            Institutional Value
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Why Partner with NF Venture Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            A comprehensive incubation partnership delivering measurable prestige, research commercialization, and startup success.
          </p>
        </div>

        {/* 3 Open Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Card */}
        <div
          className={`p-8 sm:p-10 rounded-2xl border text-center max-w-3xl mx-auto space-y-5 ${
            isDark
              ? 'bg-slate-900/80 border-slate-700'
              : 'bg-white border-[#DCE3EC] shadow-sm'
          }`}
        >
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ready to Accelerate Innovation on Your Campus?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
              Schedule an executive consultation with our incubation leadership team to explore turnkey hub deployment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => onOpenApplication('institutional')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-colors shadow-md cursor-pointer"
            >
              <span>Schedule Campus Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
            </button>
            <button
              type="button"
              onClick={() => onOpenApplication('student')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Apply for Incubation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
