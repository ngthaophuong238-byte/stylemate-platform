import React, { useState } from 'react';
import { Product } from '../types';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playLoveSound, playClickSound, playEquipSound } from '../utils/soundEffects';
import { Heart, ShoppingBag, Sparkles, X, Check, Ruler, Tag } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  inCloset: boolean;
  onToggleFavorite: (product: Product) => void;
  onToggleCloset: (product: Product) => void;
  onTryInFitStudio: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isFavorite,
  inCloset,
  onToggleFavorite,
  onToggleCloset,
  onTryInFitStudio,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedColorHex, setSelectedColorHex] = useState(product.colors[0]?.hex || '#FBCFE8');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const handleColorPick = (color: { name: string; hex: string }) => {
    setSelectedColor(color.name);
    setSelectedColorHex(color.hex);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#EB9AB2]/40 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EB9AB2]/30 bg-gradient-to-r from-[#EFCFE3]/40 via-white to-[#ECF2D8]/30">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#EFCFE3] text-[#E27396]">
              {product.style.toUpperCase()} · {product.category.toUpperCase()}
            </span>
            {product.badge && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECF2D8] text-slate-800 border border-[#EB9AB2]/30 flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#E27396]" />
                {product.badge}
              </span>
            )}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Display with Hanger */}
            <div className="relative aspect-square rounded-2xl bg-gradient-to-tr from-[#EFCFE3]/30 via-[#FFF9FB] to-[#ECF2D8]/30 border border-[#EB9AB2]/30 p-6 flex flex-col items-center justify-center shadow-inner group">
              <FashionItemGraphic
                product={product}
                selectedColor={selectedColorHex}
                showHanger={true}
                size="lg"
              />

              {/* Action floating buttons on image */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    playLoveSound();
                    onToggleFavorite(product);
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all transform active:scale-90 cursor-pointer ${
                    isFavorite
                      ? 'bg-[#E27396] text-white animate-bounce'
                      : 'bg-white text-slate-400 hover:text-[#E27396]'
                  }`}
                  title="Favorite item"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="text-xs text-slate-400 mt-2 font-medium">
                Color preview: <span className="font-semibold text-slate-700">{selectedColor}</span>
              </div>
            </div>

            {/* Right: Specifications & Options */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-display text-slate-900 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-2xl font-bold text-[#E27396] font-display">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    ★ {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Color: <span className="text-[#E27396] normal-case font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorPick(c)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#E27396] bg-[#ECF2D8] text-slate-900 shadow-xs'
                          : 'border-slate-200 hover:border-[#EB9AB2] text-slate-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Size
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs font-semibold text-[#E27396] hover:text-[#E27396]/80 flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Hide size guide' : 'Size guide'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#E27396] text-white border-[#E27396] shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Immediate Size Measurements for Selected Size */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-[#FFF0F5] border border-pink-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Ruler className="w-3.5 h-3.5 text-[#E27396] shrink-0" />
                    <span className="font-semibold text-pink-700">Size {selectedSize} Dimensions:</span>
                    <span className="font-medium text-slate-800">
                      Bust {product.sizeGuide.bustOrChest} · Waist {product.sizeGuide.waist} · Length {product.sizeGuide.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] font-bold text-[#E27396] hover:underline cursor-pointer ml-auto"
                  >
                    {showSizeGuide ? 'Close guide' : 'Size guide table'}
                  </button>
                </div>

                {/* Size Guide Drawer */}
                {showSizeGuide && (
                  <div className="mt-2 p-3 rounded-2xl bg-[#EFCFE3]/30 border border-[#EB9AB2]/30 text-xs space-y-1.5">
                    <div className="font-bold text-slate-800">Garment Dimensions ({selectedSize}):</div>
                    <div className="grid grid-cols-3 gap-2 text-slate-600 text-[11px]">
                      <div>
                        <span className="block font-medium text-slate-400">Bust / Chest:</span>
                        <span className="font-semibold text-slate-700">{product.sizeGuide.bustOrChest}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-slate-400">Waist:</span>
                        <span className="font-semibold text-slate-700">{product.sizeGuide.waist}</span>
                      </div>
                      <div>
                        <span className="block font-medium text-slate-400">Length:</span>
                        <span className="font-semibold text-slate-700">{product.sizeGuide.length}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fabric & Materials */}
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-700">Fabric & Care: </span>
                {product.fabric}
              </div>
            </div>
          </div>

          {/* Details Bullets */}
          <div className="p-4 rounded-2xl bg-[#ECF2D8]/40 border border-[#EB9AB2]/20">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Key Style Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
              {product.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#E27396]">✦</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-[#EB9AB2]/30 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Add to Closet */}
            <button
              onClick={() => {
                playLoveSound();
                onToggleCloset(product);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                inCloset
                  ? 'bg-[#EFCFE3] text-[#E27396] border border-[#EB9AB2]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${inCloset ? 'fill-[#E27396] text-[#E27396]' : ''}`} />
              <span>{inCloset ? 'Saved in Closet' : 'Save to Closet'}</span>
            </button>

            {/* Try in Fit Studio */}
            <button
              onClick={() => {
                playEquipSound();
                onTryInFitStudio(product);
              }}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] border border-[#EB9AB2]/30 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#E27396]" />
              <span>Try in Fit Studio</span>
            </button>
          </div>

          {/* Add to Shopping Bag */}
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#E27396] to-[#EB9AB2] hover:opacity-95 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Shop This Piece (${product.price})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
