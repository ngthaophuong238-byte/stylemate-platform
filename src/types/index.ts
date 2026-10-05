export type StyleId = 'korean' | 'vintage' | 'coquette' | 'office' | 'y2k';

// ---------------------------------------------------------------------------
// Fit Studio wearable (try-on) assets
// A try-on asset is NOT the product photo. It describes a clothing-only layer
// drawn on the shared avatar canvas (see src/avatar/avatarCanvas.ts), so every
// garment is anchored to the same anatomy as the base body.
// ---------------------------------------------------------------------------
export type WearableSlot = 'top' | 'bottom' | 'shoes' | 'bag';

export type TopKind =
  | 'cami' | 'tube' | 'corset' | 'halter' | 'puff' | 'offshoulder'
  | 'tee' | 'longsleeve' | 'peplum' | 'hoodie' | 'wrap';
export type BottomKind =
  | 'mini-skirt' | 'pleated-mini' | 'tiered-mini' | 'midi-skirt' | 'column-midi'
  | 'maxi-skirt' | 'shorts' | 'flare-pants' | 'wide-pants' | 'straight-jeans';
export type ShoeKind =
  | 'sneaker' | 'maryjane' | 'platform-maryjane' | 'ballet-flat' | 'heel'
  | 'boot' | 'moon-boot' | 'wedge' | 'mule';
export type BagKind = 'tote' | 'bowling' | 'tophandle' | 'dumpling' | 'baguette' | 'flap' | 'crescent';

export type FabricPattern =
  | 'solid' | 'tartan' | 'gingham' | 'houndstooth' | 'polka' | 'pinstripe' | 'stripe'
  | 'floral' | 'leopard' | 'denim' | 'corduroy' | 'velour' | 'tweed' | 'metallic'
  | 'ribbed' | 'gloss';

export interface TryOnAsset {
  slot: WearableSlot;
  kind: TopKind | BottomKind | ShoeKind | BagKind;
  pattern: FabricPattern;
  color: string;       // main fabric colour
  accent: string;      // secondary colour (pattern lines, trims, straps)
  details: {
    bow?: boolean;
    lace?: boolean;
    buttons?: boolean;
    lacing?: boolean;
    collar?: boolean;
    belt?: boolean;
    pleats?: boolean;
    lowRise?: boolean;
    pointed?: boolean;
    strap?: boolean;
    pearls?: boolean;
    fur?: boolean;
    charm?: boolean;
    zip?: boolean;
  };
}

export type CategoryId = 'top' | 'bottom' | 'shoes' | 'accessories' | 'outfits';

export type PersonalColor =
  | 'Spring Warm'
  | 'Spring Light'
  | 'Summer Cool'
  | 'Summer Light'
  | 'Summer Muted'
  | 'Autumn Muted'
  | 'Autumn Soft'
  | 'Winter Vivid'
  | 'Winter Deep';

export interface Product {
  id: string;
  name: string;
  style: StyleId;
  category: 'top' | 'bottom' | 'shoes' | 'accessories';
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  sizeGuide: {
    bustOrChest: string;
    waist: string;
    length: string;
  };
  visualIcon: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  details: string[];
  imageUrl?: string;      // productImage – shopping UI only
  tryOnAsset?: Partial<TryOnAsset>; // optional explicit avatar asset override
}

export interface SuggestedOutfit {
  id: string;
  name: string;
  style: StyleId;
  description: string;
  vibe: string;
  occasion: string;
  topId: string;
  bottomId: string;
  shoesId: string;
  accessoryId: string;
  discountPercentage?: number;
}

export interface ModelProfile {
  characterId: string;
  name: string;
  avatarUrl: string;
  hairColor: string;
  hairStyle: string;
  skinTone?: string;
  personalColor: PersonalColor;
  bodyMeasurements: {
    neck: number;      // cm, e.g. 32
    shoulder: number;  // cm, e.g. 38
    upperArm: number;  // cm, e.g. 25
    waist: number;     // cm, e.g. 64
    calf: number;      // cm, e.g. 34
    height: number;    // cm, e.g. 165
    weight: number;    // kg, e.g. 50
  };
}

export interface EquippedOutfit {
  top?: Product;
  bottom?: Product;
  shoes?: Product;
  accessories?: Product;
}

export interface SavedLook {
  id: string;
  name: string;
  style: StyleId;
  date: string;
  outfit: EquippedOutfit;
  totalPrice: number;
  vibe: string;
  occasion: string;
  hairShadeId?: string;
  hairColor?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'stylist';
  text: string;
  timestamp: string;
  suggestedOutfit?: {
    title: string;
    style: StyleId;
    vibe: string;
    occasion: string;
    reasoning: string;
    items: Product[];
  };
}
