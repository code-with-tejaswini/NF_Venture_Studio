import React, { useState } from 'react';
import nfLogoTransparentImg from '../../assets/nf-logo-transparent.png';
import nfLogoImg from '../../assets/nf-logo.jpg';

interface NFHero3DVisualProps {
  isDark?: boolean;
}

export const NFHero3DVisual: React.FC<NFHero3DVisualProps> = ({ isDark = false }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none">
      {/* Main Container - Exact Dimensions, Rounded Corners, and Shadows */}
      <div
        className={`relative rounded-2xl overflow-hidden border-2 shadow-xl transition-all duration-300 min-h-[340px] sm:min-h-[400px] lg:min-h-[420px] flex items-center justify-center p-6 sm:p-10 ${
          isDark
            ? 'border-slate-700/80 bg-radial from-slate-900 via-[#0B1F3A] to-slate-950 shadow-slate-950/60'
            : 'border-[#DCE3EC] bg-radial from-[#F0F5FA] via-[#E8F0F8] to-[#FFFFFF] shadow-slate-200/80'
        }`}
      >
        {/* Subtle Ambient Glow Background Accent */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isDark
              ? 'bg-[radial-gradient(circle_at_center,rgba(217,167,46,0.14),transparent_70%)]'
              : 'bg-[radial-gradient(circle_at_center,rgba(18,59,115,0.06),transparent_70%)]'
          }`}
          aria-hidden="true"
        />

        {/* Pure Simple NFVS Logo */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <img
            src={!imgError ? nfLogoTransparentImg : nfLogoImg}
            alt="NF Venture Studio Logo"
            className="w-auto h-60 sm:h-72 lg:h-80 max-w-[90%] object-contain drop-shadow-2xl select-none transition-transform duration-300 hover:scale-[1.02]"
            loading="eager"
            decoding="async"
            onError={() => setImgError(true)}
          />
        </div>
      </div>
    </div>
  );
};
