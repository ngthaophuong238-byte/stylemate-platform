import React from 'react';
import { SavedLook, Product } from '../types';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playClickSound, playEquipSound } from '../utils/soundEffects';
import { X, Sparkles, ShoppingBag, Trash2, Calendar, Tag } from 'lucide-react';

interface SavedLooksModalProps {
  looks: SavedLook[];
  onClose: () => void;
  onEquipLook: (look: SavedLook) => void;
  onDeleteLook: (lookId: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onNavigateToFitStudio: () => void;
}

export const SavedLooksModal: React.FC<SavedLooksModalProps> = ({
  looks,
  onClose,
  onEquipLook,
  onDeleteLook,
  onAddToCart,
  onNavigateToFitStudio,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-[#EB9AB2]/40 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EB9AB2]/30 bg-gradient-to-r from-[#EFCFE3]/40 via-white to-[#ECF2D8]/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                My Saved Looks & Lookbook
              </h3>
              <p className="text-xs text-slate-500">
                Complete styled outfits snapshot from Fit Studio and AI Stylist sessions
              </p>
            </div>
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

        {/* Looks List */}
        <div className="p-6 overflow-y-auto space-y-6">
          {looks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {looks.map((look) => {
                const items = [
                  look.outfit.top,
                  look.outfit.bottom,
                  look.outfit.shoes,
                  look.outfit.accessories,
                ].filter(Boolean) as Product[];

                return (
                  <div
                    key={look.id}
                    className="p-5 rounded-3xl bg-[#ECF2D8]/30 border-2 border-[#EB9AB2]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EFCFE3] text-[#E27396]">
                          {look.style}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{look.date}</span>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-base text-slate-900 leading-tight">
                        {look.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {look.vibe} · {look.occasion}
                      </p>
                    </div>

                    {/* Garments snapshot preview */}
                    <div className="flex items-center justify-center gap-2 bg-white rounded-2xl p-3 border border-[#EB9AB2]/30 shadow-2xs">
                      {items.map((item) => (
                        <div key={item.id} className="p-1" title={item.name}>
                          <FashionItemGraphic product={item} size="sm" />
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#EB9AB2]/30">
                      <span className="font-display font-bold text-[#E27396] text-base">
                        ${look.totalPrice}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            playEquipSound();
                            onEquipLook(look);
                            onNavigateToFitStudio();
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-[#EB9AB2]/30"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#E27396]" />
                          <span>Wear</span>
                        </button>

                        <button
                          onClick={() => {
                            playClickSound();
                            items.forEach((item) => {
                              onAddToCart(item, item.colors[0]?.name || '', item.sizes[0] || 'M');
                            });
                          }}
                          className="p-1.5 rounded-xl bg-[#E27396] text-white hover:bg-[#E27396]/90 transition-colors cursor-pointer shadow-2xs"
                          title="Add entire look to bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            playClickSound();
                            onDeleteLook(look.id);
                          }}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-[#E27396] hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete snapshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-4xl">📸</span>
              <h4 className="font-display font-bold text-lg text-slate-800">No Saved Looks Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Equip an ensemble in the Fit Studio and click &quot;Save Look&quot; to capture your favorite outfits here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
