import React from 'react';
import { Dumbbell, MapPin, ShieldCheck, Zap, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0c10] border-t border-gray-800 text-gray-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white uppercase">
                FIT<span className="text-orange-500">FLEX</span> HYD
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Hyderabad’s dedicated gym activewear marketplace. Supporting local fitness apparel creators across Telangana.
            </p>
            <div className="text-[11px] text-orange-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>

          {/* Local Hubs */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Hyderabad Hubs</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li>Banjara Hills (Road No. 10 & 12)</li>
              <li>Jubilee Hills (Road No. 36)</li>
              <li>Madhapur (Cyber Towers Hub)</li>
              <li>Gachibowli (Financial District)</li>
              <li>Kukatpally & Kondapur Hub</li>
            </ul>
          </div>

          {/* Buyer Protections */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Platform Perks</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Cash On Delivery (COD)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>24-48h Hyper-Local Delivery</span>
              </li>
              <li>Easy Size Exchanges with Local Sellers</li>
              <li>Direct Store Pickup Available</li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Tech Stack Architecture</h4>
            <p className="text-gray-400 leading-relaxed">
              Built with <strong className="text-gray-200">React.js</strong>, <strong className="text-gray-200">Tailwind CSS</strong>, <strong className="text-gray-200">Axios</strong>, <strong className="text-gray-200">Java 21 Spring Boot</strong>, and <strong className="text-gray-200">PostgreSQL</strong>.
            </p>
            <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-800">
              © {new Date().getFullYear()} FitFlex Hyderabad. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
