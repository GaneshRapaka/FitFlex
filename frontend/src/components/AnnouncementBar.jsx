import React from 'react';
import { Zap, ShieldCheck, MapPin, Truck } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-2 px-4 text-xs md:text-sm font-semibold tracking-wide overflow-hidden shadow-md">
      <div className="flex items-center justify-center gap-6 whitespace-nowrap animate-pulse">
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>HYDERABAD EXPRESS: SAME-DAY & 24H LOCAL DISPATCH</span>
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>100% CASH ON DELIVERY (COD) AVAILABLE</span>
        </span>
        <span className="hidden lg:inline">•</span>
        <span className="hidden lg:flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-orange-200" />
          <span>SHOP DIRECT FROM VERIFIED HYDERABAD GYM STORES</span>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
