import React from 'react';
import {
  GraduationCap,
  Award,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface NFTracksSectionProps {
  onOpenApplication: (track: string) => void;
  isDark?: boolean;
}

export const NFTracksSection: React.FC<NFTracksSectionProps> = ({
  onOpenApplication,
  isDark = false,
}) => {
  const tracks = [
    {
      id: 'student',
      title: 'Student Startup Track',
      target: 'UG/PG Students & Campus E-Cells',
      desc: 'Transforms final-year projects and student ideas into venture-backed startups with prototyping access and micro-grants.',
      icon: GraduationCap,
      highlights: [
        'Structured 3–6 month incubation cohorts',
        'Turnkey campus makerspace access',
        'Direct 1-on-1 mentorship from founders',
      ],
    },
    {
      id: 'faculty',
      title: 'Faculty & Researcher Track',
      target: 'Professors, Scholars & Lab Leads',
      desc: 'Commercializes academic laboratory research and patented inventions while adhering strictly to AICTE-NISP institutional policies.',
      icon: Award,
      highlights: [
        'Lab-to-market commercialization support',
        'AICTE-NISP compliant equity & IP frameworks',
        'Non-dilutive grant linkage (NIDHI/BIRAC)',
      ],
    },
    {
      id: 'external',
      title: 'Enterprise & Open Track',
      target: 'Early-Stage Founders & MSMEs',
      desc: 'Enables external startup teams and MSMEs to utilize university lab test benches, academic talent, and institutional pilot pipelines.',
      icon: Building2,
      highlights: [
        'Advanced equipment & lab testing infrastructure',
        'Faculty domain consultancy & joint R&D',
        'Corporate pilot syndication & seed rounds',
      ],
    },
  ];

  return (
    <section
      id="incubation-tracks"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0B1F3A] border-slate-800 text-white' : 'bg-[#F7F9FC] border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
            Incubation Pathways
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Tailored Incubation Tracks
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Specialized entry points designed for students, faculty researchers, and external startup founders.
          </p>
        </div>

        {/* 3 Clean Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
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

                  <div>
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      {track.target}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {track.desc}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800">
                    {track.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A72E] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => onOpenApplication(track.id)}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Apply for this Track</span>
                    <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
