import React from 'react';
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface NFIICSectionProps {
  onOpenApplication?: (track?: string) => void;
  isDark?: boolean;
}

export const NFIICSection: React.FC<NFIICSectionProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const quarters = [
    {
      q: 'Q1',
      title: 'Ideation & Discovery',
      desc: 'Campus ideation hackathons, founder talk sessions, and startup orientation workshops.',
    },
    {
      q: 'Q2',
      title: 'Design & Prototyping',
      desc: 'Hands-on design thinking bootcamps, hardware prototyping, and lab immersion visits.',
    },
    {
      q: 'Q3',
      title: 'Business Planning & IPR',
      desc: 'Feasibility analysis, business model validation, and provisional patent drafting clinics.',
    },
    {
      q: 'Q4',
      title: 'Investor Demo & Scale',
      desc: 'Annual venture demo day, grant applications (NIDHI/BIRAC), and corporate pilots.',
    },
  ];

  return (
    <section
      id="iic-calendar"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#08182D] border-slate-800 text-white' : 'bg-white border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
            Annual Innovation Calendar
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            MoE-IIC Synchronized Schedule
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            A synchronized quarterly roadmap designed to maximize institutional MoE Innovation Cell star ratings and student participation.
          </p>
        </div>

        {/* 4 Clean Quarters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quarters.map((q, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700/80 text-slate-100'
                  : 'bg-[#F7F9FC] border-[#DCE3EC] text-slate-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-[#D9A72E]">
                    {q.q}
                  </span>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {q.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {q.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
