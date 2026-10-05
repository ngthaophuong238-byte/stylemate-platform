import React from 'react';
import { playClickSound } from '../utils/soundEffects';
import { ShoppingBag, Sliders, Camera, Sparkles, Heart } from 'lucide-react';

export type CurrentView = 'welcome' | 'map' | 'wardrobe' | 'fit-studio' | 'closet' | 'ai-stylist';

interface NavbarProps {
  currentView: CurrentView;
  onNavigate: (view: CurrentView) => void;
  onOpenModelProfile: () => void;
  onOpenSavedLooks: () => void;
  onOpenShoppingBag: () => void;
  cartCount: number;
  savedLooksCount: number;
  closetCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenModelProfile,
  onOpenSavedLooks,
  onOpenShoppingBag,
  cartCount,
  savedLooksCount,
  closetCount,
}) => {
  if (currentView === 'welcome') return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-pink-100/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Title Wordmark (Display Face, Single Text Element) */}
        <button
          onClick={() => {
            playClickSound();
            onNavigate('map');
          }}
          className="font-display font-bold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#E27396] via-[#EB9AB2] to-[#B3DEE2] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          STYLEMATE
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => {
              playClickSound();
              onNavigate('map');
            }}
            className={`transition-colors cursor-pointer pb-1 border-b-2 ${
              currentView === 'map'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Fashion Map
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('wardrobe');
            }}
            className={`transition-colors cursor-pointer pb-1 border-b-2 ${
              currentView === 'wardrobe'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Wardrobes
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('fit-studio');
            }}
            className={`transition-colors cursor-pointer pb-1 border-b-2 flex items-center gap-1 ${
              currentView === 'fit-studio'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Fit Studio</span>
            <span className="text-[10px] text-[#E27396]">✨</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('closet');
            }}
            className={`transition-colors cursor-pointer pb-1 border-b-2 flex items-center gap-1 ${
              currentView === 'closet'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Closet</span>
            {closetCount > 0 && (
              <span className="font-mono text-[10px] px-1.5 rounded-full bg-[#EFCFE3] text-[#E27396] font-bold">
                {closetCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('ai-stylist');
            }}
            className={`transition-colors cursor-pointer pb-1 border-b-2 flex items-center gap-1 ${
              currentView === 'ai-stylist'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>AI Stylist</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons + Shopping Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Model Profile Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenModelProfile();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-[#ECF2D8] hover:bg-[#ECF2D8]/80 text-[#374151] border border-[#EB9AB2]/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Model Profile & Measurements"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E27396]" />
            <span className="hidden sm:inline">Model Profile</span>
          </button>

          {/* Saved Looks button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenSavedLooks();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white hover:bg-[#EFCFE3]/30 text-slate-700 border border-[#EB9AB2]/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Saved Looks"
          >
            <Camera className="w-3.5 h-3.5 text-[#E27396]" />
            <span className="hidden sm:inline">Looks</span>
            {savedLooksCount > 0 && (
              <span className="font-mono text-[10px] px-1.5 rounded-full bg-[#EFCFE3] text-[#E27396] font-bold">
                {savedLooksCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenShoppingBag();
            }}
            className="relative p-2.5 rounded-2xl bg-[#E27396] hover:bg-[#E27396]/90 text-white transition-all shadow-md shadow-[#E27396]/25 cursor-pointer transform hover:scale-105 active:scale-95"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B3DEE2] text-[#1E293B] font-mono text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-2xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
