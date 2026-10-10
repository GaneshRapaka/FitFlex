import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, ShieldCheck, Flame, ArrowRight, MapPin } from 'lucide-react';

const HeroBanner = () => {
  const { setFilters } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#111318] via-[#0d0f12] to-[#0a0b0e] py-14 md:py-20 border-b border-gray-800">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#1b1e26] border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-orange-400 uppercase tracking-widest shadow-sm">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
              <span>HYDERABAD'S PREMIER ACTIVEWEAR MARKETPLACE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              BUILT FOR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">PUMP.</span><br />
              CRAFTED IN <span className="underline decoration-orange-500 decoration-4 underline-offset-8">HYDERABAD.</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Buy directly from top fitness brands and boutique gyms in <strong className="text-white">Banjara Hills, Jubilee Hills, and Madhapur</strong>. 
              Experience the iconic <strong className="text-orange-400">"Flat Lay to Athlete Fit"</strong> live preview, fast local delivery, and 100% Cash on Delivery.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 bg-[#161920] border border-gray-800 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>24-48h Hyderabad Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-[#161920] border border-gray-800 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-2 bg-[#161920] border border-gray-800 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Local Store Pickup Available</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees', gender: 'all' }))}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Shop Oversized Tees</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets', gender: 'all' }))}
                className="bg-[#1a1d24] hover:bg-[#232732] border border-gray-700 text-gray-200 font-bold px-6 py-3.5 rounded-xl transition text-sm uppercase tracking-wider"
              >
                <span>Active Dresses & Sets</span>
              </button>
            </div>
          </div>

          {/* Hero Right Featured Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-gray-700/80 bg-[#16181f] p-3 shadow-2xl group">
              <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop"
                  alt="FitFlex Hyderabad Hero"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <span className="bg-orange-500 text-white text-[11px] font-black px-2.5 py-1 rounded w-fit uppercase tracking-widest mb-2 shadow">
                    FEATURED HYDERABAD DROP
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    IronCore Heavyweight Acid Drop
                  </h3>
                  <p className="text-xs text-gray-300">
                    Sourced locally from Banjara Hills • ₹999 (Flat 38% Off)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
