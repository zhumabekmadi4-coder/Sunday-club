"use client";

import React from 'react';
import Image from 'next/image';

export const Fireplace = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Premium Background Image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/assets/fireplace_bg.png"
          alt="Cozy Fireplace with Rocking Chair"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/40 mix-blend-multiply" />
      </div>

      {/* Atmospheric Effects Overlay */}
      <div className="absolute inset-0">
        {/* Subtle flickers to give life to the static image */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-amber-500/5 to-transparent blur-3xl animate-flicker-custom" />
        <div className="absolute inset-0 bg-orange-950/20 mix-blend-color-burn" />
      </div>
    </div>
  );
};
