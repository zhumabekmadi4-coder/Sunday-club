"use client";

import React from 'react';
import Image from 'next/image';

export const Fireplace = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Premium Background Image - Subdued */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/assets/fireplace_bg.png"
          alt="Cozy Fireplace"
          fill
          className="object-cover grayscale-[0.2]"
          priority
        />
        {/* Dark vignette to focus eye on content */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      {/* Atmospheric Effects Overlay - Reduced Intensity */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent blur-[120px] animate-flicker-subtle" />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>
    </div>
  );
};

