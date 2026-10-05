import React, { useState, useEffect } from 'react';
import { playGameStartSound } from '../utils/soundEffects';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isExiting, setIsExiting] = useState(false);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartClick = () => {
    if (isExiting) return;
    playGameStartSound();
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 900);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-gradient-to-b from-[#EBF5FB] via-[#FFF8FA] to-[#FCEEF3] flex items-center justify-center">
      {/* Upper Fairy Light Garlands with glowing soft pastel bulbs */}
      <div
        className={`absolute top-0 left-0 w-full pointer-events-none transition-all duration-700 ${
          isExiting ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      >
        <svg viewBox="0 0 1440 220" className="w-full h-auto drop-shadow-xs">
          {/* Swag Line 1 */}
          <path
            d="M -40,30 Q 300,120 720,40 Q 1140,120 1480,30"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Swag Line 2 */}
          <path
            d="M -20,80 Q 360,170 740,90 Q 1120,170 1460,80"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="6,4"
            opacity="0.8"
          />

          {/* Soft Pastel Fairy Bulbs */}
          {[
            { cx: 80, cy: 62 },
            { cx: 180, cy: 94 },
            { cx: 290, cy: 112 },
            { cx: 410, cy: 92 },
            { cx: 530, cy: 64 },
            { cx: 640, cy: 46 },
            { cx: 760, cy: 52 },
            { cx: 890, cy: 84 },
            { cx: 1010, cy: 110 },
            { cx: 1140, cy: 98 },
            { cx: 1260, cy: 68 },
            { cx: 1370, cy: 44 },
          ].map((bulb, i) => (
            <g key={i} className="animate-pulse-subtle" style={{ animationDelay: `${i * 0.25}s` }}>
              <line x1={bulb.cx} y1={bulb.cy - 14} x2={bulb.cx} y2={bulb.cy} stroke="#FFF" strokeWidth="1.5" />
              {/* Soft warm glow */}
              <circle cx={bulb.cx} cy={bulb.cy} r="13" fill="#FEF9C3" opacity="0.75" />
              {/* Soft pastel bulb */}
              <circle cx={bulb.cx} cy={bulb.cy} r="7.5" fill="#FEF08A" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Soft Pastel Clouds with Parallax */}

      {/* Top Left Cloud (Milky Baby Pink) */}
      <div
        className={`absolute -top-10 -left-12 w-96 h-72 rounded-full filter blur-[2px] transition-all duration-1000 ease-out pointer-events-none ${
          isExiting ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-80'
        }`}
        style={{
          background: 'radial-gradient(circle, #FDF2F8 30%, #FCE7F3 75%, transparent 95%)',
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.6}px)`,
        }}
      />

      {/* Top Center-Right Cloud (Soft Powder Blue) */}
      <div
        className={`absolute -top-12 left-1/3 w-[32rem] h-64 rounded-full filter blur-[2px] transition-all duration-1000 ease-out pointer-events-none ${
          isExiting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-70'
        }`}
        style={{
          background: 'radial-gradient(circle, #F0F9FF 35%, #E0F2FE 75%, transparent 95%)',
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.4}px)`,
        }}
      />

      {/* Top Right Cloud (Pastel Lavender Mist) */}
      <div
        className={`absolute -top-8 -right-16 w-96 h-80 rounded-full filter blur-[2px] transition-all duration-1000 ease-out pointer-events-none ${
          isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-75'
        }`}
        style={{
          background: 'radial-gradient(circle, #FAF5FF 30%, #F3E8FF 75%, transparent 95%)',
          transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Mid Left Soft Mint/Aqua Cloud */}
      <div
        className={`absolute top-1/3 -left-20 w-80 h-80 rounded-full filter blur-[3px] transition-all duration-1000 ease-out pointer-events-none ${
          isExiting ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-65 animate-float'
        }`}
        style={{
          background: 'radial-gradient(circle, #F0FDF4 25%, #DCFCE7 70%, transparent 95%)',
          transform: `translate(${mousePos.x * 1.1}px, ${mousePos.y * 0.9}px)`,
        }}
      />

      {/* Mid Right Pastel Rose Cloud */}
      <div
        className={`absolute top-1/4 -right-12 w-88 h-88 rounded-full filter blur-[3px] transition-all duration-1000 ease-out pointer-events-none ${
          isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-70 animate-float-reverse'
        }`}
        style={{
          background: 'radial-gradient(circle, #FFF1F2 25%, #FCE7F3 75%, transparent 95%)',
          transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * 0.7}px)`,
        }}
      />

      {/* Bottom Right Pastel Rainbow Arch (Softened to Ethereal Pastels) */}
      <div
        className={`absolute -bottom-16 right-16 w-96 h-64 pointer-events-none transition-all duration-1000 ${
          isExiting ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-80'
        }`}
      >
        <svg viewBox="0 0 400 240" className="w-full h-full">
          {/* 5 Soft Milky Pastel Rainbow Bands */}
          <path d="M 40,240 A 180,180 0 0 1 360,240" fill="none" stroke="#FBCFE8" strokeWidth="16" opacity="0.8" />
          <path d="M 56,240 A 164,164 0 0 1 344,240" fill="none" stroke="#FED7AA" strokeWidth="15" opacity="0.8" />
          <path d="M 71,240 A 149,149 0 0 1 329,240" fill="none" stroke="#FEF08A" strokeWidth="15" opacity="0.8" />
          <path d="M 86,240 A 134,134 0 0 1 314,240" fill="none" stroke="#BBF7D0" strokeWidth="14" opacity="0.8" />
          <path d="M 100,240 A 120,120 0 0 1 300,240" fill="none" stroke="#BAE6FD" strokeWidth="14" opacity="0.85" />
          <path d="M 114,240 A 106,106 0 0 1 286,240" fill="none" stroke="#E9D5FF" strokeWidth="12" opacity="0.85" />
        </svg>
      </div>

      {/* Bottom Striped Hill (Soft Pastel Rose & Milky White Stripes) */}
      <div
        className={`absolute -bottom-12 -left-12 w-96 h-48 rounded-t-[100px] pointer-events-none transition-all duration-1000 overflow-hidden ${
          isExiting ? '-translate-x-24 opacity-0' : 'translate-x-0 opacity-80'
        }`}
        style={{
          background: 'repeating-linear-gradient(45deg, #FCE7F3, #FCE7F3 18px, #FFFFFF 18px, #FFFFFF 36px)',
          borderTop: '2px solid rgba(255, 255, 255, 0.9)',
        }}
      />

      {/* Bottom Puffy Clouds (Center Cloud Mount in Pastel Frost) */}
      <div
        className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[44rem] h-64 rounded-full filter blur-[2px] transition-all duration-1000 pointer-events-none ${
          isExiting ? 'translate-y-40 opacity-0' : 'opacity-85 animate-float-slow'
        }`}
        style={{
          background: 'radial-gradient(circle, #FFFFFF 45%, #FDF2F8 80%, transparent 98%)',
        }}
      />

      {/* Pastel Anime Stars Floating Around */}
      {[
        { x: '12%', y: '16%', size: 'w-11 h-11', delay: '0s', fill: '#FEF9C3', stroke: '#FDE047' },
        { x: '10%', y: '70%', size: 'w-14 h-14', delay: '1s', fill: '#E0F2FE', stroke: '#7DD3FC' },
        { x: '88%', y: '36%', size: 'w-10 h-10', delay: '2s', fill: '#FED7AA', stroke: '#FDBA74' },
        { x: '82%', y: '78%', size: 'w-13 h-13', delay: '1.5s', fill: '#EDE9FE', stroke: '#C4B5FD' },
      ].map((star, i) => (
        <div
          key={i}
          className={`absolute pointer-events-none transition-all duration-700 animate-twinkle ${
            isExiting ? 'scale-0 opacity-0' : 'opacity-85'
          }`}
          style={{
            left: star.x,
            top: star.y,
            animationDelay: star.delay,
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          }}
        >
          <svg viewBox="0 0 50 50" className={`${star.size} drop-shadow-2xs`}>
            <polygon
              points="25,2 32,17 48,19 36,31 40,48 25,39 10,48 14,31 2,19 18,17"
              fill={star.fill}
              stroke={star.stroke}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      {/* Cute Pastel Daisy Flower (Bottom Right) */}
      <div
        className={`absolute bottom-16 right-1/4 pointer-events-none transition-all duration-700 ${
          isExiting ? 'scale-0 opacity-0' : 'opacity-90 animate-float'
        }`}
      >
        <svg viewBox="0 0 60 70" className="w-12 h-14 drop-shadow-2xs">
          {/* Pastel Mint Stem */}
          <path d="M30 40 Q28 55 30 70" stroke="#6EE7B7" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M30 55 Q38 52 42 56 Q38 60 30 58" fill="#6EE7B7" />
          {/* Pastel Lilac/Pink Petals */}
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <circle
              key={idx}
              cx={30 + Math.cos((angle * Math.PI) / 180) * 12}
              cy={30 + Math.sin((angle * Math.PI) / 180) * 12}
              r="7.5"
              fill="#E9D5FF"
              stroke="#DDD6FE"
              strokeWidth="1"
            />
          ))}
          {/* Soft Pastel Center */}
          <circle cx="30" cy="30" r="7.5" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1" />
        </svg>
      </div>

      {/* Centerpiece: STYLEMATE Pastel Bubbly Wordmark & START Button */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out ${
          isExiting ? 'scale-90 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
        }`}
        style={{
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
      >
        {/* Soft Pastel Kicker */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-[#FBCFE8] shadow-2xs mb-3">
          <span className="text-xs">🎀</span>
          <p className="text-[11px] uppercase tracking-widest font-bold text-[#DB2777]/80 font-display">
            Virtual Wardrobe & Outfit Styling
          </p>
          <span className="text-xs">✨</span>
        </div>

        {/* Bubbly Dreamy Pastel STYLEMATE Wordmark */}
        <h1 className="font-display font-bold text-6xl sm:text-7xl md:text-8xl tracking-wider flex items-center justify-center space-x-1 select-none drop-shadow-[0_10px_20px_rgba(244,114,182,0.2)]">
          {/* S - Soft Pastel Peach Rose */}
          <span
            className="inline-block text-[#FDA4AF] transition-transform hover:-translate-y-2 hover:rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            S
          </span>
          {/* T - Soft Pastel Apricot Peach */}
          <span
            className="inline-block text-[#FDBA74] transition-transform hover:-translate-y-2 hover:-rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            T
          </span>
          {/* Y - Creamy Buttercup Yellow */}
          <span
            className="inline-block text-[#FDE047] transition-transform hover:-translate-y-2 hover:rotate-3 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            Y
          </span>
          {/* L - Soft Pastel Mint */}
          <span
            className="inline-block text-[#86EFAC] transition-transform hover:-translate-y-2 hover:-rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            L
          </span>
          {/* E - Soft Powder Sky Blue */}
          <span
            className="inline-block text-[#7DD3FC] transition-transform hover:-translate-y-2 hover:rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            E
          </span>
          {/* M - Soft Periwinkle Lavender */}
          <span
            className="inline-block text-[#A5B4FC] transition-transform hover:-translate-y-2 hover:-rotate-3 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            M
          </span>
          {/* A - Soft Pastel Lilac */}
          <span
            className="inline-block text-[#D8B4FE] transition-transform hover:-translate-y-2 hover:rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            A
          </span>
          {/* T - Soft Cotton Candy Pink */}
          <span
            className="inline-block text-[#F9A8D4] transition-transform hover:-translate-y-2 hover:-rotate-2 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            T
          </span>
          {/* E - Soft Strawberry Cream */}
          <span
            className="inline-block text-[#F472B6] transition-transform hover:-translate-y-2 hover:rotate-3 duration-200"
            style={{ WebkitTextStroke: '6px #FFFFFF', paintOrder: 'stroke fill' }}
          >
            E
          </span>
        </h1>

        {/* The START Button in Dreamy Pastel Rosewater */}
        <div className="mt-8 relative group">
          {/* Soft Pastel Ambient Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FBCFE8] via-[#FDA4AF] to-[#FEF08A] opacity-60 group-hover:opacity-90 blur-md transition duration-300 group-hover:scale-105" />

          <button
            onClick={handleStartClick}
            disabled={isExiting}
            className="relative px-16 py-4 rounded-full font-display font-bold text-2xl md:text-3xl text-white tracking-widest transition-all duration-300 transform active:scale-95 group-hover:scale-105 shadow-[0_12px_28px_rgba(244,114,182,0.32)] cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, #FBCFE8 0%, #F472B6 60%, #EC4899 100%)',
              border: '2.5px solid rgba(255, 255, 255, 0.9)',
              textShadow: '0 2px 4px rgba(190, 24, 93, 0.25)',
            }}
          >
            START
          </button>
        </div>

        {/* Interactive sound hint in delicate pastel tone */}
        <div className="mt-4 text-xs font-semibold text-[#DB2777]/70 flex items-center justify-center gap-1.5">
          <span>✨</span>
          <span>Click to enter the fashion world with audio</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};
