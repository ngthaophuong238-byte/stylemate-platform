import React, { useState } from 'react';
import { CartItem } from '../types';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playClickSound, playCameraShutterSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Tag } from 'lucide-react';

interface ShoppingBagModalProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const ShoppingBagModal: React.FC<ShoppingBagModalProps> = ({
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 8;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (promoCode.trim().toUpperCase() === 'STYLEMATE20') {
      setAppliedDiscount(0.2);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'COQUETTE10') {
      setAppliedDiscount(0.1);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "STYLEMATE20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    playCameraShutterSound();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#10B981', '#FCD34D', '#C084FC'],
    });
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#EB9AB2]/40 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EB9AB2]/30 bg-gradient-to-r from-[#EFCFE3]/40 via-white to-[#ECF2D8]/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Shopping Bag
              </h3>
              <p className="text-xs text-slate-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isOrdered ? (
            /* Order Placed Success Confirmation */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#ECF2D8] text-[#E27396] border border-[#EB9AB2]/40 flex items-center justify-center text-4xl shadow-md animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-2xl text-slate-900">
                  Order Successfully Placed! 💖
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
                  Your mock shopping experience has completed. Your fashion pieces are now registered in your virtual styling history!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-[#E27396] text-white font-bold text-xs cursor-pointer shadow-md hover:opacity-95"
              >
                Continue Styling
              </button>
            </div>
          ) : items.length > 0 ? (
            <div className="space-y-6">
              {/* Items List */}
              <div className="divide-y divide-[#EB9AB2]/20">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#EFCFE3]/30 p-2 flex items-center justify-center shrink-0 border border-[#EB9AB2]/30">
                        <FashionItemGraphic product={item.product} size="sm" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-display font-bold text-sm text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                          <span>·</span>
                          <span>Size: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                        </div>
                        <div className="font-display font-bold text-[#E27396] text-xs sm:text-sm">
                          ${item.product.price}
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 hover:bg-[#EFCFE3]/30 text-slate-600 cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 hover:bg-[#EFCFE3]/30 text-slate-600 cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-[#E27396] hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder='Try promo "STYLEMATE20"'
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-[#EB9AB2]/40 text-xs focus:outline-none focus:border-[#E27396] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] font-bold text-xs cursor-pointer transition-colors shrink-0 border border-[#EB9AB2]/30"
                >
                  Apply Code
                </button>
              </form>
              {promoError && <p className="text-[11px] text-[#E27396]">{promoError}</p>}
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#E27396]" />
                  <span>Promo applied: {(appliedDiscount * 100).toFixed(0)}% OFF!</span>
                </p>
              )}

              {/* Summary Calculation */}
              <div className="p-4 rounded-2xl bg-[#ECF2D8]/40 border border-[#EB9AB2]/30 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-800">${subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-mono font-bold text-slate-800">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-[#EB9AB2]/40">
                  <span>Total</span>
                  <span className="font-display font-bold text-[#E27396] text-lg">
                    ${grandTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#E27396] to-[#EB9AB2] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shadow-[#E27396]/25"
              >
                <span>Complete Order (${grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-4xl">🛍️</span>
              <h4 className="font-display font-bold text-lg text-slate-800">Your Bag is Empty</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Browse through the fashion wardrobes and add your favorite items to checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
