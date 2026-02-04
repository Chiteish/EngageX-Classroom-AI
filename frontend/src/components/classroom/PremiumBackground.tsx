import React from 'react';

const PremiumBackground = () => {
  return (
    <div className="premium-bg fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Background video layer (place file at public/bg-techno.mp4) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg-techno.mp4" type="video/mp4" />
      </video>

      {/* Abstract floating shapes */}
      <div className="abstract-shapes">
        <div className="abstract-shape abstract-shape-1" />
        <div className="abstract-shape abstract-shape-2" />
        <div className="abstract-shape abstract-shape-3" />
      </div>

      {/* Vertical aurora waves */}
      <div className="aurora-waves" />

      {/* Center glow highlight */}
      <div className="center-glow" />

      {/* Subtle starfield */}
      <div className="starfield" />

      {/* Subtle grid pattern */}
      <div className="grid-pattern" />

      {/* Cinematic vignette */}
      <div className="vignette" />

      {/* Luminous overlay */}
      <div className="aurora-overlay" />
      {/* Background image layer */}
      <div className="bg-image-layer" />
    </div>
  );
};

export default PremiumBackground;
