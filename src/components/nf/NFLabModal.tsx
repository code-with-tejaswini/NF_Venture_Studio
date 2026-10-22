import React, { useEffect } from 'react';
import { X, Cpu, Wifi, Bot, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface NFLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain: 'AI' | 'IoT' | 'Robotics' | 'Electronics';
  onSelectDomain: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  onApply: (domain: string) => void;
  isDark?: boolean;
}

export const NFLabModal: React.FC<NFLabModalProps> = ({
  isOpen,
  onClose,
  activeDomain,
  onSelectDomain,
  onApply,
  isDark = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const labDetails = {
    AI: {
      title: 'AI & Machine Learning Lab',
      badge: 'AI & Data Science',
      icon: Cpu,
      description:
        'GPU compute clusters, deep learning model training workstations, and cloud sandboxes for deep-tech algorithms, computer vision, NLP, and predictive analytics.',
      equipment: [
        'High-performance GPU compute instances (NVIDIA RTX & A100)',
        'Pre-configured PyTorch, TensorFlow & TensorRT frameworks',
        'Edge AI accelerators (NVIDIA Jetson Orin & Google Coral TPUs)',
        'Dataset curation, labeling & synthetic generation pipelines',
        'Model inference optimization & microservice deployment testbeds',
      ],
      deliverables: 'Production-ready AI models, real-time inference pipelines, and scalable enterprise APIs.',
    },
    IoT: {
      title: 'IoT & Connected Systems Lab',
      badge: 'IoT & Smart Sensors',
      icon: Wifi,
      description:
        'Testing rigs for industrial wireless protocols, smart sensor arrays, firmware toolchains, and edge gateways for industrial and healthcare IoT products.',
      equipment: [
        'Multi-protocol test benches: LoRaWAN, BLE 5.3, Zigbee & Wi-Fi 6',
        'Digital oscilloscopes, logic analyzers & spectrum analyzers',
        'Ultra-low power testing & battery lifecycle simulation rigs',
        'Industrial sensor interfacing rigs (thermal, pressure, acoustic)',
        'Secure MQTT broker setups & OTA firmware testbeds',
      ],
      deliverables: 'Field-tested hardware nodes ready for pilots, environmental testing, and PCB fabrication.',
    },
    Robotics: {
      title: 'Robotics & Automation Lab',
      badge: 'Robotics & Automation',
      icon: Bot,
      description:
        'Rapid physical prototyping suite with multi-axis CNC machines, 3D printing farm, robotic arm test cells, and ROS2 simulation environments.',
      equipment: [
        '6-DOF industrial robotic arms & collaborative robot (Cobot) cells',
        'High-precision SLA & industrial FDM 3D printing farm',
        'Motor drive test benches (BLDC, Stepper, and Servo with encoder feedback)',
        'LiDAR, ultrasonic sensor clusters & stereo-depth vision rigs',
        'ROS2 simulation, kinematics modeling, and control test environments',
      ],
      deliverables: 'Functional electromechanical MVPs tested for industrial reliability and repeatable motion.',
    },
    Electronics: {
      title: 'Electronics & Embedded Systems Lab',
      badge: 'Electronics & PCB Design',
      icon: Zap,
      description:
        'Electronics development station for schematic design, multi-layer PCB prototyping, SMD soldering, and compliance testing.',
      equipment: [
        'SMD rework stations, reflow ovens & thermal imaging diagnostic tools',
        'Automated optical inspection (AOI) microscopes & continuity testing',
        'Multi-layer PCB prototyping CNC milling machines',
        'Signal generators, frequency counters, and RF power meters',
        'EMI/EMC pre-compliance assessment & thermal reliability chambers',
      ],
      deliverables: 'Production-ready Gerber files, BOM optimization, and statutory compliance readiness.',
    },
  };

  const current = labDetails[activeDomain];
  const Icon = current.icon;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-modal-title"
        className={`relative w-full max-w-2xl rounded-2xl border shadow-xl overflow-hidden max-h-[90vh] flex flex-col transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-[#DCE3EC] text-[#172334]'
        }`}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="lab-modal-title" className="text-base sm:text-lg font-bold leading-tight text-slate-900 dark:text-white">
                {current.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Prototyping &amp; Testing Specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Domain Switcher Pills */}
        <div className="px-5 sm:px-6 pt-4 pb-2 flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          {(['AI', 'IoT', 'Robotics', 'Electronics'] as const).map((d) => (
            <button
              key={d}
              onClick={() => onSelectDomain(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                activeDomain === d
                  ? 'bg-[#123B73] text-white border-[#123B73]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-[#DCE3EC] dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {d} Lab
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {current.description}
          </p>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Laboratory Tooling &amp; Equipment:
            </div>
            <div className="space-y-2">
              {current.equipment.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#DCE3EC] dark:border-slate-700 bg-[#F7F9FC] dark:bg-slate-800/90 text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Primary Deliverable: </span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">{current.deliverables}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(activeDomain);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-all cursor-pointer shadow-xs"
          >
            <span>Apply for Lab Access</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  );
};
