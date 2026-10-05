import React, { useState, useEffect, useMemo } from 'react';
import { StyleId, CategoryId, Product, SuggestedOutfit } from '../types';
import { PRODUCTS, SUGGESTED_OUTFITS, FASHION_STYLES } from '../data/fashionData';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playHangerSlideSound, playLoveSound, playClickSound, playEquipSound } from '../utils/soundEffects';
import { Heart, ChevronLeft, ChevronRight, Sparkles, ArrowLeft, RotateCcw, DoorOpen } from 'lucide-react';
import {
  GlassJellyStar3D,
  GlossyPearlSphere3D,
  PastelRibbonBow3D,
  IridescentBubble3D,
  StarlightGlimmerDust3D,
} from './Map3DDecorations';

interface WardrobeCabinetProps {
  currentStyle: StyleId;
  onChangeStyle: (style: StyleId) => void;
  onBackToMap: () => void;
  onOpenProductDetail: (product: Product) => void;
  favorites: string[];
  closetItems: string[];
  onToggleFavorite: (product: Product) => void;
  onToggleCloset: (product: Product) => void;
  onTryInFitStudio: (product: Product) => void;
  onEquipFullOutfit: (outfit: SuggestedOutfit) => void;
}

export const WardrobeCabinet: React.FC<WardrobeCabinetProps> = ({
  currentStyle,
  onChangeStyle,
  onBackToMap,
  onOpenProductDetail,
  favorites,
  closetItems,
  onToggleFavorite,
  onToggleCloset,
  onTryInFitStudio,
  onEquipFullOutfit,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('top');
  const [carouselPage, setCarouselPage] = useState(0);

  // Realistic 3D Door Swing State
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    // Initial entrance door opening animation
    const timer = setTimeout(() => {
      setDoorsOpen(true);
      playHangerSlideSound();
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleDoors = () => {
    playHangerSlideSound();
    setDoorsOpen((prev) => !prev);
  };

  const styleInfo = FASHION_STYLES.find((s) => s.id === currentStyle) || FASHION_STYLES[0];

  // Filter products by current style and category
  const currentCategoryProducts = useMemo(() => {
    if (activeCategory === 'outfits') return [];
    return PRODUCTS.filter((p) => p.style === currentStyle && p.category === activeCategory);
  }, [currentStyle, activeCategory]);

  const currentOutfits = useMemo(() => {
    return SUGGESTED_OUTFITS.filter((o) => o.style === currentStyle);
  }, [currentStyle]);

  // 6 items displayed at a time: 3 on upper rod, 3 on lower rod
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    activeCategory === 'outfits'
      ? Math.max(1, currentOutfits.length)
      : Math.max(1, Math.ceil(currentCategoryProducts.length / itemsPerPage))
  );

  const displayedProducts = useMemo(() => {
    const start = carouselPage * itemsPerPage;
    return currentCategoryProducts.slice(start, start + itemsPerPage);
  }, [currentCategoryProducts, carouselPage]);

  // Upper Rod (top 3) and Lower Rod (bottom 3)
  const upperRodItems = displayedProducts.slice(0, 3);
  const lowerRodItems = displayedProducts.slice(3, 6);

  const handleNextPage = () => {
    playHangerSlideSound();
    setCarouselPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    playHangerSlideSound();
    setCarouselPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleSelectCategory = (cat: CategoryId) => {
    playClickSound();
    setActiveCategory(cat);
    setCarouselPage(0);
  };

  // Shelf config for the 5 categories matching the 5 shelves
  const shelvesConfig = [
    {
      id: 'top' as CategoryId,
      name: 'TOP',
      icon: '/icons/3d_top.png',
      code: 'SEC.01',
      edgeColor: '#FCD34D',
      edgeBorder: '#B45309',
      activeBg: 'bg-[#FEF9C3]/85',
      tag: 'Tops & Knits',
    },
    {
      id: 'bottom' as CategoryId,
      name: 'BOTTOM',
      icon: '/icons/3d_bottom.png',
      code: 'SEC.02',
      edgeColor: '#6EE7B7',
      edgeBorder: '#047857',
      activeBg: 'bg-[#D1FAE5]/85',
      tag: 'Jeans & Skirts',
    },
    {
      id: 'shoes' as CategoryId,
      name: 'SHOES',
      icon: '/icons/3d_shoes.png',
      code: 'SEC.03',
      edgeColor: '#F472B6',
      edgeBorder: '#BE185D',
      activeBg: 'bg-[#FCE7F3]/85',
      tag: 'Flats & Heels',
    },
    {
      id: 'accessories' as CategoryId,
      name: 'BAGS',
      icon: '/icons/3d_bags.png',
      code: 'SEC.04',
      edgeColor: '#7DD3FC',
      edgeBorder: '#0369A1',
      activeBg: 'bg-[#E0F2FE]/85',
      tag: 'Bows & Totes',
    },
    {
      id: 'outfits' as CategoryId,
      name: 'SETS',
      icon: '/icons/3d_sets.png',
      code: 'SEC.05',
      edgeColor: '#C084FC',
      edgeBorder: '#7E22CE',
      activeBg: 'bg-[#F3E8FF]/85',
      tag: 'Full Ensembles',
    },
  ];

  return (
    <div className="relative w-full min-h-[calc(100vh-4.5rem)] flex flex-col items-center p-2 sm:p-5 overflow-hidden select-none bg-[#FDFBF7]">
      {/* ======================================================== */}
      {/* ARCHITECTURAL SKETCH ATELIER ENVIRONMENT                 */}
      {/* ======================================================== */}

      {/* Subtle Blueprint Drafting Lines in Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(to right, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '24px 24px, 120px 120px',
        }}
      />

      {/* Soft Watercolor Washes around Studio Edges */}
      <div className="absolute top-2 left-6 w-96 h-48 rounded-full bg-[#E0F2FE]/40 filter blur-3xl pointer-events-none" />

      {/* ======================================================== */}
      {/* 3D LIVELY ATELIER DECORATIONS (BLUR & 3D SPECULAR EFFECT)*/}
      {/* ======================================================== */}

      {/* 1. 3D Pastel Ribbon Bows */}
      <div className="absolute top-3 left-4 sm:left-10 z-20 animate-float-slow pointer-events-none">
        <PastelRibbonBow3D size={66} rotate={-10} />
      </div>
      <div className="absolute top-[36%] -right-3 sm:right-6 z-10 animate-float-slow pointer-events-none">
        <PastelRibbonBow3D size={52} rotate={14} blur={1} />
      </div>

      {/* 2. 3D Glass Jelly Stars (Candy Gloss & Depth-of-Field Blur) */}
      <div className="absolute top-[16%] left-3 sm:left-8 z-10 animate-float pointer-events-none">
        <GlassJellyStar3D size={48} color="mint" rotate={-12} blur={1} />
      </div>
      <div className="absolute top-[10%] right-6 sm:right-16 z-10 animate-float-slow pointer-events-none">
        <GlassJellyStar3D size={52} color="pink" rotate={18} blur={1.5} />
      </div>
      <div className="absolute bottom-[14%] left-4 sm:left-12 z-10 animate-float pointer-events-none">
        <GlassJellyStar3D size={44} color="peach" rotate={14} blur={0.8} />
      </div>

      {/* 3. 3D Iridescent Soap Bubbles (Prismatic Sheen with Camera Depth Blur) */}
      <div className="absolute bottom-[18%] right-3 sm:right-10 z-20 animate-float-slow pointer-events-none">
        <IridescentBubble3D size={60} blur={2} opacity={0.8} />
      </div>
      <div className="absolute top-[56%] left-2 sm:left-6 z-10 animate-float pointer-events-none">
        <IridescentBubble3D size={44} blur={1} opacity={0.85} />
      </div>
      <div className="absolute top-[5%] right-[32%] z-10 animate-float-reverse pointer-events-none">
        <IridescentBubble3D size={34} blur={1.5} opacity={0.7} />
      </div>

      {/* 4. 3D Pearl Sphere */}
      <div className="absolute bottom-[8%] left-[22%] z-15 animate-float-slow pointer-events-none">
        <GlossyPearlSphere3D size={24} color="lavender" blur={1} />
      </div>

      {/* 5. 3D Starlight Sparkle Bokeh Dust Flares */}
      <div className="absolute top-[22%] left-6 sm:left-14 z-10 animate-pulse-subtle pointer-events-none">
        <StarlightGlimmerDust3D size={38} color="gold" blur={0.5} />
      </div>
      <div className="absolute top-[18%] right-[16%] z-10 animate-pulse-subtle pointer-events-none">
        <StarlightGlimmerDust3D size={36} color="pink" blur={0.8} />
      </div>
      <div className="absolute bottom-[28%] right-6 sm:right-14 z-10 animate-pulse-subtle pointer-events-none">
        <StarlightGlimmerDust3D size={32} color="cyan" blur={1} />
      </div>

      {/* ======================================================== */}
      {/* TOP HEADER: ATELIER ARCHITECTURAL CONTROLS               */}
      {/* ======================================================== */}
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 mb-3 z-10 px-2">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playClickSound();
              onBackToMap();
            }}
            className="px-3.5 py-1.5 rounded-md bg-white hover:bg-[#FDF2F8] text-[#334155] font-sans text-xs font-bold flex items-center gap-1.5 shadow-2xs border border-slate-300 hover:border-pink-300 hover:text-pink-600 transition-all cursor-pointer hover:shadow-xs active:translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#DB2777]" />
            <span>FASHION MAP</span>
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <span className="text-xl">{styleInfo.icon}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-bold font-display text-[#1E293B] tracking-wide">
                  {styleInfo.name}
                </h2>
                <span className="text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-sm bg-[#FFE4EC] text-[#BE185D] border border-pink-200">
                  {styleInfo.number}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-500 hidden sm:block">
                ATELIER SPECIFICATION · {styleInfo.tagline}
              </p>
            </div>
          </div>

          {/* Interactive 3D Door Swing Control Button */}
          <button
            onClick={handleToggleDoors}
            className={`px-3 py-1.5 rounded-md font-sans text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer active:translate-y-0.5 ${
              doorsOpen
                ? 'bg-white hover:bg-[#FDF2F8] text-[#334155] border-slate-300 hover:border-pink-300 shadow-2xs'
                : 'bg-[#F472B6] hover:bg-[#EC4899] text-white border-pink-300 shadow-xs'
            }`}
            title="Click to swing doors open/closed with realistic 3D physics"
          >
            {doorsOpen ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-[#DB2777]" />
                <span className="hidden sm:inline">CLOSE DOORS</span>
              </>
            ) : (
              <>
                <DoorOpen className="w-3.5 h-3.5" />
                <span>OPEN DOORS</span>
              </>
            )}
          </button>
        </div>

        {/* 5 Style Atelier Switcher Tabs with Lighter Sketch Styling */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-md border border-slate-200 shadow-2xs overflow-x-auto">
          {FASHION_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                playClickSound();
                onChangeStyle(s.id);
                setCarouselPage(0);
              }}
              className={`px-3 py-1 rounded-sm text-xs font-sans font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                currentStyle === s.id
                  ? 'bg-[#475569] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#FCE7F3]'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE REALISTIC SKETCH WARDROBE (With Lighter Lines & Borders) */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-6xl min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] flex items-stretch z-10">
        {/* ======================================================== */}
        {/* STRUCTURAL CABINET CASING (Refined Sketch Line & Joinery)  */}
        {/* ======================================================== */}
        <div className="relative w-full h-full bg-[#FFFDFE] border-[1.5px] border-[#CBD5E1] rounded-lg flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(80,60,80,0.08),0_2px_8px_rgba(0,0,0,0.03)]">

          {/* Top Cornice Header Beam with Architectural drafting lines */}
          <div className="w-full h-6 bg-[#FCFBF9] border-b border-[#E2E8F0] relative z-20 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full border border-slate-300 bg-white" />
              <span className="font-sans text-[9px] font-bold text-[#64748B] tracking-widest uppercase">
                STYLEMATE ATELIER · ARCHITECTURAL CLOSET W:1400mm H:2100mm
              </span>
            </div>
            {/* Fine double-line carpenter groove */}
            <div className="w-32 h-0.5 bg-slate-200 border-t border-b border-slate-300/60" />
          </div>

          {/* Cabinet Interior Split: Left Panel (17%) & Right Panel (83% Expanded) */}
          <div className="flex-1 flex flex-row relative overflow-hidden">

            {/* ---------------------------------------------------- */}
            {/* 2A. LEFT SHELF TOWER (17% Width with Lighter Linework) */}
            {/* ---------------------------------------------------- */}
            <div className="w-[17%] min-w-[95px] sm:min-w-[130px] md:min-w-[155px] max-w-[185px] shrink-0 bg-[#FCF9FA] border-r border-[#E2E8F0] flex flex-col relative z-10">

              {/* The 5 Horizontal Shelves with Crisp Double Lines */}
              <div className="flex-1 flex flex-col justify-between py-1 relative z-10">
                {shelvesConfig.map((shelf, idx) => {
                  const isSelected = activeCategory === shelf.id;
                  const count =
                    shelf.id === 'outfits'
                      ? currentOutfits.length
                      : PRODUCTS.filter((p) => p.style === currentStyle && p.category === shelf.id).length;

                  return (
                    <button
                      key={shelf.id}
                      onClick={() => handleSelectCategory(shelf.id)}
                      className={`flex-1 relative flex flex-col justify-center px-2.5 sm:px-3.5 transition-all cursor-pointer group text-left ${
                        isSelected
                          ? 'bg-[#FFF0F5]/85 shadow-inner'
                          : 'hover:bg-[#FDF2F8]'
                      }`}
                    >
                      {/* Shelf Content */}
                      <div className="flex items-center justify-between z-10 w-full">
                        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <img
                              src={shelf.icon}
                              alt={shelf.name}
                              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                            />
                          </div>
                          <div className="min-w-0">
                            <span
                              className={`block font-bold text-xs sm:text-sm tracking-wider font-sans ${
                                isSelected ? 'text-[#18181B] font-extrabold' : 'text-[#475569]'
                              }`}
                              style={{ fontFamily: "'Bubblebody Neue', 'Bubbleboddy Neue', sans-serif" }}
                            >
                              {shelf.name}
                            </span>
                            <span
                              className="hidden sm:block text-[9px] font-sans font-medium text-[#94A3B8] tracking-wider"
                              style={{ fontFamily: "'Bubblebody Neue', 'Bubbleboddy Neue', sans-serif" }}
                            >
                              {shelf.code}
                            </span>
                          </div>
                        </div>

                        {/* Count Badge with crisp pen border */}
                        <span
                          className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-sm border shrink-0 ${
                            isSelected
                              ? 'bg-white text-pink-700 border-pink-300 shadow-2xs'
                              : 'bg-white/80 text-slate-500 border-slate-200'
                          }`}
                          style={{ fontFamily: "'Bubblebody Neue', 'Bubbleboddy Neue', sans-serif" }}
                        >
                          {count}
                        </span>
                      </div>

                      {/* Active Indicator Bar */}
                      {isSelected && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#F472B6] rounded-l-full z-20" />
                      )}

                      {/* Delicate Double-Line Shelf Edge */}
                      {idx < 4 && (
                        <div
                          className="absolute -bottom-0.5 left-0 w-full h-1.5 z-20 flex flex-col justify-between"
                          style={{
                            borderTop: '1px solid #E2E8F0',
                            borderBottom: '1px solid #FBCFE8',
                            backgroundColor: '#FCF9FA',
                          }}
                        >
                          <div className="w-full h-0.5 bg-white/60" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Shelf Floor with Wood Joint Line */}
              <div className="w-full h-3 bg-[#F8FAFC] border-t border-[#E2E8F0] border-b border-[#CBD5E1] relative z-20" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* 2B. RIGHT MAIN HANGING BAY (Realistic Sketch Atelier) */}
            {/* ---------------------------------------------------- */}
            <div
              className="flex-1 relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFFDFE] to-[#FFF5F8]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, transparent, transparent 47px, rgba(226, 232, 240, 0.4) 47px, rgba(226, 232, 240, 0.4) 48px)',
              }}
            >
              {/* Subtle Ambient Depth Lighting */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_16px_rgba(0,0,0,0.03)]" />

              {/* Previous & Next Carousel Navigation Arrows with Lighter Sketch Buttons */}
              <button
                onClick={handlePrevPage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-40 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/95 hover:bg-[#FDF2F8] text-[#334155] border border-slate-200 shadow-sm flex items-center justify-center transition-all hover:scale-108 hover:border-pink-300 active:scale-95 cursor-pointer"
                title="Previous items"
              >
                <ChevronLeft className="w-5 h-5 text-[#DB2777]" />
              </button>

              <button
                onClick={handleNextPage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-40 w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/95 hover:bg-[#FDF2F8] text-[#334155] border border-slate-200 shadow-sm flex items-center justify-center transition-all hover:scale-108 hover:border-pink-300 active:scale-95 cursor-pointer"
                title="Next items"
              >
                <ChevronRight className="w-5 h-5 text-[#DB2777]" />
              </button>

              {/* =================================================== */}
              {/* IF REGULAR CATEGORY: SHOW DUAL BRUSHED ROSE-GOLD RODS */}
              {/* =================================================== */}
              {activeCategory !== 'outfits' ? (
                <div className="w-full h-full flex flex-col justify-around px-8 sm:px-14 md:px-18 py-3 relative z-20">

                  {/* UPPER HANGING ROD (Realistic Brushed Rose-Gold / Champagne Satin Rod) */}
                  <div className="relative w-full pt-8 pb-3">
                    {/* Realistic Brushed Rose-Gold Hanging Rod with Specular Highlight */}
                    <div className="absolute top-4 left-0 w-full h-3 rounded-full bg-gradient-to-b from-[#FFF0F5] via-[#FCE7F3] to-[#E5B5C8] border border-[#D8A3B8]/60 shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col justify-start">
                      <div className="w-full h-0.5 bg-white/90 rounded-full" />
                    </div>
                    {/* Lathe-Turned Wall Mounting Flanges */}
                    <div className="absolute top-2.5 -left-1 w-3.5 h-6 bg-gradient-to-b from-[#FFF5F8] to-[#FBCFE8] border border-[#D8A3B8]/80 rounded-xs z-10 shadow-2xs" />
                    <div className="absolute top-2.5 -right-1 w-3.5 h-6 bg-gradient-to-b from-[#FFF5F8] to-[#FBCFE8] border border-[#D8A3B8]/80 rounded-xs z-10 shadow-2xs" />

                    {/* Upper Rod Hanging Items */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 items-start pt-2">
                      {upperRodItems.map((product) => {
                        const isFav = favorites.includes(product.id);
                        const inCloset = closetItems.includes(product.id);

                        return (
                          <div
                            key={product.id}
                            className="group relative flex flex-col items-center cursor-pointer transition-all transform hover:-translate-y-1.5"
                          >
                            {/* Scaled-up Realistic Studio Garment */}
                            <div
                              onClick={() => {
                                playClickSound();
                                onOpenProductDetail(product);
                              }}
                              className="relative flex flex-col items-center w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 justify-center"
                            >
                              <FashionItemGraphic
                                product={product}
                                showHanger={false}
                                size="lg"
                                className="transition-transform group-hover:scale-108 duration-200"
                              />
                            </div>

                            {/* Clean Studio Product Tag with Lighter Sketch Borders */}
                            <div className="mt-1.5 text-center flex flex-col items-center bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md border border-slate-200 shadow-xs hover:border-pink-300 w-full max-w-[150px] sm:max-w-[185px] transition-colors">
                              <span
                                onClick={() => onOpenProductDetail(product)}
                                className="text-xs sm:text-sm font-bold text-[#1E293B] line-clamp-1 group-hover:text-[#DB2777] transition-colors"
                              >
                                {product.name}
                              </span>
                              <span className="text-xs sm:text-sm font-sans font-bold text-[#DB2777]">
                                ${product.price}
                              </span>

                              {/* Action buttons with light borders */}
                              <div className="flex items-center gap-1.5 mt-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playLoveSound();
                                    onToggleFavorite(product);
                                  }}
                                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                                    isFav
                                      ? 'bg-[#F43F5E] text-white border-[#BE185D]'
                                      : 'bg-white hover:bg-[#FFE4EC] text-slate-400 hover:text-[#F43F5E] border-slate-200'
                                  }`}
                                  title="Favorite"
                                >
                                  <Heart className="w-3.5 h-3.5 fill-current" />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playLoveSound();
                                    onToggleCloset(product);
                                  }}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold transition-all cursor-pointer border ${
                                    inCloset
                                      ? 'bg-[#FCE7F3] text-[#BE185D] border-pink-200'
                                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                                  }`}
                                  title="Add to Closet"
                                >
                                  {inCloset ? 'Saved' : '+Closet'}
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playEquipSound();
                                    onTryInFitStudio(product);
                                  }}
                                  className="w-7 h-7 rounded-md bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center transition-colors cursor-pointer border border-sky-200"
                                  title="Wear in Fit Studio"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty Hangers if fewer than 3 */}
                      {upperRodItems.length < 3 &&
                        Array.from({ length: 3 - upperRodItems.length }).map((_, i) => (
                          <div key={`empty-u-${i}`} className="flex flex-col items-center justify-center h-36 opacity-30 text-slate-400">
                            <div className="w-14 h-7 border-b border-dashed border-slate-300 rounded-b-xl" />
                            <span className="text-xs mt-1.5 font-sans">Available</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* LOWER HANGING ROD */}
                  <div className="relative w-full pt-8 pb-3">
                    {/* Realistic Brushed Rose-Gold Rod */}
                    <div className="absolute top-4 left-0 w-full h-3 rounded-full bg-gradient-to-b from-[#FFF0F5] via-[#FCE7F3] to-[#E5B5C8] border border-[#D8A3B8]/60 shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex flex-col justify-start">
                      <div className="w-full h-0.5 bg-white/90 rounded-full" />
                    </div>
                    {/* Wall Mounting Flanges */}
                    <div className="absolute top-2.5 -left-1 w-3.5 h-6 bg-gradient-to-b from-[#FFF5F8] to-[#FBCFE8] border border-[#D8A3B8]/80 rounded-xs z-10 shadow-2xs" />
                    <div className="absolute top-2.5 -right-1 w-3.5 h-6 bg-gradient-to-b from-[#FFF5F8] to-[#FBCFE8] border border-[#D8A3B8]/80 rounded-xs z-10 shadow-2xs" />

                    {/* Lower Rod Hanging Items */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 items-start pt-2">
                      {lowerRodItems.map((product) => {
                        const isFav = favorites.includes(product.id);
                        const inCloset = closetItems.includes(product.id);

                        return (
                          <div
                            key={product.id}
                            className="group relative flex flex-col items-center cursor-pointer transition-all transform hover:-translate-y-1.5"
                          >
                            <div
                              onClick={() => {
                                playClickSound();
                                onOpenProductDetail(product);
                              }}
                              className="relative flex flex-col items-center w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 justify-center"
                            >
                              <FashionItemGraphic
                                product={product}
                                showHanger={false}
                                size="lg"
                                className="transition-transform group-hover:scale-108 duration-200"
                              />
                            </div>

                            {/* Clean Studio Product Tag */}
                            <div className="mt-1.5 text-center flex flex-col items-center bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md border border-slate-200 shadow-xs hover:border-pink-300 w-full max-w-[150px] sm:max-w-[185px] transition-colors">
                              <span
                                onClick={() => onOpenProductDetail(product)}
                                className="text-xs sm:text-sm font-bold text-[#1E293B] line-clamp-1 group-hover:text-[#DB2777] transition-colors"
                              >
                                {product.name}
                              </span>
                              <span className="text-xs sm:text-sm font-sans font-bold text-[#DB2777]">
                                ${product.price}
                              </span>

                              {/* Action buttons */}
                              <div className="flex items-center gap-1.5 mt-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playLoveSound();
                                    onToggleFavorite(product);
                                  }}
                                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer border ${
                                    isFav
                                      ? 'bg-[#F43F5E] text-white border-[#BE185D]'
                                      : 'bg-white hover:bg-[#FFE4EC] text-slate-400 hover:text-[#F43F5E] border-slate-200'
                                  }`}
                                  title="Favorite"
                                >
                                  <Heart className="w-3.5 h-3.5 fill-current" />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playLoveSound();
                                    onToggleCloset(product);
                                  }}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold transition-all cursor-pointer border ${
                                    inCloset
                                      ? 'bg-[#FCE7F3] text-[#BE185D] border-pink-200'
                                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                                  }`}
                                  title="Add to Closet"
                                >
                                  {inCloset ? 'Saved' : '+Closet'}
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playEquipSound();
                                    onTryInFitStudio(product);
                                  }}
                                  className="w-7 h-7 rounded-md bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center transition-colors cursor-pointer border border-sky-200"
                                  title="Wear in Fit Studio"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty Hangers if fewer than 3 */}
                      {lowerRodItems.length < 3 &&
                        Array.from({ length: 3 - lowerRodItems.length }).map((_, i) => (
                          <div key={`empty-l-${i}`} className="flex flex-col items-center justify-center h-36 opacity-30 text-slate-400">
                            <div className="w-14 h-7 border-b border-dashed border-slate-300 rounded-b-xl" />
                            <span className="text-xs mt-1.5 font-sans">Available</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* =================================================== */
                /* IF OUTFITS CATEGORY: REAL CURATED ENSEMBLE SUITES   */
                /* =================================================== */
                <div className="w-full h-full flex flex-col justify-center px-8 sm:px-16 md:px-20 py-4 relative z-20 overflow-y-auto">
                  <div className="space-y-5">
                    {currentOutfits.map((outfit) => {
                      const topItem = PRODUCTS.find((p) => p.id === outfit.topId);
                      const botItem = PRODUCTS.find((p) => p.id === outfit.bottomId);
                      const shoeItem = PRODUCTS.find((p) => p.id === outfit.shoesId);
                      const accItem = PRODUCTS.find((p) => p.id === outfit.accessoryId);

                      const totalPrice =
                        (topItem?.price || 0) +
                        (botItem?.price || 0) +
                        (shoeItem?.price || 0) +
                        (accItem?.price || 0);

                      const discountedPrice = outfit.discountPercentage
                        ? Math.round(totalPrice * (1 - outfit.discountPercentage / 100))
                        : totalPrice;

                      return (
                        <div
                          key={outfit.id}
                          className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col gap-4 max-w-4xl mx-auto w-full"
                        >
                          {/* Upper Section: Details & 4-Piece Visual Preview */}
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 w-full">
                            <div className="space-y-2 flex-1 min-w-0 pr-0 md:pr-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#FCE7F3] text-[#DB2777] border border-pink-200">
                                  CURATED ENSEMBLE
                                </span>
                                {outfit.discountPercentage && (
                                  <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-md bg-[#475569] text-white">
                                    -{outfit.discountPercentage}% OFF
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold font-display text-[#1E293B]">
                                {outfit.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {outfit.description}
                              </p>
                              <div className="flex items-center gap-2 text-xs font-sans text-slate-500 flex-wrap">
                                <span>VIBE: <strong className="text-slate-800">{outfit.vibe}</strong></span>
                                <span>·</span>
                                <span>OCCASION: <strong className="text-slate-800">{outfit.occasion}</strong></span>
                              </div>
                            </div>

                            {/* Visual Pieces Preview */}
                            <div className="flex items-center gap-3 bg-[#FFF8FA] p-3 rounded-xl border border-pink-100/90 shadow-2xs shrink-0 self-center md:self-auto">
                              {topItem && (
                                <div onClick={() => onOpenProductDetail(topItem)} className="cursor-pointer hover:scale-108 transition-transform" title={topItem.name}>
                                  <FashionItemGraphic product={topItem} size="md" />
                                </div>
                              )}
                              {botItem && (
                                <div onClick={() => onOpenProductDetail(botItem)} className="cursor-pointer hover:scale-108 transition-transform" title={botItem.name}>
                                  <FashionItemGraphic product={botItem} size="md" />
                                </div>
                              )}
                              {shoeItem && (
                                <div onClick={() => onOpenProductDetail(shoeItem)} className="cursor-pointer hover:scale-108 transition-transform" title={shoeItem.name}>
                                  <FashionItemGraphic product={shoeItem} size="md" />
                                </div>
                              )}
                              {accItem && (
                                <div onClick={() => onOpenProductDetail(accItem)} className="cursor-pointer hover:scale-108 transition-transform" title={accItem.name}>
                                  <FashionItemGraphic product={accItem} size="md" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bottom Action & Price Bar */}
                          <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 w-full">
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-xs font-sans text-slate-400 uppercase tracking-wide">
                                Set Price:
                              </span>
                              <span className="text-2xl font-sans font-bold text-[#DB2777]">
                                ${discountedPrice}
                              </span>
                              {outfit.discountPercentage && (
                                <span className="text-sm text-slate-400 line-through font-sans">
                                  ${totalPrice}
                                </span>
                              )}
                              {outfit.discountPercentage && (
                                <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Save ${totalPrice - discountedPrice} ({outfit.discountPercentage}% OFF)
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => {
                                playEquipSound();
                                onEquipFullOutfit(outfit);
                              }}
                              className="px-5 py-2.5 rounded-lg font-sans text-xs sm:text-sm font-bold bg-[#1E293B] hover:bg-[#DB2777] text-white flex items-center gap-2 shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer ml-auto"
                            >
                              <Sparkles className="w-4 h-4 text-[#FDE047]" />
                              <span>WEAR ENSEMBLE</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom White Floor with Double Carpenter Groove */}
              <div className="w-full h-5 bg-[#FCFBF9] border-t border-[#E2E8F0] relative z-20 flex items-center justify-between px-6">
                <span className="font-sans text-[9px] text-slate-400">FLOOR LEVEL 0.00</span>
                {/* Carousel page indicator dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playHangerSlideSound();
                        setCarouselPage(i);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        carouselPage === i ? 'w-6 bg-[#475569]' : 'w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                      }`}
                      title={`Page ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="font-sans text-[9px] text-slate-400">RACK SEC-A/B</span>
              </div>
            </div>
          </div>

          {/* Bottom Kickboard Plinth Bar (Soft Rose Blush with Double Framing Lines) */}
          <div className="w-full h-7 bg-[#FFF0F4] border-t border-[#E2E8F0] relative z-20 flex items-center justify-between px-4">
            <span className="font-sans text-[9px] font-bold text-slate-500">BASEBOARD PLINTH · 60mm</span>
            <div className="w-48 h-0.5 bg-white/90 border-t border-b border-pink-200 rounded-full" />
            <span className="font-sans text-[9px] font-bold text-slate-500">ATELIER VER. 2.4</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. REALISTIC ATELIER LEFT DOOR                             */}
        {/* ======================================================== */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1/2 z-40 rounded-l-lg border-[1.5px] border-r-0 border-[#E8B5C5]/80 bg-gradient-to-br from-[#FFF1F4] via-[#FFE8EF] to-[#FFDEE7] flex flex-col justify-between py-8 px-4 ${
            doorsOpen ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
          }`}
          onClick={() => !doorsOpen && handleToggleDoors()}
          style={{
            transformOrigin: 'left center',
            transform: doorsOpen ? 'rotateY(-105deg)' : 'rotateY(0deg)',
            transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1.1s ease',
            backfaceVisibility: 'visible',
            boxShadow: doorsOpen
              ? '-6px 2px 14px rgba(0, 0, 0, 0.08)'
              : '4px 6px 16px rgba(0, 0, 0, 0.08)',
          }}
          title={doorsOpen ? 'Wardrobe Left Door (Open)' : 'Click to Open Left Door'}
        >
          {/* Mechanical Piano Hinges on left frame */}
          <div className="absolute -left-2.5 top-10 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />
          <div className="absolute -left-2.5 bottom-10 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />

          {/* Architectural Inset Panel Frame (Fine double sketch lines) */}
          <div className="absolute inset-3 border border-[#E8B5C5]/50 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-white/60 rounded-xs pointer-events-none" />

          {/* Subtle Atelier Spec Monogram */}
          <div className="relative z-10 flex flex-col items-center gap-2 mt-4 opacity-75">
            <span className="font-display tracking-widest text-xs font-bold text-[#A8556F]">STYLEMATE</span>
            <div className="w-12 h-px bg-[#E8B5C5]" />
            <span className="font-sans text-[9px] text-[#A8556F]/80">ATELIER · 01</span>
          </div>

          {/* Realistic Sleek Brushed Rose-Gold Pull Handle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-24 sm:h-28 rounded-full bg-gradient-to-r from-[#FFF5F8] via-[#FCE7F3] to-[#E5B5C8] border border-[#D8A3B8]/70 shadow-xs flex flex-col items-center justify-center">
            <div className="w-0.5 h-16 bg-white/95 rounded-full" />
          </div>

          {/* Closed Callout Tag */}
          {!doorsOpen && (
            <div className="relative z-10 text-center bg-white/95 py-1.5 px-3 rounded-md text-xs font-sans font-bold text-[#1E293B] shadow-xs border border-pink-200">
              CLICK TO OPEN ATELIER
            </div>
          )}

          {/* Bottom Architectural Spec Stamp */}
          <div className="relative z-10 text-center font-sans text-[9px] font-bold text-[#A8556F] tracking-widest">
            STYLEMATE · DOOR-L
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. REALISTIC ATELIER RIGHT DOOR                            */}
        {/* ======================================================== */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-1/2 z-40 rounded-r-lg border-[1.5px] border-l-0 border-[#E8B5C5]/80 bg-gradient-to-br from-[#FFF1F4] via-[#FFE8EF] to-[#FFDEE7] flex flex-col justify-between py-8 px-4 ${
            doorsOpen ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
          }`}
          onClick={() => !doorsOpen && handleToggleDoors()}
          style={{
            transformOrigin: 'right center',
            transform: doorsOpen ? 'rotateY(105deg)' : 'rotateY(0deg)',
            transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1.1s ease',
            backfaceVisibility: 'visible',
            boxShadow: doorsOpen
              ? '6px 2px 14px rgba(0, 0, 0, 0.08)'
              : '-4px 6px 16px rgba(0, 0, 0, 0.08)',
          }}
          title={doorsOpen ? 'Wardrobe Right Door (Open)' : 'Click to Open Right Door'}
        >
          {/* Mechanical Piano Hinges on right frame */}
          <div className="absolute -right-2.5 top-10 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />
          <div className="absolute -right-2.5 bottom-10 w-2.5 h-9 bg-[#F1F5F9] border border-slate-300 rounded-xs shadow-2xs z-30" />

          {/* Architectural Inset Panel Frame */}
          <div className="absolute inset-3 border border-[#E8B5C5]/50 rounded-xs pointer-events-none" />
          <div className="absolute inset-4 border border-white/60 rounded-xs pointer-events-none" />

          {/* Subtle Atelier Spec Monogram */}
          <div className="relative z-10 flex flex-col items-center gap-2 mt-4 opacity-75">
            <span className="font-display tracking-widest text-xs font-bold text-[#A8556F]">STYLEMATE</span>
            <div className="w-12 h-px bg-[#E8B5C5]" />
            <span className="font-sans text-[9px] text-[#A8556F]/80">ATELIER · 02</span>
          </div>

          {/* Realistic Sleek Brushed Rose-Gold Pull Handle */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-24 sm:h-28 rounded-full bg-gradient-to-r from-[#FFF5F8] via-[#FCE7F3] to-[#E5B5C8] border border-[#D8A3B8]/70 shadow-xs flex flex-col items-center justify-center">
            <div className="w-0.5 h-16 bg-white/95 rounded-full" />
          </div>

          {/* Closed Callout Tag */}
          {!doorsOpen && (
            <div className="relative z-10 text-center bg-white/95 py-1.5 px-3 rounded-md text-xs font-sans font-bold text-[#1E293B] shadow-xs border border-pink-200">
              CLICK TO OPEN ATELIER
            </div>
          )}

          {/* Bottom Architectural Spec Stamp */}
          <div className="relative z-10 text-center font-sans text-[9px] font-bold text-[#4B3C52] tracking-widest">
            STYLEMATE · DOOR-R
          </div>
        </div>
      </div>
    </div>
  );
};
