import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Flame, ArrowRight, MapPin, Sparkles, Layers, Eye } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const HeroBanner = () => {
  const { setFilters, setQuickViewProduct } = useApp();
  const [heroHover, setHeroHover] = useState(false);

  const heroFeaturedProduct = INITIAL_PRODUCTS[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#090a0d] to-[#0d0f14] py-12 md:py-16 border-b border-gray-800/80">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-1/4 -mt-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#14161f] border border-orange-500/30 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-orange-400 uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>HYDERABAD LOCAL ACTIVEWEAR MARKETPLACE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] font-heading">
              BUILT FOR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">PUMP.</span><br />
              SOURCED IN <span className="underline decoration-orange-500 decoration-4 underline-offset-8">HYDERABAD.</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Curated athletic drops directly from verified fitness merchants in <strong className="text-white">Banjara Hills, Jubilee Hills, and Madhapur</strong>. 
              Featuring our signature <strong className="text-orange-400">"Flat-Lay ↔ Athlete Fit"</strong> live comparison, same-day bike dispatch, and 100% Cash on Delivery.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-lg mx-auto lg:mx-0">
              <div className="bg-[#14161f]/90 border border-gray-800/80 rounded-2xl p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span>24-48h Delivery</span>
                </div>
                <p className="text-[11px] text-gray-400">Same-day local dispatch across Hyderabad</p>
              </div>

              <div className="bg-[#14161f]/90 border border-gray-800/80 rounded-2xl p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% COD</span>
                </div>
                <p className="text-[11px] text-gray-400">Inspect at doorstep, pay Cash or UPI</p>
              </div>

              <div className="bg-[#14161f]/90 border border-gray-800/80 rounded-2xl p-3 text-left col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dual-View</span>
                </div>
                <p className="text-[11px] text-gray-400">Compare flat-lay silhouette with athlete fit</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees', gender: 'all' }))}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                <span>Shop 240 GSM Oversized</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets', gender: 'all' }))}
                className="bg-[#181a24] hover:bg-[#202330] border border-gray-800 text-gray-200 font-bold px-6 py-3.5 rounded-xl transition text-xs uppercase tracking-wider"
              >
                <span>Women's Sculpt Sets</span>
              </button>
            </div>

          </div>

          {/* Right Hero: Live Interactive Dual-Perspective Card */}
          <div className="lg:col-span-5 relative">
            <div 
              className="relative rounded-3xl overflow-hidden border border-gray-800 bg-[#12141c] p-3.5 shadow-2xl group cursor-pointer"
              onMouseEnter={() => setHeroHover(true)}
              onMouseLeave={() => setHeroHover(false)}
              onClick={() => setQuickViewProduct(heroFeaturedProduct)}
            >
              
              {/* Feature Pill Top */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  FEATURED DROP
                </span>
                <span className="bg-black/80 backdrop-blur-md border border-gray-700 text-gray-200 text-[10px] font-bold px-2 py-0.8 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-400" />
                  <span>Banjara Hills</span>
                </span>
              </div>

              {/* Main Image Box */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#181a24]">
                
                {/* State 1: Standalone Garment Flat Lay */}
                <img
                  src={heroFeaturedProduct.apparelImageUrl}
                  alt="Flat Lay Apparel"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    heroHover ? 'opacity-0 scale-95 blur-xs' : 'opacity-100 scale-100'
                  }`}
                />

                {/* State 2: Muscular Athlete Worn View */}
                <img
                  src={heroFeaturedProduct.modelImageUrl}
                  alt="Athlete Wearing Tee"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    heroHover ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                />

                {/* Dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Interactive Hover Pill in Center-Bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight font-heading">
                      {heroFeaturedProduct.name}
                    </h3>
                    <p className="text-xs text-orange-400 font-semibold mt-0.5">
                      ₹{heroFeaturedProduct.price} • Heavy French Terry (240 GSM)
                    </p>
                  </div>

                  <div className="bg-black/80 backdrop-blur-md border border-orange-500/40 text-orange-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>{heroHover ? "On Athlete" : "Hover Me"}</span>
                  </div>
                </div>

              </div>

              {/* Caption Under Card */}
              <div className="pt-3 px-1 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>In Stock in Banjara Hills (Ready for Dispatch)</span>
                </span>
                <span className="font-bold text-orange-400 group-hover:underline">
                  Quick View ↗
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
