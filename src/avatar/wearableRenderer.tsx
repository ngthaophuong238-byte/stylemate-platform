import React from 'react';
import { Product } from '../types';

/**
 * STYLEMATE Avatar Wearable SVG Renderer
 * 
 * Shared coordinate space: 373 x 568 (identical to base.png and hair/*.png).
 * 
 * Anatomical Reference Points:
 * - Canvas: 373 x 568, Center X: 186.5
 * - Head / Hair: y = 20..114
 * - Neck / Necklace: y = 115..145, Butterfly necklace at (186.5, 118)
 * - Shoulders: y = 145..155, X = 148..225
 * - Bust / Torso: y = 154..226, X = 152..220
 * - Waist: y = 226..244, X = 160..212 (waist indentation at y = 228)
 * - Hips / Crotch: y = 244..290, widest hips X = 140..232, crotch fork at (186.5, 290)
 * - Thighs: y = 290..385, Left center 166, Right center 207
 * - Knees: y = 385, Left 152..180, Right 192..220
 * - Flared Hem: y = 526..530, Left flare 134..184, Right flare 188..238
 * - Shoes / Feet: y = 526..558, Left 148..184, Right 188..224, Sole bottom at y = 556..558
 * - Hands: Viewer left (120..136, 280..305), Viewer right (238..254, 280..305)
 * - Left Floor Bag: x = 70..146, y = 380..478, Handle loops to y ~ 310
 */

// Helper to determine if a bottom item is a flared trouser
export const isFlaredBottom = (product?: Product): boolean => {
  if (!product) return false;
  const icon = product.visualIcon || '';
  const name = (product.name || '').toLowerCase();
  return (
    icon.includes('flare') ||
    icon.includes('bell') ||
    icon.includes('wide') ||
    icon.includes('trouser') ||
    icon.includes('jean') ||
    name.includes('flare') ||
    name.includes('bell-bottom') ||
    name.includes('trousers') ||
    name.includes('wide-leg') ||
    name.includes('pants') ||
    name.includes('jeans')
  );
};

// ============================================================================
// 1. SVG PATTERNS & GRADIENTS DEFINITIONS
// ============================================================================
export const AvatarDefs: React.FC = () => {
  return (
    <>
      {/* --- Filter: Soft Fabric Drop Shadow --- */}
      <filter id="garmentShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#3B0716" floodOpacity="0.18" />
      </filter>
      <filter id="shoeShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1F1524" floodOpacity="0.25" />
      </filter>
      <filter id="bagFloorShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>

      {/* --- Sepia Tan Tartan Plaid (Reference B: Sepia Tan Tartan Corset) --- */}
      <pattern id="tartanSepia" width="28" height="28" patternUnits="userSpaceOnUse">
        {/* Base warm caramel/tan background */}
        <rect width="28" height="28" fill="#A87544" />
        {/* Dark chocolate brown bands */}
        <rect x="0" y="0" width="28" height="8" fill="#4A2E1B" fillOpacity="0.75" />
        <rect x="0" y="0" width="8" height="28" fill="#4A2E1B" fillOpacity="0.75" />
        {/* Medium amber / sepia cross stripes */}
        <rect x="14" y="0" width="4" height="28" fill="#C99456" fillOpacity="0.65" />
        <rect x="0" y="14" width="28" height="4" fill="#C99456" fillOpacity="0.65" />
        {/* Thin highlight pinstripes in cream and burnt gold */}
        <line x1="4" y1="0" x2="4" y2="28" stroke="#FDE8C7" strokeWidth="0.8" opacity="0.85" />
        <line x1="0" y1="4" x2="28" y2="4" stroke="#FDE8C7" strokeWidth="0.8" opacity="0.85" />
        <line x1="16" y1="0" x2="16" y2="28" stroke="#D97706" strokeWidth="0.8" opacity="0.9" />
        <line x1="0" y1="16" x2="28" y2="16" stroke="#D97706" strokeWidth="0.8" opacity="0.9" />
      </pattern>

      {/* --- Crimson Red Tartan Plaid --- */}
      <pattern id="tartanRed" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#991B1B" />
        <rect x="0" y="0" width="28" height="8" fill="#1E293B" fillOpacity="0.7" />
        <rect x="0" y="0" width="8" height="28" fill="#1E293B" fillOpacity="0.7" />
        <line x1="4" y1="0" x2="4" y2="28" stroke="#FEF08A" strokeWidth="0.8" opacity="0.8" />
        <line x1="0" y1="4" x2="28" y2="4" stroke="#FEF08A" strokeWidth="0.8" opacity="0.8" />
      </pattern>

      {/* --- Forest Green Blackwatch Tartan --- */}
      <pattern id="tartanGreen" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#14532D" />
        <rect x="0" y="0" width="28" height="9" fill="#0F172A" fillOpacity="0.75" />
        <rect x="0" y="0" width="9" height="28" fill="#0F172A" fillOpacity="0.75" />
        <line x1="5" y1="0" x2="5" y2="28" stroke="#86EFAC" strokeWidth="0.7" opacity="0.7" />
        <line x1="0" y1="5" x2="28" y2="5" stroke="#86EFAC" strokeWidth="0.7" opacity="0.7" />
      </pattern>

      {/* --- Sky Blue Madras Tartan --- */}
      <pattern id="tartanBlue" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="#7DD3FC" />
        <rect x="0" y="0" width="28" height="8" fill="#1E3A8A" fillOpacity="0.65" />
        <rect x="0" y="0" width="8" height="28" fill="#1E3A8A" fillOpacity="0.65" />
        <line x1="4" y1="0" x2="4" y2="28" stroke="#FFFBEB" strokeWidth="0.8" />
        <line x1="0" y1="4" x2="28" y2="4" stroke="#FFFBEB" strokeWidth="0.8" />
      </pattern>

      {/* --- Fine-Wale Chocolate Corduroy Ribs (Reference B: Corduroy Bell-Bottoms) --- */}
      <pattern id="corduroyBrown" width="4" height="8" patternUnits="userSpaceOnUse">
        <rect width="4" height="8" fill="#3B2219" />
        <line x1="1" y1="0" x2="1" y2="8" stroke="#4D2D21" strokeWidth="1.2" opacity="0.8" />
        <line x1="3" y1="0" x2="3" y2="8" stroke="#26150F" strokeWidth="1.2" opacity="0.9" />
      </pattern>

      {/* --- Black Corduroy Ribs --- */}
      <pattern id="corduroyBlack" width="4" height="8" patternUnits="userSpaceOnUse">
        <rect width="4" height="8" fill="#18181B" />
        <line x1="1" y1="0" x2="1" y2="8" stroke="#27272A" strokeWidth="1.2" />
        <line x1="3" y1="0" x2="3" y2="8" stroke="#09090B" strokeWidth="1.2" />
      </pattern>

      {/* --- Pink Gingham Check --- */}
      <pattern id="ginghamPink" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#FFF" />
        <rect x="0" y="0" width="8" height="16" fill="#F472B6" fillOpacity="0.3" />
        <rect x="0" y="0" width="16" height="8" fill="#F472B6" fillOpacity="0.3" />
        <rect x="0" y="0" width="8" height="8" fill="#EC4899" fillOpacity="0.5" />
      </pattern>

      {/* --- White Polka Dot Pattern --- */}
      <pattern id="polkaDots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="2.2" fill="#FFFFFF" fillOpacity="0.75" />
      </pattern>

      {/* --- Pinstripes --- */}
      <pattern id="pinstripes" width="6" height="12" patternUnits="userSpaceOnUse">
        <line x1="1" y1="0" x2="1" y2="12" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
      </pattern>

      {/* --- Liquid Chrome Silver Metallic Gradient (Reference B: Silver Platforms) --- */}
      <linearGradient id="chromeSilverGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="25%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="75%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>

      {/* --- Chrome Platform Sole Gradient --- */}
      <linearGradient id="platformSoleGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F1F5F9" />
        <stop offset="60%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>

      {/* --- Patent Leather High-Gloss Gradient --- */}
      <linearGradient id="patentBrownGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4A2E20" />
        <stop offset="35%" stopColor="#784428" />
        <stop offset="55%" stopColor="#351F15" />
        <stop offset="100%" stopColor="#1E120C" />
      </linearGradient>

      {/* --- Natural Canvas Bag Gradient (Reference B: Tan Canvas Tote) --- */}
      <linearGradient id="canvasTanGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DBC4A1" />
        <stop offset="45%" stopColor="#C9AC83" />
        <stop offset="100%" stopColor="#B69567" />
      </linearGradient>

      {/* --- Smooth Black Leather Gradient --- */}
      <linearGradient id="blackLeatherGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2D2D32" />
        <stop offset="50%" stopColor="#1C1C20" />
        <stop offset="100%" stopColor="#0F0F12" />
      </linearGradient>

      {/* --- Corduroy Trousers Shading Gradients --- */}
      <linearGradient id="corduroyShading" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#26140D" stopOpacity="0.4" />
        <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="50%" stopColor="#1B0D08" stopOpacity="0.3" />
        <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#26140D" stopOpacity="0.4" />
      </linearGradient>

      {/* --- Mask for tops with open V-neck so butterfly necklace & neck show through naturally --- */}
      <mask id="topVNeckMask" maskUnits="userSpaceOnUse" x="0" y="0" width="373" height="568">
        <rect x="0" y="0" width="373" height="568" fill="#FFFFFF" />
        <polygon points="172,80 177,114 186.5,138 196,114 201,80" fill="#000000" />
      </mask>
    </>
  );
};

// ============================================================================
// 2. WEARABLE BOTTOM: FLARED TROUSERS, SKIRTS, SHORTS
// ============================================================================
interface WearableBottomProps {
  product: Product;
}

export const WearableBottom: React.FC<WearableBottomProps> = ({ product }) => {
  const icon = product.visualIcon || '';
  const primaryColor = product.colors?.[0]?.hex || '#3B2219';

  // --------------------------------------------------------------------------
  // A. FLARED BELL-BOTTOM TROUSERS (Chocolate Brown Corduroy / Flared Jeans)
  // --------------------------------------------------------------------------
  const isCorduroyBell = icon === 'bot-corduroy-bell' || icon === 'bot-cord-flares';
  const isFlared = isFlaredBottom(product);

  if (isCorduroyBell || (isFlared && !icon.includes('skirt') && !icon.includes('short'))) {
    // Fill texture: corduroy pattern or denim/velour
    let baseFill = 'url(#corduroyBrown)';
    if (icon.includes('blue') || icon.includes('denim')) baseFill = '#2563EB';
    else if (icon.includes('black')) baseFill = 'url(#corduroyBlack)';
    else if (icon.includes('lime')) baseFill = '#84CC16';
    else if (icon.includes('polka')) baseFill = '#1E1E24';
    else if (primaryColor && primaryColor !== '#3B2219') baseFill = primaryColor;

    return (
      <g id="avatar-flared-trousers" filter="url(#garmentShadow)">
        {/* Continuous High-Rise Trousers Path: high waist y=228 down to flared bells y=528 */}
        <path
          d="
            M 156 228
            C 170 231, 203 231, 217 228
            C 225 238, 233 258, 233 285
            C 233 310, 230 340, 226 365
            C 222 380, 220 392, 220 398
            C 220 412, 228 445, 234 480
            C 238 505, 240 520, 240 528
            C 227 524, 201 524, 189 528
            C 191 505, 193 465, 193 425
            C 193 390, 194 355, 192 320
            C 190 302, 189 294, 186.5 290
            C 184 294, 183 302, 181 320
            C 179 355, 180 390, 180 425
            C 180 465, 182 505, 184 528
            C 172 524, 146 524, 133 528
            C 133 520, 135 505, 139 480
            C 145 445, 153 412, 153 398
            C 153 392, 151 380, 147 365
            C 143 340, 140 310, 140 285
            C 140 258, 148 238, 156 228
            Z
          "
          fill={baseFill}
        />

        {/* High-Rise Contoured Waistband Ribbon */}
        <path
          d="M 156 228 C 170 231, 203 231, 217 228 L 218 236 C 203 239, 170 239, 155 236 Z"
          fill="#26140D"
        />
        <circle cx="186.5" cy="232" r="2" fill="#D97706" stroke="#451A03" strokeWidth="0.6" />

        {/* Shading Overlay for 3D depth and thigh volume */}
        <path
          d="
            M 156 230
            C 170 233, 203 233, 217 230
            C 233 260, 233 285, 226 365
            C 220 398, 240 528, 240 528
            C 227 524, 201 524, 189 528
            C 193 425, 186.5 290, 186.5 290
            C 180 425, 184 528, 184 528
            C 172 524, 146 524, 133 528
            C 153 398, 140 285, 140 285
            C 140 260, 148 240, 156 230
            Z
          "
          fill="url(#corduroyShading)"
        />

        {/* Polka Dots overlay if polka pants */}
        {icon.includes('polka') && (
          <path
            d="
              M 162 244 C 142 270, 134 528, 134 528 C 184 528, 186.5 288, 186.5 288
              C 188 288, 188 528, 238 528 C 238 528, 230 270, 210 244 Z
            "
            fill="url(#polkaDots)"
          />
        )}

        {/* Center Vertical Leg Creases / Seamlines (Reference B distinct center seam) */}
        {/* Left Leg Center Seam */}
        <path
          d="M 166 256 L 165 330 L 165 395 L 159 526"
          stroke="#200E08"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 166.8 256 L 165.8 330 L 165.8 395 L 159.8 526"
          stroke="#6E4430"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Right Leg Center Seam */}
        <path
          d="M 206 256 L 207 330 L 207 395 L 213 526"
          stroke="#200E08"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 206.8 256 L 207.8 330 L 207.8 395 L 213.8 526"
          stroke="#6E4430"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Front Slash Curved Pockets (Reference B) */}
        {/* Left Pocket */}
        <path
          d="M 144 268 C 150 274, 160 274, 168 260"
          stroke="#26130B"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M 144 269 C 150 275, 160 275, 168 261"
          stroke="#6E4430"
          strokeWidth="0.7"
          strokeDasharray="2,1.5"
          fill="none"
        />

        {/* Right Pocket */}
        <path
          d="M 228 268 C 222 274, 212 274, 204 260"
          stroke="#26130B"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M 228 269 C 222 275, 212 275, 204 261"
          stroke="#6E4430"
          strokeWidth="0.7"
          strokeDasharray="2,1.5"
          fill="none"
        />

        {/* Center Fly Seam & Rivet */}
        <path d="M 186.5 246 L 186.5 278 Q 186.5 288, 182 289" stroke="#26130B" strokeWidth="1.2" fill="none" />
        <circle cx="186.5" cy="249" r="1.8" fill="#B45309" stroke="#78350F" strokeWidth="0.6" />

        {/* Flared Bell Hem Stitched Edge */}
        <path d="M 134 526 C 146 522, 172 522, 184 526" stroke="#241109" strokeWidth="1" fill="none" />
        <path d="M 134 527.5 C 146 523.5, 172 523.5, 184 527.5" stroke="#78422A" strokeWidth="0.7" strokeDasharray="2,1.5" fill="none" />
        <path d="M 188 526 C 200 522, 226 522, 238 526" stroke="#241109" strokeWidth="1" fill="none" />
        <path d="M 188 527.5 C 200 523.5, 226 523.5, 238 527.5" stroke="#78422A" strokeWidth="0.7" strokeDasharray="2,1.5" fill="none" />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // B. SKIRTS: MIDI A-LINE & MINI PLEATED SKIRTS
  // --------------------------------------------------------------------------
  const isMidiSkirt = icon.includes('plaid-skirt') || icon.includes('midi') || icon.includes('mocha-skirt') || icon.includes('camel-skirt');
  if (isMidiSkirt) {
    const isPlaid = icon.includes('plaid') || product.name.toLowerCase().includes('tartan');
    return (
      <g id="avatar-midi-skirt" filter="url(#garmentShadow)">
        {/* High waistband with belt */}
        <path d="M 156 228 Q 186.5 232, 217 228 L 218 240 Q 186.5 244, 155 240 Z" fill="#2E1B12" />
        {/* Leather belt with buckle */}
        <path d="M 156 232 Q 186.5 236, 217 232" stroke="#1F130B" strokeWidth="4.5" fill="none" />
        <rect x="182" y="230" width="9" height="7" rx="1.5" fill="#D97706" stroke="#78350F" strokeWidth="1" />
        {/* A-line midi skirt billowing down to y=460 */}
        <path
          d="
            M 155 240
            C 150 270, 140 335, 132 400
            C 128 430, 124 450, 122 460
            C 144 466, 186.5 468, 229 466
            C 245 462, 248 448, 246 430
            C 242 380, 230 305, 218 240
            Z
          "
          fill={isPlaid ? 'url(#tartanSepia)' : primaryColor}
        />
        {/* Deep fabric fold shadows */}
        <path d="M 158 240 Q 155 350, 152 460" stroke="#1F130B" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
        <path d="M 186.5 242 Q 186.5 355, 186.5 464" stroke="#1F130B" strokeWidth="2" strokeOpacity="0.45" fill="none" />
        <path d="M 214 240 Q 217 350, 220 460" stroke="#1F130B" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      </g>
    );
  }

  // Mini / Pleated Mini Skirt
  if (icon.includes('skirt')) {
    return (
      <g id="avatar-mini-skirt" filter="url(#garmentShadow)">
        <path d="M 156 228 Q 186.5 232, 217 228 L 218 240 Q 186.5 244, 155 240 Z" fill="#2E1B12" />
        <path
          d="
            M 155 240
            C 152 265, 144 300, 136 342
            C 154 348, 186.5 350, 219 348
            C 236 342, 230 300, 224 265
            L 218 240
            Z
          "
          fill={primaryColor}
        />
        {/* Accordion pleats if pleated */}
        <path d="M 166 240 L 152 342" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M 179 241 L 174 344" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M 194 241 L 199 344" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
        <path d="M 207 240 L 218 342" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // C. SHORTS (Spring Tailored / Denim Shorts)
  // --------------------------------------------------------------------------
  return (
    <g id="avatar-tailored-shorts" filter="url(#garmentShadow)">
      <path d="M 156 228 Q 186.5 232, 217 228 L 218 238 Q 186.5 242, 155 238 Z" fill="#26140D" />
      <path
        d="
          M 155 238 Q 186.5 242, 218 238
          C 226 252, 232 270, 232 290
          C 232 308, 226 328, 222 332
          L 192 332
          C 190 314, 188 296, 186.5 290
          C 185 296, 183 314, 181 332
          L 151 332
          C 147 328, 141 308, 141 290
          C 141 270, 147 252, 155 238
          Z
        "
        fill={primaryColor}
      />
      <path d="M 186.5 238 L 186.5 278 Q 186.5 288, 182 289" stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      <circle cx="186.5" cy="242" r="1.5" fill="#D97706" />
    </g>
  );
};

// ============================================================================
// 3. WEARABLE TOP: CORSET BLOUSE, OFF-SHOULDER, CAMI, TEES
// ============================================================================
interface WearableTopProps {
  product: Product;
}

export const WearableTop: React.FC<WearableTopProps> = ({ product }) => {
  const icon = product.visualIcon || '';
  const name = (product.name || '').toLowerCase();
  const primaryColor = product.colors?.[0]?.hex || '#8B5A2B';

  // --------------------------------------------------------------------------
  // A. LIQUID METALLIC SILVER HOLOGRAPHIC CORSET TUBE TOP (Image 1 item)
  // --------------------------------------------------------------------------
  const isSilverTube =
    icon === 'top-silver-tube' ||
    name.includes('silver holographic') ||
    name.includes('metallic silver') ||
    (name.includes('tube') && (name.includes('metallic') || name.includes('silver') || name.includes('holographic')));

  if (isSilverTube) {
    return (
      <g id="avatar-metallic-corset-top" filter="url(#garmentShadow)">
        {/* Conceal base camisole straps for bare shoulder strapless look */}
        <path d="M 143 124 L 152 108" stroke="#FCEAE6" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 226 124 L 214 105" stroke="#FCEAE6" strokeWidth="4.5" strokeLinecap="round" />

        {/* Sweetheart Neckline Tube Top Bodice: starts at y=118 covering all camisole down to pointed basque hem y=254 */}
        <path
          d="
            M 148 124
            C 150 116, 160 116, 172 120
            C 178 123, 182 126, 186.5 127
            C 191 126, 195 123, 201 120
            C 213 116, 223 116, 225 124
            C 224 150, 222 185, 220 210
            C 219 226, 216 236, 214 244
            C 204 248, 194 253, 186.5 254
            C 179 253, 169 248, 158 244
            C 156 236, 153 226, 152 210
            C 150 185, 148 150, 148 124
            Z
          "
          fill="url(#chromeSilverGrad)"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />

        {/* Iridescent Holographic Sheen Highlights */}
        {/* Pink iridescent reflection */}
        <path
          d="M 156 124 C 168 122, 180 126, 186.5 128 C 180 156, 170 198, 166 242"
          stroke="#F472B6"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          fill="none"
        />
        {/* Cyan iridescent reflection */}
        <path
          d="M 217 124 C 205 122, 193 126, 186.5 128 C 193 156, 203 198, 207 242"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          fill="none"
        />
        {/* White specular shine down center left */}
        <path
          d="M 174 126 Q 172 178, 175 244"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeOpacity="0.75"
          fill="none"
        />

        {/* Metallic Boning Seamlines */}
        <path d="M 166 136 Q 166 185, 170 244" stroke="#64748B" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        <path d="M 178 136 Q 178 190, 180 248" stroke="#64748B" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        <path d="M 195 136 Q 195 190, 193 248" stroke="#64748B" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        <path d="M 207 136 Q 207 185, 203 244" stroke="#64748B" strokeWidth="1" strokeOpacity="0.8" fill="none" />

        {/* Heavy Chrome Front Zipper Placket */}
        <line x1="186.5" y1="127" x2="186.5" y2="252" stroke="#475569" strokeWidth="1.8" />
        <line x1="186.5" y1="127" x2="186.5" y2="252" stroke="#F1F5F9" strokeWidth="0.8" strokeDasharray="2,1" />

        {/* Chrome Zipper Pull Tab */}
        <rect x="184.5" y="130" width="4" height="7" rx="1.5" fill="#E2E8F0" stroke="#334155" strokeWidth="0.8" />
        <circle cx="186.5" cy="134" r="1" fill="#475569" />

        {/* Basque Waist Hem Contour */}
        <path d="M 158 244 Q 186.5 254, 214 244" stroke="#475569" strokeWidth="1.2" fill="none" />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // B. TARTAN PLAID CORSET BLOUSE (Sepia Tan Tartan Plaid Corset Blouse)
  // --------------------------------------------------------------------------
  const isTartanCorset =
    icon === 'top-tartan-corset' ||
    icon === 'top-red-tartan' ||
    icon === 'top-green-tartan' ||
    icon === 'top-blue-tartan' ||
    icon.includes('corset') ||
    name.includes('corset') ||
    name.includes('tartan');

  if (isTartanCorset) {
    let patternUrl = 'url(#tartanSepia)';
    if (icon === 'top-red-tartan' || name.includes('red tartan')) patternUrl = 'url(#tartanRed)';
    else if (icon === 'top-green-tartan' || name.includes('green tartan')) patternUrl = 'url(#tartanGreen)';
    else if (icon === 'top-blue-tartan' || name.includes('blue tartan')) patternUrl = 'url(#tartanBlue)';
    else if (icon.includes('gingham') || name.includes('gingham')) patternUrl = 'url(#ginghamPink)';
    else if (icon.includes('pinstripe') || name.includes('pinstripe')) patternUrl = 'url(#pinstripes)';
    else if (primaryColor && !icon.includes('tartan') && !name.includes('tartan')) patternUrl = primaryColor;

    return (
      <g id="avatar-tartan-corset-blouse" filter="url(#garmentShadow)">
        {/* 1. Left Puff Sleeve (framing shoulder from neck base y=104 down upper arm to y=158) */}
        <g id="left-puff-sleeve">
          <path
            d="
              M 166 104
              C 142 102, 120 110, 114 126
              C 108 140, 112 154, 122 160
              C 134 164, 146 160, 150 148
              C 152 136, 150 118, 166 104
              Z
            "
            fill={patternUrl}
            stroke="#4A2E1B"
            strokeWidth="0.8"
          />
          {/* Folded / gathered sleeve cuff at bottom of upper arm */}
          <path
            d="M 116 156 Q 134 162, 150 148"
            stroke="#3B2219"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Subtle puff volume highlight */}
          <path
            d="M 118 120 Q 124 136, 122 148"
            stroke="#FFF"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            fill="none"
          />
        </g>

        {/* 2. Right Puff Sleeve (framing shoulder from neck base y=104 down upper arm to y=158) */}
        <g id="right-puff-sleeve">
          <path
            d="
              M 207 104
              C 231 102, 253 110, 259 126
              C 265 140, 261 154, 251 160
              C 239 164, 227 160, 223 148
              C 221 136, 223 118, 207 104
              Z
            "
            fill={patternUrl}
            stroke="#4A2E1B"
            strokeWidth="0.8"
          />
          {/* Folded / gathered sleeve cuff */}
          <path
            d="M 257 156 Q 239 162, 223 148"
            stroke="#3B2219"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 255 120 Q 249 136, 251 148"
            stroke="#FFF"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            fill="none"
          />
        </g>

        {/* 3. Main Contoured Corset Bodice (covering from neck y=104 down to basque hem y=254) */}
        <path
          d="
            M 172 104
            C 176 112, 181 118, 186.5 118
            C 192 118, 197 112, 201 104
            L 225 106
            C 227 132, 225 165, 222 195
            C 219 216, 216 232, 215 246
            C 202 250, 194 254, 186.5 254
            C 179 254, 171 250, 158 246
            C 157 232, 154 216, 151 195
            C 148 165, 146 132, 148 106
            L 172 104
            Z
          "
          fill={patternUrl}
          stroke="#3B2219"
          strokeWidth="0.8"
        />

        {/* Folded Collar / Lapels at Neckline */}
        <path
          d="
            M 172 104
            L 148 118
            L 166 132
            L 186.5 122
            L 207 132
            L 225 118
            L 201 104
            L 194 112
            L 186.5 116
            L 179 112
            Z
          "
          fill="#5C381E"
          stroke="#3B2219"
          strokeWidth="0.8"
        />

        {/* Vertical Boning Seams & Shading */}
        <path d="M 164 130 Q 164 190, 168 246" stroke="#3A2012" strokeWidth="1" strokeOpacity="0.75" fill="none" />
        <path d="M 174 134 Q 174 200, 177 248" stroke="#3A2012" strokeWidth="1" strokeOpacity="0.75" fill="none" />
        <path d="M 208 130 Q 208 190, 204 246" stroke="#3A2012" strokeWidth="1" strokeOpacity="0.75" fill="none" />
        <path d="M 198 134 Q 198 200, 195 248" stroke="#3A2012" strokeWidth="1" strokeOpacity="0.75" fill="none" />

        {/* Center Placket with 8 Burnt Gold Buttons */}
        <line x1="186.5" y1="120" x2="186.5" y2="248" stroke="#3A2012" strokeWidth="1.4" />
        {[128, 142, 156, 170, 184, 198, 214, 230, 244].map((y) => (
          <circle key={y} cx="186.5" cy={y} r="1.6" fill="#D97706" stroke="#451A03" strokeWidth="0.6" />
        ))}

        {/* Basque Waist Contoured Bottom Hem (sitting right over trousers) */}
        <path
          d="M 158 246 Q 186.5 254, 214 246"
          stroke="#26130A"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // C. OFF-SHOULDER & PEPLUM TOPS
  // --------------------------------------------------------------------------
  if (icon.includes('offshoulder') || icon.includes('peplum') || name.includes('off-shoulder') || name.includes('peplum')) {
    return (
      <g id="avatar-offshoulder-top" filter="url(#garmentShadow)">
        {/* Off-Shoulder Puff/Bell Sleeves */}
        <ellipse cx="126" cy="138" rx="16" ry="18" fill={primaryColor} stroke="#000" strokeWidth="0.6" strokeOpacity="0.2" />
        <ellipse cx="246" cy="138" rx="16" ry="18" fill={primaryColor} stroke="#000" strokeWidth="0.6" strokeOpacity="0.2" />
        {/* Bodice: starts at y=118 covering bust down to y=252 */}
        <path
          d="
            M 144 122 Q 186.5 128, 228 122
            C 224 165, 220 205, 224 246
            C 200 252, 173 252, 148 246
            C 152 205, 148 165, 144 122
            Z
          "
          fill={primaryColor}
        />
        {/* Ruffle / peplum hem */}
        <path d="M 144 246 Q 186.5 254, 228 246" stroke="#000" strokeWidth="1.2" strokeOpacity="0.25" fill="none" />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // D. CAMI / HALTER / TANK TOPS
  // --------------------------------------------------------------------------
  if (icon.includes('cami') || icon.includes('halter') || icon.includes('tank') || name.includes('cami') || name.includes('halter') || name.includes('tank')) {
    return (
      <g id="avatar-cami-top" filter="url(#garmentShadow)">
        {/* Straps extending to neck/shoulder y=104 */}
        <line x1="162" y1="104" x2="162" y2="128" stroke={primaryColor} strokeWidth="2.8" />
        <line x1="210" y1="104" x2="210" y2="128" stroke={primaryColor} strokeWidth="2.8" />
        {/* Bodice: starts at y=120 covering camisole down to waist y=252 */}
        <path
          d="
            M 150 126 Q 186.5 132, 222 126
            C 220 170, 217 210, 215 246
            Q 186.5 252, 157 246
            C 155 210, 152 170, 150 126
            Z
          "
          fill={primaryColor}
        />
        {/* Scalloped lace trim or ribbon bow */}
        <path d="M 150 126 Q 186.5 132, 222 126" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3,2" fill="none" />
        {/* Subtle center detail */}
        <line x1="186.5" y1="132" x2="186.5" y2="246" stroke="#000" strokeWidth="0.8" strokeOpacity="0.2" />
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // E. TEES / SWEATERS / HOODIES / BLOUSE / GENERIC TOPS
  // --------------------------------------------------------------------------
  return (
    <g id="avatar-generic-top" filter="url(#garmentShadow)">
      {/* Short sleeves covering shoulder caps */}
      <path
        d="
          M 148 106 L 116 138 L 136 150 L 152 130
          Z
        "
        fill={primaryColor}
      />
      <path
        d="
          M 224 106 L 256 138 L 236 150 L 220 130
          Z
        "
        fill={primaryColor}
      />
      {/* Torso: starts at crew neck y=108 down to waist y=252 */}
      <path
        d="
          M 168 106
          Q 186.5 114, 204 106
          L 226 108
          C 224 155, 220 205, 216 248
          Q 186.5 254, 156 248
          C 152 205, 148 155, 146 108
          Z
        "
        fill={primaryColor}
      />
      {/* Crew neck collar rib */}
      <path d="M 168 106 Q 186.5 114, 204 106" stroke="#000" strokeWidth="1.5" strokeOpacity="0.25" fill="none" />
    </g>
  );
};

// ============================================================================
// 4. WEARABLE SHOES: PLATFORMS, MARY JANES, SNEAKERS, BOOTS
// ============================================================================
interface WearableShoesProps {
  product: Product;
  hasFlares?: boolean;
}

export const WearableShoes: React.FC<WearableShoesProps> = ({ product, hasFlares = false }) => {
  const icon = product.visualIcon || '';
  const primaryColor = product.colors?.[0]?.hex || '#CBD5E1';

  // --------------------------------------------------------------------------
  // A. LIQUID METALLIC SILVER CHROME PLATFORM MARY JANES / SNEAKERS (Reference B)
  // --------------------------------------------------------------------------
  const isSilverPlatform = icon === 'shoe-silver-platform-mj' || icon.includes('silver');
  const isPlatform =
    isSilverPlatform ||
    icon.includes('platform') ||
    icon.includes('sneaker') ||
    icon.includes('boots');

  if (isPlatform) {
    const isChrome = isSilverPlatform;
    const upperFill = isChrome ? 'url(#chromeSilverGrad)' : primaryColor;
    const soleFill = 'url(#platformSoleGrad)';

    return (
      <g id="avatar-platform-shoes" filter="url(#shoeShadow)">
        {/* If trousers do NOT cover the ankles, draw upper shoe / ankle strap / socks */}
        {!hasFlares && (
          <>
            {/* White ruffled socks */}
            <path d="M 157 500 C 155 510, 155 522, 153 530 L 179 530 C 177 522, 177 510, 175 500 Z" fill="#F8FAFC" />
            <path d="M 193 500 C 191 510, 191 522, 189 530 L 215 530 C 213 522, 213 510, 211 500 Z" fill="#F8FAFC" />
            {/* Arch Straps with Buckles */}
            <rect x="150" y="528" width="32" height="4" rx="2" fill={upperFill} />
            <rect x="186" y="528" width="32" height="4" rx="2" fill={upperFill} />
          </>
        )}

        {/* --- LEFT SHOE TOE & PLATFORM SOLE (Reference B) --- */}
        <g id="left-platform-shoe">
          {/* Thick Chunky Platform Sole (y=544..558) */}
          <path
            d="
              M 152 543
              C 148 545, 146 550, 148 556
              C 152 558, 176 558, 182 556
              C 184 550, 182 545, 178 543
              Z
            "
            fill={soleFill}
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Platform Sole Lug Tread Grooves */}
          <line x1="156" y1="548" x2="156" y2="556" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="165" y1="548" x2="165" y2="557" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="174" y1="548" x2="174" y2="556" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />

          {/* Rounded Metallic Upper Toe Box (peeking under the trouser hem) */}
          <path
            d="
              M 150 528
              C 147 534, 148 542, 154 544
              C 162 546, 172 546, 178 544
              C 183 540, 184 534, 182 528
              Z
            "
            fill={upperFill}
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Toe Cap Mirror Specular High-Gloss Sheen */}
          <ellipse cx="164" cy="535" rx="7" ry="3.5" fill="#FFFFFF" fillOpacity="0.75" />
          {/* Sneaker Lace / Buckle Detail */}
          <line x1="158" y1="532" x2="170" y2="532" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" />
        </g>

        {/* --- RIGHT SHOE TOE & PLATFORM SOLE (Reference B) --- */}
        <g id="right-platform-shoe">
          {/* Thick Chunky Platform Sole (y=544..558) */}
          <path
            d="
              M 190 543
              C 186 545, 184 550, 186 556
              C 190 558, 214 558, 220 556
              C 222 550, 220 545, 216 543
              Z
            "
            fill={soleFill}
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Platform Sole Lug Tread Grooves */}
          <line x1="194" y1="548" x2="194" y2="556" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="203" y1="548" x2="203" y2="557" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="212" y1="548" x2="212" y2="556" stroke="#64748B" strokeWidth="1" strokeOpacity="0.6" />

          {/* Rounded Metallic Upper Toe Box */}
          <path
            d="
              M 188 528
              C 186 534, 187 540, 192 544
              C 198 546, 208 546, 216 544
              C 222 542, 223 534, 220 528
              Z
            "
            fill={upperFill}
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Toe Cap Specular High-Gloss Sheen */}
          <ellipse cx="204" cy="535" rx="7" ry="3.5" fill="#FFFFFF" fillOpacity="0.75" />
          <line x1="198" y1="532" x2="210" y2="532" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" />
        </g>
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // B. BALLET FLATS & MARY JANES & HEELS
  // --------------------------------------------------------------------------
  return (
    <g id="avatar-heels-shoes" filter="url(#shoeShadow)">
      {/* Left Shoe */}
      <path
        d="M 152 540 C 150 548, 154 556, 166 556 C 176 556, 180 548, 178 540 Z"
        fill={primaryColor}
        stroke="#000"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />
      {/* Right Shoe */}
      <path
        d="M 190 540 C 188 548, 192 556, 204 556 C 214 556, 218 548, 216 540 Z"
        fill={primaryColor}
        stroke="#000"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />
      <circle cx="166" cy="546" r="2.5" fill="#FFF" fillOpacity="0.6" />
      <circle cx="204" cy="546" r="2.5" fill="#FFF" fillOpacity="0.6" />
    </g>
  );
};

// ============================================================================
// 5. WEARABLE BAG: FLOOR TOTES, BAGUETTES, CROSSBODY
// ============================================================================
interface WearableBagProps {
  product: Product;
}

export const WearableBag: React.FC<WearableBagProps> = ({ product }) => {
  const icon = product.visualIcon || '';
  const primaryColor = product.colors?.[0]?.hex || '#C9AC83';

  // --------------------------------------------------------------------------
  // A. TWO-TONE TAN CANVAS & BLACK LEATHER STRUCTURED TOTE (Reference B)
  // --------------------------------------------------------------------------
  const isCanvasTote = icon === 'acc-canvas-tote' || icon.includes('tote') || (product.name || '').toLowerCase().includes('canvas') || (product.name || '').toLowerCase().includes('tote');

  if (isCanvasTote) {
    const isTwoTone = icon === 'acc-canvas-tote';
    const bodyFill = isTwoTone ? 'url(#canvasTanGrad)' : primaryColor;
    const trimFill = isTwoTone ? 'url(#blackLeatherGrad)' : '#1F2937';

    return (
      <g id="avatar-floor-canvas-tote">
        {/* Soft Floor Drop Shadow for Bag Base (standing on floor at y=478) */}
        <ellipse
          cx="108"
          cy="480"
          rx="38"
          ry="6"
          fill="#1E1424"
          fillOpacity="0.3"
          filter="url(#bagFloorShadow)"
        />

        {/* TALL BLACK LEATHER ARCHED HANDLES (Looping up to y=308 beside left hand) */}
        {/* Back Handle */}
        <path
          d="
            M 96 390
            C 96 312, 120 312, 120 390
          "
          stroke="#1F1F24"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Front Handle (loops higher and wider to y=304, right by hand) */}
        <path
          d="
            M 102 402
            C 102 304, 128 304, 128 402
          "
          stroke="#121216"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Handle highlight */}
        <path
          d="
            M 103 402
            C 103 306, 127 306, 127 402
          "
          stroke="#4B5563"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* MAIN TOTE BAG BODY (Trapezoid canvas base: x=72..144, y=388..476) */}
        <g filter="url(#garmentShadow)">
          {/* Tan Canvas Body */}
          <path
            d="
              M 80 390
              L 72 476
              Q 108 480, 144 476
              L 136 390
              Z
            "
            fill={bodyFill}
            stroke="#8C6F4B"
            strokeWidth="0.8"
          />

          {/* Pleated Side Tuck Shadows */}
          <path d="M 80 390 L 76 476" stroke="#000" strokeWidth="1" strokeOpacity="0.25" fill="none" />
          <path d="M 136 390 L 140 476" stroke="#000" strokeWidth="1" strokeOpacity="0.25" fill="none" />

          {/* Reinforced Black Leather Base / Bottom Corners */}
          <path
            d="
              M 73 458
              Q 108 462, 143 458
              L 144 476
              Q 108 480, 72 476
              Z
            "
            fill={trimFill}
          />
          {/* Base stitching line */}
          <path
            d="M 74 456 Q 108 460, 142 456"
            stroke="#FDE68A"
            strokeWidth="0.7"
            strokeDasharray="2,1.5"
            strokeOpacity="0.7"
            fill="none"
          />

          {/* Wide Black Leather Collar / Top Band (Reference B) */}
          <path
            d="
              M 80 390
              L 78 404
              Q 108 408, 138 404
              L 136 390
              Z
            "
            fill={trimFill}
          />
          {/* Top Collar Stitching & Silver Rivets */}
          <path
            d="M 79 403 Q 108 407, 137 403"
            stroke="#9CA3AF"
            strokeWidth="0.6"
            strokeDasharray="2,1.5"
            fill="none"
          />
          {/* Silver Rivets / Studs where handles attach */}
          <circle cx="102" cy="400" r="1.6" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6" />
          <circle cx="128" cy="400" r="1.6" fill="#E2E8F0" stroke="#475569" strokeWidth="0.6" />
        </g>
      </g>
    );
  }

  // --------------------------------------------------------------------------
  // B. BAGUETTES & UNDERARM SHOULDER BAGS
  // --------------------------------------------------------------------------
  return (
    <g id="avatar-underarm-baguette" filter="url(#garmentShadow)">
      {/* Shoulder strap draping from arm/shoulder */}
      <path
        d="M 124 235 C 100 245, 90 280, 96 310"
        stroke="#1E1E24"
        strokeWidth="3"
        fill="none"
      />
      {/* Baguette Body */}
      <rect
        x="80"
        y="300"
        width="46"
        height="26"
        rx="8"
        fill={primaryColor}
        stroke="#000"
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />
      {/* Star / Charm zipper pull */}
      <circle cx="120" cy="304" r="2.2" fill="#E2E8F0" />
      <path d="M 120 306 L 120 316" stroke="#94A3B8" strokeWidth="1" />
    </g>
  );
};
