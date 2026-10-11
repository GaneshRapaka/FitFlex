import React from 'react';
import { Zap, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-[#12141a] border-b border-gray-800 text-gray-300 py-2 px-4 text-xs tracking-wider">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium">
        
        {/* Left: Highlight */}
        <div className="hidden md:flex items-center gap-2 text-gray-400">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-gray-300">Live Hyderabad Dispatch:</span>
          <span>Banjara Hills & Jubilee Hills Hubs Active</span>
        </div>

        {/* Center: Main USP */}
        <div className="flex items-center justify-center gap-4 mx-auto md:mx-0">
          <div className="flex items-center gap-1.5 text-white font-bold tracking-tight">
            <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>FREE HYDERABAD SAME-DAY DELIVERY ON ORDERS OVER ₹1499</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Cash On Delivery Available</span>
          </div>
        </div>

        {/* Right: Feature Prompt */}
        <div className="hidden lg:flex items-center gap-1.5 text-orange-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive "Flat-Lay ↔ On-Athlete" Preview</span>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementBar;
