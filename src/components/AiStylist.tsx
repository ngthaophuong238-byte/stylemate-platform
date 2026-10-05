import React, { useState } from 'react';
import { ChatMessage, Product, StyleId, ModelProfile, EquippedOutfit, SavedLook } from '../types';
import { PRODUCTS, SUGGESTED_OUTFITS } from '../data/fashionData';
import { FashionItemGraphic } from './FashionItemGraphic';
import { playClickSound, playEquipSound, playCameraShutterSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Send,
  ShoppingBag,
  Camera,
  Bot,
  User,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';

interface AiStylistProps {
  profile: ModelProfile;
  onEquipFullLook: (items: Product[]) => void;
  onSaveLook: (look: SavedLook) => void;
  onOpenProductDetail: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onNavigateToFitStudio: () => void;
}

export const AiStylist: React.FC<AiStylistProps> = ({
  profile,
  onEquipFullLook,
  onSaveLook,
  onOpenProductDetail,
  onAddToCart,
  onNavigateToFitStudio,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'stylist',
      text: `Hello ${profile.name}! ✨ I'm your STYLEMATE AI Stylist. Tell me where you're heading, what mood you're in, or which style you want to wear. I'll tailor a complete look calibrated to your ${profile.personalColor} palette!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const promptSuggestions = [
    '☕ Cute Korean outfit for a coffee date',
    '💼 Polished elegant office meeting look',
    '💿 Y2K cyber look for a weekend party',
    '🎀 Romantic feminine Coquette picnic outfit',
    '📻 Vintage bookstore afternoon look',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent fashion AI analysis
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matchedStyle: StyleId = 'korean';
      let occasion = 'Casual Outing';
      let vibe = 'Chic & Trendy';

      if (lower.includes('coquette') || lower.includes('cute') || lower.includes('romantic') || lower.includes('picnic')) {
        matchedStyle = 'coquette';
        occasion = 'Garden Tea & Picnic';
        vibe = 'Sweet, Romantic & Dollcore';
      } else if (lower.includes('office') || lower.includes('work') || lower.includes('meeting') || lower.includes('boss') || lower.includes('formal')) {
        matchedStyle = 'office';
        occasion = 'Corporate Executive Meeting';
        vibe = 'Power Tailoring & Quiet Luxury';
      } else if (lower.includes('y2k') || lower.includes('party') || lower.includes('club') || lower.includes('rave') || lower.includes('early 2000')) {
        matchedStyle = 'y2k';
        occasion = 'Nightclub & Dance Festival';
        vibe = 'High Voltage Cyber Y2K';
      } else if (lower.includes('vintage') || lower.includes('retro') || lower.includes('book') || lower.includes('museum') || lower.includes('70s')) {
        matchedStyle = 'vintage';
        occasion = 'Art Gallery & Bookstore';
        vibe = 'Literary Retro Nostalgia';
      } else {
        matchedStyle = 'korean';
        occasion = 'Coffee Date & City Stroll';
        vibe = 'Effortless Seoul Minimal';
      }

      // Pick top, bottom, shoes, accessories for matched style
      const top = PRODUCTS.find((p) => p.style === matchedStyle && p.category === 'top');
      const bottom = PRODUCTS.find((p) => p.style === matchedStyle && p.category === 'bottom');
      const shoes = PRODUCTS.find((p) => p.style === matchedStyle && p.category === 'shoes');
      const acc = PRODUCTS.find((p) => p.style === matchedStyle && p.category === 'accessories');

      const items = [top, bottom, shoes, acc].filter(Boolean) as Product[];

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'stylist',
        text: `Here is a hand-picked ${matchedStyle.toUpperCase()} look tailored for your "${query}". The harmonious color balance complements your ${profile.personalColor} complexion beautifully!`,
        timestamp: 'Just now',
        suggestedOutfit: {
          title: `${matchedStyle.charAt(0).toUpperCase() + matchedStyle.slice(1)} Signature Ensemble`,
          style: matchedStyle,
          vibe,
          occasion,
          reasoning: `Structured to elevate your body proportions (${profile.bodyMeasurements.height}cm / ${profile.bodyMeasurements.waist}cm waist) with balanced contrast.`,
          items,
        },
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleWearLook = (items: Product[]) => {
    playEquipSound();
    onEquipFullLook(items);
    setToastMessage('Look equipped in Fit Studio! ✨');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveAiLook = (title: string, style: StyleId, items: Product[], vibe: string, occasion: string) => {
    playCameraShutterSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#FCD34D', '#C084FC'],
    });

    const equipped: EquippedOutfit = {
      top: items.find((i) => i.category === 'top'),
      bottom: items.find((i) => i.category === 'bottom'),
      shoes: items.find((i) => i.category === 'shoes'),
      accessories: items.find((i) => i.category === 'accessories'),
    };

    const saved: SavedLook = {
      id: `ai-look-${Date.now()}`,
      name: title,
      style,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      outfit: equipped,
      totalPrice: items.reduce((sum, i) => sum + i.price, 0),
      vibe,
      occasion,
    };

    onSaveLook(saved);
    setToastMessage('Look saved to Lookbook! 💖');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShopEntireLook = (items: Product[]) => {
    playClickSound();
    items.forEach((item) => {
      onAddToCart(item, item.colors[0]?.name || '', item.sizes[0] || 'M');
    });
    setToastMessage(`Added all ${items.length} pieces to your Shopping Bag! 🛍️`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-[#EFCFE3]/40 via-[#FFFFFF] to-[#ECF2D8]/40 p-4 sm:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-4 flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EB9AB2]/30 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E27396] to-[#EB9AB2] text-white flex items-center justify-center text-xl shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-slate-900">
                  AI Personal Stylist
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECF2D8] text-[#E27396]">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Styling Assistant calibrated to {profile.name} ({profile.personalColor})
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onNavigateToFitStudio();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] text-xs font-bold transition-colors cursor-pointer border border-[#EB9AB2]/30"
          >
            Open Fit Studio
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-xs flex items-center gap-1 shrink-0 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Try:</span>
          </span>
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-[#EFCFE3]/30 hover:bg-[#EFCFE3]/60 text-slate-800 text-xs font-medium whitespace-nowrap border border-[#EB9AB2]/30 transition-all cursor-pointer shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 rounded-3xl bg-[#EFCFE3]/15 border border-[#EB9AB2]/30 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'stylist' && (
                <div className="w-8 h-8 rounded-full bg-[#E27396] text-white flex items-center justify-center shrink-0 text-sm shadow-xs">
                  ✨
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 space-y-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-bl-none border border-[#EB9AB2]/30 shadow-sm'
                }`}
              >
                <p>{msg.text}</p>

                {/* Suggested Outfit Card if AI recommendation */}
                {msg.suggestedOutfit && (
                  <div className="mt-3 p-4 rounded-2xl bg-gradient-to-b from-[#FFFDFE] to-[#EFCFE3]/20 border-2 border-[#EB9AB2] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#EB9AB2]/30 pb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E27396] block">
                          Recommended Look · {msg.suggestedOutfit.style}
                        </span>
                        <h4 className="font-display font-bold text-sm text-slate-900">
                          {msg.suggestedOutfit.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#E27396]">
                        Total: $
                        {msg.suggestedOutfit.items.reduce((sum, item) => sum + item.price, 0)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 italic">
                      {msg.suggestedOutfit.reasoning}
                    </p>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {msg.suggestedOutfit.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onOpenProductDetail(item)}
                          className="bg-white rounded-xl border border-[#EB9AB2]/30 p-2 flex flex-col items-center text-center cursor-pointer hover:border-[#E27396] transition-all hover:shadow-xs"
                        >
                          <FashionItemGraphic product={item} size="sm" />
                          <span className="text-[11px] font-bold text-slate-800 line-clamp-1 mt-1">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-bold text-[#E27396] font-mono">
                            ${item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Outfit Action Buttons */}
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-[#EB9AB2]/30">
                      <button
                        onClick={() => handleWearLook(msg.suggestedOutfit!.items)}
                        className="px-3 py-1.5 rounded-xl bg-[#ECF2D8] hover:bg-[#B3DEE2]/40 text-[#E27396] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-[#EB9AB2]/30"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#E27396]" />
                        <span>Try in Fit Studio</span>
                      </button>

                      <button
                        onClick={() =>
                          handleSaveAiLook(
                            msg.suggestedOutfit!.title,
                            msg.suggestedOutfit!.style,
                            msg.suggestedOutfit!.items,
                            msg.suggestedOutfit!.vibe,
                            msg.suggestedOutfit!.occasion
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EFCFE3]/30 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span>Save Look</span>
                      </button>

                      <button
                        onClick={() => handleShopEntireLook(msg.suggestedOutfit!.items)}
                        className="px-4 py-1.5 rounded-xl bg-[#E27396] hover:bg-[#E27396]/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shadow-[#E27396]/20"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop Complete Look</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  {profile.name[0]}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#E27396] italic">
              <span className="animate-spin text-sm">✨</span>
              <span>Stylist is curating the perfect ensemble...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="E.g., I need a romantic Coquette look for an afternoon brunch..."
            className="w-full px-5 py-3.5 pr-14 rounded-2xl border-2 border-[#EB9AB2]/40 bg-white focus:outline-none focus:border-[#E27396] text-xs sm:text-sm text-slate-800 shadow-sm placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="absolute right-2 w-10 h-10 rounded-xl bg-[#E27396] hover:bg-[#E27396]/90 disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-slate-900/90 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4 text-[#EB9AB2]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
