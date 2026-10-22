import React from 'react';
import { Rocket, Trophy, FlaskConical, Shield, Zap, GraduationCap, Target, Users } from 'lucide-react';

interface NFMarqueeProps {
  isDark?: boolean;
}

const marqueeItems = [
  { icon: FlaskConical, label: 'Turnkey Prototyping Labs' },
  { icon: Rocket, label: 'Student & Faculty Startups' },
  { icon: Zap, label: '₹3Cr+ Seed Grant Linkages' },
  { icon: Shield, label: 'Patent & IP Protection' },
  { icon: Users, label: '50+ Industry CXO Mentors' },
  { icon: Target, label: 'Investor Demo Days' },
  // Duplicate for seamless loop
  { icon: FlaskConical, label: 'Turnkey Prototyping Labs' },
  { icon: Rocket, label: 'Student & Faculty Startups' },
  { icon: Zap, label: '₹3Cr+ Seed Grant Linkages' },
  { icon: Shield, label: 'Patent & IP Protection' },
  { icon: Users, label: '50+ Industry CXO Mentors' },
  { icon: Target, label: 'Investor Demo Days' },
];

export const NFMarquee: React.FC<NFMarqueeProps> = ({ isDark = false }) => {
  return (
    <div
      className={`relative py-3.5 border-b overflow-hidden transition-colors duration-200 ${
        isDark
          ? 'bg-[#060D1A] border-slate-800'
          : 'bg-white border-[#DCE3EC]'
      }`}
    >
      {/* Edge Fades */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-r from-[#060D1A] to-transparent'
            : 'bg-gradient-to-r from-white to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-l from-[#060D1A] to-transparent'
            : 'bg-gradient-to-l from-white to-transparent'
        }`}
      />

      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 mx-6 text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300"
            >
              <Icon className="w-4 h-4 text-[#D9A72E] shrink-0" />
              <span>{item.label}</span>
              <span className="text-slate-300 dark:text-slate-700 ml-4">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
