import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft, Mail, Phone, Compass, Users, Info, HelpCircle } from 'lucide-react';
import { NFNavbar } from '../components/nf/NFNavbar';
import { NFFooter } from '../components/nf/NFFooter';
import { NFApplicationModal } from '../components/nf/NFApplicationModal';
import { useNFTheme } from '../hooks/useNFTheme';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, isDark, toggleTheme } = useNFTheme();
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Page Not Found · NF Venture Studio';
    window.scrollTo(0, 0);
  }, []);

  const handleOpenApplication = () => {
    setIsAppModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#081528] text-slate-100' : 'bg-[#F7F9FC] text-[#172334]'
      }`}
    >
      <NFNavbar
        onOpenApplication={handleOpenApplication}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-16 sm:pb-24 flex items-center justify-center">
        <div className="section-shell max-w-3xl mx-auto text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border mb-6 bg-[#EAF1F9] dark:bg-slate-800 text-[#123B73] dark:text-sky-300 border-[#DCE3EC] dark:border-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-[#D9A72E]" />
            <span>HTTP Status 404 · Route Not Found</span>
          </div>

          {/* 404 Number */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-[#123B73] dark:text-sky-400 select-none">
            4<span className="text-[#D9A72E]">0</span>4
          </h1>

          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Oops! This Page Could Not Be Located
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            The link you followed may be broken, outdated, or the page may have been moved during recent institutional portal updates.
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#123B73] hover:bg-[#0B1F3A] shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to NF Venture Studio Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'border-[#DCE3EC] bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Helpful Navigation Links Grid */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-4">
              Explore Official Sections
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <Link
                to="/about"
                className={`p-4 rounded-xl border transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-[#DCE3EC] hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[#123B73] dark:text-sky-300">
                  <Info className="w-4 h-4 text-[#D9A72E]" />
                  <span>About Us</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Mission, governance, and institutional venture studio model.
                </p>
              </Link>

              <Link
                to="/team"
                className={`p-4 rounded-xl border transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-[#DCE3EC] hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[#123B73] dark:text-sky-300">
                  <Users className="w-4 h-4 text-[#D9A72E]" />
                  <span>Our Leadership</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  President, Vice President, CEO desk, and operational team.
                </p>
              </Link>

              <Link
                to="/contact"
                className={`p-4 rounded-xl border transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                    : 'bg-white border-[#DCE3EC] hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-[#123B73] dark:text-sky-300">
                  <Compass className="w-4 h-4 text-[#D9A72E]" />
                  <span>Contact &amp; Apply</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Helpline, Nigdi headquarters address, and application portal.
                </p>
              </Link>
            </div>
          </div>

          {/* Need Immediate Support Callout */}
          <div
            className={`mt-8 p-4 rounded-xl border text-xs flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-medium text-center sm:text-left">
              Need assistance finding what you were looking for?
            </span>
            <div className="flex items-center gap-4 shrink-0 font-semibold">
              <a href="tel:+919209112577" className="flex items-center gap-1.5 text-[#123B73] dark:text-sky-300 hover:underline">
                <Phone className="w-3.5 h-3.5 text-[#D9A72E]" />
                <span>+91 92091 12577</span>
              </a>
              <a href="mailto:contact@nfvs.in" className="flex items-center gap-1.5 text-[#123B73] dark:text-sky-300 hover:underline">
                <Mail className="w-3.5 h-3.5 text-[#D9A72E]" />
                <span>contact@nfvs.in</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <NFFooter onOpenApplication={handleOpenApplication} isDark={isDark} />

      <NFApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};
