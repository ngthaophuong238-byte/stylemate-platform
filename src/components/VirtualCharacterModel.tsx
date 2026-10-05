import React from 'react';
import { EquippedOutfit, ModelProfile } from '../types';
import {
  AvatarDefs,
  WearableBottom,
  WearableTop,
  WearableShoes,
  WearableBag,
  isFlaredBottom,
} from '../avatar/wearableRenderer';

export interface HairShade {
  id: string;
  name: string;
  tag: string;
  hex: string;
  preview: string;
}

export const HAIR_SHADES: HairShade[] = [
  { id: 'ice-blue-silver', name: 'Ice Blue Silver', tag: 'Summer Cool', hex: '#DCE7F5', preview: '#DCE7F5' },
  { id: 'platinum-blonde', name: 'Platinum Blonde', tag: 'Summer Cool', hex: '#FAF0D7', preview: '#FDF4DC' },
  { id: 'chestnut-brown', name: 'Chestnut Brown', tag: 'Autumn Muted', hex: '#8B5A3E', preview: '#8B5A3E' },
  { id: 'midnight-raven', name: 'Midnight Raven', tag: 'Winter Vivid', hex: '#1F232B', preview: '#262A35' },
  { id: 'cherry-wine', name: 'Cherry Wine', tag: 'Winter Deep', hex: '#8E2A43', preview: '#8E2A43' },
  { id: 'lilac-mist', name: 'Lilac Mist', tag: 'Summer Light', hex: '#C4B5FD', preview: '#C4B5FD' },
  { id: 'strawberry-milk', name: 'Strawberry Milk', tag: 'Spring Warm', hex: '#FBCFE8', preview: '#FBCFE8' },
  { id: 'soft-pink', name: 'Soft Pink', tag: 'Spring Light', hex: '#F472B6', preview: '#F472B6' },
  { id: 'rose-brown', name: 'Rose Brown', tag: 'Autumn Soft', hex: '#9C6B66', preview: '#9C6B66' },
  { id: 'honey-blonde', name: 'Honey Blonde', tag: 'Spring Warm', hex: '#F59E0B', preview: '#F59E0B' },
  { id: 'lavender', name: 'Lavender', tag: 'Summer Cool', hex: '#A78BFA', preview: '#A78BFA' },
  { id: 'ash-gray', name: 'Ash Gray', tag: 'Summer Muted', hex: '#94A3B8', preview: '#94A3B8' },
  { id: 'black', name: 'Black', tag: 'Winter Deep', hex: '#1A1A1A', preview: '#1A1A1A' },
];

export const getHairShadeFromProfile = (profile: ModelProfile, selectedHairShadeId?: string): HairShade => {
  if (selectedHairShadeId) {
    const found = HAIR_SHADES.find((s) => s.id === selectedHairShadeId);
    if (found) return found;
  }
  if (profile.hairColor) {
    const foundByHex = HAIR_SHADES.find(
      (s) => s.hex.toLowerCase() === profile.hairColor.toLowerCase() || s.id === profile.hairColor
    );
    if (foundByHex) return foundByHex;
  }
  return HAIR_SHADES[4]; // Default to Cherry Wine (Reference B)
};

interface VirtualCharacterModelProps {
  profile: ModelProfile;
  outfit: EquippedOutfit;
  className?: string;
  zoomToFace?: boolean;
  zoomLevel?: number;
  selectedHairShadeId?: string;
  isRandomizing?: boolean;
}

export const VirtualCharacterModel: React.FC<VirtualCharacterModelProps> = ({
  profile,
  outfit,
  className = '',
  zoomToFace = false,
  zoomLevel = 1.0,
  selectedHairShadeId,
  isRandomizing = false,
}) => {
  const currentShade = getHairShadeFromProfile(profile, selectedHairShadeId);
  const hairLayerSrc = `/models/avatar/hair/${currentShade.id}.png`;
  const hasFlaredPants = isFlaredBottom(outfit?.bottom);

  const effectiveScale = zoomToFace ? 2.3 : zoomLevel;
  const effectiveTranslateY = zoomToFace ? '28%' : '0%';

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
          isRandomizing ? 'scale-95 opacity-80' : 'opacity-100'
        }`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${effectiveScale}) translateY(${effectiveTranslateY})`,
          transformOrigin: zoomToFace ? '50% 15%' : '50% 50%',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg
          viewBox="0 0 373 568"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          className="drop-shadow-sm"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
            margin: '0 auto',
          }}
        >
          <defs>
            <AvatarDefs />
          </defs>

          {/* 1. Floor Ambient Soft Shadow (under feet / platform shoes) */}
          <ellipse
            cx="186.5"
            cy="556"
            rx="64"
            ry="7"
            fill="#F472B6"
            fillOpacity="0.22"
            filter="blur(5px)"
          />

          {/* 2. Base Character Body Layer (Head, Face, Cami, Shorts, Legs, Default Shoes) */}
          <image
            href="/models/avatar/base.png"
            x="0"
            y="0"
            width="373"
            height="568"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* 3. Hair Layer (Recolored with exact shading, if not base silver) */}
          {currentShade.id !== 'ice-blue-silver' && (
            <image
              key={hairLayerSrc}
              href={hairLayerSrc}
              x="0"
              y="0"
              width="373"
              height="568"
              preserveAspectRatio="xMidYMid meet"
            />
          )}

          {/* 4. Wearable Shoes (Platform Mary Janes, Sneakers, Heels - under flared hem) */}
          {outfit?.shoes && (
            <g id="avatar-layer-shoes" className="transition-all duration-300">
              <WearableShoes product={outfit.shoes} hasFlares={hasFlaredPants} />
            </g>
          )}

          {/* 5. Wearable Bottom (Trousers, Skirt, Shorts) */}
          {outfit?.bottom && (
            <g id="avatar-layer-bottom" className="transition-all duration-300">
              <WearableBottom product={outfit.bottom} />
            </g>
          )}

          {/* 6. Wearable Bag / Accessories (handle held naturally by hand) */}
          {outfit?.accessories && (
            <g id="avatar-layer-bag" className="transition-all duration-300">
              <WearableBag product={outfit.accessories} />
            </g>
          )}

          {/* 7. Wearable Top (Corset Blouse, Off-Shoulder, Cami, etc. - overlaps bottom waistband) */}
          {outfit?.top && (
            <g id="avatar-layer-top" className="transition-all duration-300">
              <WearableTop product={outfit.top} />
            </g>
          )}

          {/* 8. Arms & Hands Overlay (forearms + hands y >= 190 resting in front of top & holding bag) */}
          <image
            href="/models/avatar/arms.png"
            x="0"
            y="0"
            width="373"
            height="568"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};
