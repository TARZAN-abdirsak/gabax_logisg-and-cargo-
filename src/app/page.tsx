'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Wrench, Settings, ArrowUpRight, Plane, FileText, Building2, Map, Users, Handshake } from 'lucide-react';
import { ScrollVideoHero } from '@/components/sections/ScrollVideoHero';
import { Testimonials } from '@/components/sections/Testimonials';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function HomePage() {
  const { t } = useLanguageStore();

  const supportCards = [
    { img: '/images/contact_image.png', name: t.contactCard.name, role: t.contactCard.ceoRole, phone: '252615542562' },
    { img: '/images/contact_image_2.png', name: 'Omar Yusuf', role: t.contactCard.role, phone: '254745695355' },
    { img: '/images/developer_1.jpeg', name: 'Abubakr Gutale', role: 'System Developer', phone: '252618450410' },
  ];
  const [animateRoute, setAnimateRoute] = useState(false);
  const routeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateRoute(true);
        } else {
          setAnimateRoute(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (routeSectionRef.current) {
      observer.observe(routeSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="pb-16 bg-[#fafbfc] min-h-screen flex flex-col items-center w-full">
      {/* HERO SECTION */}
      <ScrollVideoHero />

      {/* OTHER SECTIONS */}
      <div className="mx-auto max-w-[95%] w-full px-4 sm:px-6 lg:px-8 space-y-24 mt-24">

        {/* ========================================================================= */}
        {/* SERVICES & SUPPORTS SECTION */}
        {/* ========================================================================= */}
        <section className="flex flex-col lg:flex-row gap-6 items-stretch justify-between">
          {/* Left Column: Heading & Description */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center space-y-7">
            <div className="space-y-3">
              <span className="text-sm font-bold uppercase tracking-normal text-brand-blue flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                {t.services.subtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05] font-normal uppercase tracking-tight text-brand-navy max-w-[440px]">
                {t.services.title}
              </h2>
            </div>
            <div>
              <Link
                href="#services-offerings"
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-navy hover:bg-brand-yellow/90 transition-all hover:scale-102 shadow-md"
              >
                {t.services.explore}
                <span className="text-xs">➔</span>
              </Link>
            </div>
            <p className="text-base text-brand-navy/70 leading-relaxed max-w-sm pt-1">
              {t.services.description}
            </p>
          </div>

          {/* Middle Column: Charter Air Freight Card */}
          <div className="w-full lg:w-[27%] relative rounded-3xl overflow-hidden group min-h-[550px] shadow-md flex flex-col justify-between p-6">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('/1.jpg')` }}
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

            {/* Card Content (Top) */}
            <div className="relative z-10">
              <h3 className="text-2xl font-normal uppercase tracking-tight text-white leading-tight">
                {t.services.charterAir}
              </h3>
            </div>

            {/* Card Content (Bottom) */}
            <div className="relative z-10 flex justify-center w-full mt-auto">
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-brand-navy hover:bg-brand-yellow transition-all hover:scale-102"
              >
                Book a Shipment
                <span className="text-[10px]">➔</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Ocean Freight Card */}
          <div className="w-full lg:w-[27%] relative rounded-3xl overflow-hidden group min-h-[550px] shadow-md flex flex-col justify-between p-6">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('/2.png')` }}
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

            {/* Card Content (Top) */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl font-normal uppercase tracking-tight leading-tight">
                {t.services.oceanFreight}
              </h3>
              <p className="text-xs text-white/80 mt-2 max-w-[200px]">
                {t.services.oceanDesc}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 flex justify-start w-full mt-auto">
              <Link
                href="/services/sea-freight"
                className="h-10 w-10 rounded-full bg-white text-brand-blue flex items-center justify-center font-bold hover:bg-brand-yellow hover:text-brand-navy transition-all hover:scale-105 shadow-sm"
              >
                ➔
              </Link>
            </div>
          </div>
        </section>

        {/* Beautiful divider line between sections */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-navy/15 to-transparent" />

        {/* ========================================================================= */}
        {/* TRUST & DASHBOARD WIDGETS */}
        {/* ========================================================================= */}
        <section className="flex flex-col items-center justify-center">

          {/* Middle: Quality Statement */}
          <div className="text-center space-y-6 w-full max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/40 flex items-center justify-center gap-1">
              <span className="h-1 w-1 rounded-full bg-brand-navy/40" />
              {t.trust.droppingOnHome}
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-brand-navy max-w-xl mx-auto leading-tight">
              {t.contactCard.title}
            </h3>

            {/* Avatars pile and Monthly Users side-by-side with divider */}
            <div className="flex justify-center pt-4">
              <div className="inline-flex items-center gap-5 bg-[#e8f4fd] px-6 py-3 rounded-full shadow-sm">
                <div className="flex -space-x-2.5">
                  <img
                    src="/avatar1.png"
                    alt="User 1"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <img
                    src="/avatar2.png"
                    alt="User 2"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <img
                    src="/avatar3.png"
                    alt="User 3"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                </div>
                <div className="h-8 w-px bg-brand-navy/25" />
                <div className="text-left">
                  <p className="text-2xl font-black text-brand-navy leading-none">20K+</p>
                  <p className="text-[10px] font-bold text-brand-navy uppercase tracking-normal mt-1">{t.trust.monthlyUser}</p>
                </div>
              </div>
            </div>

          </div>



        </section>



        {/* ========================================================================= */}
        {/* TESTIMONIALS SECTION */}
        {/* ========================================================================= */}
      </div> {/* Close the max-w-[95%] container */}

      <section className="w-full pt-10 md:pt-16 pb-24 md:pb-32 overflow-hidden mt-4">
        <div className="w-full overflow-hidden relative">
          <div className="flex w-max gap-6 sm:gap-8 animate-marquee pl-6 sm:pl-8">
            {[...supportCards, ...supportCards].map((card, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row w-[90vw] sm:w-[500px] lg:w-[750px] h-auto bg-[#f4f7ec] rounded-3xl overflow-hidden shrink-0 shadow-2xl border border-black/5 items-stretch">
                {/* Left side (Image) */}
                <div className="relative w-full lg:w-[280px] h-[240px] lg:h-auto shrink-0 self-stretch">
                  <img src={card.img} alt={card.name} className="absolute inset-0 w-full h-full object-cover object-[center_20%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-bold text-xl tracking-normal leading-tight">{card.name}</p>
                    <p className="text-sm text-white/80 mt-1">{card.role}</p>
                  </div>
                </div>

                {/* Right side (Content) */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xl lg:text-[1.5rem] font-semibold text-[#031f42] tracking-normal leading-tight mb-2">{t.contactCard.quote}</p>
                    <p className="text-sm lg:text-[15px] text-[#031f42]/75 leading-relaxed font-medium">{t.contactCard.text}</p>
                  </div>

                  <div className="mt-6 lg:mt-0 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#031f42] tracking-normal flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                        {t.contactCard.available}
                      </span>
                      <span className="text-xs text-[#031f42]/70 mt-1 font-medium">{t.contactCard.responseTime}</span>
                    </div>

                    <Link 
                      href={`https://wa.me/${card.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-normal transition-all duration-300 group shadow-md hover:shadow-lg active:scale-95"
                    >
                      {/* Black Fill Animation Background */}
                      <span className="absolute inset-0 w-full h-full bg-black translate-y-[101%] group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-in-out" />
                      
                      <span className="relative z-10">
                        {t.contactCard.btnText}
                      </span>
                      
                      <span className="relative z-10 bg-white text-[#25D366] group-hover:text-black group-active:text-black rounded-full p-1.5 transition-colors duration-500">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reopen the max-w-[95%] container for the rest of the page */}
      <div className="mx-auto max-w-[95%] w-full px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ========================================================================= */}
        {/* PRECISION HANDLING SECTION */}
        {/* ========================================================================= */}
        <section className="grid gap-12 lg:grid-cols-12 items-start relative">
          {/* Left Column: Heading, Button and Truck */}
          <div className="lg:col-span-4 flex flex-col justify-between min-h-[550px] relative pb-12 lg:pb-0">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
                <Settings className="h-4 w-4 text-brand-blue" strokeWidth={2.5} />
                {t.handling.optimized}
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02] font-normal uppercase tracking-tight text-[#031f42] max-w-sm">
                {t.handling.precision}
              </h2>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-4.5 text-base font-bold text-[#031f42] hover:bg-brand-yellow/90 transition-all hover:scale-102 shadow-md"
                >
                  {t.handling.exploreProcess}
                  <span className="text-xs">➔</span>
                </Link>
              </div>
            </div>

            {/* Red Truck PNG at the bottom left */}
            <div className="relative mt-12 lg:absolute lg:bottom-[-80px] lg:left-[-40px] lg:w-[380px] z-10 pointer-events-none">
              <img
                src="/images/red_port_truck.png"
                alt="Red Cargo Truck"
                className="w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Right Column: Clean Route Line with Points */}
          <div
            ref={routeSectionRef}
            className={`lg:col-span-8 w-full min-h-[500px] hidden lg:flex items-center justify-center relative route-svg-container ${animateRoute ? 'animate-route' : ''
              }`}
          >
            <svg
              className="w-full h-[350px]"
              viewBox="0 0 1200 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                  <stop offset="15%" stopColor="#2563eb" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#2563eb" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main flowing route line */}
              <path
                d="M 30 150 C 120 70, 240 40, 340 100 S 500 200, 600 150 S 760 50, 860 110 S 1020 210, 1170 130"
                stroke="url(#routeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                filter="url(#glow)"
                className="route-path"
                pathLength="1"
              />

              {/* Animated dashed overlay on same path */}
              <path
                d="M 30 150 C 120 70, 240 40, 340 100 S 500 200, 600 150 S 760 50, 860 110 S 1020 210, 1170 130"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 10"
                strokeOpacity="0.3"
                className="route-path-dashed animate-[dash_15s_linear_infinite]"
              />

              {/* === POINT 1: Origin === */}
              <g className="waypoint waypoint-origin">
                <circle cx="30" cy="150" r="8" fill="#2563eb" opacity="0.9" />
                <circle cx="30" cy="150" r="13" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.3" />
                <text x="30" y="183" textAnchor="middle" className="fill-[#091524] text-[18px] font-bold" style={{ fontFamily: 'system-ui' }}>
                  {t.handling.origin}
                </text>
              </g>

              {/* === POINT 2: Pickup === */}
              <g className="waypoint waypoint-pickup">
                <circle cx="340" cy="100" r="9" fill="white" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="340" cy="100" r="4" fill="#2563eb" />
                <text x="340" y="80" textAnchor="middle" className="fill-[#091524] text-[18px] font-bold" style={{ fontFamily: 'system-ui' }}>
                  {t.handling.pickup}
                </text>
              </g>

              {/* === POINT 3: Warehouse === */}
              <g className="waypoint waypoint-warehouse">
                <circle cx="600" cy="150" r="9" fill="white" stroke="#0ea5e9" strokeWidth="2.5" />
                <circle cx="600" cy="150" r="4" fill="#0ea5e9" />
                <text x="600" y="180" textAnchor="middle" className="fill-[#091524] text-[18px] font-bold" style={{ fontFamily: 'system-ui' }}>
                  {t.handling.warehouse}
                </text>
              </g>

              {/* === POINT 4: In Transit === */}
              <g className="waypoint waypoint-transit">
                <circle cx="860" cy="110" r="9" fill="white" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="860" cy="110" r="4" fill="#2563eb" />
                <text x="860" y="90" textAnchor="middle" className="fill-[#091524] text-[18px] font-bold" style={{ fontFamily: 'system-ui' }}>
                  {t.handling.inTransit}
                </text>
              </g>

              {/* === POINT 5: Delivered === */}
              <g className="waypoint waypoint-delivered">
                <circle cx="1170" cy="130" r="8" fill="#f3c116" opacity="0.9" />
                <circle cx="1170" cy="130" r="13" fill="none" stroke="#f3c116" strokeWidth="1.5" opacity="0.4" />
                <circle cx="1170" cy="130" r="18" fill="none" stroke="#f3c116" strokeWidth="1" opacity="0.15" />
                <text x="1170" y="163" textAnchor="middle" className="fill-[#091524] text-[18px] font-bold" style={{ fontFamily: 'system-ui' }}>
                  {t.handling.delivered}
                </text>
              </g>
            </svg>
          </div>

          {/* Process Cards Row - Below Route Line */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-8">

            {/* Card 1: Warehouse */}
            <div className="bg-white rounded-3xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#031f42]">{t.handling.warehouseTitle}</h4>
                <ArrowUpRight className="h-4 w-4 text-[#031f42]" strokeWidth={2.5} />
              </div>
              <p className="text-xs text-[#031f42]/60 font-medium leading-relaxed mb-4 max-w-[90%]">
                {t.handling.warehouseDesc}
              </p>
              <div className="rounded-2xl overflow-hidden h-[200px]">
                <img
                  src="/images/cargo_inspection.png"
                  alt="Item Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 2: Electric Lifter */}
            <div className="bg-white rounded-3xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-shadow md:-translate-y-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#031f42]">{t.handling.lifterTitle}</h4>
                <ArrowUpRight className="h-4 w-4 text-[#031f42]" strokeWidth={2.5} />
              </div>
              <p className="text-xs text-[#031f42]/60 font-medium leading-relaxed mb-4 max-w-[90%]">
                {t.handling.lifterDesc}
              </p>
              <div className="rounded-2xl overflow-hidden h-[200px]">
                <img
                  src="/images/secure_packaging.png"
                  alt="Secure Packaging"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 3: Delivery */}
            <div className="bg-white rounded-3xl p-5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#031f42]">{t.handling.deliveryTitle}</h4>
                <ArrowUpRight className="h-4 w-4 text-[#031f42]" strokeWidth={2.5} />
              </div>
              <p className="text-xs text-[#031f42]/60 font-medium leading-relaxed mb-4 max-w-[90%]">
                {t.handling.deliveryDesc}
              </p>
              <div className="rounded-2xl overflow-hidden h-[200px]">
                <img
                  src="/images/home_delivery.png"
                  alt="Home Delivery"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-navy/15 to-transparent" />

        {/* ========================================================================= */}
        {/* WHAT DO WE OFFER SECTION */}
        {/* ========================================================================= */}
        <section id="services-offerings" className="space-y-12 py-12 scroll-mt-24">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#031f42] tracking-tight font-sans">
              {t.offers.title}
            </h2>
            <p className="text-sm sm:text-base font-normal text-brand-navy/60 max-w-2xl mx-auto leading-relaxed">
              {t.offers.subtitle}
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid gap-10 md:grid-cols-3 pt-6">

            {/* Offer 1: Air Ticketing */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <Plane className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.airTicketing}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.airTicketingDesc}
                </p>
              </div>
            </div>

            {/* Offer 2: Visa Processing */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <FileText className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.visa}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.visaDesc}
                </p>
              </div>
            </div>

            {/* Offer 3: Hajj & Umrah */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <Building2 className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.hajj}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.hajjDesc}
                </p>
              </div>
            </div>

            {/* Offer 4: Tour Planning */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <Map className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.tour}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.tourDesc}
                </p>
              </div>
            </div>

            {/* Offer 5: Recruiting */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <Users className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.recruiting}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.recruitingDesc}
                </p>
              </div>
            </div>

            {/* Offer 6: Consultancy */}
            <div className="flex flex-col items-start space-y-4 p-2">
              <div className="h-14 w-14 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:scale-105 transition-transform">
                <Handshake className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#031f42] font-sans tracking-wide">
                  {t.offers.consultancy}
                </h4>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-normal">
                  {t.offers.consultancyDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-navy/15 to-transparent" />

        {/* ========================================================================= */}
        {/* TESTIMONIALS SECTION — driven by admin-featured feedback */}
        {/* ========================================================================= */}
        <Testimonials />

      </div>
    </div>
  );
}
