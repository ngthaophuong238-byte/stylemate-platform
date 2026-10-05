import React from 'react';
import { Product } from '../types';

interface FashionItemGraphicProps {
  product: Product;
  selectedColor?: string;
  showHanger?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Real product photos in /public/products, named `<style>_<category>.jpg`.
// Add a key here once its image file exists.
const AVAILABLE_PRODUCT_PHOTOS = new Set([
  'y2k_top', 'y2k_bottom', 'y2k_shoes',
]);

const getProductPhoto = (product: Product): string | null => {
  if (product.imageUrl) return product.imageUrl;
  const cat = product.category === 'accessories' ? 'accessory' : product.category;
  const key = `${product.style}_${cat}`;
  return AVAILABLE_PRODUCT_PHOTOS.has(key) ? `/products/${key}.jpg` : null;
};

export const FashionItemGraphic: React.FC<FashionItemGraphicProps> = ({
  product,
  selectedColor,
  showHanger = false,
  className = '',
  size = 'md',
}) => {
  const primaryColor = selectedColor || product.colors[0]?.hex || '#FBCFE8';

  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  }[size];

  // ========================================================
  // REALISTIC STUDIO FASHION CATALOG RENDERER
  // (Crafted directly from the user's 4 uploaded moodboard images)
  // ========================================================
  const renderGarment = () => {
    switch (product.visualIcon) {
      // ----------------------------------------------------
      // TOPS (From Image 1)
      // ----------------------------------------------------

      // 1. Ribbed Scoop Puff-Sleeve Top with Lace Trim & Ribbon Bow (Image 1, #1)
      case 'top-ribbed-puff':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="ribKnitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE2EC" />
                <stop offset="40%" stopColor="#F8C4D6" />
                <stop offset="100%" stopColor="#EDA7BF" />
              </linearGradient>
              <pattern id="fineRibs" width="4" height="8" patternUnits="userSpaceOnUse">
                <line x1="2" y1="0" x2="2" y2="8" stroke="#E594B0" strokeWidth="0.8" opacity="0.45" />
              </pattern>
            </defs>
            {/* Left Puff Sleeve */}
            <path d="M 46,46 C 26,42 22,64 26,78 C 34,84 46,74 48,68 Z" fill="url(#ribKnitGrad)" stroke="#D881A2" strokeWidth="1" />
            <path d="M 26,78 Q 36,84 48,68" stroke="#FFF" strokeWidth="2.5" fill="none" />
            {/* Right Puff Sleeve */}
            <path d="M 114,46 C 134,42 138,64 134,78 C 126,84 114,74 112,68 Z" fill="url(#ribKnitGrad)" stroke="#D881A2" strokeWidth="1" />
            <path d="M 134,78 Q 124,84 112,68" stroke="#FFF" strokeWidth="2.5" fill="none" />
            {/* Bodice with Rib Texture */}
            <path d="M 44,46 C 60,62 100,62 116,46 L 114,104 C 95,108 65,108 46,104 Z" fill="url(#ribKnitGrad)" stroke="#D881A2" strokeWidth="1.2" />
            <path d="M 44,46 C 60,62 100,62 116,46 L 114,104 C 95,108 65,108 46,104 Z" fill="url(#fineRibs)" />
            {/* French Scallop Lace Neckline */}
            <path d="M 44,46 Q 52,55 60,58 Q 70,62 80,62 Q 90,62 100,58 Q 108,55 116,46" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="3,1" />
            {/* Dainty Satin Center Ribbon Bow */}
            <circle cx="80" cy="64" r="2.5" fill="#DB2777" />
            <path d="M 76,63 C 71,59 71,67 77,65 Z M 84,63 C 89,59 89,67 83,65 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="0.8" />
            <path d="M 78,65 Q 75,74 74,78 M 82,65 Q 85,74 86,78" stroke="#F472B6" strokeWidth="1.2" strokeLinecap="round" />
            {/* Bottom Hem Ribbing */}
            <rect x="46" y="98" width="68" height="6" fill="#F4AEC6" opacity="0.6" />
          </svg>
        );

      // 2. Ruched Cami Tank with Pink Piping & Dainty Bow (Image 1, #2)
      case 'top-ruched-cami':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="whiteRuched" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>
            {/* Spaghetti Straps in Pink */}
            <line x1="56" y1="28" x2="56" y2="52" stroke="#F472B6" strokeWidth="2.5" />
            <line x1="104" y1="28" x2="104" y2="52" stroke="#F472B6" strokeWidth="2.5" />
            {/* Ruched Bodice */}
            <path d="M 52,52 C 70,56 90,56 108,52 L 104,110 L 56,110 Z" fill="url(#whiteRuched)" stroke="#E2E8F0" strokeWidth="1.2" />
            {/* Gathered Ruching Folds */}
            {[58, 66, 74, 82, 90, 98].map((y, i) => (
              <path key={i} d={`M 54,${y} Q 80,${y + 4} 106,${y}`} fill="none" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.6" />
            ))}
            {/* Top Pink Piping Trim & Bow */}
            <path d="M 52,52 C 70,57 90,57 108,52" fill="none" stroke="#F472B6" strokeWidth="3" />
            <circle cx="80" cy="56" r="2" fill="#DB2777" />
            <path d="M 76,55 Q 71,51 77,57 Z M 84,55 Q 89,51 83,57 Z" fill="#F472B6" />
            {/* Bottom Hem Pink Piping */}
            <line x1="56" y1="110" x2="104" y2="110" stroke="#F472B6" strokeWidth="2.5" />
          </svg>
        );

      // 3. Square-Neck Long Sleeve Knit Top (Image 1, #3)
      case 'top-square-neck':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="longSleevePink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE8F1" />
                <stop offset="50%" stopColor="#F9C6D9" />
                <stop offset="100%" stopColor="#EAA3BC" />
              </linearGradient>
            </defs>
            {/* Long Slim Sleeves */}
            <path d="M 44,48 L 24,118 L 36,120 L 52,58 Z" fill="url(#longSleevePink)" stroke="#D881A2" strokeWidth="1" />
            <path d="M 116,48 L 136,118 L 124,120 L 108,58 Z" fill="url(#longSleevePink)" stroke="#D881A2" strokeWidth="1" />
            {/* Main Bodice */}
            <path d="M 50,48 L 62,48 L 62,64 L 98,64 L 98,48 L 110,48 L 104,114 C 90,116 70,116 56,114 Z" fill="url(#longSleevePink)" stroke="#D881A2" strokeWidth="1.2" />
            {/* Delicate Lace Trim along Square Neckline */}
            <path d="M 62,48 L 62,64 L 98,64 L 98,48" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="3,1" />
            {/* Center Dainty Bow */}
            <circle cx="80" cy="65" r="2" fill="#DB2777" />
            <path d="M 76,64 Q 72,60 77,66 Z M 84,64 Q 88,60 83,66 Z" fill="#F472B6" />
            {/* Bottom Scalloped Micro Lace Hem */}
            <path d="M 56,114 Q 80,118 104,114" stroke="#FFF" strokeWidth="2.5" strokeDasharray="2,1" fill="none" />
          </svg>
        );

      // 4. Tube Peplum Top with Broderie Anglaise (Image 1, #4)
      case 'top-tube-peplum':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="tubeTopPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBCFE8" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            {/* Pink Tube Bodice */}
            <path d="M 52,48 C 70,52 90,52 108,48 L 106,80 C 90,82 70,82 54,80 Z" fill="url(#tubeTopPink)" stroke="#E11D48" strokeWidth="1" />
            {/* Top Scallop Lace Trim */}
            <path d="M 52,48 C 70,52 90,52 108,48" stroke="#FFF" strokeWidth="3" strokeDasharray="3,1" fill="none" />
            {/* White Broderie Anglaise Flared Peplum Hem */}
            <path d="M 54,80 C 44,106 38,124 38,126 C 70,132 90,132 122,126 C 122,124 116,106 106,80 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            {/* Broderie Anglaise Eyelet Hole Pattern */}
            {[50, 62, 74, 86, 98, 110].map((x, i) => (
              <circle key={i} cx={x} cy={106} r="2.5" fill="#E2E8F0" />
            ))}
            {[44, 56, 68, 80, 92, 104, 116].map((x, i) => (
              <circle key={i} cx={x} cy={118} r="2" fill="#E2E8F0" />
            ))}
            {/* Scalloped Bottom Edge */}
            <path d="M 38,126 Q 80,134 122,126" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3,2" fill="none" />
            {/* Waist Tie Ribbon */}
            <circle cx="80" cy="80" r="2.5" fill="#DB2777" />
            <path d="M 76,80 Q 72,86 70,94 M 84,80 Q 88,86 90,94" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      // 5. Pleated Bow-Front Bandeau with Tiered Peplum (Image 1, #5)
      case 'top-pleated-bandeau':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="pleatedPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE8F1" />
                <stop offset="50%" stopColor="#F9BCD4" />
                <stop offset="100%" stopColor="#EB93B3" />
              </linearGradient>
            </defs>
            {/* Giant Bow Wings */}
            <path d="M 80,68 C 65,46 44,50 44,66 C 44,78 64,80 80,72 Z" fill="url(#pleatedPink)" stroke="#D881A2" strokeWidth="1" />
            <path d="M 80,68 C 95,46 116,50 116,66 C 116,78 96,80 80,72 Z" fill="url(#pleatedPink)" stroke="#D881A2" strokeWidth="1" />
            {/* Bow Pleat Creases */}
            <line x1="52" y1="58" x2="74" y2="68" stroke="#D881A2" strokeWidth="1" opacity="0.6" />
            <line x1="108" y1="58" x2="86" y2="68" stroke="#D881A2" strokeWidth="1" opacity="0.6" />
            {/* Center Bow Knot */}
            <ellipse cx="80" cy="69" rx="6" ry="8" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            {/* Layer 1 Tiered Pleated Peplum */}
            <path d="M 52,78 L 40,112 C 60,118 100,118 120,112 L 108,78 Z" fill="url(#pleatedPink)" stroke="#D881A2" strokeWidth="1" />
            {/* Layer 2 Under-Ruffle */}
            <path d="M 38,110 C 60,126 100,126 122,110 L 126,118 C 100,132 60,132 34,118 Z" fill="#FBCFE8" stroke="#E594B0" strokeWidth="1" />
          </svg>
        );

      // 6. Vintage Floral Embroidered Corset with Shoulder Ribbon Ties (Image 1, #6)
      case 'top-floral-corset':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="brocadeBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E594B0" />
                <stop offset="50%" stopColor="#C46888" />
                <stop offset="100%" stopColor="#A84C6D" />
              </linearGradient>
            </defs>
            {/* Shoulder Tie Ribbons */}
            <path d="M 52,30 C 44,24 40,32 50,44 Z M 52,30 C 58,22 62,30 52,44 Z" fill="#C46888" />
            <path d="M 46,38 Q 42,50 40,64 M 52,38 Q 54,50 56,64" stroke="#C46888" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 108,30 C 100,24 96,32 106,44 Z M 108,30 C 114,22 118,30 108,44 Z" fill="#C46888" />
            <path d="M 102,38 Q 100,50 98,64 M 110,38 Q 112,50 114,64" stroke="#C46888" strokeWidth="2.5" strokeLinecap="round" />
            {/* Corset Bodice with Curved Basque Waist */}
            <path d="M 50,56 C 65,66 95,66 110,56 C 114,84 110,108 116,118 C 96,128 64,128 44,118 C 50,108 46,84 50,56 Z" fill="url(#brocadeBg)" stroke="#882C4E" strokeWidth="1.2" />
            {/* Damask Floral Tapestry Motifs */}
            <circle cx="70" cy="80" r="5" fill="#FCE7F3" opacity="0.4" />
            <circle cx="90" cy="82" r="4.5" fill="#FCE7F3" opacity="0.4" />
            <circle cx="80" cy="98" r="6" fill="#FCE7F3" opacity="0.4" />
            {/* Contoured Corset Boning Channels */}
            <path d="M 64,62 Q 62,88 64,120" stroke="#FFF" strokeWidth="1.5" opacity="0.6" strokeDasharray="3,2" fill="none" />
            <path d="M 80,64 Q 80,90 80,124" stroke="#FFF" strokeWidth="1.8" opacity="0.7" strokeDasharray="3,2" fill="none" />
            <path d="M 96,62 Q 98,88 96,120" stroke="#FFF" strokeWidth="1.5" opacity="0.6" strokeDasharray="3,2" fill="none" />
            {/* Scalloped Ruffle Lace Collar */}
            <path d="M 50,56 Q 65,66 80,66 Q 95,66 110,56" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeDasharray="3,2" fill="none" />
          </svg>
        );

      // 7. Off-Shoulder Milkmaid Blouse with Ribbon Wrist Cuffs (Image 1, #7)
      case 'top-milkmaid':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="milkmaidPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCE7F3" />
                <stop offset="100%" stopColor="#F9A8D4" />
              </linearGradient>
            </defs>
            {/* Dramatic Voluminous Puff Sleeves with Ribbon Cuffs */}
            <path d="M 48,56 C 20,44 14,84 24,104 C 36,110 44,90 48,78 Z" fill="url(#milkmaidPink)" stroke="#EC4899" strokeWidth="1" />
            <path d="M 24,104 Q 20,116 16,124 M 26,104 Q 28,116 32,124" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 112,56 C 140,44 146,84 136,104 C 124,110 116,90 112,78 Z" fill="url(#milkmaidPink)" stroke="#EC4899" strokeWidth="1" />
            <path d="M 136,104 Q 140,116 144,124 M 134,104 Q 132,116 128,124" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Center Bodice with Off-Shoulder Elasticized Line */}
            <path d="M 48,56 L 112,56 L 106,108 C 90,110 70,110 54,108 Z" fill="url(#milkmaidPink)" stroke="#EC4899" strokeWidth="1.2" />
            <line x1="48" y1="56" x2="112" y2="56" stroke="#FFF" strokeWidth="3" strokeDasharray="3,1" />
          </svg>
        );

      // 8. Halter Sweetheart Corset Top with Multi-Bows (Image 1, #8)
      case 'top-halter-corset':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="halterCorsetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE8F1" />
                <stop offset="40%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            {/* Halter Neck Ties */}
            <path d="M 64,54 Q 72,16 80,18 Q 88,16 96,54" stroke="#F472B6" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 80,18 Q 74,8 70,4 M 80,18 Q 86,8 90,4" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Sweetheart Bustier Bodice */}
            <path d="M 52,54 C 64,48 76,56 80,62 C 84,56 96,48 108,54 C 114,84 108,104 116,114 C 95,124 65,124 44,114 C 52,104 46,84 52,54 Z" fill="url(#halterCorsetGrad)" stroke="#DB2777" strokeWidth="1.2" />
            {/* Sweetheart Neckline Ruched Cinch */}
            <ellipse cx="80" cy="62" rx="4" ry="2.5" fill="#DB2777" />
            {/* Triple Front Bow Fastenings */}
            {[72, 86, 98].map((y, i) => (
              <g key={i} transform={`translate(80, ${y})`}>
                <circle cx="0" cy="0" r="2.2" fill="#BE185D" />
                <path d="M -4,-2 Q -8,-5 -4,2 Z M 4,-2 Q 8,-5 4,2 Z" fill="#FDF2F8" stroke="#DB2777" strokeWidth="0.8" />
              </g>
            ))}
            {/* Peplum Ruffle Baseline */}
            <path d="M 44,114 Q 80,126 116,114 L 118,122 Q 80,132 42,122 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1" />
          </svg>
        );

      // 9. Camisole Ruffle Slip Top with Satin Ribbon (Image 1, #9)
      case 'top-camisole-slip':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <line x1="58" y1="28" x2="58" y2="52" stroke="#FDA4AF" strokeWidth="2.5" />
            <line x1="102" y1="28" x2="102" y2="52" stroke="#FDA4AF" strokeWidth="2.5" />
            <path d="M 52,52 C 70,58 90,58 108,52 L 104,112 C 90,116 70,116 56,112 Z" fill="#FDE2EC" stroke="#E11D48" strokeWidth="1" />
            <path d="M 52,52 C 70,58 90,58 108,52" stroke="#FFF" strokeWidth="3.5" strokeDasharray="3,1" fill="none" />
            <circle cx="80" cy="64" r="2.5" fill="#DB2777" />
            <path d="M 54,112 Q 80,122 106,112 L 108,120 Q 80,128 52,120 Z" fill="#FBCFE8" stroke="#E11D48" strokeWidth="1" />
          </svg>
        );

      // ----------------------------------------------------
      // BOTTOMS (From Image 2)
      // ----------------------------------------------------

      // 1. Light Wash High-Rise Bell Bottom Flared Jeans (Image 2, #1)
      case 'bot-bell-jeans':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="lightDenim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#BFDBFE" />
                <stop offset="50%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            {/* Waistband */}
            <path d="M 54,28 L 106,28 L 104,36 L 56,36 Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.2" />
            <circle cx="80" cy="32" r="2" fill="#E2E8F0" stroke="#1E3A8A" strokeWidth="0.8" />
            {/* Left Leg: fitted at knee, flared bell bottom */}
            <path d="M 56,36 L 78,58 L 74,90 L 40,146 L 58,146 L 76,92 L 68,36 Z" fill="url(#lightDenim)" stroke="#1D4ED8" strokeWidth="1.2" />
            {/* Right Leg: fitted at knee, flared bell bottom */}
            <path d="M 104,36 L 82,58 L 86,90 L 120,146 L 102,146 L 84,92 L 92,36 Z" fill="url(#lightDenim)" stroke="#1D4ED8" strokeWidth="1.2" />
            {/* Whiskering wash lines on thighs */}
            <path d="M 64,52 Q 72,56 70,62 M 96,52 Q 88,56 90,62" stroke="#DBEAFE" strokeWidth="2.5" opacity="0.7" fill="none" />
            {/* Amber Topstitching */}
            <line x1="56" y1="36" x2="42" y2="146" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.6" />
            <line x1="104" y1="36" x2="118" y2="146" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.6" />
          </svg>
        );

      // 2. Pastel Baby Blue Jeans with Pink Lace-Up Ribbon Pocket (Image 2, #2)
      case 'bot-ribbon-jeans':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="babyBlueDenim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="60%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
            <path d="M 54,28 L 106,28 L 104,36 L 56,36 Z" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.2" />
            {/* Wide Leg Cut */}
            <path d="M 56,36 L 79,56 L 76,146 L 50,146 L 54,36 Z" fill="url(#babyBlueDenim)" stroke="#0284C7" strokeWidth="1.2" />
            <path d="M 104,36 L 81,56 L 84,146 L 110,146 L 106,36 Z" fill="url(#babyBlueDenim)" stroke="#0284C7" strokeWidth="1.2" />
            {/* Left Pocket with Pink Satin Ribbon Lace-Up */}
            <path d="M 94,40 C 94,54 104,52 104,40 Z" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1" />
            <path d="M 96,42 L 102,48 M 102,42 L 96,48 M 96,46 L 102,52" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="99" cy="54" r="1.5" fill="#DB2777" />
          </svg>
        );

      // 3. Dark Wash Low-Rise Flared Jeans with Pocket Embroidery (Image 2, #3)
      case 'bot-dark-flares':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="darkDenim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>
            <path d="M 56,32 L 104,32 L 102,38 L 58,38 Z" fill="#334155" stroke="#0F172A" strokeWidth="1.2" />
            <path d="M 58,38 L 78,58 L 72,88 L 44,146 L 60,146 L 76,90 L 70,38 Z" fill="url(#darkDenim)" stroke="#0F172A" strokeWidth="1.2" />
            <path d="M 102,38 L 82,58 L 88,88 L 116,146 L 100,146 L 84,90 L 90,38 Z" fill="url(#darkDenim)" stroke="#0F172A" strokeWidth="1.2" />
            {/* Contrast Golden Western Topstitching & Pocket Embroidery */}
            <path d="M 62,44 Q 68,52 74,44" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            <path d="M 86,44 Q 92,52 98,44" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
          </svg>
        );

      // 4. Baby Pink Velour Track Flared Pants with Ribbon Drawstring (Image 2, #4)
      case 'bot-velour-flares':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="velourPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCE7F3" />
                <stop offset="40%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            {/* Ribbed Velour Waistband */}
            <rect x="56" y="30" width="48" height="8" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
            {/* Drawstring Ribbon Ties */}
            <circle cx="80" cy="34" r="2" fill="#DB2777" />
            <path d="M 78,34 Q 74,46 72,52 M 82,34 Q 86,46 88,52" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
            {/* Plush Flared Velour Legs */}
            <path d="M 56,38 L 78,60 L 74,90 L 44,146 L 62,146 L 76,92 L 68,38 Z" fill="url(#velourPink)" stroke="#DB2777" strokeWidth="1.2" />
            <path d="M 104,38 L 82,60 L 86,90 L 116,146 L 98,146 L 84,92 L 92,38 Z" fill="url(#velourPink)" stroke="#DB2777" strokeWidth="1.2" />
          </svg>
        );

      // 5. High-Waisted Rolled-Cuff Baby Pink Denim Shorts (Image 2, #5)
      case 'bot-pink-shorts':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 56,30 L 104,30 L 102,38 L 58,38 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M 58,38 L 79,64 L 74,86 L 46,86 L 52,38 Z" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.2" />
            <path d="M 102,38 L 81,64 L 86,86 L 114,86 L 108,38 Z" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.2" />
            {/* Stitched Rolled Cuffs */}
            <rect x="44" y="80" width="32" height="7" rx="1.5" fill="#FDE8F1" stroke="#BE185D" strokeWidth="1" />
            <rect x="84" y="80" width="32" height="7" rx="1.5" fill="#FDE8F1" stroke="#BE185D" strokeWidth="1" />
          </svg>
        );

      // 6. Tiered Denim Ruffle Micro Skirt with Heart Chain Belt (Image 2, #6)
      case 'bot-denim-micro':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="denimSkirtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            {/* Layer 1 Top Tier */}
            <path d="M 56,36 L 104,36 L 112,68 C 96,74 64,74 48,68 Z" fill="url(#denimSkirtGrad)" stroke="#1D4ED8" strokeWidth="1" />
            {/* Layer 2 Flared Bottom Ruffle Tier */}
            <path d="M 48,64 L 112,64 L 126,96 C 100,104 60,104 34,96 Z" fill="url(#denimSkirtGrad)" stroke="#1D4ED8" strokeWidth="1.2" />
            {/* Interlocking Silver Heart Chain Belt */}
            <path d="M 52,42 Q 80,48 108,42" stroke="#E2E8F0" strokeWidth="3" fill="none" />
            {[62, 74, 86, 98].map((x, i) => (
              <path key={i} d={`M ${x},48 C ${x-3},44 ${x-5},48 ${x},53 C ${x+5},48 ${x+3},44 ${x},48 Z`} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
            ))}
          </svg>
        );

      // 7. Baby Pink Pleated Tennis Mini Skirt (Image 2, #7)
      case 'bot-pleated-skirt':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="skirtPleatPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE8F1" />
                <stop offset="50%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            {/* Fitted Structured Waistband */}
            <path d="M 54,32 L 106,32 L 102,40 L 58,40 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1.2" />
            {/* Flared Knife Pleated Skirt Body */}
            <path d="M 58,40 L 36,104 C 64,112 96,112 124,104 L 102,40 Z" fill="url(#skirtPleatPink)" stroke="#DB2777" strokeWidth="1.2" />
            {/* Individual Crisp Pleats */}
            {[42, 50, 58, 66, 74, 82, 90, 98, 106, 114].map((x, i) => (
              <line key={i} x1={58 + (x - 36) * 0.5} y1="40" x2={x} y2="104" stroke="#BE185D" strokeWidth="1" opacity="0.65" />
            ))}
          </svg>
        );

      // 8. Pastel Pink Straight-Leg Denim Jeans (Image 2, #8)
      case 'bot-pink-jeans':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 56,30 L 104,30 L 102,38 L 58,38 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <path d="M 58,38 L 79,58 L 75,146 L 52,146 L 58,38 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.2" />
            <path d="M 102,38 L 81,58 L 85,146 L 108,146 L 102,38 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.2" />
          </svg>
        );

      // 9. Light Blue Relaxed Wide-Leg Denim Trousers (Image 2, #9)
      case 'bot-wide-denim':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 54,30 L 106,30 L 104,38 L 56,38 Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1" />
            <path d="M 56,38 L 79,58 L 76,146 L 46,146 L 54,38 Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.2" />
            <path d="M 104,38 L 81,58 L 84,146 L 114,146 L 106,38 Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.2" />
          </svg>
        );

      // 10. Crisp White Tailored Straight-Leg Trousers (Image 2, #10)
      case 'bot-white-trousers':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="whitePantsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>
            <path d="M 54,28 L 106,28 L 104,36 L 56,36 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <path d="M 56,36 L 79,58 L 76,146 L 50,146 L 54,36 Z" fill="url(#whitePantsGrad)" stroke="#CBD5E1" strokeWidth="1.2" />
            <path d="M 104,36 L 81,58 L 84,146 L 110,146 L 106,36 Z" fill="url(#whitePantsGrad)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Crisp Center Pressed Crease Lines */}
            <line x1="64" y1="36" x2="63" y2="146" stroke="#94A3B8" strokeWidth="1.2" opacity="0.6" />
            <line x1="96" y1="36" x2="97" y2="146" stroke="#94A3B8" strokeWidth="1.2" opacity="0.6" />
          </svg>
        );

      // 11. Low-Slung Skinny Contour Flare Jeans (Image 2, #11)
      case 'bot-skinny-flares':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 56,34 L 104,34 L 102,40 L 58,40 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
            <path d="M 58,40 L 78,58 L 72,92 L 52,146 L 68,146 L 76,94 L 70,40 Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.2" />
            <path d="M 102,40 L 82,58 L 88,92 L 108,146 L 92,146 L 84,94 L 90,40 Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.2" />
          </svg>
        );

      // ----------------------------------------------------
      // SHOES (From Image 3)
      // ----------------------------------------------------

      // 1. Quilted Ballet Flats with Dainty Bow (Image 3, #1)
      case 'shoe-ballet-flats':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="balletPink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FDE8F1" />
                <stop offset="100%" stopColor="#F9A8D4" />
              </linearGradient>
            </defs>
            {/* Left Flat */}
            <path d="M 36,44 C 48,32 72,40 70,104 C 68,124 54,124 40,118 C 30,102 24,56 36,44 Z" fill="url(#balletPink)" stroke="#DB2777" strokeWidth="1.2" />
            <ellipse cx="52" cy="74" rx="12" ry="24" fill="#FDF2F8" stroke="#DB2777" strokeWidth="0.8" />
            <circle cx="52" cy="46" r="2.5" fill="#DB2777" />
            <path d="M 48,46 Q 44,40 50,48 M 56,46 Q 60,40 54,48" stroke="#DB2777" strokeWidth="1.5" />
            {/* Right Flat */}
            <path d="M 94,44 C 106,32 130,40 128,104 C 126,124 112,124 98,118 C 88,102 82,56 94,44 Z" fill="url(#balletPink)" stroke="#DB2777" strokeWidth="1.2" />
            <ellipse cx="110" cy="74" rx="12" ry="24" fill="#FDF2F8" stroke="#DB2777" strokeWidth="0.8" />
            <circle cx="110" cy="46" r="2.5" fill="#DB2777" />
            <path d="M 106,46 Q 102,40 108,48 M 114,46 Q 118,40 112,48" stroke="#DB2777" strokeWidth="1.5" />
          </svg>
        );

      // 2. Floral Lace-Up Ballet Flats with Toe Fringe (Image 3, #2)
      case 'shoe-floral-flats':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 36,44 C 48,32 72,40 70,104 C 68,124 54,124 40,118 C 30,102 24,56 36,44 Z" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.2" />
            <path d="M 36,48 Q 52,60 68,48" stroke="#F472B6" strokeWidth="4" strokeDasharray="2,2" fill="none" />
            <path d="M 94,44 C 106,32 130,40 128,104 C 126,124 112,124 98,118 C 88,102 82,56 94,44 Z" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.2" />
            <path d="M 94,48 Q 110,60 126,48" stroke="#F472B6" strokeWidth="4" strokeDasharray="2,2" fill="none" />
          </svg>
        );

      // 3. Chanel Style Ruffled Silk Mules with Bow Accent (Image 3, #3)
      case 'shoe-ruffled-mules':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Left Heel & Sole */}
            <path d="M 40,36 C 50,30 68,36 64,96 L 58,118 L 46,118 L 48,96 C 36,78 30,44 40,36 Z" fill="#18181B" stroke="#000" strokeWidth="1" />
            <line x1="52" y1="96" x2="50" y2="128" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
            {/* Ruffled Cream Silk Band */}
            <ellipse cx="50" cy="52" rx="14" ry="10" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="50" cy="52" r="2" fill="#000" />
            {/* Right Heel & Sole */}
            <path d="M 100,36 C 110,30 128,36 124,96 L 118,118 L 106,118 L 108,96 C 96,78 90,44 100,36 Z" fill="#18181B" stroke="#000" strokeWidth="1" />
            <line x1="112" y1="96" x2="110" y2="128" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="110" cy="52" rx="14" ry="10" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="110" cy="52" r="2" fill="#000" />
          </svg>
        );

      // 4. Pink Bow Cork Wedge Platform Sandals (Image 3, #4)
      case 'shoe-bow-wedges':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Cork Wedge Sole */}
            <path d="M 40,66 C 70,68 120,68 128,88 L 124,124 L 40,124 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" opacity="0.85" />
            {/* Giant Pink Silk Front Bow */}
            <ellipse cx="64" cy="62" rx="18" ry="10" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.2" />
            <circle cx="64" cy="62" r="3" fill="#BE185D" />
            <path d="M 112,62 Q 118,44 122,66" stroke="#FDA4AF" strokeWidth="3" fill="none" />
          </svg>
        );

      // 5. Mary Jane Block Heels with Lace Frills & Double Bows (Image 3, #5)
      case 'shoe-mary-janes':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Left Shoe Profile */}
            <path d="M 28,68 C 44,56 64,60 62,108 L 48,114 L 32,112 C 22,96 18,78 28,68 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
            <rect x="44" y="104" width="16" height="24" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.2" />
            {/* Scalloped Lace Collar */}
            <path d="M 32,68 Q 44,78 56,68" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="3,1" fill="none" />
            {/* Double Bow Details */}
            <circle cx="44" cy="74" r="2.5" fill="#DB2777" />
            <circle cx="44" cy="88" r="2.5" fill="#DB2777" />
            {/* Right Shoe Profile */}
            <path d="M 94,68 C 110,56 130,60 128,108 L 114,114 L 98,112 C 88,96 84,78 94,68 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
            <rect x="110" y="104" width="16" height="24" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.2" />
            <path d="M 98,68 Q 110,78 122,68" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="3,1" fill="none" />
            <circle cx="110" cy="74" r="2.5" fill="#DB2777" />
            <circle cx="110" cy="88" r="2.5" fill="#DB2777" />
          </svg>
        );

      // 6. Ballerina Satin Stiletto Ribbon Lace-Up Heels (Image 3, #6)
      case 'shoe-ballerina-heels':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Satin Pump Box Toe */}
            <path d="M 44,72 L 76,72 L 80,102 C 60,110 50,110 40,102 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
            <line x1="44" y1="102" x2="40" y2="134" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" />
            {/* Long Wrap Ribbon Ties */}
            <path d="M 56,72 Q 44,38 60,20 Q 74,38 64,72" stroke="#F472B6" strokeWidth="3" fill="none" />
            <path d="M 104,72 L 136,72 L 140,102 C 120,110 110,110 100,102 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
            <line x1="104" y1="102" x2="100" y2="134" stroke="#DB2777" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 116,72 Q 104,38 120,20 Q 134,38 124,72" stroke="#F472B6" strokeWidth="3" fill="none" />
          </svg>
        );

      // 7. Chestnut Suede Boots with Pink Satin Ribbon Laces (Image 3, #7)
      case 'shoe-ugg-ribbons':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Left Boot */}
            <path d="M 32,54 L 64,54 L 68,114 L 74,124 L 28,124 L 28,114 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" rx="3" />
            <rect x="28" y="122" width="48" height="6" fill="#78350F" rx="2" />
            {/* Pink Ribbon Corset Lacing */}
            <path d="M 40,64 L 56,76 M 56,64 L 40,76 M 40,84 L 56,96 M 56,84 L 40,96" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right Boot */}
            <path d="M 92,54 L 124,54 L 128,114 L 134,124 L 88,124 L 88,114 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" rx="3" />
            <rect x="88" y="122" width="48" height="6" fill="#78350F" rx="2" />
            <path d="M 100,64 L 116,76 M 116,64 L 100,76 M 100,84 L 116,96 M 116,84 L 100,96" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      // 8. Pink Faux Fur Ankle Boots with Giant Bow (Image 3, #8)
      case 'shoe-fur-boots':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 48,72 L 96,72 L 108,114 L 46,114 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
            <line x1="56" y1="114" x2="54" y2="134" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
            {/* Voluminous White Faux Fur Cuff */}
            <ellipse cx="72" cy="70" rx="30" ry="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            {/* Giant Pink Ribbon Bow */}
            <ellipse cx="88" cy="74" rx="10" ry="6" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <circle cx="88" cy="74" r="2.5" fill="#BE185D" />
          </svg>
        );

      // 9. Fluffy Fur Platform Moon Boots with Pink Lace-Up Ties (Image 3, #9)
      case 'shoe-moon-boots':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Left Boot */}
            <path d="M 32,44 C 36,44 64,44 68,54 L 72,110 L 76,126 L 24,126 L 28,110 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Chunky Platform Lug Sole */}
            <rect x="22" y="122" width="56" height="12" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Criss-Cross Pink Ribbon Lacing */}
            <path d="M 36,60 L 64,74 M 64,60 L 36,74 M 36,82 L 64,96 M 64,82 L 36,96" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right Boot */}
            <path d="M 92,44 C 96,44 124,44 128,54 L 132,110 L 136,126 L 84,126 L 88,110 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <rect x="82" y="122" width="56" height="12" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M 96,60 L 124,74 M 124,60 L 96,74 M 96,82 L 124,96 M 124,82 L 96,96" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      // ----------------------------------------------------
      // ACCESSORIES (From Image 4 Bow Collections)
      // ----------------------------------------------------

      // BC1: Pastel Pink Baguette Bag with Oversized Central Bow (Image 4, BC1)
      case 'acc-bc1':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Tubular Shoulder Strap */}
            <path d="M 44,78 C 42,32 118,32 116,78" fill="none" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
            <circle cx="44" cy="78" r="3" fill="#DB2777" />
            <circle cx="116" cy="78" r="3" fill="#DB2777" />
            {/* Rectangular Baguette Body */}
            <rect x="36" y="74" width="88" height="42" rx="6" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.5" />
            {/* Oversized Dimensional Center Bow */}
            <ellipse cx="64" cy="95" rx="16" ry="10" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <ellipse cx="96" cy="95" rx="16" ry="10" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <rect x="74" y="86" width="12" height="18" rx="3" fill="#DB2777" />
          </svg>
        );

      // BC2: Ruched Flap Pink Tote with Twin Bow Knots (Image 4, BC2)
      case 'acc-bc2':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 48,74 C 44,28 116,28 112,74" fill="none" stroke="#FDA4AF" strokeWidth="3" />
            <path d="M 38,72 L 122,72 L 118,124 L 42,124 Z" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="1.2" />
            {/* Flap with Ruching */}
            <path d="M 38,72 L 122,72 L 118,96 Q 80,102 42,96 Z" fill="#FDE2EC" stroke="#F43F5E" strokeWidth="1" />
            {/* Twin Bow Knots */}
            <circle cx="58" cy="94" r="2.5" fill="#E11D48" />
            <path d="M 56,94 Q 52,106 50,112 M 60,94 Q 64,106 66,112" stroke="#E11D48" strokeWidth="1.5" />
            <circle cx="102" cy="94" r="2.5" fill="#E11D48" />
            <path d="M 100,94 Q 96,106 94,112 M 104,94 Q 108,106 110,112" stroke="#E11D48" strokeWidth="1.5" />
          </svg>
        );

      // BC3: Multi-Pocket Cargo Utility Baguette Bag (Image 4, BC3)
      case 'acc-bc3':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 44,76 C 40,24 120,24 116,76" fill="none" stroke="#F472B6" strokeWidth="3" />
            <rect x="30" y="74" width="100" height="42" rx="10" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
            {/* Twin Cargo Flap Pockets */}
            <rect x="36" y="80" width="38" height="28" rx="4" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1" />
            <circle cx="55" cy="92" r="2.5" fill="#BE185D" />
            <path d="M 53,92 Q 46,104 42,114 M 57,92 Q 64,104 68,114" stroke="#BE185D" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="86" y="80" width="38" height="28" rx="4" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1" />
            <circle cx="105" cy="92" r="2.5" fill="#BE185D" />
            <path d="M 103,92 Q 96,104 92,114 M 107,92 Q 114,104 118,114" stroke="#BE185D" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      // BC4: Pink Satin Dumpling Bag with Giant Bow & Pearl Chain Drape (Image 4, BC4)
      case 'acc-bc4':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Satin Shoulder Handle */}
            <path d="M 48,74 C 44,28 116,28 112,74" fill="none" stroke="#FDA4AF" strokeWidth="4" />
            {/* Dumpling Bag Silhouette */}
            <path d="M 38,76 C 32,106 50,122 80,122 C 110,122 128,106 122,76 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.2" />
            {/* Giant Satin Bow Face */}
            <ellipse cx="64" cy="94" rx="18" ry="12" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <ellipse cx="96" cy="94" rx="18" ry="12" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
            <circle cx="80" cy="94" r="5" fill="#DB2777" />
            {/* Draped Baroque Pearl Swag Chain */}
            <path d="M 44,88 Q 80,118 116,88" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
            {[48, 56, 64, 72, 80, 88, 96, 104, 112].map((x, i) => {
              const y = 88 + Math.sin((i / 8) * Math.PI) * 22;
              return (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                  <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" />
                </g>
              );
            })}
          </svg>
        );

      // BC5: Cream & Pink Trim Saddle Shoulder Bag (Image 4, BC5)
      case 'acc-bc5':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 50,72 C 48,28 112,28 110,72" fill="none" stroke="#FCE7F3" strokeWidth="3" />
            <path d="M 38,70 C 38,114 60,122 80,122 C 100,122 122,114 122,70 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <path d="M 38,70 L 122,70 L 118,94 C 100,102 60,102 42,94 Z" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1" />
            <circle cx="80" cy="92" r="2.5" fill="#DB2777" />
          </svg>
        );

      // BC6: Off-White Satin Dumpling Bag with Pearl Drape (Image 4, BC6)
      case 'acc-bc6':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 52,72 C 50,30 110,30 108,72" fill="none" stroke="#E2E8F0" strokeWidth="3" />
            <path d="M 40,74 C 34,104 52,120 80,120 C 108,120 126,104 120,74 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
            <ellipse cx="66" cy="92" rx="16" ry="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <ellipse cx="94" cy="92" rx="16" ry="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="80" cy="92" r="4.5" fill="#E2E8F0" />
            <path d="M 46,86 Q 80,114 114,86" stroke="#94A3B8" strokeWidth="1" fill="none" />
            {[50, 60, 70, 80, 90, 100, 110].map((x, i) => (
              <circle key={i} cx={x} cy={86 + Math.sin((i / 6) * Math.PI) * 20} r="2.8" fill="#FFF" stroke="#CBD5E1" strokeWidth="0.8" />
            ))}
          </svg>
        );

      // BC7: Slouchy Curved Pink Hobo Bag (Image 4, BC7)
      case 'acc-bc7':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 38,62 C 48,24 112,24 122,62 L 128,118 C 100,126 60,126 32,118 Z" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
            <path d="M 54,62 C 64,74 96,74 106,62" stroke="#DB2777" strokeWidth="2" fill="none" />
            <circle cx="80" cy="74" r="2.5" fill="#DB2777" />
          </svg>
        );

      // BC8: Minimalist Pastel Pink Flap Bag with Metal Bow (Image 4, BC8)
      case 'acc-bc8':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Knotted Long Strap */}
            <path d="M 52,78 C 48,18 112,18 108,78" fill="none" stroke="#F472B6" strokeWidth="3" />
            <circle cx="52" cy="78" r="3" fill="#BE185D" />
            <circle cx="108" cy="78" r="3" fill="#BE185D" />
            {/* Structured Rectangular Body */}
            <rect x="42" y="76" width="76" height="46" rx="6" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.5" />
            {/* Flap with Rounded Edge */}
            <path d="M 42,76 L 118,76 L 118,98 C 118,102 114,104 110,104 L 50,104 C 46,104 42,102 42,98 Z" fill="#FDE8F1" stroke="#DB2777" strokeWidth="1" />
            {/* Miniature Metallic Silver Bow Emblem */}
            <circle cx="80" cy="96" r="1.8" fill="#64748B" />
            <path d="M 77,95 Q 73,92 78,97 Z M 83,95 Q 87,92 82,97 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
          </svg>
        );

      // BC9: Chocolate Espresso Baguette with Sleek Bow (Image 4, BC9)
      case 'acc-bc9':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Sleek Underarm Leather Strap */}
            <path d="M 50,78 C 46,20 114,20 110,78" fill="none" stroke="#451A03" strokeWidth="3.5" />
            {/* Sleek Espresso Baguette Body */}
            <rect x="36" y="78" width="88" height="40" rx="4" fill="#451A03" stroke="#260C01" strokeWidth="1.5" />
            {/* Sleek Horizontal Cord Bow */}
            <circle cx="80" cy="92" r="2.5" fill="#D97706" />
            <path d="M 77,92 Q 62,88 77,96 M 83,92 Q 98,88 83,96" stroke="#D97706" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Cursive Barbie Gold Script */}
            <text x="80" y="110" fill="#FDE68A" fontSize="8" fontFamily="cursive" fontStyle="italic" textAnchor="middle">Barbie</text>
          </svg>
        );

      // BC10: Pink Nylon Utility Baguette with Heart Eyelets (Image 4, BC10)
      case 'acc-bc10':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 48,74 C 44,28 116,28 112,74" fill="none" stroke="#F472B6" strokeWidth="3" />
            <rect x="36" y="74" width="88" height="42" rx="8" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.2" />
            <circle cx="50" cy="94" r="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
            <circle cx="110" cy="94" r="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
            <circle cx="80" cy="94" r="2.5" fill="#BE185D" />
          </svg>
        );

      // BC11: Dusty Mauve Tote with Statement Bow (Image 4, BC11)
      case 'acc-bc11':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <path d="M 44,72 C 40,24 100,24 96,72" fill="none" stroke="#C46888" strokeWidth="4" />
            <path d="M 38,70 L 118,70 L 126,126 L 46,126 Z" fill="#EFCFE3" stroke="#A84C6D" strokeWidth="1.2" />
            <ellipse cx="98" cy="96" rx="20" ry="12" fill="#C46888" stroke="#882C4E" strokeWidth="1" />
            <circle cx="98" cy="96" r="4" fill="#882C4E" />
            <path d="M 96,98 L 84,124 M 100,98 L 114,124" stroke="#C46888" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      // Default fallback
      default:
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <rect x="40" y="40" width="80" height="80" rx="12" fill={primaryColor} stroke="#E27396" strokeWidth="1.5" />
            <circle cx="80" cy="80" r="14" fill="#FFF" />
          </svg>
        );
    }
  };

  const photo = getProductPhoto(product);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${sizeStyles} ${className}`}>
      {/* Render the Garment / Footwear / Accessory Graphic */}
      <div className="w-full h-full flex items-center justify-center">
        {photo ? (
          <img
            src={photo}
            alt={product.name}
            draggable={false}
            className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)] transition-transform duration-200"
          />
        ) : (
          renderGarment()
        )}
      </div>
    </div>
  );
};
