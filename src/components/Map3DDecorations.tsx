import React from 'react';

/**
 * 1. 3D Translucent Pink Crystal Glass Heart (Matching Image 2)
 * Features realistic glass specular reflections, inner refraction facets,
 * depth shading, and interactive 3D floating tilt.
 */
export const CrystalGlassHeart3D: React.FC<{
  className?: string;
  size?: number;
  mouseOffset?: { x: number; y: number };
}> = ({ className = '', size = 42, mouseOffset = { x: 0, y: 0 } }) => {
  return (
    <div
      className={`relative inline-block transition-transform duration-300 ease-out select-none cursor-pointer group ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `perspective(800px) rotateX(${mouseOffset.y * -0.6}deg) rotateY(${mouseOffset.x * 0.6}deg) translateZ(15px)`,
      }}
    >
      {/* 3D Glass Drop Shadow with pink caustic glow */}
      <div className="absolute inset-1 rounded-full bg-pink-400/25 blur-md group-hover:bg-pink-400/40 transition-all duration-300" />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,114,182,0.4)] group-hover:scale-110 transition-transform duration-300"
      >
        <defs>
          {/* Glass Base Pink Body Gradient */}
          <radialGradient id="glassBody" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF1F7" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FCE7F3" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#F472B6" stopOpacity="0.75" />
            <stop offset="95%" stopColor="#EC4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#DB2777" stopOpacity="0.95" />
          </radialGradient>

          {/* Inner Refraction Facet Gradient */}
          <linearGradient id="innerRefraction" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FCE7F3" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#F472B6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#BE185D" stopOpacity="0.85" />
          </linearGradient>

          {/* Specular Glare Glow */}
          <linearGradient id="topGlare" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Outer Glass Crystal Heart */}
        <path
          d="M 100,175 C 25,125 15,65 52,35 C 78,14 94,30 100,44 C 106,30 122,14 148,35 C 185,65 175,125 100,175 Z"
          fill="url(#glassBody)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Outer Dark Glass Rim Bevel */}
        <path
          d="M 100,175 C 25,125 15,65 52,35 C 78,14 94,30 100,44 C 106,30 122,14 148,35 C 185,65 175,125 100,175 Z"
          fill="none"
          stroke="#F472B6"
          strokeWidth="6"
          opacity="0.5"
        />

        {/* Inner Carved Crystal Facet Heart (Image 2) */}
        <path
          d="M 100,152 C 45,112 36,68 62,45 C 80,30 94,42 100,52 C 106,42 120,30 138,45 C 164,68 155,112 100,152 Z"
          fill="url(#innerRefraction)"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* Deep Center Refraction Core */}
        <path
          d="M 100,132 C 60,102 54,72 72,55 C 84,44 94,52 100,60 C 106,52 116,44 128,55 C 146,72 140,102 100,132 Z"
          fill="#FFF"
          opacity="0.35"
        />

        {/* 3D Top Left Specular Curved Glare (Image 2) */}
        <ellipse
          cx="68"
          cy="48"
          rx="22"
          ry="11"
          transform="rotate(-30 68 48)"
          fill="url(#topGlare)"
        />

        {/* 3D Top Right Specular Glare (Image 2) */}
        <ellipse
          cx="132"
          cy="48"
          rx="22"
          ry="11"
          transform="rotate(30 132 48)"
          fill="url(#topGlare)"
        />

        {/* Left Edge Glass Rim Highlight */}
        <path
          d="M 35,68 C 30,95 55,130 92,160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Right Edge Rim Highlight */}
        <path
          d="M 165,68 C 170,95 145,130 108,160"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Bottom Tip Caustic Star Sparkle */}
        <circle cx="100" cy="162" r="3.5" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};

/**
 * 2. Dreamy Pastel Semi-Transparent Rainbow (Matching Image 3)
 */
export const DreamyPastelRainbow3D: React.FC<{
  className?: string;
  width?: number | string;
}> = ({ className = '', width = 300 }) => {
  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
    >
      <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-sm overflow-visible">
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Lavender / Violet Band */}
        <path
          d="M 40,220 A 160,115 0 0 1 360,220"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="15"
          opacity="0.6"
          filter="url(#softGlow)"
        />
        {/* Sky Aqua Band */}
        <path
          d="M 52,220 A 148,105 0 0 1 348,220"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="14"
          opacity="0.7"
        />
        {/* Mint Green Band */}
        <path
          d="M 64,220 A 136,95 0 0 1 336,220"
          fill="none"
          stroke="#86EFAC"
          strokeWidth="14"
          opacity="0.65"
        />
        {/* Butter Yellow Band */}
        <path
          d="M 76,220 A 124,85 0 0 1 324,220"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="14"
          opacity="0.75"
        />
        {/* Soft Peach Coral Band */}
        <path
          d="M 88,220 A 112,75 0 0 1 312,220"
          fill="none"
          stroke="#FDBA74"
          strokeWidth="14"
          opacity="0.7"
        />
        {/* Pastel Rose Pink Band */}
        <path
          d="M 100,220 A 100,65 0 0 1 300,220"
          fill="none"
          stroke="#F472B6"
          strokeWidth="14"
          opacity="0.7"
        />

        {/* Left Foot Cloud Puffs (anchored at Store 05) */}
        <g className="filter drop-shadow-[0_4px_8px_rgba(244,114,182,0.3)]">
          <circle cx="24" cy="222" r="16" fill="#FFFFFF" opacity="0.95" />
          <circle cx="44" cy="225" r="18" fill="#FFF5F7" opacity="0.95" />
          <circle cx="36" cy="212" r="14" fill="#FCE7F3" opacity="0.9" />
          <circle cx="58" cy="222" r="13" fill="#EDE9FE" opacity="0.85" />
          <path
            d="M 36,204 Q 36,208 40,208 Q 36,208 36,212 Q 36,208 32,208 Q 36,208 36,204 Z"
            fill="#FEF08A"
          />
        </g>

        {/* Right Foot Cloud Puffs (anchored at Store 04) */}
        <g className="filter drop-shadow-[0_4px_8px_rgba(129,140,248,0.3)]">
          <circle cx="340" cy="222" r="14" fill="#EEF2FF" opacity="0.85" />
          <circle cx="360" cy="225" r="18" fill="#FFFFFF" opacity="0.95" />
          <circle cx="376" cy="222" r="15" fill="#FFF5F7" opacity="0.95" />
          <circle cx="358" cy="212" r="14" fill="#FCE7F3" opacity="0.9" />
          <path
            d="M 364,204 Q 364,208 368,208 Q 364,208 364,212 Q 364,208 360,208 Q 364,208 364,204 Z"
            fill="#FEF08A"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Glowing Cloud with Star Bokeh Cluster (Matching Image 4)
 */
export const GlowingStarCloud3D: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 150 }) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: `${size}px`, height: `${size * 0.8}px` }}
    >
      <svg viewBox="0 0 240 180" className="w-full h-full overflow-visible">
        <defs>
          <filter id="bokehBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Colorful Glowing Bokeh Orbs */}
        <circle cx="70" cy="70" r="32" fill="#F472B6" opacity="0.45" filter="url(#bokehBlur)" />
        <circle cx="50" cy="95" r="26" fill="#FBBF24" opacity="0.4" filter="url(#bokehBlur)" />
        <circle cx="105" cy="85" r="38" fill="#60A5FA" opacity="0.45" filter="url(#bokehBlur)" />
        <circle cx="120" cy="55" r="28" fill="#C084FC" opacity="0.5" filter="url(#bokehBlur)" />
        <circle cx="170" cy="85" r="34" fill="#4ADE80" opacity="0.45" filter="url(#bokehBlur)" />
        <circle cx="160" cy="140" r="36" fill="#38BDF8" opacity="0.35" filter="url(#bokehBlur)" />
        <circle cx="128" cy="130" r="24" fill="#F472B6" opacity="0.4" filter="url(#bokehBlur)" />

        {/* Main Puffy White Cloud */}
        <g className="drop-shadow-[0_8px_16px_rgba(255,255,255,0.8)]">
          <path
            d="M 125,75 
               C 118,65 105,65 98,72 
               C 92,68 82,72 82,82 
               C 74,84 72,94 78,100 
               C 72,106 76,118 86,118 
               L 142,118 
               C 152,118 156,108 152,100 
               C 156,92 150,82 140,82 
               C 138,76 132,72 125,75 Z"
            fill="#FFFFFF"
            stroke="#FFF5FA"
            strokeWidth="3"
          />
        </g>

        {/* Scattered 5-Pointed White Stars */}
        <polygon
          points="90,48 94,59 106,60 97,68 100,79 90,73 80,79 83,68 74,60 86,59"
          fill="#FFFFFF"
          className="animate-twinkle"
          style={{ transformOrigin: '90px 63px', animationDelay: '0s' }}
        />
        <polygon
          points="48,72 50,78 57,79 52,84 54,90 48,86 42,90 44,84 39,79 46,78"
          fill="#FFFFFF"
          className="animate-twinkle"
          style={{ transformOrigin: '48px 81px', animationDelay: '1.2s' }}
        />
        <polygon
          points="122,34 124,39 129,40 125,44 126,49 122,46 118,49 119,44 115,40 120,39"
          fill="#FFFFFF"
          className="animate-twinkle"
          style={{ transformOrigin: '122px 41px', animationDelay: '0.6s' }}
        />
        <polygon
          points="174,65 178,78 192,79 181,89 185,102 174,95 163,102 167,89 156,79 170,78"
          fill="#FFFFFF"
          className="animate-twinkle"
          style={{ transformOrigin: '174px 83px', animationDelay: '0.3s' }}
        />
        <polygon
          points="170,118 173,127 182,128 175,134 178,143 170,138 162,143 165,134 158,128 167,127"
          fill="#FFFFFF"
          className="animate-twinkle"
          style={{ transformOrigin: '170px 130px', animationDelay: '1.8s' }}
        />
      </svg>
    </div>
  );
};

/**
 * 4. Fairytale Princess Spires Castle (Matching Image 5)
 * Well-proportioned soft pink fairytale castle silhouette.
 */
export const FairytaleCastle3D: React.FC<{
  className?: string;
  width?: number;
}> = ({ className = '', width = 95 }) => {
  return (
    <div
      className={`relative inline-block select-none transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: `${width}px` }}
    >
      <svg
        viewBox="0 0 160 210"
        className="w-full h-auto drop-shadow-[0_10px_18px_rgba(244,114,182,0.35)]"
      >
        <defs>
          <linearGradient id="castlePink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9A8D4" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>

        {/* Central Spire with Flag */}
        <polygon points="86,45 88,105 84,105" fill="url(#castlePink)" />
        <polygon points="86,45 80,105 92,105" fill="url(#castlePink)" />
        <path d="M 86,45 L 98,50 L 86,55 Z" fill="#F472B6" />

        {/* Left Spire with Flag */}
        <polygon points="68,60 62,110 74,110" fill="url(#castlePink)" />
        <path d="M 68,60 L 60,65 L 68,70 Z" fill="#F472B6" />

        {/* Far Left Spire with Flag */}
        <polygon points="54,80 46,120 60,120" fill="url(#castlePink)" />
        <path d="M 54,80 L 46,85 L 54,90 Z" fill="#F472B6" />

        {/* Right side tower with ball finial */}
        <polygon points="98,90 92,125 104,125" fill="url(#castlePink)" />
        <circle cx="98" cy="90" r="3" fill="#F9A8D4" />

        {/* Castle Walls & Turret Body */}
        <rect x="42" y="120" width="18" height="60" rx="2" fill="url(#castlePink)" />
        <polygon points="38,120 42,130 60,130 64,120" fill="#F472B6" />
        <circle cx="38" cy="120" r="2.5" fill="#FBCFE8" />

        <rect x="108" y="125" width="18" height="55" rx="2" fill="url(#castlePink)" />
        <polygon points="104,125 108,135 126,135 130,125" fill="#F472B6" />
        <circle cx="120" cy="122" r="2.5" fill="#FBCFE8" />

        <rect x="52" y="105" width="56" height="75" fill="url(#castlePink)" />

        {/* Battlement Crests */}
        <rect x="36" y="130" width="88" height="15" fill="#F472B6" />
        <rect x="38" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="50" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="62" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="74" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="86" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="98" y="124" width="6" height="8" fill="#F472B6" />
        <rect x="110" y="124" width="6" height="8" fill="#F472B6" />

        <rect x="32" y="145" width="96" height="45" fill="url(#castlePink)" />
        <path d="M 70,190 A 10,10 0 0 1 90,190 L 90,190 L 70,190 Z" fill="#DB2777" opacity="0.3" />
      </svg>
    </div>
  );
};

/**
 * 5. Magical Flying Pixie Fairy (Matching Image 6)
 * Scaled to be dainty, cute, and proportionate between Korean & Coquette!
 */
export const MagicalFairy3D: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 64 }) => {
  return (
    <div
      className={`relative inline-block select-none transition-transform duration-300 hover:scale-110 cursor-pointer ${className}`}
      style={{ width: `${size}px`, height: `${size * 1.15}px` }}
    >
      <svg
        viewBox="0 0 160 210"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,114,182,0.45)] overflow-visible"
      >
        <defs>
          <linearGradient id="fairyBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="40%" stopColor="#FB7185" />
            <stop offset="75%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FCE7F3" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Wings */}
        <path
          d="M 68,68 C 50,30 35,2 38,1 C 42,0 72,25 76,64 Z"
          fill="url(#wingGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        <path
          d="M 85,65 C 98,35 125,24 126,26 C 128,29 105,62 88,72 Z"
          fill="url(#wingGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        <path
          d="M 65,72 C 45,75 52,98 62,94 C 68,92 70,82 68,76 Z"
          fill="url(#wingGrad)"
          stroke="#FFFFFF"
          strokeWidth="1"
        />

        {/* Head & Bun */}
        <circle cx="78" cy="46" r="10" fill="url(#fairyBody)" />
        <circle cx="75" cy="36" r="6" fill="url(#fairyBody)" />

        {/* Torso & Skirt */}
        <path
          d="M 72,56 C 74,68 76,78 70,88 C 65,96 75,98 84,92 C 86,84 84,68 84,56 Z"
          fill="url(#fairyBody)"
        />

        {/* Arms */}
        <path
          d="M 68,62 C 55,68 45,72 38,72 C 37,70 46,65 62,58 Z"
          fill="url(#fairyBody)"
        />
        <path
          d="M 82,58 C 92,62 104,58 108,52 L 105,48 C 98,54 88,56 82,54 Z"
          fill="url(#fairyBody)"
        />

        {/* Magic Wand */}
        <line x1="104" y1="52" x2="124" y2="38" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />

        {/* Flying Legs */}
        <path
          d="M 74,90 C 78,110 82,135 84,160 C 86,180 88,195 90,200 C 92,195 90,175 88,155 C 86,135 82,110 80,90 Z"
          fill="url(#fairyBody)"
        />

        {/* Wand Starburst Sparkles */}
        <g className="animate-twinkle" style={{ transformOrigin: '124px 38px' }}>
          <polygon
            points="124,28 126,35 133,37 127,40 125,47 123,40 116,38 123,36"
            fill="#FBBF24"
          />
          <circle cx="124.5" cy="37.5" r="2.5" fill="#FFFFFF" />
          <polygon
            points="138,34 139,38 143,39 140,41 139,45 138,41 134,40 137,38"
            fill="#FDE047"
          />
          <polygon
            points="132,48 133,52 137,53 134,55 133,59 132,55 128,54 131,52"
            fill="#FCD34D"
          />
          <circle cx="144" cy="42" r="2" fill="#FEF08A" />
          <circle cx="136" cy="56" r="2" fill="#FEF08A" />
          <circle cx="128" cy="62" r="1.5" fill="#F472B6" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 6. High-Fidelity 4-Point & 8-Point Starlight Sparkles
 * For decorating the map and page with magical twinkling colorful stardust!
 */
export const StarlightSparkle: React.FC<{
  size?: number;
  color?: 'gold' | 'pink' | 'white' | 'cyan' | 'purple' | 'coral' | 'emerald';
  delay?: string;
  className?: string;
}> = ({ size = 18, color = 'gold', delay = '0s', className = '' }) => {
  const colorMap: Record<string, { fill: string; stroke: string; glow: string }> = {
    gold: { fill: '#FBBF24', stroke: '#FEF08A', glow: 'rgba(251,191,36,0.7)' },
    pink: { fill: '#F472B6', stroke: '#FDF2F8', glow: 'rgba(244,114,182,0.7)' },
    white: { fill: '#FFFFFF', stroke: '#E0F2FE', glow: 'rgba(255,255,255,0.85)' },
    cyan: { fill: '#38BDF8', stroke: '#E0F2FE', glow: 'rgba(56,189,248,0.7)' },
    purple: { fill: '#C084FC', stroke: '#F3E8FF', glow: 'rgba(192,132,252,0.7)' },
    coral: { fill: '#FB923C', stroke: '#FFEDD5', glow: 'rgba(251,146,60,0.7)' },
    emerald: { fill: '#34D399', stroke: '#D1FAE5', glow: 'rgba(52,211,153,0.7)' },
  };
  const activeColor = colorMap[color] || colorMap.gold;

  return (
    <div
      className={`absolute pointer-events-none select-none animate-twinkle ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: delay,
        filter: `drop-shadow(0 0 8px ${activeColor.glow})`,
      }}
    >
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {/* 4-point Diamond Starburst */}
        <polygon
          points="20,0 23,16 39,20 23,24 20,40 17,24 1,20 17,16"
          fill={activeColor.fill}
          stroke={activeColor.stroke}
          strokeWidth="1.2"
        />
        {/* Glowing Center Core */}
        <circle cx="20" cy="20" r="3.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

/**
 * Colorful Pastel 3D Fluffy Cloud for page decor outside the map
 */
export const ColorfulPastelCloud3D: React.FC<{
  className?: string;
  width?: number;
  palette?: 'pink' | 'lavender' | 'cyan' | 'yellow' | 'peach' | 'mint';
}> = ({ className = '', width = 200, palette = 'pink' }) => {
  const themes = {
    pink: {
      gradStart: '#FFF5F8',
      gradMid: '#EFCFE3',
      gradEnd: '#E27396',
      shadow: 'rgba(226,115,150,0.3)',
      highlight: '#FFFFFF',
    },
    lavender: {
      gradStart: '#FFF8FC',
      gradMid: '#EFCFE3',
      gradEnd: '#EB9AB2',
      shadow: 'rgba(235,154,178,0.3)',
      highlight: '#FFFFFF',
    },
    cyan: {
      gradStart: '#F4FAFA',
      gradMid: '#E2F3F5',
      gradEnd: '#B3DEE2',
      shadow: 'rgba(179,222,226,0.35)',
      highlight: '#FFFFFF',
    },
    yellow: {
      gradStart: '#FDFEF8',
      gradMid: '#F5F9E9',
      gradEnd: '#ECF2D8',
      shadow: 'rgba(236,242,216,0.4)',
      highlight: '#FFFFFF',
    },
    peach: {
      gradStart: '#FFF7F9',
      gradMid: '#F9E1EB',
      gradEnd: '#EB9AB2',
      shadow: 'rgba(235,154,178,0.3)',
      highlight: '#FFFFFF',
    },
    mint: {
      gradStart: '#F8FCF3',
      gradMid: '#ECF2D8',
      gradEnd: '#B3DEE2',
      shadow: 'rgba(179,222,226,0.3)',
      highlight: '#FFFFFF',
    },
  }[palette];

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{
        width: `${width}px`,
        height: `${width * 0.58}px`,
        filter: `drop-shadow(0 14px 28px ${themes.shadow})`,
      }}
    >
      <svg viewBox="0 0 280 160" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`cloudGrad_${palette}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={themes.gradStart} />
            <stop offset="50%" stopColor={themes.gradMid} />
            <stop offset="100%" stopColor={themes.gradEnd} stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id={`cloudHighlight_${palette}`} cx="45%" cy="30%" r="60%">
            <stop offset="0%" stopColor={themes.highlight} stopOpacity="0.9" />
            <stop offset="70%" stopColor={themes.gradMid} stopOpacity="0.5" />
            <stop offset="100%" stopColor={themes.gradEnd} stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Ambient Under-Glow */}
        <ellipse cx="140" cy="90" rx="110" ry="45" fill={themes.gradEnd} opacity="0.15" />

        {/* Base Billow Puffs */}
        <circle cx="80" cy="100" r="42" fill={`url(#cloudGrad_${palette})`} />
        <circle cx="140" cy="95" r="50" fill={`url(#cloudGrad_${palette})`} />
        <circle cx="200" cy="100" r="40" fill={`url(#cloudGrad_${palette})`} />
        <circle cx="235" cy="108" r="30" fill={`url(#cloudGrad_${palette})`} />
        <circle cx="45" cy="108" r="30" fill={`url(#cloudGrad_${palette})`} />

        {/* High Top Volumetric Puffs */}
        <circle cx="115" cy="65" r="40" fill={`url(#cloudGrad_${palette})`} />
        <circle cx="170" cy="68" r="38" fill={`url(#cloudGrad_${palette})`} />

        {/* 3D Specular Light Highlights */}
        <ellipse cx="110" cy="56" rx="26" ry="18" fill={`url(#cloudHighlight_${palette})`} />
        <ellipse cx="165" cy="58" rx="24" ry="16" fill={`url(#cloudHighlight_${palette})`} />
        <ellipse cx="75" cy="90" rx="22" ry="14" fill={`url(#cloudHighlight_${palette})`} />
        <ellipse cx="140" cy="85" rx="30" ry="18" fill={`url(#cloudHighlight_${palette})`} />
        <ellipse cx="200" cy="92" rx="22" ry="14" fill={`url(#cloudHighlight_${palette})`} />
      </svg>
    </div>
  );
};

/**
 * 7. Realistic Fluffy Cumulus Cloud (Matching Image 1 from latest prompt)
 * Soft, billowy, realistic volumetric 3D cloud formation designed
 * to connect the rainbow down to element 04 (Office Chic).
 */
export const RealisticFluffyCloud3D: React.FC<{
  className?: string;
  width?: number;
}> = ({ className = '', width = 220 }) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: `${width}px`, height: `${width * 0.58}px` }}
    >
      <svg
        viewBox="0 0 320 185"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,114,182,0.18)] overflow-visible"
      >
        <defs>
          {/* Volumetric Soft Cloud Gradient */}
          <radialGradient id="cloudVolume" cx="48%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor="#FFF5FA" stopOpacity="0.96" />
            <stop offset="85%" stopColor="#F1F5F9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.75" />
          </radialGradient>

          {/* Under-cloud Ambient Shadow */}
          <linearGradient id="cloudUnder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="80%" stopColor="#E2E8F0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.75" />
          </linearGradient>

          {/* Edge Feathering Blur */}
          <filter id="fluffyFeather" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlowCloud" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Outer Atmospheric Aura Glow */}
        <ellipse cx="160" cy="100" rx="140" ry="70" fill="#FFF1F7" opacity="0.6" filter="url(#softGlowCloud)" />

        {/* Layer 1: Base Billowy Puffs (Bottom & Mid) */}
        <g filter="url(#fluffyFeather)">
          <circle cx="95" cy="115" r="50" fill="url(#cloudVolume)" />
          <circle cx="165" cy="110" r="58" fill="url(#cloudVolume)" />
          <circle cx="230" cy="120" r="48" fill="url(#cloudVolume)" />
          <circle cx="270" cy="125" r="36" fill="url(#cloudVolume)" />
          <circle cx="50" cy="125" r="38" fill="url(#cloudVolume)" />

          {/* Layer 2: High Top Cumulus Towers (Image 1) */}
          <circle cx="165" cy="65" r="48" fill="url(#cloudVolume)" />
          <circle cx="120" cy="80" r="46" fill="url(#cloudVolume)" />
          <circle cx="205" cy="82" r="44" fill="url(#cloudVolume)" />
          <circle cx="245" cy="95" r="38" fill="url(#cloudVolume)" />
          <circle cx="85" cy="95" r="38" fill="url(#cloudVolume)" />

          {/* Layer 3: Front Bright Highlights (Soft white billows) */}
          <ellipse cx="155" cy="55" rx="34" ry="26" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="110" cy="75" rx="32" ry="24" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="200" cy="76" rx="30" ry="22" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="230" cy="105" rx="26" ry="18" fill="#FFFFFF" opacity="0.85" />
          <ellipse cx="80" cy="105" rx="28" ry="20" fill="#FFFFFF" opacity="0.85" />

          {/* Subtle Base Underlighting Shadow */}
          <path
            d="M 30,135 C 40,155 90,165 160,165 C 230,165 280,155 295,135 C 270,165 200,175 160,175 C 100,175 45,165 30,135 Z"
            fill="url(#cloudUnder)"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 8. Stardust Nebula Mist & Glitter Stream (Matching Image 2 from latest prompt)
 * Features a glowing horizontal starlight fog with cross-flare lens stars,
 * glistening particles, and ethereal celestial ambiance.
 */
export const StardustMistGlow: React.FC<{
  className?: string;
  width?: number;
}> = ({ className = '', width = 360 }) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: `${width}px`, height: `${width * 0.28}px` }}
    >
      <svg
        viewBox="0 0 400 110"
        className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
      >
        <defs>
          {/* Horizontal Mist Gradient */}
          <linearGradient id="mistGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFF1F7" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#FCE7F3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Diffused Cloud Filter */}
          <filter id="mistBlur" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Diffused Horizontal Luminous Mist Streams (Image 2) */}
        <ellipse cx="200" cy="55" rx="160" ry="18" fill="url(#mistGrad)" filter="url(#mistBlur)" />
        <ellipse cx="210" cy="52" rx="120" ry="10" fill="#FFFFFF" opacity="0.5" filter="url(#mistBlur)" />
        <ellipse cx="180" cy="58" rx="140" ry="14" fill="#FCE7F3" opacity="0.4" filter="url(#mistBlur)" />

        {/* Central Luminous Light Flare Streak */}
        <path
          d="M 60,55 Q 200,48 340,55 Q 200,62 60,55 Z"
          fill="#FFFFFF"
          opacity="0.65"
        />

        {/* Cross-Flare Stars (Image 2 Sparkling Stars with Horizontal & Vertical Beams) */}
        {[
          { cx: 200, cy: 52, r: 24, delay: '0s' },
          { cx: 275, cy: 45, r: 18, delay: '0.4s' },
          { cx: 125, cy: 48, r: 16, delay: '0.8s' },
          { cx: 335, cy: 54, r: 15, delay: '1.2s' },
          { cx: 70, cy: 55, r: 14, delay: '1.6s' },
          { cx: 240, cy: 62, r: 12, delay: '0.6s' },
          { cx: 160, cy: 58, r: 12, delay: '1.4s' },
          { cx: 295, cy: 68, r: 10, delay: '0.2s' },
          { cx: 95, cy: 60, r: 10, delay: '1.8s' },
        ].map((star, i) => (
          <g
            key={i}
            className="animate-twinkle"
            style={{ transformOrigin: `${star.cx}px ${star.cy}px`, animationDelay: star.delay }}
          >
            {/* Horizontal Light Flare Ray */}
            <line
              x1={star.cx - star.r * 1.6}
              y1={star.cy}
              x2={star.cx + star.r * 1.6}
              y2={star.cy}
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Vertical Light Flare Ray */}
            <line
              x1={star.cx}
              y1={star.cy - star.r * 1.4}
              x2={star.cx}
              y2={star.cy + star.r * 1.4}
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Diagonal Small Flare Rays */}
            <line
              x1={star.cx - star.r * 0.6}
              y1={star.cy - star.r * 0.6}
              x2={star.cx + star.r * 0.6}
              y2={star.cy + star.r * 0.6}
              stroke="#FEF08A"
              strokeWidth="1"
            />
            <line
              x1={star.cx - star.r * 0.6}
              y1={star.cy + star.r * 0.6}
              x2={star.cx + star.r * 0.6}
              y2={star.cy - star.r * 0.6}
              stroke="#FEF08A"
              strokeWidth="1"
            />
            {/* Bright Center Core */}
            <circle cx={star.cx} cy={star.cy} r={star.r * 0.16 + 1.2} fill="#FFFFFF" />
          </g>
        ))}

        {/* Scattered Micro-Glitter Stardust Specks (Image 2) */}
        {[
          { cx: 110, cy: 40, r: 1.5 },
          { cx: 140, cy: 65, r: 1.2 },
          { cx: 155, cy: 44, r: 1.8 },
          { cx: 175, cy: 62, r: 1.4 },
          { cx: 185, cy: 42, r: 2 },
          { cx: 215, cy: 45, r: 1.5 },
          { cx: 228, cy: 66, r: 1.6 },
          { cx: 250, cy: 38, r: 1.4 },
          { cx: 265, cy: 64, r: 1.8 },
          { cx: 310, cy: 46, r: 1.3 },
          { cx: 320, cy: 68, r: 1.5 },
          { cx: 80, cy: 65, r: 1.2 },
          { cx: 360, cy: 58, r: 1.2 },
        ].map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.cx}
            cy={pt.cy}
            r={pt.r}
            fill="#FFFFFF"
            opacity="0.9"
            className="animate-twinkle"
            style={{ animationDelay: `${(idx * 0.23) % 2}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

/**
 * 4. 3D Glass / Candy Jelly Star (Matching Reference Image 1)
 * Organic pillowy 5-pointed star with rounded candy tips, thick 3D glass specular bevel,
 * internal refraction, and realistic depth blur option.
 */
export const GlassJellyStar3D: React.FC<{
  size?: number;
  color?: 'pink' | 'mint' | 'peach';
  blur?: number;
  rotate?: number;
  className?: string;
  mouseOffset?: { x: number; y: number };
}> = ({
  size = 54,
  color = 'mint',
  blur = 0,
  rotate = 0,
  className = '',
  mouseOffset,
}) => {
  const colorSchemes = {
    mint: {
      bodyStart: '#F0FDF4',
      bodyMid: '#6EE7B7',
      bodyEnd: '#059669',
      rim: '#A7F3D0',
      dropShadow: 'rgba(16, 185, 129, 0.35)',
    },
    pink: {
      bodyStart: '#FFF1F2',
      bodyMid: '#F472B6',
      bodyEnd: '#BE185D',
      rim: '#FBCFE8',
      dropShadow: 'rgba(244, 114, 182, 0.35)',
    },
    peach: {
      bodyStart: '#FEFCE8',
      bodyMid: '#FDE047',
      bodyEnd: '#EA580C',
      rim: '#FED7AA',
      dropShadow: 'rgba(251, 146, 60, 0.35)',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.mint;

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transform: mouseOffset
          ? `perspective(800px) rotateX(${mouseOffset.y * -0.4}deg) rotateY(${mouseOffset.x * 0.4}deg) rotate(${rotate}deg)`
          : `rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 10px 18px ${scheme.dropShadow})`,
        }}
      >
        <defs>
          <radialGradient id={`starBody-${color}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor={scheme.bodyStart} stopOpacity="0.95" />
            <stop offset="45%" stopColor={scheme.bodyMid} stopOpacity="0.85" />
            <stop offset="90%" stopColor={scheme.bodyEnd} stopOpacity="0.9" />
            <stop offset="100%" stopColor={scheme.bodyEnd} stopOpacity="1" />
          </radialGradient>
          <linearGradient id={`starGlare-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id={`starRim-${color}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor={scheme.rim} stopOpacity="0.4" />
            <stop offset="100%" stopColor={scheme.bodyEnd} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Puffed 5-point organic candy star base (Image 1) */}
        <path
          d="M 100,24 C 110,24 118,60 128,70 C 138,80 172,78 180,86 C 187,94 167,122 163,134 C 159,146 174,174 167,182 C 160,189 128,172 116,174 C 104,176 82,198 74,195 C 66,192 68,158 61,148 C 54,136 24,126 22,116 C 20,106 52,90 58,80 C 64,70 66,34 76,28 C 84,24 92,24 100,24 Z"
          fill={`url(#starBody-${color})`}
          stroke={`url(#starRim-${color})`}
          strokeWidth="3"
        />

        {/* 3D Inner Volume & Facet Contour */}
        <path
          d="M 100,38 C 107,38 114,68 122,76 C 130,84 158,82 164,88 C 170,94 154,116 151,126 C 148,136 160,158 154,164 C 148,170 122,156 112,158 C 102,160 84,178 78,175 C 72,172 74,144 68,136 C 62,126 38,118 36,110 C 34,102 60,88 65,80 C 70,72 72,44 80,40 C 86,38 93,38 100,38 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          opacity="0.45"
        />

        {/* 3D Top Curved Specular Glare (Glass Pillow Highlight) */}
        <path
          d="M 92,34 C 98,34 102,48 108,54 C 114,60 134,60 140,64 C 134,70 114,72 108,68 C 96,60 86,44 92,34 Z"
          fill={`url(#starGlare-${color})`}
        />

        {/* Specular pinpoint dots on lobes */}
        <ellipse cx="68" cy="88" rx="8" ry="4" transform="rotate(-30 68 88)" fill="#FFFFFF" opacity="0.75" />
        <circle cx="168" cy="98" r="3.5" fill="#FFFFFF" opacity="0.8" />
        <circle cx="82" cy="180" r="3" fill="#FFFFFF" opacity="0.65" />
      </svg>
    </div>
  );
};

/**
 * 5. 3D Glossy Pearl Sphere (Matching Reference Image 1)
 * High-shine iridescent pearl bead with specular glare and caustic rim bounce light.
 */
export const GlossyPearlSphere3D: React.FC<{
  size?: number;
  color?: 'pink' | 'lavender' | 'cream';
  blur?: number;
  className?: string;
}> = ({ size = 28, color = 'pink', blur = 0, className = '' }) => {
  const colorSchemes = {
    pink: {
      light: '#FFF0F5',
      mid: '#FBCFE8',
      shadow: '#F472B6',
      rim: '#BE185D',
      glow: 'rgba(244, 114, 182, 0.35)',
    },
    lavender: {
      light: '#FAF5FF',
      mid: '#E9D5FF',
      shadow: '#C084FC',
      rim: '#7E22CE',
      glow: 'rgba(192, 132, 252, 0.35)',
    },
    cream: {
      light: '#FFFBEB',
      mid: '#FEF08A',
      shadow: '#FBBF24',
      rim: '#D97706',
      glow: 'rgba(251, 191, 36, 0.35)',
    },
  };

  const s = colorSchemes[color] || colorSchemes.pink;

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: `drop-shadow(0 6px 12px ${s.glow})`,
        }}
      >
        <defs>
          <radialGradient id={`pearlGrad-${color}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor={s.light} stopOpacity="0.95" />
            <stop offset="60%" stopColor={s.mid} stopOpacity="0.9" />
            <stop offset="88%" stopColor={s.shadow} stopOpacity="0.95" />
            <stop offset="100%" stopColor={s.rim} stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* 3D Sphere Body */}
        <circle cx="50" cy="50" r="44" fill={`url(#pearlGrad-${color})`} />

        {/* Specular White Glint (Top Left) */}
        <ellipse cx="36" cy="32" rx="14" ry="7" transform="rotate(-30 36 32)" fill="#FFFFFF" opacity="0.85" />
        <circle cx="28" cy="24" r="3.5" fill="#FFFFFF" opacity="0.95" />

        {/* Bottom-right rim reflection */}
        <path
          d="M 60,86 A 42,42 0 0 0 88,60"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </div>
  );
};

/**
 * 6. 3D Soft Satin/Porcelain Pink Ribbon Bow (Matching Reference Image 2)
 * Sculptural ribbon with puffy loops, central knot, and flowing draped tails.
 */
export const PastelRibbonBow3D: React.FC<{
  size?: number;
  blur?: number;
  rotate?: number;
  className?: string;
}> = ({ size = 68, blur = 0, rotate = 0, className = '' }) => {
  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size * 0.9}px`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg
        viewBox="0 0 200 180"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(244,114,182,0.3)]"
      >
        <defs>
          {/* Main Loop Soft Pink Velvet Gradient */}
          <linearGradient id="bowLoopLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF5F7" />
            <stop offset="40%" stopColor="#FCE7F3" />
            <stop offset="80%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="bowLoopRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF5F7" />
            <stop offset="40%" stopColor="#FCE7F3" />
            <stop offset="80%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          {/* Loop Inner Shadow Depth */}
          <linearGradient id="loopHole" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BE185D" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
          {/* Center Knot Pillowy Gradient */}
          <radialGradient id="bowKnot" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#FCE7F3" />
            <stop offset="85%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#BE185D" />
          </radialGradient>
          {/* Ribbon Tails Gradient */}
          <linearGradient id="bowTail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCE7F3" />
            <stop offset="60%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
        </defs>

        {/* 1. Left Draped Tail (Behind) */}
        <path
          d="M 90,95 C 80,120 62,145 52,168 L 78,160 L 98,172 C 94,145 92,118 90,95 Z"
          fill="url(#bowTail)"
          opacity="0.9"
        />

        {/* 2. Right Draped Tail (Behind) */}
        <path
          d="M 110,95 C 120,120 138,145 148,168 L 122,160 L 102,172 C 106,145 108,118 110,95 Z"
          fill="url(#bowTail)"
          opacity="0.9"
        />

        {/* 3. Left Bow Loop (Volumetric 3D Wing) */}
        <path
          d="M 96,80 C 70,68 35,52 24,70 C 14,86 28,118 64,115 C 82,114 94,96 96,80 Z"
          fill="url(#bowLoopLeft)"
        />
        {/* Left Loop Crease / Inner Fold */}
        <path
          d="M 38,82 C 48,76 72,82 86,94 C 74,98 52,96 38,82 Z"
          fill="url(#loopHole)"
          opacity="0.75"
        />
        {/* Left Loop Top Highlight */}
        <path
          d="M 32,70 C 44,58 72,70 94,80"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 4. Right Bow Loop (Volumetric 3D Wing) */}
        <path
          d="M 104,80 C 130,68 165,52 176,70 C 186,86 172,118 136,115 C 118,114 106,96 104,80 Z"
          fill="url(#bowLoopRight)"
        />
        {/* Right Loop Crease / Inner Fold */}
        <path
          d="M 162,82 C 152,76 128,82 114,94 C 126,98 148,96 162,82 Z"
          fill="url(#loopHole)"
          opacity="0.75"
        />
        {/* Right Loop Top Highlight */}
        <path
          d="M 168,70 C 156,58 128,70 106,80"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 5. Center Puffed Knot (Forefront) */}
        <ellipse cx="100" cy="85" rx="16" ry="19" fill="url(#bowKnot)" />
        {/* Knot Fold Highlights */}
        <path
          d="M 94,72 Q 100,74 106,72"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 92,94 Q 100,98 108,94"
          fill="none"
          stroke="#BE185D"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * 7. 3D Iridescent Soap Bubble (Matching Reference Image 3)
 * Translucent glass sphere with rainbow prismatic sheen, specular glare, and depth blur.
 */
export const IridescentBubble3D: React.FC<{
  size?: number;
  blur?: number;
  opacity?: number;
  className?: string;
}> = ({ size = 48, blur = 0, opacity = 0.85, className = '' }) => {
  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(192,132,252,0.25)]">
        <defs>
          {/* Prismatic Rainbow Sheen Gradient */}
          <linearGradient id="bubbleRainbow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#DDD6FE" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#FBCFE8" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#FEF08A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.4" />
          </linearGradient>

          {/* Glowing Translucent Rim */}
          <linearGradient id="bubbleRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#F472B6" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0.75" />
          </linearGradient>

          {/* Top Left Specular Glare */}
          <radialGradient id="bubbleGlare" cx="30%" cy="26%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* 1. Translucent Base Bubble */}
        <circle cx="50" cy="50" r="44" fill="url(#bubbleRainbow)" />

        {/* 2. Glassy Rim Contour */}
        <circle cx="50" cy="50" r="44" fill="none" stroke="url(#bubbleRim)" strokeWidth="2.5" />

        {/* 3. Crescent Specular Reflection (Top Left Arc) */}
        <path
          d="M 22,40 A 38,38 0 0 1 56,14"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Secondary small pinpoint glare */}
        <circle cx="28" cy="46" r="2.5" fill="#FFFFFF" opacity="0.85" />

        {/* 4. Soft Inner Core Glow */}
        <circle cx="48" cy="48" r="30" fill="url(#bubbleGlare)" opacity="0.5" />

        {/* 5. Bottom Right Rim Bounce Light */}
        <path
          d="M 48,88 A 40,40 0 0 0 84,54"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * 8. 3D Starlight Sparkle Bokeh Dust (Matching Reference Image 4)
 * 4-point cross starlight flare with radiant halo and soft micro-sparkles.
 */
export const StarlightGlimmerDust3D: React.FC<{
  size?: number;
  color?: 'white' | 'gold' | 'pink' | 'cyan';
  blur?: number;
  className?: string;
}> = ({ size = 36, color = 'white', blur = 0, className = '' }) => {
  const colorMap = {
    white: { core: '#FFFFFF', glow: '#FFFFFF', halo: 'rgba(255,255,255,0.7)' },
    gold: { core: '#FEF9C3', glow: '#FDE047', halo: 'rgba(253,224,71,0.65)' },
    pink: { core: '#FFF1F2', glow: '#F472B6', halo: 'rgba(244,114,182,0.65)' },
    cyan: { core: '#F0FDFA', glow: '#38BDF8', halo: 'rgba(56,189,248,0.65)' },
  };

  const c = colorMap[color] || colorMap.white;

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Soft Radial Halo */}
        <circle cx="50" cy="50" r="32" fill={c.halo} opacity="0.3" filter="blur(4px)" />

        {/* Vertical Beam */}
        <ellipse cx="50" cy="50" rx="3" ry="46" fill={c.glow} opacity="0.85" />
        {/* Horizontal Beam */}
        <ellipse cx="50" cy="50" rx="46" ry="3" fill={c.glow} opacity="0.85" />

        {/* Diagonal Beams */}
        <ellipse cx="50" cy="50" rx="2" ry="24" transform="rotate(45 50 50)" fill={c.glow} opacity="0.6" />
        <ellipse cx="50" cy="50" rx="2" ry="24" transform="rotate(-45 50 50)" fill={c.glow} opacity="0.6" />

        {/* Brilliant Core */}
        <circle cx="50" cy="50" r="5" fill={c.core} />

        {/* Micro-sparkle dust specks (Image 4) */}
        <circle cx="28" cy="32" r="1.5" fill={c.core} opacity="0.75" />
        <circle cx="72" cy="36" r="1.2" fill={c.core} opacity="0.7" />
        <circle cx="68" cy="68" r="1.8" fill={c.core} opacity="0.8" />
        <circle cx="34" cy="66" r="1.3" fill={c.core} opacity="0.65" />
      </svg>
    </div>
  );
};

