import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Eye, MapPin, Sparkles, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useApp();
  const [selectedSize, setSelectedSize] = useState('M');
  const [isHovered, setIsHovered] = useState(false);
  const [manualModelView, setManualModelView] = useState(false); // Mobile / toggle override

  // If manual toggle is active, or user hovers with mouse
  const showModelImage = isHovered || manualModelView;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
  };

  return (
    <div 
      className="group relative bg-[#13151b] rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-orange-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Flat-Lay to On-Model Hover Reveal */}
      <div className="relative aspect-[3/4] w-full bg-[#181a22] overflow-hidden cursor-pointer"
           onClick={() => setQuickViewProduct(product)}>
        
        {/* State 1: Standalone Dress / Flat-Lay Apparel (Default View) */}
        <img
          src={product.apparelImageUrl}
          alt={`${product.name} Standalone Flat Lay`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            showModelImage ? 'opacity-0 scale-95 blur-xs' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* State 2: Athlete / Person Wearing the Outfit (Hover / On-Person View) */}
        <img
          src={product.modelImageUrl}
          alt={`${product.name} On Athlete`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
            showModelImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          loading="lazy"
        />

        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          {product.badge ? (
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow tracking-wider">
              {product.badge}
            </span>
          ) : <span />}

          <span className="bg-black/75 backdrop-blur-md text-gray-200 border border-gray-700/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-400" />
            <span>{product.store?.locality || 'Hyderabad'}</span>
          </span>
        </div>

        {/* Interactive "Hover For Athlete Fit" Prompt Banner */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          <div className="bg-black/80 backdrop-blur-md border border-gray-700/80 rounded-full px-2.5 py-1 text-[10px] font-bold text-gray-200 flex items-center gap-1.5 shadow">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span className="hidden sm:inline">
              {showModelImage ? "Wearing on Athlete" : "Hover to See on Person"}
            </span>
            <span className="sm:hidden">
              {showModelImage ? "On Model" : "Flat Lay"}
            </span>
          </div>

          {/* Mobile Tap Toggle Pill (Allows touch devices to also swap between Flat & Model) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setManualModelView(!manualModelView);
            }}
            className={`text-[10px] font-black px-2.5 py-1 rounded-full border transition-all pointer-events-auto ${
              showModelImage 
                ? 'bg-orange-500 text-white border-orange-400 shadow'
                : 'bg-black/80 text-gray-300 border-gray-700 hover:text-white'
            }`}
            title="Toggle between standalone dress and on-person model"
          >
            {showModelImage ? 'Show Flat Lay' : 'View On Model'}
          </button>
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/80 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl backdrop-blur-md border border-gray-600 pointer-events-auto"
          aria-label="Quick View Product"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Store Name & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="truncate font-semibold text-gray-400 hover:text-orange-400 transition cursor-pointer">
              {product.store?.storeName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating || 4.8}</span>
              <span className="text-gray-500 text-[10px]">({product.reviewCount || 20})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
            {product.fitType || "Athletic Performance Fit"} • {product.fabricDetails || "Moisture Wicking"}
          </p>
        </div>

        {/* Size Selector Pills */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1 font-semibold">
            <span>Size:</span>
            <span className="text-orange-400">{selectedSize}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`text-[10px] font-bold w-7 h-6 rounded flex items-center justify-center border transition-all ${
                  selectedSize === sz
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-[#1a1c24] text-gray-300 border-gray-700 hover:border-gray-500'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-gray-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-white">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white p-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 text-xs font-bold uppercase tracking-wider"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
