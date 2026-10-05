import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/fashionData';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playClickSound, playEquipSound, playLoveSound } from '../utils/soundEffects';
import { Heart, Sparkles, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface MyClosetProps {
  closetIds: string[];
  favoriteIds: string[];
  onToggleCloset: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onEquipItem: (category: 'top' | 'bottom' | 'shoes' | 'accessories', product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
  onNavigateToMap: () => void;
  onNavigateToFitStudio: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const MyCloset: React.FC<MyClosetProps> = ({
  closetIds,
  favoriteIds,
  onToggleCloset,
  onToggleFavorite,
  onEquipItem,
  onOpenProductDetail,
  onNavigateToMap,
  onNavigateToFitStudio,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'top' | 'bottom' | 'shoes' | 'accessories'>('all');

  const closetProducts = useMemo(() => {
    return PRODUCTS.filter((p) => closetIds.includes(p.id));
  }, [closetIds]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return closetProducts;
    return closetProducts.filter((p) => p.category === activeCategory);
  }, [closetProducts, activeCategory]);

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-[#EFCFE3]/40 via-[#FFFFFF] to-[#ECF2D8]/40 p-4 sm:p-8 select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EB9AB2]/30 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💖</span>
              <h2 className="text-3xl font-bold font-display text-slate-900">
                My Digital Closet
              </h2>
              <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-[#ECF2D8] text-[#E27396]">
                {closetProducts.length} Pieces
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your personalized collection of curated styles, ready to mix & match in the Fit Studio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                onNavigateToFitStudio();
              }}
              className="px-4 py-2 rounded-2xl bg-[#E27396] hover:bg-[#E27396]/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#E27396]/20 transition-all cursor-pointer transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Go to Fit Studio</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {(['all', 'top', 'bottom', 'shoes', 'accessories'] as const).map((cat) => {
            const count =
              cat === 'all'
                ? closetProducts.length
                : closetProducts.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#E27396] text-white shadow-sm'
                    : 'bg-white hover:bg-[#EFCFE3]/30 text-slate-600 border border-[#EB9AB2]/30'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat ? 'bg-white/20 text-white' : 'bg-[#ECF2D8] text-[#E27396]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isFav = favoriteIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border-2 border-[#EB9AB2]/40 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Visual Display */}
                  <div
                    onClick={() => {
                      playClickSound();
                      onOpenProductDetail(product);
                    }}
                    className="relative aspect-square rounded-2xl bg-gradient-to-tr from-[#EFCFE3]/30 to-[#ECF2D8]/30 p-4 flex items-center justify-center cursor-pointer overflow-hidden group-hover:bg-[#EFCFE3]/20 transition-colors"
                  >
                    <FashionItemGraphic
                      product={product}
                      showHanger={true}
                      size="md"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Style tag */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 border border-[#EB9AB2]/40 text-[#E27396]">
                      {product.style}
                    </span>

                    {/* Favorite toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playLoveSound();
                        onToggleFavorite(product);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isFav
                          ? 'bg-[#E27396] text-white shadow-xs'
                          : 'bg-white/80 hover:bg-white text-slate-400 hover:text-[#E27396] border border-[#EB9AB2]/30'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-mono font-bold text-slate-400">
                        {product.category}
                      </span>
                      <span className="font-display font-bold text-[#E27396] text-sm">
                        ${product.price}
                      </span>
                    </div>

                    <h4
                      onClick={() => onOpenProductDetail(product)}
                      className="font-bold text-sm text-slate-800 line-clamp-1 hover:text-[#E27396] cursor-pointer transition-colors"
                    >
                      {product.name}
                    </h4>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        playEquipSound();
                        onEquipItem(product.category, product);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EB9AB2]/30"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E27396]" />
                      <span>Wear</span>
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        onAddToCart(product, product.colors[0]?.name || '', product.sizes[0] || 'M');
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-[#EFCFE3]/40 text-slate-700 transition-colors cursor-pointer"
                      title="Add to shopping bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        onToggleCloset(product);
                      }}
                      className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-[#E27396] transition-colors cursor-pointer"
                      title="Remove from closet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Closet State */
          <div className="py-20 flex flex-col items-center justify-center text-center rounded-3xl bg-[#EFCFE3]/20 border-2 border-dashed border-[#EB9AB2]/50 p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#ECF2D8] border border-[#EB9AB2]/40 flex items-center justify-center text-4xl">
              👗
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="font-display font-bold text-xl text-slate-800">
                Your Closet is Waiting!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You haven&apos;t saved any pieces in this category yet. Explore the Fashion Map to discover items and click the heart or &quot;+ Closet&quot; button to collect them.
              </p>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onNavigateToMap();
              }}
              className="mt-2 px-6 py-2.5 rounded-2xl bg-[#E27396] hover:bg-[#E27396]/90 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer shadow-[#E27396]/20"
            >
              <span>Explore Fashion Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
