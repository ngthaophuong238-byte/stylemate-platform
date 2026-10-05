import React, { useState } from 'react';
import { ModelProfile, PersonalColor } from '../types';
import { CHARACTER_PRESETS } from '../data/fashionData';
import { playClickSound } from '../utils/soundEffects';
import { X, Sparkles, User, Palette, Check } from 'lucide-react';

interface ModelProfileModalProps {
  profile: ModelProfile;
  onSaveProfile: (profile: ModelProfile) => void;
  onClose: () => void;
}

export const ModelProfileModal: React.FC<ModelProfileModalProps> = ({
  profile,
  onSaveProfile,
  onClose,
}) => {
  const [formData, setFormData] = useState<ModelProfile>({ ...profile });
  const [activeTab, setActiveTab] = useState<'measurements' | 'appearance'>('measurements');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const personalColors: { type: PersonalColor; desc: string; palette: string[] }[] = [
    {
      type: 'Spring Warm',
      desc: 'Bright, cheerful, peach & warm golden tones',
      palette: ['#FDBA74', '#FCD34D', '#F472B6', '#86EFAC'],
    },
    {
      type: 'Summer Cool',
      desc: 'Soft, airy, lavender, pastel pinks & powdery blues',
      palette: ['#C4B5FD', '#FBCFE8', '#93C5FD', '#E2E8F0'],
    },
    {
      type: 'Autumn Muted',
      desc: 'Rich, earthy, terracotta, olive & warm camel',
      palette: ['#B45309', '#78350F', '#15803D', '#D97706'],
    },
    {
      type: 'Winter Vivid',
      desc: 'High contrast, crisp pure white, deep black & royal berry',
      palette: ['#0F172A', '#BE185D', '#1E3A8A', '#F8FAFC'],
    },
  ];

  const handleMeasurementChange = (
    key: keyof ModelProfile['bodyMeasurements'],
    val: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      bodyMeasurements: {
        ...prev.bodyMeasurements,
        [key]: val,
      },
    }));
  };

  const handleSelectPreset = (preset: (typeof CHARACTER_PRESETS)[0]) => {
    playClickSound();
    setFormData((prev) => ({
      ...prev,
      characterId: preset.id,
      name: preset.name.split(' ')[0],
      hairColor: preset.hairColor,
      hairStyle: preset.hairStyle,
      personalColor: preset.personalColor,
    }));
  };

  const handleSave = () => {
    playClickSound();
    onSaveProfile(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-[#EB9AB2]/40 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EB9AB2]/30 bg-gradient-to-r from-[#EFCFE3]/40 via-white to-[#ECF2D8]/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪞</span>
            <h3 className="font-display font-bold text-xl text-slate-800">
              Model Profile & Measurements
            </h3>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#EFCFE3]/40 hover:bg-[#EFCFE3] text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#EB9AB2]/30 bg-[#EFCFE3]/20 px-6 pt-2">
          <button
            onClick={() => setActiveTab('measurements')}
            className={`pb-3 px-4 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'measurements'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Body Measurements</span>
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`pb-3 px-4 font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'appearance'
                ? 'border-[#E27396] text-[#E27396]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Appearance & Color</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'measurements' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your exact proportions. The Fit Studio 3D silhouette and virtual model dynamically adapt to your neck, shoulder, waist, and limb dimensions for tailored fit previewing.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Height */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Height:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="145"
                    max="185"
                    value={formData.bodyMeasurements.height}
                    onChange={(e) => handleMeasurementChange('height', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Weight:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="38"
                    max="95"
                    value={formData.bodyMeasurements.weight}
                    onChange={(e) => handleMeasurementChange('weight', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Waist */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Waist Circumference:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.waist} cm</span>
                  </div>
                  <input
                    type="range"
                    min="52"
                    max="95"
                    value={formData.bodyMeasurements.waist}
                    onChange={(e) => handleMeasurementChange('waist', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Shoulder Width */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Shoulder Width:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.shoulder} cm</span>
                  </div>
                  <input
                    type="range"
                    min="32"
                    max="48"
                    value={formData.bodyMeasurements.shoulder}
                    onChange={(e) => handleMeasurementChange('shoulder', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Neck Circumference */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Neck Circumference:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.neck} cm</span>
                  </div>
                  <input
                    type="range"
                    min="28"
                    max="42"
                    value={formData.bodyMeasurements.neck}
                    onChange={(e) => handleMeasurementChange('neck', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Upper Arm */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Upper-Arm Circumference:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.upperArm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="38"
                    value={formData.bodyMeasurements.upperArm}
                    onChange={(e) => handleMeasurementChange('upperArm', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>

                {/* Calf Circumference */}
                <div className="space-y-1 col-span-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Calf Circumference:</span>
                    <span className="text-pink-600 font-mono">{formData.bodyMeasurements.calf} cm</span>
                  </div>
                  <input
                    type="range"
                    min="26"
                    max="46"
                    value={formData.bodyMeasurements.calf}
                    onChange={(e) => handleMeasurementChange('calf', Number(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Presets */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Quick Character Style Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CHARACTER_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.characterId === preset.id
                          ? 'border-pink-500 bg-pink-50/80 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: preset.hairColor }}
                        />
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">
                          {preset.name.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1 line-clamp-1">
                        {preset.vibe}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Color Analysis */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Personal Color Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {personalColors.map((pc) => (
                    <button
                      key={pc.type}
                      onClick={() => {
                        playClickSound();
                        setFormData((prev) => ({ ...prev, personalColor: pc.type }));
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        formData.personalColor === pc.type
                          ? 'border-pink-500 bg-pink-50 shadow-sm ring-1 ring-pink-400'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                        <span>{pc.type}</span>
                        {formData.personalColor === pc.type && (
                          <Check className="w-3.5 h-3.5 text-pink-600" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">{pc.desc}</p>
                      <div className="flex gap-1.5 mt-2">
                        {pc.palette.map((hex, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hair Color */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Hair Color Swatches
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: 'Platinum Blonde', hex: '#FDE047' },
                    { name: 'Rose Gold', hex: '#F472B6' },
                    { name: 'Warm Caramel', hex: '#92400E' },
                    { name: 'Espresso Noir', hex: '#27272A' },
                    { name: 'Silver Lavender', hex: '#DDD6FE' },
                    { name: 'Honey Copper', hex: '#D97706' },
                  ].map((h) => (
                    <button
                      key={h.name}
                      onClick={() => setFormData((prev) => ({ ...prev, hairColor: h.hex }))}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${
                        formData.hairColor === h.hex
                          ? 'border-[#E27396] bg-[#ECF2D8] font-bold text-slate-800'
                          : 'border-slate-200 hover:border-[#EB9AB2] text-slate-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: h.hex }}
                      />
                      <span>{h.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#EB9AB2]/30 bg-white flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-[#E27396] hover:bg-[#E27396]/90 text-white flex items-center gap-2 shadow-md transition-all cursor-pointer shadow-[#E27396]/20"
          >
            {savedFeedback ? (
              <>
                <Check className="w-4 h-4" />
                <span>Profile Updated!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply to Character</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
