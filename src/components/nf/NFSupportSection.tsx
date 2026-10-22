import React from 'react';
import {
  Cpu,
  Wifi,
  Bot,
  Zap,
  ArrowRight,
} from 'lucide-react';
import labAiComputeImg from '../../assets/lab_ai_compute.jpg';
import labRoboticsImg from '../../assets/lab_robotics.jpg';
import labIotElectronicsImg from '../../assets/lab_iot_electronics.jpg';
import prototypingLabImg from '../../assets/prototyping_lab.jpg';

interface NFSupportSectionProps {
  onOpenLabDetails: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
}

export const NFSupportSection: React.FC<NFSupportSectionProps> = ({
  onOpenLabDetails,
  onOpenApplication,
  isDark = false,
}) => {
  const labs: {
    id: 'AI' | 'IoT' | 'Robotics' | 'Electronics';
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'AI',
      title: 'AI & Compute Lab',
      subtitle: 'Machine Learning & Edge Intelligence',
      desc: 'High-performance GPU workstations and edge compute servers for training, fine-tuning, and deploying deep learning models.',
      image: labAiComputeImg,
      icon: Cpu,
    },
    {
      id: 'Robotics',
      title: 'Robotics & Automation',
      subtitle: 'Mechatronics & Kinematics',
      desc: 'Multi-axis robotic arms, autonomous mobile robots (AMRs), computer vision systems, and motion control test benches.',
      image: labRoboticsImg,
      icon: Bot,
    },
    {
      id: 'IoT',
      title: 'IoT & Smart Systems',
      subtitle: 'Sensors & Wireless Gateways',
      desc: 'Industrial LoRaWAN gateways, mesh telemetry networks, edge microcontroller boards, and environmental sensing suites.',
      image: labIotElectronicsImg,
      icon: Wifi,
    },
    {
      id: 'Electronics',
      title: 'Prototyping & Makerspace',
      subtitle: 'Rapid Fabrication & Hardware',
      desc: 'High-precision 3D printers, laser cutters, PCB prototyping milling, oscilloscopes, and circuit assembly stations.',
      image: prototypingLabImg,
      icon: Zap,
    },
  ];

  return (
    <section
      id="prototyping-labs"
      className={`py-16 sm:py-20 border-b transition-colors duration-300 ${
        isDark ? 'bg-[#08182D] border-slate-800 text-white' : 'bg-white border-[#DCE3EC] text-[#172334]'
      }`}
    >
      <div className="section-shell space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-[#D9A72E]">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Turnkey Prototyping Labs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              State-of-the-art technology facilities installed directly within university campuses, giving student and faculty founders immediate access to production-grade equipment.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenApplication('institutional')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <span>Request Lab Assessment</span>
            <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
          </button>
        </div>

        {/* 4 Visual Lab Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labs.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                className={`group rounded-2xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 text-slate-100'
                    : 'bg-[#F7F9FC] border-[#DCE3EC] hover:border-slate-300 text-slate-900'
                }`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={lab.image}
                      alt={lab.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-[#D9A72E]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {lab.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {lab.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenLabDetails(lab.id)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#123B73] dark:hover:border-sky-400 text-xs font-semibold text-[#123B73] dark:text-sky-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
