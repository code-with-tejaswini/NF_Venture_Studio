import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Rocket,
} from 'lucide-react';
import ventureStudioHubImg from '../../assets/venture_studio_hub.jpg';

interface NFArchitectureAndProcessProps {
  onOpenApplication: (track?: string) => void;
  onOpenLabDetails: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  isDark?: boolean;
}

export const NFArchitectureAndProcess: React.FC<NFArchitectureAndProcessProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const phases = [
    {
      num: '01',
      title: 'Infrastructure & Governance',
      timeline: 'Months 1–3',
      desc: 'Campus site assessment, rapid prototyping lab deployment, and adoption of AICTE-NISP compliant IP and equity charters.',
      icon: Cpu,
    },
    {
      num: '02',
      title: 'Cohort Intake & Mentorship',
      timeline: 'Months 4–8',
      desc: 'Screening student and faculty research, launching hackathons, and initiating weekly 1-on-1 sprints with seasoned CXO operators.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Venture Launch & Funding',
      timeline: 'Months 9–12+',
      desc: 'Statutory company incorporation, provisional patent drafting, non-dilutive government grants (NIDHI/BIRAC), and angel demo days.',
      icon: Rocket,
    },
  ];

  return (
    <section
      id="campus-architecture"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#08182D] border-slate-800 text-white' : 'bg-white border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
            Turnkey Deployment
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            12-Month Campus Rollout Roadmap
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            A battle-tested institutional implementation model delivering complete operational readiness without administrative friction.
          </p>
        </div>

        {/* Visual Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Studio Photography */}
          <div className="lg:col-span-5 relative">
            <div
              className={`rounded-2xl overflow-hidden border shadow-lg transition-all duration-300 ${
                isDark ? 'border-slate-700 shadow-slate-950/60' : 'border-[#DCE3EC] shadow-slate-200/80'
              }`}
            >
              <img
                src={ventureStudioHubImg}
                alt="NF Venture Studio Campus Hub"
                className="w-full h-[320px] sm:h-[400px] object-cover object-center block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right: 3 Clear Phases */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {phases.map((phase) => {
                const Icon = phase.icon;
                return (
                  <div
                    key={phase.num}
                    className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-700/80 text-slate-100'
                        : 'bg-[#F7F9FC] border-[#DCE3EC] text-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-[#D9A72E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {phase.title}
                          </h3>
                          <span className="text-xs font-mono font-bold text-[#D9A72E]">
                            {phase.timeline}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenApplication('institutional')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-colors shadow-xs cursor-pointer"
              >
                <span>Partner with NF Venture Studio</span>
                <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
