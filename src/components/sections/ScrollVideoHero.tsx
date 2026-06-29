'use client';

import NextLink from 'next/link';
import { useLanguageStore } from '@/store/useLanguageStore';

export function ScrollVideoHero() {
  const { t } = useLanguageStore();

  return (
    <section className="relative w-full min-h-screen md:h-screen overflow-hidden bg-[#091524] flex items-center">
      {/* Background Image */}
      <img
        src="/hero-ship-bg.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Subtle vignette / dark overlay layer to keep the transparent navbar header readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-10 pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 w-full h-full max-w-[95%] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-between pt-36 pb-8 text-white min-h-screen md:min-h-0">
        
        {/* Top/Middle Section: Heading, Subtitle, Description and Buttons */}
        <div className="max-w-4xl mt-auto md:my-auto space-y-6 pt-8 md:pt-0">
          <h1 className="uppercase tracking-tight leading-[1.0] font-display">
            <span 
              className="block text-5xl sm:text-7xl lg:text-[6.5rem] leading-[1.0]"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)', color: 'transparent' }}
            >
              {t.hero.reliableGlobal}
            </span>
            <span className="block text-white text-3xl sm:text-5xl lg:text-[4.8rem] leading-[1.0] mt-2">
              {t.hero.cargoFreight}
            </span>
            <span className="block text-xl sm:text-2xl lg:text-3xl text-white mt-4 font-semibold tracking-wide normal-case font-sans">
              {t.hero.shippingSolutions}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <NextLink
              href="/booking"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ffd324] via-[#f3c116] to-[#e67e22] hover:from-[#ffe066] hover:to-[#f39c12] px-8 py-3 text-sm font-black text-[#091524] transition-all hover:scale-105 shadow-[0_0_25px_rgba(243,193,22,0.4)] hover:shadow-[0_0_35px_rgba(243,193,22,0.55)] border-2 border-white/20 uppercase tracking-wider md:translate-x-8"
            >
              {t.hero.bookShipment}
              <span className="text-sm">➔</span>
            </NextLink>
          </div>
        </div>

        {/* Bottom Section: Dashboard Widgets */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 w-full mt-auto pt-12 pb-6 md:pb-0">
          
          {/* Left Widget: Uploading / Book Container */}
          <div className="relative flex-1 max-w-[325px] min-h-[145px]">
            {/* Inner card with backdrop blur */}
            <div className="w-full h-full bg-[#091524]/60 border border-white/10 rounded-[24px] p-5 backdrop-blur-xl flex flex-col justify-between shadow-xl">
              <div className="space-y-3.5 pr-24">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3b82f6]">
                  {t.hero.uploading}
                </span>
                <h3 
                  className="text-[17px] font-bold text-white leading-[1.35] uppercase font-display max-w-[210px]"
                  style={{ letterSpacing: '0.08em', wordSpacing: '0.18em' }}
                >
                  {t.hero.bookContainer}
                </h3>
                <NextLink 
                  href="/quote" 
                  className="inline-block text-[13px] font-bold uppercase tracking-wider text-[#f3c116] underline hover:text-[#dbab09] transition-colors"
                >
                  {t.hero.bookNow}
                </NextLink>
              </div>
            </div>
            {/* Floating 3D Yellow Cargo Container Image placed outside the backdrop-blur div to avoid rendering bugs */}
            <img 
              src="/images/yellow_container_clean.png" 
              alt="Yellow Cargo Container"
              className="absolute -right-9 -bottom-5 w-56 h-56 object-contain pointer-events-none transform rotate-[-8deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* Right Widget: Live Ship Tracking */}
          <div className="flex-1 max-w-[325px] bg-[#091524]/60 border border-white/10 rounded-[24px] p-5 backdrop-blur-xl flex flex-col justify-between shadow-xl min-h-[145px]">
            {/* Header: Locations */}
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold tracking-wider text-white">CN SHG</span>
              
              {/* White Circular Badge with Tilted Container Icon */}
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md border border-white/10">
                <svg className="h-4 w-4 text-[#f39c12]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16h16v2H4zm17-5l-1-3h-3.5L16.2 5H7.8L7.5 8H4l-1 3v3h18v-3zm-6-2.5l.5 1.5h-5l.5-1.5h4z" />
                </svg>
              </div>
              
              <span className="text-[15px] font-bold tracking-wider text-white">US OAK</span>
            </div>

            {/* Progress Line */}
            <div className="relative w-full my-4 flex items-center">
              <div className="w-full h-[3px] bg-white/10 rounded-full flex items-center">
                {/* Completed progress segment */}
                <div className="w-[70%] h-full bg-[#f39c12] rounded-full relative flex items-center justify-between">
                  {/* Start Dot */}
                  <div className="w-1.2 h-1.2 rounded-full bg-[#f39c12]" />
                  {/* Current Position Pointer */}
                  <div className="absolute right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#f39c12] ring-4 ring-[#f39c12]/30 shadow-sm" />
                </div>
                {/* Remaining segment */}
                <div className="flex-1 h-full flex items-center justify-end">
                  {/* End Dot */}
                  <div className="w-1.2 h-1.2 rounded-full bg-[#38bdf8]" />
                </div>
              </div>
            </div>

            {/* Footer: ATD and ETA */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">{t.hero.atd}</span>
                <span className="text-white font-medium text-[13px] mt-0.5">May 3 22:57</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">{t.hero.eta}</span>
                <span className="text-white font-medium text-[13px] mt-0.5">09:00 May 5</span>
              </div>
            </div>
          </div>

        </div>

      </div>
      {/* Smoke / fog effect — blends dark hero into light page */}
      <div className="absolute -bottom-24 left-0 w-full h-48 z-30 pointer-events-none overflow-visible">
        {/* Strong base gradient — eliminates any dark bleed-through */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to top, #fafbfc 0%, #fafbfc 40%, rgba(250,251,252,0.85) 60%, rgba(250,251,252,0.4) 80%, transparent 100%)',
          }}
        />
        {/* Dense center fog */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: '120%',
            height: '160px',
            background: 'radial-gradient(ellipse at center bottom, rgba(250,251,252,1) 0%, rgba(250,251,252,0.9) 30%, rgba(250,251,252,0.5) 60%, transparent 80%)',
            filter: 'blur(25px)',
          }}
        />
        {/* Left fog accent */}
        <div
          className="absolute bottom-0 left-0 rounded-full"
          style={{
            width: '60%',
            height: '140px',
            background: 'radial-gradient(ellipse at center bottom, rgba(250,251,252,0.95) 0%, rgba(250,251,252,0.6) 40%, transparent 75%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Right fog accent */}
        <div
          className="absolute bottom-0 right-0 rounded-full"
          style={{
            width: '60%',
            height: '140px',
            background: 'radial-gradient(ellipse at center bottom, rgba(250,251,252,0.95) 0%, rgba(250,251,252,0.6) 40%, transparent 75%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    </section>
  );
}
