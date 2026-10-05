import React, { useState, useEffect } from 'react';
import { StyleId } from '../types';
import { FASHION_STYLES } from '../data/fashionData';
import { playClickSound, playLoveSound } from '../utils/soundEffects';
import {
  CrystalGlassHeart3D,
  DreamyPastelRainbow3D,
  GlowingStarCloud3D,
  StarlightSparkle,
  ColorfulPastelCloud3D,
  GlassJellyStar3D,
  GlossyPearlSphere3D,
  IridescentBubble3D,
  StarlightGlimmerDust3D,
} from './Map3DDecorations';

interface DiscoveryMapProps {
  onSelectStyle: (styleId: StyleId) => void;
  onOpenFitStudio: () => void;
  onOpenCloset: () => void;
  onOpenAiStylist: () => void;
}

export const DiscoveryMap: React.FC<DiscoveryMapProps> = ({
  onSelectStyle,
  onOpenFitStudio,
  onOpenCloset,
  onOpenAiStylist,
}) => {
  const [hoveredStyle, setHoveredStyle] = useState<StyleId | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // 3D Parallax & Animation effect following cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDestinationClick = (styleId: StyleId) => {
    playClickSound();
    onSelectStyle(styleId);
  };

  // 3D tilt angles calculated from cursor position
  const tiltX = mouseOffset.y * -0.45;
  const tiltY = mouseOffset.x * 0.45;

  return (
    <div
      className="relative w-full min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden select-none bg-gradient-to-b from-[#EFCFE3]/50 via-[#FFF9FB] to-[#ECF2D8]/50"
      style={{ perspective: '1400px' }}
    >
      {/* ========================================================================= */}
      {/* COLORFUL CLOUDS OUTSIDE THE MAP (FLOATING 3D ANIMATION LAYER)             */}
      {/* ========================================================================= */}

      {/* Top-Left: Dreamy Cotton Candy Pink Cloud */}
      <div
        className="absolute -top-6 -left-10 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float-slow opacity-90"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.4}px, -30px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="pink" width={260} />
      </div>

      {/* Top-Right: Sky Blue / Cyan Floating Cloud */}
      <div
        className="absolute -top-4 -right-12 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float opacity-85"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * -0.5}px, -25px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="cyan" width={250} />
      </div>

      {/* Mid-Left: Soft Lilac / Lavender Cloud */}
      <div
        className="absolute top-[38%] -left-16 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float-reverse opacity-85"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * 0.3}px, -35px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="lavender" width={220} />
      </div>

      {/* Mid-Right: Warm Peach Coral Cloud */}
      <div
        className="absolute top-[42%] -right-14 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float-slow opacity-85"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.4}px, -30px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="peach" width={230} />
      </div>

      {/* Bottom-Left: Sunny Butter Yellow Cloud */}
      <div
        className="absolute -bottom-8 -left-8 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float opacity-90"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.4}px, ${mouseOffset.y * 0.5}px, -25px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="yellow" width={270} />
      </div>

      {/* Bottom-Right: Fresh Mint Teal Cloud */}
      <div
        className="absolute -bottom-10 -right-8 z-0 pointer-events-none transition-transform duration-700 ease-out animate-float-reverse opacity-90"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.4}px, -30px)`,
        }}
      >
        <ColorfulPastelCloud3D palette="mint" width={250} />
      </div>

      {/* Atmospheric Pastel Glow Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#B3DEE2]/40 filter blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#EFCFE3]/60 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-88 h-88 rounded-full bg-[#ECF2D8]/50 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#EB9AB2]/40 filter blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* VIBRANT COLORFUL SPARKLES OUTSIDE THE MAP                                  */}
      {/* ========================================================================= */}

      {/* Upper perimeter sparkles */}
      <StarlightSparkle className="top-[4%] left-[18%]" size={22} color="gold" delay="0.2s" />
      <StarlightSparkle className="top-[6%] left-[32%]" size={16} color="pink" delay="0.8s" />
      <StarlightSparkle className="top-[3%] right-[30%]" size={20} color="cyan" delay="1.2s" />
      <StarlightSparkle className="top-[7%] right-[16%]" size={18} color="purple" delay="0.5s" />

      {/* Left perimeter sparkles */}
      <StarlightSparkle className="top-[25%] left-[3%]" size={24} color="purple" delay="0.3s" />
      <StarlightSparkle className="top-[48%] left-[2%]" size={20} color="emerald" delay="1.1s" />
      <StarlightSparkle className="top-[68%] left-[4%]" size={22} color="coral" delay="0.7s" />

      {/* Right perimeter sparkles */}
      <StarlightSparkle className="top-[28%] right-[3%]" size={22} color="coral" delay="0.9s" />
      <StarlightSparkle className="top-[52%] right-[2%]" size={24} color="cyan" delay="0.4s" />
      <StarlightSparkle className="top-[72%] right-[4%]" size={20} color="pink" delay="1.5s" />

      {/* Bottom perimeter sparkles */}
      <StarlightSparkle className="bottom-[4%] left-[22%]" size={20} color="emerald" delay="0.6s" />
      <StarlightSparkle className="bottom-[6%] left-[38%]" size={18} color="gold" delay="1.3s" />
      <StarlightSparkle className="bottom-[3%] right-[35%]" size={22} color="purple" delay="0.1s" />
      <StarlightSparkle className="bottom-[5%] right-[20%]" size={20} color="pink" delay="1.0s" />

      {/* Header bar / Quick Navigation inside map */}
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-4 mb-3 z-20 px-2">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold font-display text-[#E27396] flex items-center gap-1.5">
            <span>✨</span>
            <span>Fashion World Map</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-800">
            Choose Your Style Destination
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore 5 thematic fashion ateliers. Click any store to step into its virtual closet.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              onOpenFitStudio();
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#EFCFE3] text-[#E27396] hover:bg-[#EB9AB2] hover:text-white transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105 active:scale-95 font-bold"
          >
            <span>👗</span>
            <span>Fit Studio</span>
          </button>
          <button
            onClick={() => {
              playClickSound();
              onOpenCloset();
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#ECF2D8] text-[#374151] hover:bg-[#ECF2D8]/80 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105 active:scale-95 font-bold"
          >
            <span>💖</span>
            <span>My Closet</span>
          </button>
          <button
            onClick={() => {
              playClickSound();
              onOpenAiStylist();
            }}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#B3DEE2] text-[#1E293B] hover:bg-[#B3DEE2]/80 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105 active:scale-95 font-bold"
          >
            <span>✨</span>
            <span>AI Stylist</span>
          </button>
        </div>
      </div>

      {/* Main Map Container Canvas (3D Tilt & Animated Stage) */}
      <div
        className="relative w-full max-w-6xl aspect-[16/9] min-h-[540px] rounded-3xl overflow-hidden flex items-center justify-center p-6 border-4 border-[#EFCFE3]/80 shadow-[0_28px_65px_rgba(226,115,150,0.2)] bg-gradient-to-tr from-[#FFFDFE] via-[#EFCFE3]/20 to-[#ECF2D8]/30 transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Parallax & Layering Group */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.35}px, ${mouseOffset.y * 0.35}px, 0)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ========================================================================= */}
          {/* BIGGER, WIDER WHIMSICAL DASHED PATHWAY ROAD                                */}
          {/* ========================================================================= */}
          <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Outer Wide Road Bedding (Beige Palette) */}
            <path
              d="M 160,330 C 120,180 340,90 500,100 C 720,110 880,190 880,330 C 880,480 660,540 500,530 C 320,520 180,460 160,330 Z"
              fill="none"
              stroke="#ECF2D8"
              strokeWidth="56"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Middle Wide Paved White Highway */}
            <path
              d="M 160,330 C 120,180 340,90 500,100 C 720,110 880,190 880,330 C 880,480 660,540 500,530 C 320,520 180,460 160,330 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="40"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Center Dashed Road Lane (Petal Rouge) */}
            <path
              d="M 160,330 C 120,180 340,90 500,100 C 720,110 880,190 880,330 C 880,480 660,540 500,530 C 320,520 180,460 160,330 Z"
              fill="none"
              stroke="#E27396"
              strokeWidth="5"
              strokeDasharray="14,10"
            />
          </svg>

          {/* ========================================================================= */}
          {/* 3D DECORATIVE ELEMENTS                                                    */}
          {/* ========================================================================= */}

          {/* Dreamy Pastel Rainbow (Connecting Store 05 and Store 04, rotated right, filling blank space) */}
          <div
            className="absolute z-10 pointer-events-none transition-transform duration-700 ease-out opacity-90"
            style={{
              left: '74%',
              top: '25%',
              width: '43%',
              minWidth: '340px',
              maxWidth: '490px',
              transform: `translate(-50%, -95.6%) rotate(21.5deg) translate3d(${mouseOffset.x * -0.25}px, ${mouseOffset.y * -0.2}px, 12px)`,
            }}
          >
            <div className="w-full h-full animate-pulse-subtle">
              <DreamyPastelRainbow3D width="100%" />
            </div>
          </div>

          {/* Glowing Cloud with Star Bokeh Cluster - Top Left */}
          <div
            className="absolute top-[5%] left-[6%] z-10 transition-transform duration-500 ease-out animate-float"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.3}px, 16px)`,
            }}
          >
            <GlowingStarCloud3D size={150} />
          </div>

          {/* ========================================================================= */}
          {/* 3D CRYSTAL GLASS HEARTS REPEATED AROUND THE MAP                           */}
          {/* ========================================================================= */}

          {/* Heart 1: Centerpiece path loop */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playLoveSound();
            }}
            className="absolute top-[45%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-300 animate-float"
            title="Crystal Glass Heart · Click for love shimmer"
          >
            <CrystalGlassHeart3D size={38} mouseOffset={mouseOffset} />
          </div>

          {/* Heart 2: Upper path between Korean and Y2K */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playLoveSound();
            }}
            className="absolute top-[19%] left-[34%] z-20 transition-transform duration-300 animate-float-slow"
            title="Crystal Glass Heart"
          >
            <CrystalGlassHeart3D size={32} mouseOffset={mouseOffset} />
          </div>

          {/* Heart 3: Upper-Right path near Rainbow/Castle */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playLoveSound();
            }}
            className="absolute top-[28%] right-[26%] z-20 transition-transform duration-300 animate-float-reverse"
            title="Crystal Glass Heart"
          >
            <CrystalGlassHeart3D size={30} mouseOffset={mouseOffset} />
          </div>

          {/* Heart 4: Bottom path between Coquette and Vintage */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playLoveSound();
            }}
            className="absolute bottom-[20%] left-[44%] z-20 transition-transform duration-300 animate-float"
            title="Crystal Glass Heart"
          >
            <CrystalGlassHeart3D size={34} mouseOffset={mouseOffset} />
          </div>

          {/* Heart 5: Right path between Office and Vintage */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              playLoveSound();
            }}
            className="absolute bottom-[32%] right-[18%] z-20 transition-transform duration-300 animate-float-slow"
            title="Crystal Glass Heart"
          >
            <CrystalGlassHeart3D size={32} mouseOffset={mouseOffset} />
          </div>

          {/* ========================================================================= */}
          {/* COLORFUL STARLIGHT SPARKLES ACROSS THE MAP                                */}
          {/* ========================================================================= */}

          {/* Sparkles around Rainbow connecting Store 05 and Store 04 */}
          <StarlightSparkle className="top-[7%] right-[36%]" size={20} color="gold" delay="0.3s" />
          <StarlightSparkle className="top-[4%] right-[22%]" size={16} color="pink" delay="1.1s" />
          <StarlightSparkle className="top-[6%] right-[12%]" size={18} color="gold" delay="0.7s" />
          <StarlightSparkle className="top-[15%] right-[2%]" size={20} color="purple" delay="0.5s" />
          <StarlightSparkle className="top-[26%] right-[6%]" size={15} color="cyan" delay="1.7s" />

          {/* Sparkles around Central Crystal Heart */}
          <StarlightSparkle className="top-[41%] left-[47%]" size={16} color="pink" delay="0.4s" />
          <StarlightSparkle className="top-[46%] left-[54%]" size={15} color="gold" delay="0.8s" />
          <StarlightSparkle className="top-[51%] left-[46%]" size={13} color="purple" delay="1.2s" />

          {/* Pathway Trail Sparkles in vibrant colors */}
          <StarlightSparkle className="top-[13%] left-[48%]" size={18} color="gold" delay="0.6s" />
          <StarlightSparkle className="top-[35%] left-[28%]" size={16} color="cyan" delay="1.4s" />
          <StarlightSparkle className="top-[48%] left-[16%]" size={18} color="emerald" delay="0.9s" />
          <StarlightSparkle className="top-[37%] right-[30%]" size={16} color="pink" delay="0.2s" />
          <StarlightSparkle className="bottom-[23%] left-[34%]" size={18} color="coral" delay="1.5s" />
          <StarlightSparkle className="bottom-[13%] right-[32%]" size={20} color="gold" delay="0.9s" />
          <StarlightSparkle className="bottom-[21%] right-[24%]" size={15} color="purple" delay="1.6s" />
          <StarlightSparkle className="bottom-[35%] right-[10%]" size={18} color="pink" delay="0.7s" />

          {/* ========================================================================= */}
          {/* 3D JELLY STARS, PEARLS, RIBBON BOW & IRIDESCENT BUBBLES (LIVELY 3D DEPTH) */}
          {/* ========================================================================= */}

          {/* 3D Glass Jelly Stars (Candy Gloss & Depth Blur) */}

          {/* Iridescent Pink Jelly Star - Top Sky with Soft Depth Blur */}
          <div
            className="absolute top-[3%] right-[38%] z-10 transition-transform duration-700 ease-out animate-float-slow pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * -0.2}px, ${mouseOffset.y * -0.15}px, 10px)`,
            }}
          >
            <GlassJellyStar3D size={48} color="pink" blur={1} rotate={-15} />
          </div>

          {/* Warm Peach/Amber Jelly Star - Bottom Right Vista */}
          <div
            className="absolute bottom-[10%] right-[3%] z-15 transition-transform duration-500 ease-out animate-float pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * -0.3}px, ${mouseOffset.y * 0.2}px, 22px)`,
            }}
          >
            <GlassJellyStar3D size={44} color="peach" rotate={18} mouseOffset={mouseOffset} />
          </div>

          {/* 3. 3D Iridescent Soap Bubbles (Prismatic Sheen with Camera Depth Blur) */}
          {/* Foreground Large Blurred Bubble - Left Flank */}
          <div
            className="absolute top-[22%] left-[1%] z-25 transition-transform duration-500 ease-out animate-float-slow pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.45}px, ${mouseOffset.y * 0.35}px, 30px)`,
            }}
          >
            <IridescentBubble3D size={56} blur={1.8} opacity={0.8} />
          </div>

          {/* Midground Crisp Bubble - Near Rainbow Path */}
          <div
            className="absolute top-[16%] right-[22%] z-15 transition-transform duration-700 ease-out animate-float pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * -0.2}px, ${mouseOffset.y * -0.25}px, 16px)`,
            }}
          >
            <IridescentBubble3D size={42} blur={0.5} opacity={0.85} />
          </div>

          {/* Dreamy Soft Blurred Bubble - Bottom Center Path */}
          <div
            className="absolute bottom-[14%] left-[24%] z-10 transition-transform duration-700 ease-out animate-float-reverse pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.3}px, 8px)`,
            }}
          >
            <IridescentBubble3D size={36} blur={2} opacity={0.7} />
          </div>

          {/* Soft Bubble - Right Edge Near Store 04 */}
          <div
            className="absolute top-[46%] right-[1%] z-15 transition-transform duration-500 ease-out animate-float-slow pointer-events-none"
            style={{
              transform: `translate3d(${mouseOffset.x * -0.35}px, ${mouseOffset.y * 0.2}px, 18px)`,
            }}
          >
            <IridescentBubble3D size={48} blur={1.2} opacity={0.75} />
          </div>

          {/* 4. 3D Glossy Pearl Spheres */}
          <div className="absolute top-[14%] left-[6%] z-15 animate-float pointer-events-none">
            <GlossyPearlSphere3D size={22} color="pink" />
          </div>
          <div className="absolute top-[24%] right-[33%] z-15 animate-float-slow pointer-events-none">
            <GlossyPearlSphere3D size={20} color="cream" blur={0.5} />
          </div>
          <div className="absolute bottom-[16%] left-[38%] z-15 animate-float pointer-events-none">
            <GlossyPearlSphere3D size={22} color="lavender" blur={1} />
          </div>

          {/* 5. 3D Starlight Sparkle Bokeh Dust Flares */}
          <div className="absolute top-[9%] left-[18%] z-15 animate-pulse-subtle pointer-events-none">
            <StarlightGlimmerDust3D size={38} color="gold" blur={0.5} />
          </div>
          <div className="absolute top-[30%] right-[8%] z-15 animate-pulse-subtle pointer-events-none">
            <StarlightGlimmerDust3D size={36} color="pink" blur={0.8} />
          </div>
          <div className="absolute bottom-[26%] left-[14%] z-15 animate-pulse-subtle pointer-events-none">
            <StarlightGlimmerDust3D size={32} color="cyan" blur={1} />
          </div>

          {/* ======================================================== */}
          {/* THE 5 INTERACTIVE STYLE STORE DESTINATIONS ON THE ROAD    */}
          {/* ======================================================== */}

          {/* 01: KOREAN MINIMAL ATELIER (Moved left onto the road) */}
          <div
            className="absolute top-[26%] left-[6%] sm:left-[8%] z-20 transition-transform duration-300"
            style={{
              transform: hoveredStyle === 'korean'
                ? 'scale(1.08) translateZ(40px)'
                : `scale(1) translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 20px)`,
            }}
          >
            <button
              onClick={() => handleDestinationClick('korean')}
              onMouseEnter={() => setHoveredStyle('korean')}
              onMouseLeave={() => setHoveredStyle(null)}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Open Korean Minimal Wardrobe"
            >
              <div className="relative w-44 sm:w-56 h-28 sm:h-36 drop-shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                <svg viewBox="0 0 220 140" className="w-full h-full">
                  <path
                    d="M 20,130 C 15,60 70,20 130,20 C 180,20 215,65 210,130 Z"
                    fill="#FCD34D"
                    stroke="#FFF"
                    strokeWidth="5"
                  />
                  <path
                    d="M 105,130 C 105,80 140,55 185,55 C 205,55 215,80 210,130 Z"
                    fill="#F59E0B"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <circle cx="76" cy="68" r="3.5" fill="#1E293B" />
                  <circle cx="106" cy="68" r="3.5" fill="#1E293B" />
                  <path d="M 86,74 Q 91,80 96,74" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="68" cy="74" rx="5" ry="3" fill="#FB923C" opacity="0.6" />
                  <ellipse cx="114" cy="74" rx="5" ry="3" fill="#FB923C" opacity="0.6" />
                  <text
                    x="160"
                    y="108"
                    fill="#FFFFFF"
                    fontFamily="'Fredoka', cursive, sans-serif"
                    fontWeight="bold"
                    fontSize="28"
                    textAnchor="middle"
                  >
                    01
                  </text>
                </svg>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-2 border-amber-300 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-30">
                  <span className="text-amber-500 font-bold text-xs font-display">Korean</span>
                  <span className="text-[10px] text-slate-500 font-medium">· Minimal Chic</span>
                </div>
              </div>
            </button>
          </div>

          {/* 02: COQUETTE DREAMLAND (Bottom-Left Soft Pink Cloud Character) */}
          <div
            className="absolute bottom-[10%] left-[14%] sm:left-[17%] z-20 transition-transform duration-300"
            style={{
              transform: hoveredStyle === 'coquette'
                ? 'scale(1.08) translateZ(40px)'
                : `scale(1) translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px, 20px)`,
            }}
          >
            <button
              onClick={() => handleDestinationClick('coquette')}
              onMouseEnter={() => setHoveredStyle('coquette')}
              onMouseLeave={() => setHoveredStyle(null)}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Open Coquette Dream Wardrobe"
            >
              <div className="relative w-44 sm:w-56 h-28 sm:h-36 drop-shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                <svg viewBox="0 0 220 140" className="w-full h-full">
                  <path
                    d="M 20,130 C 15,60 70,25 130,25 C 180,25 215,65 210,130 Z"
                    fill="#FCE7F3"
                    stroke="#FFF"
                    strokeWidth="5"
                  />
                  <path
                    d="M 105,130 C 105,82 140,62 185,62 C 205,62 215,85 210,130 Z"
                    fill="#99F6E4"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <circle cx="76" cy="72" r="3.5" fill="#1E293B" />
                  <circle cx="106" cy="72" r="3.5" fill="#1E293B" />
                  <path d="M 86,78 Q 91,84 96,78" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="68" cy="78" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
                  <ellipse cx="114" cy="78" rx="5" ry="3" fill="#FDA4AF" opacity="0.8" />
                  <text
                    x="160"
                    y="112"
                    fill="#0F766E"
                    fontFamily="'Fredoka', cursive, sans-serif"
                    fontWeight="bold"
                    fontSize="28"
                    textAnchor="middle"
                  >
                    02
                  </text>
                </svg>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-2 border-pink-300 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-30">
                  <span className="text-pink-500 font-bold text-xs font-display">Coquette</span>
                  <span className="text-[10px] text-slate-500 font-medium">· Ruffles & Bows</span>
                </div>
              </div>
            </button>
          </div>

          {/* 03: VINTAGE ARCHIVE (Bottom-Right Soft Blue Cloud Character) */}
          <div
            className="absolute bottom-[6%] right-[24%] sm:right-[26%] z-20 transition-transform duration-300"
            style={{
              transform: hoveredStyle === 'vintage'
                ? 'scale(1.08) translateZ(40px)'
                : `scale(1) translate3d(${mouseOffset.x * -0.2}px, ${mouseOffset.y * -0.2}px, 20px)`,
            }}
          >
            <button
              onClick={() => handleDestinationClick('vintage')}
              onMouseEnter={() => setHoveredStyle('vintage')}
              onMouseLeave={() => setHoveredStyle(null)}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Open Vintage Archive Wardrobe"
            >
              <div className="relative w-44 sm:w-56 h-28 sm:h-36 drop-shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                <svg viewBox="0 0 220 140" className="w-full h-full">
                  <path
                    d="M 20,130 C 15,65 70,25 130,25 C 180,25 215,65 210,130 Z"
                    fill="#BAE6FD"
                    stroke="#FFF"
                    strokeWidth="5"
                  />
                  <path
                    d="M 115,130 C 115,85 145,68 185,68 C 205,68 215,88 210,130 Z"
                    fill="#38BDF8"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <circle cx="80" cy="74" r="3.5" fill="#0C4A6E" />
                  <circle cx="110" cy="74" r="3.5" fill="#0C4A6E" />
                  <path d="M 90,80 Q 95,86 100,80" stroke="#0C4A6E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="72" cy="80" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
                  <ellipse cx="118" cy="80" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
                  <circle cx="138" cy="116" r="3" fill="#EF4444" />
                  <circle cx="204" cy="120" r="3" fill="#EF4444" />
                  <text
                    x="166"
                    y="114"
                    fill="#FFFFFF"
                    fontFamily="'Fredoka', cursive, sans-serif"
                    fontWeight="bold"
                    fontSize="28"
                    textAnchor="middle"
                  >
                    03
                  </text>
                </svg>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-2 border-sky-300 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-30">
                  <span className="text-sky-600 font-bold text-xs font-display">Vintage</span>
                  <span className="text-[10px] text-slate-500 font-medium">· Retro Classic</span>
                </div>
              </div>
            </button>
          </div>

          {/* 04: OFFICE CHIC ATELIER (Moved right onto the road) */}
          <div
            className="absolute top-[32%] right-[4%] sm:right-[6%] z-20 transition-transform duration-300"
            style={{
              transform: hoveredStyle === 'office'
                ? 'scale(1.08) translateZ(40px)'
                : `scale(1) translate3d(${mouseOffset.x * -0.3}px, ${mouseOffset.y * 0.2}px, 20px)`,
            }}
          >
            <button
              onClick={() => handleDestinationClick('office')}
              onMouseEnter={() => setHoveredStyle('office')}
              onMouseLeave={() => setHoveredStyle(null)}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Open Office Chic Wardrobe"
            >
              <div className="relative w-44 sm:w-56 h-28 sm:h-36 drop-shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                <svg viewBox="0 0 220 140" className="w-full h-full relative z-25">
                  <path
                    d="M 20,130 C 15,60 70,22 130,22 C 180,22 215,65 210,130 Z"
                    fill="#FCE7F3"
                    stroke="#FFF"
                    strokeWidth="5"
                  />
                  <path
                    d="M 105,130 C 105,75 140,55 185,55 C 205,55 215,80 210,130 Z"
                    fill="#818CF8"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <circle cx="76" cy="68" r="3.5" fill="#1E293B" />
                  <circle cx="106" cy="68" r="3.5" fill="#1E293B" />
                  <path d="M 86,74 Q 91,80 96,74" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="68" cy="74" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
                  <ellipse cx="114" cy="74" rx="5" ry="3" fill="#F472B6" opacity="0.6" />
                  <text
                    x="160"
                    y="108"
                    fill="#FFFFFF"
                    fontFamily="'Fredoka', cursive, sans-serif"
                    fontWeight="bold"
                    fontSize="28"
                    textAnchor="middle"
                  >
                    04
                  </text>
                </svg>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-2 border-indigo-300 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-30">
                  <span className="text-indigo-600 font-bold text-xs font-display">Office</span>
                  <span className="text-[10px] text-slate-500 font-medium">· Sleek Tailoring</span>
                </div>
              </div>
            </button>
          </div>

          {/* 05: Y2K CYBER POP (Moved up onto the top crest of the road) */}
          <div
            className="absolute top-[4%] sm:top-[5%] left-[40%] sm:left-[43%] z-20 transition-transform duration-300"
            style={{
              transform: hoveredStyle === 'y2k'
                ? 'scale(1.08) translateZ(40px)'
                : `scale(1) translate3d(${mouseOffset.x * 0.1}px, ${mouseOffset.y * -0.2}px, 20px)`,
            }}
          >
            <button
              onClick={() => handleDestinationClick('y2k')}
              onMouseEnter={() => setHoveredStyle('y2k')}
              onMouseLeave={() => setHoveredStyle(null)}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Open Y2K Cyber Pop Wardrobe"
            >
              <div className="relative w-44 sm:w-56 h-28 sm:h-36 drop-shadow-lg transition-transform duration-200 group-hover:-translate-y-1">
                <svg viewBox="0 0 220 140" className="w-full h-full">
                  <path
                    d="M 30,130 C 5,110 5,60 30,45 C 50,30 90,30 110,45 C 130,30 170,30 190,45 C 215,60 215,110 190,130 Z"
                    fill="#DDD6FE"
                    stroke="#FFF"
                    strokeWidth="5"
                  />
                  <path d="M 68,76 Q 74,70 80,76" stroke="#5B21B6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 90,76 Q 96,70 102,76" stroke="#5B21B6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <ellipse cx="64" cy="80" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
                  <ellipse cx="106" cy="80" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />

                  <path
                    d="M 120,130 C 120,80 150,60 190,60 C 205,60 215,80 210,130 Z"
                    fill="#7C3AED"
                    stroke="#FFF"
                    strokeWidth="4"
                  />
                  <circle cx="150" cy="72" r="22" fill="#FDE047" stroke="#FFF" strokeWidth="3" />
                  <path d="M 142,70 Q 146,66 150,70" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 152,70 Q 156,66 160,70" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M 148,76 Q 151,80 154,76" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                  <text
                    x="172"
                    y="115"
                    fill="#FFFFFF"
                    fontFamily="'Fredoka', cursive, sans-serif"
                    fontWeight="bold"
                    fontSize="28"
                    textAnchor="middle"
                  >
                    05
                  </text>
                </svg>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm border-2 border-purple-300 px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 whitespace-nowrap z-30">
                  <span className="text-purple-600 font-bold text-xs font-display">Y2K</span>
                  <span className="text-[10px] text-slate-500 font-medium">· Cyber Millennium</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Store Overview Legend Bar */}
      <div className="w-full max-w-6xl mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 z-10">
        {FASHION_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => handleDestinationClick(style.id)}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
              hoveredStyle === style.id
                ? 'bg-white shadow-md border-[#E27396] scale-102 ring-2 ring-[#EFCFE3]'
                : 'bg-white/90 hover:bg-[#EFCFE3]/30 border-[#EB9AB2]/30 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{style.icon}</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-[#ECF2D8] text-[#E27396]">
                {style.number}
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display font-bold text-sm text-slate-800">{style.name}</div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{style.tagline}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
