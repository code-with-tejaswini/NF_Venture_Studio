import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useNFTheme } from '../hooks/useNFTheme';
import {
  User,
  Users,
  Building2,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  Award,
  Compass,
  FileText,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import ashokPatilImg from '../../assets/ashok_patil_desk.png';
import nileshSirImg from '../../assets/nilesh_sir.jpeg';
import presidentSignatureImg from '../../assets/president_signature.png';
import vicePresidentImg from '../../assets/voice_president.jpeg';
import vicePresidentSignatureImg from '../../assets/vice_president_signature.png';
import ceoSignatureImg from '../../assets/ceo_signature.png';
import pallaviShirkeImg from '../../assets/pallavi shrike.png';
import mohammadAshparazImg from '../../assets/Mohammed Ashparaz.png';
import sayaliKaleImg from '../../assets/sayali kale.jpeg';
import nfLogoImg from '../../assets/nf-logo.jpg';

export interface PillarMember {
  id: string;
  name: string;
  designation: string;
  shortRole: string;
  imageSrc: string;
  initials: string;
  focus: string;
  responsibilities: string[];
}

export const NFTeamPage: React.FC = () => {
  const { theme, isDark, toggleTheme } = useNFTheme();

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('student');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApplication = (track: string = 'student') => {
    setSelectedTrack(track);
    setIsAppModalOpen(true);
  };

  // Dedicated CEO Profile
  const ceoMember: PillarMember = {
    id: 'ashok-patil',
    name: 'Mr. Ashok K. Patil',
    designation: 'Chief Executive Officer (CEO)',
    shortRole: 'CEO',
    imageSrc: ashokPatilImg,
    initials: 'AP',
    focus:
      'Executive venture leadership, strategic institutional partnerships, turnkey incubation deployment, and startup venture syndication.',
    responsibilities: ['Venture Creation Strategy', 'Institutional Governance', 'Investor Syndication'],
  };

  // 3 Core Team Members for "Our Team"
  const teamMembers: PillarMember[] = [
    {
      id: 'pallavi-shirke',
      name: 'Mrs. Pallavi Shirke',
      designation: 'Chief Financial Officer (CFO)',
      shortRole: 'CFO',
      imageSrc: pallaviShirkeImg,
      initials: 'PS',
      focus:
        'Financial governance, fiscal strategy, venture grant allocation, statutory compliance, and capital structuring for student & faculty startups.',
      responsibilities: ['Fiscal Strategy & Audits', 'Venture Grant Allocation', 'Capital Structuring'],
    },
    {
      id: 'mohammad-ashparaz',
      name: 'Mr. Mohammad Ashparaz',
      designation: 'Chief Marketing Officer (CMO)',
      shortRole: 'CMO',
      imageSrc: mohammadAshparazImg,
      initials: 'MA',
      focus:
        'Ecosystem positioning, institutional partner outreach, student innovator recruitment, commercialization funnels, and corporate alliances.',
      responsibilities: ['Ecosystem Marketing', 'Institutional Alliances', 'Founder Acquisition'],
    },
    {
      id: 'sayali-kale',
      name: 'Ms. Sayali Kale',
      designation: 'HR A. Executive',
      shortRole: 'HR',
      imageSrc: sayaliKaleImg,
      initials: 'SK',
      focus:
        'Venture talent sourcing, human resource administration, founder-team formation, internship fellowship programs, and organizational culture.',
      responsibilities: ['Talent Sourcing & Culture', 'Team Formation Support', 'Fellowship Cohorts'],
    },
  ];

  // Sidebar navigation items list in approved order (President first)
  const sidebarNavItems = [
    { id: 'from-presidents-desk', label: "President's Message", path: '/from-presidents-desk', icon: Award },
    { id: 'from-vice-presidents-desk', label: "Vice-President's Message", path: '/from-vice-presidents-desk', icon: Compass },
    { id: 'from-ceos-desk', label: "CEO's Desk", path: '/from-ceos-desk', icon: User },
    { id: 'our-team', label: 'Our Team', path: '/team', icon: Users },
  ];

  // Active tab state management: FIRST TAB WHEN PAGE IS OPENED IS PRESIDENT'S MESSAGE
  const getInitialTab = (): string => {
    if (location.pathname === '/from-ceos-desk') return 'from-ceos-desk';
    if (location.pathname === '/from-vice-presidents-desk') return 'from-vice-presidents-desk';
    if (location.pathname === '/team' && location.search.includes('view=team')) return 'our-team';
    if (location.pathname === '/from-presidents-desk') return 'from-presidents-desk';
    // Default when page is opened is always President's Message
    return 'from-presidents-desk';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  useEffect(() => {
    if (location.pathname === '/from-presidents-desk') setActiveTab('from-presidents-desk');
    else if (location.pathname === '/from-vice-presidents-desk') setActiveTab('from-vice-presidents-desk');
    else if (location.pathname === '/from-ceos-desk') setActiveTab('from-ceos-desk');
    else if (location.pathname === '/team' && location.search.includes('view=team')) setActiveTab('our-team');
    else setActiveTab('from-presidents-desk');
  }, [location.pathname, location.search]);

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId);
    if (tabId === 'our-team') {
      navigate('/team?view=team');
    } else {
      navigate(path);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#081528] text-slate-100' : 'bg-[#F7F9FC] text-[#172334]'
      }`}
    >
      {/* 1. Global Navigation Header */}
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Main Page Layout - Left Navigation with Right Content Display */}
      <main className="flex-1 w-full pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24">
        <div className="section-shell px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 lg:space-y-12">
          
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12 lg:items-start">

            {/* LEFT SIDEBAR NAVIGATION */}
            <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-28">

              {/* CARD 1: NFVS BRANDING + 4-ITEM LEFT NAVIGATION */}
              <div
                className={`p-4 sm:p-6 rounded-2xl border transition-colors shadow-xs space-y-4 sm:space-y-5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-[#DCE3EC]'
                }`}
              >
                {/* Brand Header */}
                <div className="flex flex-col items-center justify-center text-center space-y-2 pt-1">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-xs border border-[#DCE3EC] dark:border-slate-700 bg-white p-2 flex items-center justify-center shrink-0">
                    <img
                      src={nfLogoImg}
                      alt="NF Venture Studio - Official Logo"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-[#123B73] dark:text-white leading-tight">
                      NF Venture Studio
                    </h2>
                    <div className="w-10 sm:w-12 h-0.5 bg-[#D9A72E] mx-auto rounded-full" />
                  </div>
                </div>

                {/* Left Navigation Items List: President, VP, CEO, Our Team */}
                <nav
                  aria-label="Leadership & Team Navigation"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 pt-1"
                >
                  {sidebarNavItems.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleTabClick(item.id, item.path)}
                        className={`w-full group flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all duration-200 select-none text-left cursor-pointer min-h-[44px] ${
                          isActive
                            ? 'bg-[#123B73] text-white border-[#123B73] shadow-sm font-bold ring-2 ring-[#D9A72E]/50'
                            : isDark
                            ? 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 font-medium'
                            : 'bg-white border-slate-300 text-slate-800 hover:bg-[#F0F5FA] hover:border-[#123B73]/40 font-medium shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <ItemIcon
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                              isActive
                                ? 'text-[#D9A72E]'
                                : isDark
                                ? 'text-slate-400 group-hover:text-white'
                                : 'text-slate-500 group-hover:text-[#123B73]'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A72E] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* CARD 2: INCUBATION ECOSYSTEM SUPPORT */}
              <div
                className={`hidden lg:flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-colors shadow-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-[#DCE3EC]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF1F9] dark:bg-slate-800 border border-[#DCE3EC] dark:border-slate-700 flex items-center justify-center text-[#123B73] dark:text-sky-300 shrink-0">
                      <Rocket className="w-4 h-4 text-[#D9A72E]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#123B73] dark:text-white leading-tight">
                        Incubation Ecosystem
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Turnkey Academic Incubation
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                      <span>AICTE-NISP Policy Governance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                      <span>₹3Cr+ Grant Linkages (NIDHI/BIRAC)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                      <span>Turnkey Prototyping Maker Labs</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenApplication('student')}
                    className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-[#123B73] hover:bg-[#0B1F3A] transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for Incubation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  </button>
                  <Link
                    to="/contact"
                    className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 text-center"
                  >
                    <span>Contact Executive Office</span>
                  </Link>
                </div>
              </div>

            </aside>

            {/* RIGHT MAIN CONTENT DISPLAY AREA */}
            <div className="flex-1 min-w-0 w-full">

              <section className="reveal flex-1 flex flex-col">
                <div
                  className={`rounded-2xl border p-5 sm:p-8 lg:p-10 shadow-sm transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-[#DCE3EC]'
                  }`}
                >

                  {/* TAB 1: PRESIDENT'S MESSAGE (DEFAULT WHEN PAGE IS OPENED) */}
                  {activeTab === 'from-presidents-desk' && (
                    <div className="space-y-6 sm:space-y-8 animate-fade-in flex flex-col justify-between">
                      {/* Leader Portrait & Header Info */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                        {/* Small Photograph */}
                        <div className="w-24 sm:w-28 md:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs shrink-0 mx-auto sm:mx-0">
                          <img
                            src={nileshSirImg}
                            alt="Dr. Nilesh Gaikwad - President, NF Venture Studio"
                            className="w-full h-full object-cover object-[center_20%] block select-none"
                            loading="eager"
                            decoding="async"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EAF1F9] dark:bg-slate-800 text-[#123B73] dark:text-sky-300 border border-[#DCE3EC] dark:border-slate-700">
                            <Award className="w-3 h-3 text-[#D9A72E]" />
                            <span>Office of the President</span>
                          </div>
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#123B73] dark:text-white tracking-tight leading-tight">
                            Dr. Nilesh Gaikwad
                          </h1>
                          <p className="text-xs sm:text-sm font-bold text-[#D9A72E]">
                            President, NF Venture Studio
                          </p>

                          {/* Relevant Address & Official Contact */}
                          <div className="pt-1.5 flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex items-start gap-1.5 justify-center sm:justify-start">
                              <MapPin className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                              <span>Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                              <Mail className="w-3.5 h-3.5 text-[#D9A72E] shrink-0" />
                              <a
                                href="mailto:contact@nfvs.in"
                                className="hover:underline text-[#123B73] dark:text-sky-300 font-medium"
                              >
                                contact@nfvs.in
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message Heading */}
                      <div className="pt-4 sm:pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1 text-center sm:text-left">
                        <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#123B73] dark:text-white tracking-tight uppercase">
                          Message from the President
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-[#D9A72E] uppercase tracking-wider">
                          NF Venture Studio · Ecosystem Foundation
                        </p>
                      </div>

                      {/* Detailed Message Narrative */}
                      <div className="space-y-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 font-normal">
                        <p>
                          At NF Venture Studio, our vision is to build a strong startup ecosystem that transforms innovative ideas into sustainable businesses. We aim to establish and strengthen Startup Incubation Centres within academic institutions, empowering students, researchers, and entrepreneurs to turn their ideas into reality.
                        </p>

                        <p>
                          Through mentorship, infrastructure, funding opportunities, intellectual property support, and industry collaboration, we strive to connect education with entrepreneurship and innovation with impact.
                        </p>

                        <div className="p-4 rounded-xl border border-[#DCE3EC] dark:border-slate-800 bg-[#EAF1F9]/50 dark:bg-slate-800/40 text-[#123B73] dark:text-sky-300 font-bold text-xs sm:text-sm">
                          Together, let us build institutions that inspire innovation and an ecosystem that enables every promising idea to grow.
                        </div>
                      </div>

                      {/* Sign-off */}
                      <div className="flex justify-center sm:justify-end pt-5 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center sm:items-end space-y-1">
                          {/* President Signature */}
                          <div className="h-14 sm:h-16 flex items-center justify-center sm:justify-end">
                            <img
                              src={presidentSignatureImg}
                              alt="Dr. Nilesh Gaikwad - President Signature"
                              className="h-full w-auto object-contain dark:brightness-0 dark:invert opacity-95 transition-all select-none"
                              loading="eager"
                            />
                          </div>

                          <div className="text-center sm:text-right space-y-0.5">
                            <div className="text-sm font-bold text-[#123B73] dark:text-white tracking-tight">
                              Dr. Nilesh Gaikwad
                            </div>
                            <div className="text-xs font-semibold text-[#D9A72E]">
                              President
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              Naree Foundation · NF Venture Studio
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: VICE-PRESIDENT'S MESSAGE */}
                  {activeTab === 'from-vice-presidents-desk' && (
                    <div className="space-y-6 sm:space-y-8 animate-fade-in flex flex-col justify-between">
                      {/* Leader Portrait & Header Info */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                        {/* Small Photograph */}
                        <div className="w-24 sm:w-28 md:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs shrink-0 mx-auto sm:mx-0">
                          <img
                            src={vicePresidentImg}
                            alt="Prof. Nisha Gaikwad - Vice President, NF Venture Studio"
                            className="w-full h-full object-cover object-[center_20%] block select-none"
                            loading="eager"
                            decoding="async"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EAF1F9] dark:bg-slate-800 text-[#123B73] dark:text-sky-300 border border-[#DCE3EC] dark:border-slate-700">
                            <Compass className="w-3 h-3 text-[#D9A72E]" />
                            <span>Office of the Vice President</span>
                          </div>
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#123B73] dark:text-white tracking-tight leading-tight">
                            Prof. Nisha Gaikwad
                          </h1>
                          <p className="text-xs sm:text-sm font-bold text-[#D9A72E]">
                            Vice President, NF Venture Studio
                          </p>

                          {/* Relevant Address & Official Contact */}
                          <div className="pt-1.5 flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex items-start gap-1.5 justify-center sm:justify-start">
                              <MapPin className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                              <span>Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                              <Mail className="w-3.5 h-3.5 text-[#D9A72E] shrink-0" />
                              <a
                                href="mailto:contact@nfvs.in"
                                className="hover:underline text-[#123B73] dark:text-sky-300 font-medium"
                              >
                                contact@nfvs.in
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message Heading */}
                      <div className="pt-4 sm:pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1 text-center sm:text-left">
                        <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#123B73] dark:text-white tracking-tight uppercase">
                          Message from the Vice President
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-[#D9A72E] uppercase tracking-wider">
                          NF Venture Studio · Incubation Growth
                        </p>
                      </div>

                      {/* Detailed Message Narrative */}
                      <div className="space-y-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 font-normal">
                        <p>
                          At NF Venture Studio, we are committed to creating an environment where innovation, collaboration, and entrepreneurship thrive. Our focus is on strengthening institutional incubation centres and building a connected ecosystem that supports startups at every stage of their journey.
                        </p>

                        <p>
                          Through structured guidance, mentorship, intellectual property support, funding facilitation, and industry partnerships, we aim to empower aspiring entrepreneurs to transform ideas into impactful ventures.
                        </p>

                        <div className="p-4 rounded-xl border border-[#DCE3EC] dark:border-slate-800 bg-[#EAF1F9]/50 dark:bg-slate-800/40 text-[#123B73] dark:text-sky-300 font-bold text-xs sm:text-sm">
                          Together, let us foster a culture of innovation, strengthen institutional capabilities, and create sustainable opportunities for future entrepreneurs.
                        </div>
                      </div>

                      {/* Sign-off */}
                      <div className="flex justify-center sm:justify-end pt-5 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center sm:items-end space-y-1">
                          {/* Vice President Signature */}
                          <div className="h-14 sm:h-16 flex items-center justify-center sm:justify-end">
                            <img
                              src={vicePresidentSignatureImg}
                              alt="Prof. Nisha Gaikwad - Vice President Signature"
                              className="h-full w-auto object-contain dark:brightness-0 dark:invert opacity-95 transition-all select-none"
                              loading="eager"
                            />
                          </div>

                          <div className="text-center sm:text-right space-y-0.5">
                            <div className="text-sm font-bold text-[#123B73] dark:text-white tracking-tight">
                              Prof. Nisha Gaikwad
                            </div>
                            <div className="text-xs font-semibold text-[#D9A72E]">
                              Vice President
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              Naree Foundation · NF Venture Studio
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CEO'S DESK */}
                  {activeTab === 'from-ceos-desk' && (
                    <div className="space-y-6 sm:space-y-8 animate-fade-in flex flex-col justify-between">
                      {/* Leader Portrait & Header Info */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                        {/* Small Photograph */}
                        <div className="w-24 sm:w-28 md:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs shrink-0 mx-auto sm:mx-0">
                          <img
                            src={ceoMember.imageSrc}
                            alt="Mr. Ashok K. Patil - Chief Executive Officer, NF Venture Studio"
                            className="w-full h-full object-cover object-[center_15%] block select-none"
                            loading="eager"
                            decoding="async"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EAF1F9] dark:bg-slate-800 text-[#123B73] dark:text-sky-300 border border-[#DCE3EC] dark:border-slate-700">
                            <User className="w-3 h-3 text-[#D9A72E]" />
                            <span>Office of the Chief Executive Officer</span>
                          </div>
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#123B73] dark:text-white tracking-tight leading-tight">
                            Mr. Ashok K. Patil
                          </h1>
                          <p className="text-xs sm:text-sm font-bold text-[#D9A72E]">
                            Chief Executive Officer (CEO), NF Venture Studio
                          </p>

                          {/* Relevant Address & Official Contact */}
                          <div className="pt-1.5 flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex items-start gap-1.5 justify-center sm:justify-start">
                              <MapPin className="w-3.5 h-3.5 text-[#D9A72E] shrink-0 mt-0.5" />
                              <span>Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                              <Mail className="w-3.5 h-3.5 text-[#D9A72E] shrink-0" />
                              <a
                                href="mailto:ceo@nfvs.in"
                                className="hover:underline text-[#123B73] dark:text-sky-300 font-medium"
                              >
                                ceo@nfvs.in
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Message Heading */}
                      <div className="pt-4 sm:pt-5 border-t border-slate-200 dark:border-slate-800 space-y-1 text-center sm:text-left">
                        <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#123B73] dark:text-white tracking-tight uppercase">
                          Message from the CEO
                        </h2>
                        <p className="text-xs sm:text-sm font-semibold text-[#D9A72E] uppercase tracking-wider">
                          NF Venture Studio · Operational Strategy
                        </p>
                      </div>

                      {/* Detailed Message Narrative */}
                      <div className="space-y-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-700 dark:text-slate-200 font-normal">
                        <p>
                          At NF Venture Studio, our goal is to transform innovative ideas into successful startups by building a strong, connected incubation ecosystem. We focus on supporting academic institutions in establishing incubation centres and empowering entrepreneurs through business planning, mentorship, intellectual property support, and funding opportunities.
                        </p>

                        <p>
                          Through collaboration, technology, and strategic guidance, we aim to bridge the gap between ideas and implementation, helping startups grow into sustainable and impactful businesses.
                        </p>

                        <div className="p-4 rounded-xl border border-[#DCE3EC] dark:border-slate-800 bg-[#EAF1F9]/50 dark:bg-slate-800/40 text-[#123B73] dark:text-sky-300 font-bold text-xs sm:text-sm">
                          Together, let us build an ecosystem where innovation creates opportunities and every promising idea has the potential to succeed.
                        </div>
                      </div>

                      {/* Sign-off */}
                      <div className="flex justify-center sm:justify-end pt-5 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center sm:items-end space-y-1">
                          {/* CEO Signature */}
                          <div className="h-14 sm:h-16 flex items-center justify-center sm:justify-end">
                            <img
                              src={ceoSignatureImg}
                              alt="Mr. Ashok Patil - CEO Signature"
                              className="h-full w-auto object-contain dark:brightness-0 dark:invert opacity-95 transition-all select-none"
                              loading="eager"
                            />
                          </div>

                          <div className="text-center sm:text-right space-y-0.5">
                            <div className="text-sm font-bold text-[#123B73] dark:text-white tracking-tight">
                              Mr. Ashok Patil
                            </div>
                            <div className="text-xs font-semibold text-[#D9A72E]">
                              Chief Executive Officer (CEO)
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                              Naree Foundation · NF Venture Studio
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: OUR TEAM */}
                  {activeTab === 'our-team' && (
                    <div className="space-y-6 sm:space-y-8 animate-fade-in flex flex-col justify-between">
                      <div className="border-b pb-4 border-slate-200 dark:border-slate-800 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#123B73] dark:text-sky-300 mb-1">
                          <Users className="w-4 h-4 text-[#D9A72E]" />
                          <span>Core Operating Pillars</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#123B73] dark:text-white tracking-tight">
                          Our Team &amp; Leadership Structure
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Executive working pillars driving incubation operations, fiscal governance, and founder acquisition.
                        </p>
                      </div>

                      {/* Team Grid: Consistent Professional Portrait Sizes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                        {teamMembers.map((member) => (
                          <div
                            key={member.id}
                            className={`group p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 h-full ${
                              isDark
                                ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                                : 'bg-[#FAFCFE] border-[#DCE3EC] hover:border-[#123B73]/40'
                            }`}
                          >
                            <div className="space-y-3.5">
                              {/* Standardized Professional Portrait Container */}
                              <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-2xs relative">
                                <img
                                  src={member.imageSrc}
                                  alt={`${member.name} - ${member.designation}, NF Venture Studio`}
                                  className="w-full h-full object-cover object-[center_15%] block transition-transform duration-300 group-hover:scale-103"
                                  loading="lazy"
                                  decoding="async"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#123B73]/90 text-white backdrop-blur-xs border border-white/20">
                                    {member.shortRole}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#123B73] dark:text-white leading-tight">
                                  {member.name}
                                </h3>
                                <p className="text-xs font-bold text-[#D9A72E] mt-0.5">
                                  {member.designation}
                                </p>
                              </div>

                              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                                {member.focus}
                              </p>
                            </div>

                            <div className="pt-3 mt-4 border-t border-slate-200 dark:border-slate-700">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                Key Responsibilities:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {member.responsibilities.map((resp, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-[#D9A72E] shrink-0" />
                                    <span>{resp}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </section>

            </div>

          </div>

          {/* BOTTOM INSTITUTIONAL PARTNERSHIP BANNER */}
          <section
            className={`w-full p-6 sm:p-8 rounded-2xl border text-center space-y-3.5 transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-700'
                : 'bg-[#EAF1F9] border-[#DCE3EC]'
            }`}
          >
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Collaborate with Our Leadership &amp; <span className="text-[#D9A72E]">Venture Studio</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you are an academic institution seeking turnkey incubation deployment or an innovator developing deep-tech prototypes, our leadership team welcomes your partnership.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleOpenApplication('institutional')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
              >
                <span>Apply for Incubation Center</span>
                <ArrowRight className="w-4 h-4 text-[#D9A72E]" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Contact Executive Office</span>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* 3. Global Footer */}
      <NFFooter
        onOpenApplication={handleOpenApplication}
        isDark={isDark}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* 4. Interactive Application Modal */}
      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        initialTrack={selectedTrack}
        isDark={isDark}
      />
    </div>
  );
};
