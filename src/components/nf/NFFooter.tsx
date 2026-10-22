import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NFLogo } from './NFLogo';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';

interface NFFooterProps {
  onOpenApplication: (track?: string) => void;
  isDark?: boolean;
  showScrollTop?: boolean;
  scrollToTop?: () => void;
}

export const NFFooter: React.FC<NFFooterProps> = ({
  onOpenApplication,
  isDark = false,
  showScrollTop = false,
  scrollToTop,
}) => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91 92091 12577');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      if (location.pathname === '/') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    } else if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href === '/contact' || href === '#contact') {
      if (location.pathname === '/contact' || location.pathname === '/contact-us') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer
      id="contact"
      className={`pt-14 pb-10 border-t transition-colors duration-200 ${
        isDark
          ? 'bg-[#060D1A] text-white border-slate-800'
          : 'bg-[#F7F9FC] text-[#172334] border-[#DCE3EC]'
      }`}
    >
      <div className="section-shell">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <NFLogo size="md" variant={isDark ? 'light' : 'dark'} />
            </div>

            <div className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Naree Foundation Initiative
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              An institutional venture incubation studio bridging academia and industry. Transforming campus innovation, student initiatives, and faculty IP into viable, scalable enterprises.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Incubation Center · Pune, Maharashtra</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/about')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/team')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>Our Team</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/contact')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApplication('student')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B73] text-white text-xs font-semibold hover:bg-[#0B1F3A] transition-all cursor-pointer shadow-xs"
                >
                  <span>Apply for Incubation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Framework Sections */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Framework
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#tracks')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  <span>Incubation Tracks</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#support')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  <span>Lab Infrastructure</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#architecture')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  <span>Venture Architecture</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#process')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  <span>12-Month Rollout</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/#why-ncf')}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#123B73] dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#D9A72E]" />
                  <span>Accreditation Alignment</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Helpline &amp; Inquiries
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href="tel:+919209112577"
                      className="font-semibold text-slate-900 dark:text-white hover:underline"
                    >
                      +91 92091 12577
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      aria-label="Copy phone number"
                      className="text-[10px] px-1.5 py-0.5 rounded border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      {copied ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      ) : (
                        <span>Copy</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Office of the CEO
                  </span>
                  <a
                    href="mailto:ceo@nfvs.in"
                    className="font-medium text-[#123B73] dark:text-sky-400 hover:underline block mt-0.5"
                  >
                    ceo@nfvs.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EAF1F9] dark:bg-slate-800 flex items-center justify-center text-[#123B73] dark:text-sky-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Headquarters
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    Parijatak, Near Nigdi Police Station, Nigdi, Pune – 411044, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-800 dark:text-slate-200">NF Venture Studio</strong> · A Naree Foundation Initiative. All rights reserved.
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://wa.me/919209112577"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.nfvs.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#123B73] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#123B73] dark:text-sky-400" />
              <span>www.nfvs.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top */}
      {showScrollTop && scrollToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full shadow-md border border-[#DCE3EC] dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 text-[#123B73] dark:text-sky-400" />
        </button>
      )}
    </footer>
  );
};
