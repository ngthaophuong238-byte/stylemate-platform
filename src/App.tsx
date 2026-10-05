import React, { useState } from 'react';
import {
  CurrentView,
  Navbar,
} from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DiscoveryMap } from './components/DiscoveryMap';
import { WardrobeCabinet } from './components/WardrobeCabinet';
import { FitStudio } from './components/FitStudio';
import { MyCloset } from './components/MyCloset';
import { AiStylist } from './components/AiStylist';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ModelProfileModal } from './components/ModelProfileModal';
import { SavedLooksModal } from './components/SavedLooksModal';
import { ShoppingBagModal } from './components/ShoppingBagModal';
import {
  StyleId,
  Product,
  ModelProfile,
  EquippedOutfit,
  SavedLook,
  CartItem,
  SuggestedOutfit,
} from './types';
import { INITIAL_MODEL_PROFILE, PRODUCTS } from './data/fashionData';
import { playLoveSound, playClickSound, playEquipSound } from './utils/soundEffects';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<CurrentView>('welcome');
  const [currentStyle, setCurrentStyle] = useState<StyleId>('coquette');

  // User Profile
  const [modelProfile, setModelProfile] = useState<ModelProfile>(INITIAL_MODEL_PROFILE);

  // User Closet & Favorites
  // Seed with a few favorite items so closet isn't completely bare on first look
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['coq-top-1', 'kor-bot-1', 'coq-shoe-1']);
  const [closetIds, setClosetIds] = useState<string[]>(['coq-top-1', 'kor-bot-1', 'coq-shoe-1', 'coq-acc-1']);

  // Fit Studio Equipped Outfit (Reference B look by default)
  const [equippedOutfit, setEquippedOutfit] = useState<EquippedOutfit>({
    top: PRODUCTS.find((p) => p.id === 'vin-top-1') || PRODUCTS.find((p) => p.id === 'coq-top-1'),
    bottom: PRODUCTS.find((p) => p.id === 'vin-bot-2') || PRODUCTS.find((p) => p.id === 'coq-bot-1'),
    shoes: PRODUCTS.find((p) => p.id === 'vin-shoe-4') || PRODUCTS.find((p) => p.id === 'coq-shoe-1'),
    accessories: PRODUCTS.find((p) => p.id === 'off-acc-2') || PRODUCTS.find((p) => p.id === 'coq-acc-1'),
  });

  // Saved Looks Lookbook
  const [savedLooks, setSavedLooks] = useState<SavedLook[]>([
    {
      id: 'look-seed-1',
      name: 'Signature Coquette Tea Party',
      style: 'coquette',
      date: 'Oct 3, 2026',
      outfit: {
        top: PRODUCTS.find((p) => p.id === 'coq-top-1'),
        bottom: PRODUCTS.find((p) => p.id === 'coq-bot-1'),
        shoes: PRODUCTS.find((p) => p.id === 'coq-shoe-1'),
        accessories: PRODUCTS.find((p) => p.id === 'coq-acc-1'),
      },
      totalPrice: 216,
      vibe: 'Spring Warm · Romantic',
      occasion: 'Weekend Brunch',
    },
  ]);

  // Shopping Bag
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0]?.name || 'Blush Pink',
      selectedSize: 'S',
      quantity: 1,
    },
  ]);

  // Modals state
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isModelProfileOpen, setIsModelProfileOpen] = useState(false);
  const [isSavedLooksOpen, setIsSavedLooksOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  // Handlers
  const handleToggleFavorite = (product: Product) => {
    playLoveSound();
    setFavoriteIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleCloset = (product: Product) => {
    playLoveSound();
    setClosetIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleEquipItem = (
    category: 'top' | 'bottom' | 'shoes' | 'accessories',
    product: Product | null
  ) => {
    if (product) playEquipSound();
    setEquippedOutfit((prev) => ({
      ...prev,
      [category]: product || undefined,
    }));
  };

  const handleEquipFullLook = (items: Product[]) => {
    playEquipSound();
    setEquippedOutfit({
      top: items.find((i) => i.category === 'top'),
      bottom: items.find((i) => i.category === 'bottom'),
      shoes: items.find((i) => i.category === 'shoes'),
      accessories: items.find((i) => i.category === 'accessories'),
    });
    setCurrentView('fit-studio');
  };

  const handleEquipSuggestedOutfit = (outfit: SuggestedOutfit) => {
    playEquipSound();
    const top = PRODUCTS.find((p) => p.id === outfit.topId);
    const bottom = PRODUCTS.find((p) => p.id === outfit.bottomId);
    const shoes = PRODUCTS.find((p) => p.id === outfit.shoesId);
    const accessories = PRODUCTS.find((p) => p.id === outfit.accessoryId);

    setEquippedOutfit({ top, bottom, shoes, accessories });
    setCurrentView('fit-studio');
  };

  const handleSaveLook = (newLook: SavedLook) => {
    setSavedLooks((prev) => [newLook, ...prev]);
  };

  const handleDeleteLook = (lookId: string) => {
    setSavedLooks((prev) => prev.filter((l) => l.id !== lookId));
  };

  const handleAddToCart = (product: Product, color: string, size: string) => {
    playClickSound();
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFCFE3]/30 via-[#FFFDFE] to-[#ECF2D8]/30 text-slate-800 flex flex-col font-sans">
      {/* Top Bar Navigation (Clean 3-zone contract) */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenModelProfile={() => setIsModelProfileOpen(true)}
        onOpenSavedLooks={() => setIsSavedLooksOpen(true)}
        onOpenShoppingBag={() => setIsShoppingBagOpen(true)}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        savedLooksCount={savedLooks.length}
        closetCount={closetIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'welcome' && (
          <WelcomeScreen onStart={() => setCurrentView('map')} />
        )}

        {currentView === 'map' && (
          <DiscoveryMap
            onSelectStyle={(styleId) => {
              setCurrentStyle(styleId);
              setCurrentView('wardrobe');
            }}
            onOpenFitStudio={() => setCurrentView('fit-studio')}
            onOpenCloset={() => setCurrentView('closet')}
            onOpenAiStylist={() => setCurrentView('ai-stylist')}
          />
        )}

        {currentView === 'wardrobe' && (
          <WardrobeCabinet
            currentStyle={currentStyle}
            onChangeStyle={setCurrentStyle}
            onBackToMap={() => setCurrentView('map')}
            onOpenProductDetail={setActiveProductDetail}
            favorites={favoriteIds}
            closetItems={closetIds}
            onToggleFavorite={handleToggleFavorite}
            onToggleCloset={handleToggleCloset}
            onTryInFitStudio={(product) => {
              handleEquipItem(product.category, product);
              setCurrentView('fit-studio');
            }}
            onEquipFullOutfit={handleEquipSuggestedOutfit}
          />
        )}

        {currentView === 'fit-studio' && (
          <FitStudio
            profile={modelProfile}
            onUpdateProfile={setModelProfile}
            equippedOutfit={equippedOutfit}
            onEquipItem={handleEquipItem}
            onSaveLook={handleSaveLook}
            onOpenModelProfileModal={() => setIsModelProfileOpen(true)}
            onOpenCloset={() => setCurrentView('closet')}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setActiveProductDetail}
          />
        )}

        {currentView === 'closet' && (
          <MyCloset
            closetIds={closetIds}
            favoriteIds={favoriteIds}
            onToggleCloset={handleToggleCloset}
            onToggleFavorite={handleToggleFavorite}
            onEquipItem={(category, prod) => {
              handleEquipItem(category, prod);
              setCurrentView('fit-studio');
            }}
            onOpenProductDetail={setActiveProductDetail}
            onNavigateToMap={() => setCurrentView('map')}
            onNavigateToFitStudio={() => setCurrentView('fit-studio')}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'ai-stylist' && (
          <AiStylist
            profile={modelProfile}
            onEquipFullLook={handleEquipFullLook}
            onSaveLook={handleSaveLook}
            onOpenProductDetail={setActiveProductDetail}
            onAddToCart={handleAddToCart}
            onNavigateToFitStudio={() => setCurrentView('fit-studio')}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          isFavorite={favoriteIds.includes(activeProductDetail.id)}
          inCloset={closetIds.includes(activeProductDetail.id)}
          onToggleFavorite={handleToggleFavorite}
          onToggleCloset={handleToggleCloset}
          onTryInFitStudio={(product) => {
            handleEquipItem(product.category, product);
            setActiveProductDetail(null);
            setCurrentView('fit-studio');
          }}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Model Profile & Measurements Modal */}
      {isModelProfileOpen && (
        <ModelProfileModal
          profile={modelProfile}
          onSaveProfile={setModelProfile}
          onClose={() => setIsModelProfileOpen(false)}
        />
      )}

      {/* Saved Looks Lookbook Modal */}
      {isSavedLooksOpen && (
        <SavedLooksModal
          looks={savedLooks}
          onClose={() => setIsSavedLooksOpen(false)}
          onEquipLook={(look) => {
            setEquippedOutfit(look.outfit);
          }}
          onDeleteLook={handleDeleteLook}
          onAddToCart={handleAddToCart}
          onNavigateToFitStudio={() => setCurrentView('fit-studio')}
        />
      )}

      {/* Shopping Bag & Checkout Modal */}
      {isShoppingBagOpen && (
        <ShoppingBagModal
          items={cartItems}
          onClose={() => setIsShoppingBagOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />
      )}
    </div>
  );
}
