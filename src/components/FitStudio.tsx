import React, { useState, useEffect } from 'react';
import { ModelProfile, EquippedOutfit, Product, SavedLook, StyleId } from '../types';
import { VirtualCharacterModel, HAIR_SHADES, HairShade, getHairShadeFromProfile } from './VirtualCharacterModel';
import { PRODUCTS } from '../data/fashionData';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playClickSound, playEquipSound, playCameraShutterSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Camera,
  RotateCcw,
  Sliders,
  CheckCircle,
  Play,
  Pause,
  Disc,
  Music2,
  FileText,
  Lock,
  Sparkles,
  Dices,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Maximize2,
  Heart,
  X,
  Palette,
  Check,
} from 'lucide-react';

interface FitStudioProps {
  profile: ModelProfile;
  onUpdateProfile: (profile: ModelProfile) => void;
  equippedOutfit: EquippedOutfit;
  onEquipItem: (category: 'top' | 'bottom' | 'shoes' | 'accessories', product: Product | null) => void;
  onSaveLook: (look: SavedLook) => void;
  onOpenModelProfileModal: () => void;
  onOpenCloset: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const FitStudio: React.FC<FitStudioProps> = ({
  profile,
  onUpdateProfile,
  equippedOutfit,
  onEquipItem,
  onSaveLook,
  onOpenModelProfileModal,
  onOpenProductDetail,
}) => {
  // Current active hair shade
  const initialShade = getHairShadeFromProfile(profile);
  const [selectedHairShadeId, setSelectedHairShadeId] = useState<string>(initialShade.id);

  // Audio / Y2K Player state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [songProgress, setSongProgress] = useState(38);

  // Try-On Rack state
  const [showTryOnRack, setShowTryOnRack] = useState(false);
  const [rackCategory, setRackCategory] = useState<'top' | 'bottom' | 'shoes' | 'accessories'>('top');
  const [rackStyleFilter, setRackStyleFilter] = useState<string>('all');

  // Randomize state animation
  const [isRandomizing, setIsRandomizing] = useState(false);

  // Toasts / Modals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [harmonyModalOpen, setHarmonyModalOpen] = useState(false);
  const [activeDesktopModal, setActiveDesktopModal] = useState<string | null>(null);

  // Zoom state (Reference B zoom controls)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Curated Preset Looks for Arrow Navigation (< and >)
  const PRESET_LOOKS = [
    {
      name: 'Autumn Sepia Tartan & Flare Trousers',
      topId: 'vin-top-1',
      bottomId: 'vin-bot-2',
      shoesId: 'vin-shoe-4',
      accessoryId: 'off-acc-2',
      hairShade: 'cherry-wine',
    },
    {
      name: 'Signature Coquette Tea Party',
      topId: 'coq-top-1',
      bottomId: 'coq-bot-1',
      shoesId: 'coq-shoe-1',
      accessoryId: 'coq-acc-1',
      hairShade: 'strawberry-milk',
    },
    {
      name: 'Y2K Cyber Glitz & Baguette',
      topId: 'y2k-top-1',
      bottomId: 'y2k-bot-1',
      shoesId: 'y2k-shoe-1',
      accessoryId: 'y2k-acc-1',
      hairShade: 'ice-blue-silver',
    },
    {
      name: 'Executive Minimalist Tailored',
      topId: 'off-top-1',
      bottomId: 'off-bot-1',
      shoesId: 'off-shoe-1',
      accessoryId: 'off-acc-1',
      hairShade: 'midnight-raven',
    },
    {
      name: 'Korean Soft Aesthetic Ensemble',
      topId: 'kor-top-1',
      bottomId: 'kor-bot-1',
      shoesId: 'kor-shoe-1',
      accessoryId: 'kor-acc-1',
      hairShade: 'chestnut-brown',
    },
  ];

  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);

  const handlePrevLook = () => {
    playClickSound();
    const nextIdx = (currentPresetIndex - 1 + PRESET_LOOKS.length) % PRESET_LOOKS.length;
    setCurrentPresetIndex(nextIdx);
    const preset = PRESET_LOOKS[nextIdx];
    const top = PRODUCTS.find((p) => p.id === preset.topId) || null;
    const bottom = PRODUCTS.find((p) => p.id === preset.bottomId) || null;
    const shoes = PRODUCTS.find((p) => p.id === preset.shoesId) || null;
    const acc = PRODUCTS.find((p) => p.id === preset.accessoryId) || null;
    onEquipItem('top', top);
    onEquipItem('bottom', bottom);
    onEquipItem('shoes', shoes);
    onEquipItem('accessories', acc);
    setSelectedHairShadeId(preset.hairShade);
    triggerToast(`Style: ${preset.name} ✨`);
  };

  const handleNextLook = () => {
    playClickSound();
    const nextIdx = (currentPresetIndex + 1) % PRESET_LOOKS.length;
    setCurrentPresetIndex(nextIdx);
    const preset = PRESET_LOOKS[nextIdx];
    const top = PRODUCTS.find((p) => p.id === preset.topId) || null;
    const bottom = PRODUCTS.find((p) => p.id === preset.bottomId) || null;
    const shoes = PRODUCTS.find((p) => p.id === preset.shoesId) || null;
    const acc = PRODUCTS.find((p) => p.id === preset.accessoryId) || null;
    onEquipItem('top', top);
    onEquipItem('bottom', bottom);
    onEquipItem('shoes', shoes);
    onEquipItem('accessories', acc);
    setSelectedHairShadeId(preset.hairShade);
    triggerToast(`Style: ${preset.name} ✨`);
  };

  // Right-side card visibilities
  const [showNotepad, setShowNotepad] = useState(true);
  const [showPlayer, setShowPlayer] = useState(true);

  const currentHairShade = HAIR_SHADES.find((s) => s.id === selectedHairShadeId) || HAIR_SHADES[0];

  // Sync profile when hair shade changes
  const handleSelectHairShade = (shade: HairShade) => {
    playClickSound();
    setSelectedHairShadeId(shade.id);
    onUpdateProfile({
      ...profile,
      hairColor: shade.hex,
      personalColor: shade.tag as import('../types').PersonalColor,
    });
  };

  // Audio tone synthesizer for Y2K music player
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let progressTimer: NodeJS.Timeout | null = null;

    if (isPlayingMusic) {
      const audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [329.63, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25, 587.33];
      let noteIdx = 0;

      interval = setInterval(() => {
        try {
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtx.currentTime);
          noteIdx++;

          gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.38);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 0.42);
        } catch (e) {
          console.debug(e);
        }
      }, 420);

      progressTimer = setInterval(() => {
        setSongProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isPlayingMusic]);

  // Show temporary toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Save current look
  const handleSaveLook = () => {
    playCameraShutterSound();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#F472B6', '#FDA4AF', '#FCD34D', '#C084FC', '#7DD3FC'],
    });

    const equippedTop = equippedOutfit.top;
    const styleVibe = (equippedTop?.style as StyleId) || 'coquette';
    const lookName = `${profile.name}'s ${currentHairShade.name} · ${styleVibe.toUpperCase()} Ensemble`;

    const newLook: SavedLook = {
      id: `look-${Date.now()}`,
      name: lookName,
      style: styleVibe,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      outfit: { ...equippedOutfit },
      totalPrice:
        (equippedOutfit.top?.price || 0) +
        (equippedOutfit.bottom?.price || 0) +
        (equippedOutfit.shoes?.price || 0) +
        (equippedOutfit.accessories?.price || 0),
      vibe: `${currentHairShade.tag} · ${currentHairShade.name}`,
      occasion: 'Fit Studio Styling',
    };

    onSaveLook(newLook);
    triggerToast('Look saved ✨');
  };

  // Clear outfit (resets equipped items, preserves hair color)
  const handleClearOutfit = () => {
    playClickSound();
    onEquipItem('top', null);
    onEquipItem('bottom', null);
    onEquipItem('shoes', null);
    onEquipItem('accessories', null);
    triggerToast('Outfit cleared 🧼');
  };

  // Randomize button (intelligently picks a cohesive outfit)
  const handleRandomize = () => {
    playEquipSound();
    setIsRandomizing(true);

    // Pick a compatible style
    const styles: StyleId[] = ['coquette', 'korean', 'vintage', 'office', 'y2k'];
    const chosenStyle = styles[Math.floor(Math.random() * styles.length)];

    const styleTops = PRODUCTS.filter((p) => p.category === 'top' && (p.style === chosenStyle || Math.random() > 0.4));
    const styleBottoms = PRODUCTS.filter((p) => p.category === 'bottom' && (p.style === chosenStyle || Math.random() > 0.4));
    const styleShoes = PRODUCTS.filter((p) => p.category === 'shoes' && (p.style === chosenStyle || Math.random() > 0.4));
    const styleBags = PRODUCTS.filter((p) => p.category === 'accessories' && (p.style === chosenStyle || Math.random() > 0.4));

    const randomTop = styleTops[Math.floor(Math.random() * styleTops.length)] || null;
    const randomBottom = styleBottoms[Math.floor(Math.random() * styleBottoms.length)] || null;
    const randomShoes = styleShoes[Math.floor(Math.random() * styleShoes.length)] || null;
    const randomBag = styleBags[Math.floor(Math.random() * styleBags.length)] || null;

    setTimeout(() => {
      onEquipItem('top', randomTop);
      onEquipItem('bottom', randomBottom);
      onEquipItem('shoes', randomShoes);
      onEquipItem('accessories', randomBag);
      setIsRandomizing(false);
      triggerToast(`Equipped ${chosenStyle.toUpperCase()} Look ✨`);
    }, 300);
  };

  // Filter products for Try-On Rack
  const rackProducts = PRODUCTS.filter((p) => {
    const matchesCat = p.category === rackCategory;
    const matchesStyle = rackStyleFilter === 'all' || p.style === rackStyleFilter;
    return matchesCat && matchesStyle;
  });

  return (
    <div className="relative w-full min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-[#FAD2E1] via-[#F3D6E3] to-[#E5D4E6] overflow-x-hidden font-sans select-none flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8">
      {/* 1. Mac OS Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-white/75 backdrop-blur-md flex items-center justify-between px-4 z-40 text-[11px] font-medium text-slate-800 shadow-sm border-b border-white/50">
        <div className="flex items-center gap-4">
          <span className="text-black font-bold"></span>
          <span className="font-bold">STYLEMATE</span>
          <span className="hidden sm:inline">File</span>
          <span className="hidden sm:inline">Edit</span>
          <span className="hidden sm:inline">View</span>
          <span>Studio</span>
          <span className="hidden sm:inline">Window</span>
          <span className="hidden sm:inline">Help</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <span>🔊</span>
          <span>📶</span>
          <span>🔋 100%</span>
          <span className="font-semibold text-slate-800">11:11 AM</span>
        </div>
      </div>

      {/* 2. Desktop Icons - Left Side */}
      <div className="fixed left-4 xl:left-8 top-16 hidden lg:flex flex-col items-center gap-7 z-20">
        {[
          { id: 'computer', icon: '🖥️', label: 'My Computer' },
          { id: 'documents', icon: '💌', label: 'My Documents' },
          { id: 'internet', icon: '🌐', label: 'Internet' },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playClickSound();
              setActiveDesktopModal(item.id);
            }}
            className="flex flex-col items-center gap-1.5 cursor-pointer group hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/70 shadow-sm flex items-center justify-center text-2xl group-hover:bg-white/80 transition-colors">
              {item.icon}
            </div>
            <span className="text-[11px] font-semibold text-slate-800 drop-shadow-sm px-1.5 py-0.5 rounded bg-white/30 backdrop-blur-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Desktop Icons - Right Side */}
      <div className="fixed right-4 xl:right-8 top-16 hidden lg:flex flex-col items-center gap-7 z-20">
        {[
          { id: 'pictures', icon: '🖼️', label: 'My Pictures' },
          { id: 'inspo', icon: '💖', label: 'Fashion Inspo' },
          { id: 'secret', icon: '🔒', label: 'Secret Stuff' },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => {
              playClickSound();
              setActiveDesktopModal(item.id);
            }}
            className="flex flex-col items-center gap-1.5 cursor-pointer group hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/70 shadow-sm flex items-center justify-center text-2xl group-hover:bg-white/80 transition-colors">
              {item.icon}
            </div>
            <span className="text-[11px] font-semibold text-slate-800 drop-shadow-sm px-1.5 py-0.5 rounded bg-white/30 backdrop-blur-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ========================================================
          4. MAIN RETRO MAC WINDOW (Fit Studio)
         ======================================================== */}
      <div className="relative z-30 w-full max-w-5xl xl:max-w-[1140px] bg-[#FFF5F8] rounded-2xl sm:rounded-3xl border-2 border-[#F9A8D4]/60 shadow-[0_20px_50px_rgba(236,72,153,0.18)] flex flex-col overflow-hidden mt-8 mb-6 transition-all">
        {/* Window Top Titlebar */}
        <div className="h-10 bg-gradient-to-r from-[#FCE7F3] via-[#FBCFE8] to-[#FCE7F3] px-4 flex items-center justify-between border-b border-[#F472B6]/30 relative">
          {/* Mac Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-inner cursor-pointer hover:opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-inner cursor-pointer hover:opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-inner cursor-pointer hover:opacity-80" />
          </div>

          {/* Centered Title */}
          <div className="absolute left-1/2 -translate-x-1/2 font-bold text-slate-800 text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
            <span>Pick your hair color! · Fit Studio</span>
          </div>

          {/* Body Profile Pill Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenModelProfileModal();
            }}
            className="px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[#DB2777] border border-[#F472B6]/40 shadow-xs text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#DB2777]" />
            <span className="hidden sm:inline">Body Profile</span>
          </button>
        </div>

        {/* Window Interior: 3-Column Studio Layout */}
        <div className="p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
          {/* ========================================================
              LEFT COLUMN: HAIR COLOURS SELECTOR (13 Shades)
             ======================================================== */}
          <div className="lg:col-span-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-200/80 p-3.5 flex flex-col h-[600px] shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-pink-100">
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-pink-500" />
                <span className="font-bold text-slate-800 text-sm">Hair Colours</span>
              </div>
              <span className="px-2 py-0.5 text-[11px] font-bold text-pink-600 bg-pink-100 rounded-full border border-pink-200">
                13 Shades
              </span>
            </div>

            {/* Scrollable List of Hair Colors */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 custom-pink-scrollbar">
              {HAIR_SHADES.map((shade) => {
                const isSelected = selectedHairShadeId === shade.id;
                return (
                  <div
                    key={shade.id}
                    onClick={() => handleSelectHairShade(shade)}
                    className={`relative p-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-pink-400 bg-gradient-to-r from-pink-50 via-sky-50 to-pink-50 ring-2 ring-pink-300 shadow-sm scale-[1.01]'
                        : 'border-pink-100 bg-white/80 hover:bg-white hover:border-pink-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Circular Color Swatch */}
                      <div
                        className="w-8 h-8 rounded-full border border-black/10 shadow-inner flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: shade.preview }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 drop-shadow-sm ${
                              shade.id === 'platinum-blonde' || shade.id === 'strawberry-milk'
                                ? 'text-pink-600'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </div>

                      {/* Name & Season Tag */}
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-bold leading-tight ${
                            isSelected ? 'text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          {shade.name}
                        </span>
                        <span className="text-[10px] font-semibold text-pink-500/90 mt-0.5">
                          {shade.tag}
                        </span>
                      </div>
                    </div>

                    {/* Pink Arrowhead Indicator pointing to character */}
                    {isSelected && (
                      <div className="text-pink-500 font-bold text-sm transform -translate-x-0.5 animate-pulse">
                        ◀
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: VIRTUAL CHARACTER CANVAS & ACTIONS
             ======================================================== */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-pink-200 shadow-sm p-4 flex flex-col items-center justify-between relative min-h-[600px] overflow-hidden">
            {/* Top Bar inside Character Card */}
            <div className="w-full flex items-center justify-between z-20 pb-2">
              {/* Model Tag Pill */}
              <div className="px-3.5 py-1 rounded-full bg-white/90 border border-pink-300/80 shadow-xs text-xs font-bold text-pink-600 flex items-center gap-1.5 backdrop-blur-xs">
                <span>{profile.name}</span>
                <span className="text-pink-300">·</span>
                <span className="text-pink-500 font-semibold">{currentHairShade.tag}</span>
              </div>

              {/* Clear / Reset Outfit Button */}
              <button
                onClick={handleClearOutfit}
                title="Clear Outfit (Keep Hair)"
                className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 flex items-center justify-center transition-all hover:rotate-180 active:scale-95 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Central Virtual Fashion Model Display (Reference B Layout) */}
            <div className="w-full h-[430px] flex items-center justify-center relative my-1 overflow-hidden">
              {/* Left Arrow Navigation Button (<) */}
              <button
                onClick={handlePrevLook}
                title="Previous Curated Look"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-pink-500 hover:text-pink-600 border border-pink-200/90 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Arrow Navigation Button (>) */}
              <button
                onClick={handleNextLook}
                title="Next Curated Look"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-pink-500 hover:text-pink-600 border border-pink-200/90 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Floating Zoom Controls on Right Side (Reference B: +, -, ⛶) */}
              <div className="absolute right-3 bottom-3 z-30 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    playClickSound();
                    setZoomLevel((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))));
                  }}
                  title="Zoom In"
                  className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-pink-600 border border-pink-200/90 shadow-xs flex items-center justify-center text-xs font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setZoomLevel((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))));
                  }}
                  title="Zoom Out"
                  className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-pink-600 border border-pink-200/90 shadow-xs flex items-center justify-center text-xs font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setZoomLevel(1.0);
                  }}
                  title="Reset Fit (1.0x)"
                  className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-pink-600 border border-pink-200/90 shadow-xs flex items-center justify-center text-xs font-bold transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Centered Virtual Fashion Model: Explicit 276px x 420px container (exact 373:568 aspect ratio) */}
              <div
                style={{
                  width: '276px',
                  height: '420px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <VirtualCharacterModel
                  profile={profile}
                  outfit={equippedOutfit}
                  selectedHairShadeId={selectedHairShadeId}
                  isRandomizing={isRandomizing}
                  zoomLevel={zoomLevel}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Action Buttons Underneath Character (Reference Image 1) */}
            <div className="w-full flex flex-col items-center gap-2.5 z-20 pt-2 border-t border-pink-100/80">
              {/* Row 1: Check Harmony, Save Look, Randomize */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap w-full">
                <button
                  onClick={() => {
                    playClickSound();
                    setHarmonyModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-[#ECF7ED] hover:bg-[#DFF2E2] text-emerald-800 border border-[#C6E6C9] shadow-xs text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Check Harmony</span>
                </button>

                <button
                  onClick={handleSaveLook}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F472B6] to-[#FB7185] hover:brightness-105 text-white shadow-sm text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Save Look</span>
                </button>

                <button
                  onClick={handleRandomize}
                  title="Randomize Outfit"
                  className="px-3.5 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 shadow-xs text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Dices className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Randomize</span>
                </button>
              </div>

              {/* Row 2: Try-On Rack Pill Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setShowTryOnRack(!showTryOnRack);
                }}
                className="px-7 py-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-sky-800 border border-[#93C5FD] shadow-xs text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
                <span>Try-On Rack</span>
                <span className="text-[10px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full font-bold ml-1">
                  {PRODUCTS.length}
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: NOTEPAD, Y2K PLAYER, CURRENTLY EQUIPPED
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 h-[600px] overflow-y-auto pr-0.5 custom-pink-scrollbar">
            {/* 1. Notepad Window (Reference Image 1) */}
            {showNotepad && (
              <div className="bg-[#FFFDF6] rounded-2xl border border-pink-200 shadow-xs overflow-hidden transition-all">
                <div className="h-7 bg-[#FDE2EC] px-3 flex items-center justify-between border-b border-pink-200">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-pink-600" />
                    <span className="text-[11px] font-bold text-slate-800">notepad</span>
                  </div>
                  <button
                    onClick={() => setShowNotepad(false)}
                    className="text-slate-500 hover:text-slate-800 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-3.5 text-[12px] text-slate-700 leading-relaxed font-serif italic bg-gradient-to-b from-[#FFFDF6] to-[#FFF9F0]">
                  welcome to my world!
                  <br />
                  pick your favorite hair colour and start the game!
                  <div className="flex items-center gap-1 mt-2 text-pink-500">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Y2K Player Window (Reference Image 1) */}
            {showPlayer && (
              <div className="bg-[#FDE2EC] rounded-2xl border border-[#F472B6]/40 shadow-xs overflow-hidden transition-all">
                <div className="h-7 bg-gradient-to-r from-[#FBCFE8] to-[#FDE2EC] px-3 flex items-center justify-between border-b border-[#F472B6]/30">
                  <div className="flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5 text-pink-600" />
                    <span className="text-[11px] font-bold text-slate-800">- Y2K Player -</span>
                  </div>
                  <button
                    onClick={() => setShowPlayer(false)}
                    className="text-slate-500 hover:text-slate-800 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-3.5 flex items-center gap-3">
                  {/* Vinyl Record */}
                  <div
                    className={`w-12 h-12 rounded-full bg-slate-900 border-2 border-white shadow-md flex items-center justify-center shrink-0 ${
                      isPlayingMusic ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3.5s' }}
                  >
                    <div className="w-4 h-4 rounded-full bg-pink-400 border border-white flex items-center justify-center">
                      <Disc className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  {/* Song Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">Baby Girl</div>
                    <div className="text-[10px] font-semibold text-pink-600 truncate">Honeyz · 2000s Pop</div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-pink-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-300"
                        style={{ width: `${songProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => {
                      playClickSound();
                      setIsPlayingMusic(!isPlayingMusic);
                    }}
                    className="w-8 h-8 rounded-full bg-white hover:bg-pink-50 text-pink-600 border border-pink-300 shadow-xs flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlayingMusic ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Currently Equipped Panel (Reference Image 1) */}
            <div className="bg-white rounded-2xl border border-pink-200 shadow-xs p-3.5 flex flex-col flex-1">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-pink-100">
                <span className="font-bold text-[11px] text-slate-800 tracking-wider uppercase">
                  CURRENTLY EQUIPPED
                </span>
                <button
                  onClick={() => {
                    playClickSound();
                    setShowTryOnRack(true);
                  }}
                  className="text-[11px] font-bold text-pink-600 hover:text-pink-700 flex items-center gap-0.5 cursor-pointer"
                >
                  Wardrobe <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* 4 Category Slots: TOP, BOT, SHO, ACC */}
              <div className="space-y-2 flex-1">
                {[
                  { key: 'top' as const, label: 'TOP', item: equippedOutfit.top },
                  { key: 'bottom' as const, label: 'BOT', item: equippedOutfit.bottom },
                  { key: 'shoes' as const, label: 'SHO', item: equippedOutfit.shoes },
                  { key: 'accessories' as const, label: 'ACC', item: equippedOutfit.accessories },
                ].map(({ key, label, item }) => (
                  <div
                    key={key}
                    className={`p-2 rounded-xl border flex items-center justify-between transition-all ${
                      item
                        ? 'border-pink-300 bg-pink-50/60 shadow-2xs'
                        : 'border-pink-100/80 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-black tracking-wider text-pink-600 bg-pink-100/80 px-1.5 py-0.5 rounded border border-pink-200 shrink-0">
                        {label}
                      </span>
                      {item ? (
                        <div className="flex flex-col min-w-0">
                          <span
                            onClick={() => onOpenProductDetail(item)}
                            className="text-xs font-bold text-slate-800 truncate hover:text-pink-600 cursor-pointer"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                          <span className="text-[10px] text-pink-500 font-semibold">${item.price}</span>
                        </div>
                      ) : (
                        <span className="text-xs italic text-slate-400">None equipped</span>
                      )}
                    </div>

                    {item && (
                      <button
                        onClick={() => {
                          playClickSound();
                          onEquipItem(key, null);
                        }}
                        className="text-slate-400 hover:text-pink-600 p-1 rounded-md hover:bg-pink-100/50 transition-colors"
                        title="Unequip"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. TRY-ON RACK DRAWER (Requirement 11)
         ======================================================== */}
      {showTryOnRack && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 max-w-5xl mx-auto animate-in slide-in-from-bottom duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-pink-300 shadow-2xl p-4 sm:p-5 flex flex-col gap-3">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-800 tracking-wide font-display">
                  🛍️ Try-On Rack
                </span>
                {/* Category Selector Tabs */}
                <div className="flex items-center gap-1 ml-2 bg-pink-50 p-1 rounded-2xl border border-pink-200">
                  {(
                    [
                      { id: 'top', label: 'Tops' },
                      { id: 'bottom', label: 'Bottoms' },
                      { id: 'shoes', label: 'Shoes' },
                      { id: 'accessories', label: 'Bags' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClickSound();
                        setRackCategory(tab.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        rackCategory === tab.id
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-pink-600 hover:bg-white/60'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style filter and close */}
              <div className="flex items-center gap-2">
                <select
                  value={rackStyleFilter}
                  onChange={(e) => setRackStyleFilter(e.target.value)}
                  className="text-xs font-semibold text-slate-700 bg-pink-50 border border-pink-200 rounded-xl px-2.5 py-1 outline-none"
                >
                  <option value="all">All Styles</option>
                  <option value="coquette">Coquette</option>
                  <option value="korean">Korean</option>
                  <option value="vintage">Vintage</option>
                  <option value="office">Office</option>
                  <option value="y2k">Y2K</option>
                </select>

                <button
                  onClick={() => setShowTryOnRack(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Products Horizontal Strip */}
            <div className="flex items-center gap-3.5 overflow-x-auto pb-2 pt-1 custom-pink-scrollbar">
              {rackProducts.map((prod) => {
                const isEquipped = equippedOutfit[rackCategory]?.id === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => {
                      if (isEquipped) {
                        playClickSound();
                        onEquipItem(rackCategory, null);
                      } else {
                        playEquipSound();
                        onEquipItem(rackCategory, prod);
                      }
                    }}
                    className={`shrink-0 w-36 sm:w-40 p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center group relative ${
                      isEquipped
                        ? 'border-pink-500 bg-pink-50/80 shadow-md ring-2 ring-pink-300 scale-[1.03]'
                        : 'border-pink-100 bg-white hover:border-pink-300 hover:shadow-xs hover:scale-102'
                    }`}
                  >
                    {isEquipped && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-black bg-pink-500 text-white rounded-full">
                        EQUIPPED
                      </span>
                    )}

                    <div className="w-20 h-20 flex items-center justify-center my-1 group-hover:scale-105 transition-transform">
                      <FashionItemGraphic product={prod} size="md" />
                    </div>

                    <span className="text-xs font-bold text-slate-800 line-clamp-1 text-center w-full mt-1">
                      {prod.name}
                    </span>

                    <div className="flex items-center justify-between w-full mt-1.5 pt-1.5 border-t border-pink-100/60 text-[11px]">
                      <span className="text-pink-600 font-extrabold">${prod.price}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{prod.style}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. COLOR HARMONY MODAL
         ======================================================== */}
      {harmonyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setHarmonyModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold hover:bg-pink-200 transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-800">Color Harmony Analysis</h3>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-pink-50 border border-emerald-200 mb-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                98%
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-800">Flawless Color Match!</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  <span className="font-semibold text-pink-600">{currentHairShade.name}</span> (
                  {currentHairShade.tag}) harmonizes beautifully with your personal color palette and current outfit tones.
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between p-2 rounded-xl bg-pink-50">
                <span className="font-semibold">Selected Hair Tone:</span>
                <span className="font-bold text-pink-600">{currentHairShade.name}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-pink-50">
                <span className="font-semibold">Personal Color Season:</span>
                <span className="font-bold text-slate-800">{currentHairShade.tag}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-pink-50">
                <span className="font-semibold">Recommended Complementary Colors:</span>
                <span className="font-bold text-slate-800">Pastel Rose, Powder Blue, Ivory</span>
              </div>
            </div>
            <button
              onClick={() => setHarmonyModalOpen(false)}
              className="w-full mt-5 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Got it! ✨
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          7. RETRO DESKTOP MODALS (For icons)
         ======================================================== */}
      {activeDesktopModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FFF5F8] rounded-3xl border-2 border-pink-300 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="h-8 bg-gradient-to-r from-pink-200 to-pink-300 px-4 flex items-center justify-between border-b border-pink-300">
              <span className="text-xs font-bold text-slate-800 capitalize">
                {activeDesktopModal} · STYLEMATE OS
              </span>
              <button
                onClick={() => setActiveDesktopModal(null)}
                className="text-slate-600 hover:text-black font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-5 text-center">
              {activeDesktopModal === 'inspo' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">🎀 Fashion Inspo Moodboard</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Soft girl aesthetics, Y2K nostalgic pastels, and French dollhouse silhouettes.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-24 rounded-xl bg-pink-200 flex items-center justify-center text-3xl">🎀</div>
                    <div className="h-24 rounded-xl bg-sky-200 flex items-center justify-center text-3xl">🪞</div>
                    <div className="h-24 rounded-xl bg-purple-200 flex items-center justify-center text-3xl">✨</div>
                  </div>
                </div>
              )}
              {activeDesktopModal === 'secret' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">🔒 Secret Stuff</h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Developer Easter Egg: You discovered STYLEMATE secret wardrobe vault! Enjoy 100% styling freedom.
                  </p>
                  <div className="p-3 bg-pink-100 rounded-2xl text-xs font-mono text-pink-700">
                    CHEAT_CODE: VIRTUAL_DRESSUP_READY ✨
                  </div>
                </div>
              )}
              {activeDesktopModal === 'computer' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">🖥️ STYLEMATE Computer</h4>
                  <p className="text-xs text-slate-600">
                    System: STYLEMATE Fashion Studio OS (2000s Vintage Edition)<br/>
                    Processor: Quad-Core Aesthetic Engine<br/>
                    Memory: Unlimited Virtual Wardrobe
                  </p>
                </div>
              )}
              {activeDesktopModal === 'pictures' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">🖼️ My Photo Gallery</h4>
                  <p className="text-xs text-slate-600">
                    All snapshot looks captured via Fit Studio are stored securely in My Closet!
                  </p>
                </div>
              )}
              {activeDesktopModal === 'documents' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">💌 My Documents</h4>
                  <p className="text-xs text-slate-600">
                    Style diary entries, personal color notes, and fitting recommendations.
                  </p>
                </div>
              )}
              {activeDesktopModal === 'internet' && (
                <div>
                  <h4 className="font-extrabold text-slate-800 mb-2">🌐 Internet Explorer</h4>
                  <p className="text-xs text-slate-600">
                    Connected to STYLEMATE High-Speed Fashion Network!
                  </p>
                </div>
              )}
              <button
                onClick={() => setActiveDesktopModal(null)}
                className="mt-5 px-6 py-1.5 rounded-full bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save / Alert Toast */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 rounded-full bg-slate-900/90 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl animate-in slide-in-from-top duration-300">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Custom Pink Scrollbar Styling */}
      <style>{`
        .custom-pink-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-pink-scrollbar::-webkit-scrollbar-track {
          background: rgba(253, 226, 236, 0.4);
          border-radius: 9999px;
        }
        .custom-pink-scrollbar::-webkit-scrollbar-thumb {
          background: #F472B6;
          border-radius: 9999px;
        }
        .custom-pink-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #DB2777;
        }
      `}</style>
    </div>
  );
};
