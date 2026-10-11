import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Eye, MapPin, Sparkles, Heart, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isWishlisted } = useApp();
  const [selectedSize, setSelectedSize] = useState(() => {
    return product.variants && product.variants.length > 0 ? product.variants[1]?.size || product.variants[0]?.size : 'M';
  });
  const [isHovered, setIsHovered] = useState(false);
  const [manualModelView, setManualModelView] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const showModelImage = isHovered || manualModelView;
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const selectedVariant = product.variants?.find(v => v.size === selectedSize);
  const isLowStock = selectedVariant && selectedVariant.stockQuantity <= 5;

  return (
    <div 
      className="group relative bg-[#111319] rounded-2xl border border-gray-800/80 hover:border-orange-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Container with Flat-Lay to On-Athlete Crossfade */}
      <div 
        className="relative aspect-[3/4] w-full bg-[#161822] overflow-hidden cursor-pointer select-none"
        onClick={() => setQuickViewProduct(product)}
      >
        {/* State 1: Standalone Garment Flat Lay */}
        <img
          src={product.apparelImageUrl}
          alt={`${product.name} Flat Lay`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            showModelImage ? 'opacity-0 scale-95 blur-xs' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* State 2: Muscular Athlete Wearing Outfit */}
        <img
          src={product.modelImageUrl}
          alt={`${product.name} On Athlete`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            showModelImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          loading="lazy"
        />

        {/* Gradient shadow overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

        {/* Top Floating Header: Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.badge && (
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.8 rounded shadow-md pointer-events-auto">
                {product.badge}
              </span>
            )}
            <span className="bg-black/75 backdrop-blur-md text-gray-200 border border-gray-700/80 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 pointer-events-auto">
              <MapPin className="w-2.5 h-2.5 text-orange-400" />
              <span>{product.store?.locality || 'Hyderabad'}</span>
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto shadow-md ${
              wishlisted 
                ? 'bg-rose-500 text-white' 
                : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Interactive Mode Indicators & Tap Switcher */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          
          {/* Micro status label */}
          <div className="bg-black/85 backdrop-blur-md border border-gray-700/80 rounded-full px-2.5 py-1 text-[10px] font-bold text-gray-200 flex items-center gap-1.5 shadow">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span className="hidden sm:inline">
              {showModelImage ? "Wearing on Athlete" : "Hover to See on Person"}
            </span>
            <span className="sm:hidden">
              {showModelImage ? "On Athlete" : "Flat Lay"}
            </span>
          </div>

          {/* Touch/Toggle Override Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setManualModelView(!manualModelView);
            }}
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border transition-all pointer-events-auto ${
              showModelImage 
                ? 'bg-orange-500 text-white border-orange-400 shadow-md'
                : 'bg-black/80 text-gray-300 border-gray-700 hover:text-white'
            }`}
            title="Toggle between garment and athlete fit"
          >
            {showModelImage ? 'Show Flat' : 'Athlete Fit'}
          </button>

        </div>

        {/* Center Quick View Button on Desktop Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/85 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl backdrop-blur-md border border-gray-600 pointer-events-auto transform group-hover:scale-105"
          aria-label="Quick View"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Store Name & Verified Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="truncate font-semibold text-gray-400 hover:text-orange-400 transition cursor-pointer">
              {product.store?.storeName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating || 4.8}</span>
              <span className="text-gray-500 text-[10px]">({product.reviewCount || 24})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors line-clamp-1 cursor-pointer font-heading"
          >
            {product.name}
          </h3>

          {/* Fabric & Fit Subtitle */}
          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
            {product.fabricDetails}
          </p>
        </div>

        {/* Size Selector */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5 font-semibold">
            <span>Size: <strong className="text-orange-400">{selectedSize}</strong></span>
            {isLowStock && (
              <span className="text-[10px] text-amber-400 font-bold">
                Only {selectedVariant.stockQuantity} left!
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(product.variants || []).map((v) => (
              <button
                key={v.id || v.size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(v.size);
                }}
                className={`text-[10px] font-extrabold w-7 h-6 rounded-md flex items-center justify-center border transition-all ${
                  selectedSize === v.size
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-[#181a24] text-gray-300 border-gray-800 hover:border-gray-600'
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-2.5 border-t border-gray-800/80 flex items-center justify-between gap-2">
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
            className={`p-2 sm:px-3 sm:py-2 rounded-xl transition flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider shadow-md ${
              isAddedRecently 
                ? 'bg-emerald-600 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95 shadow-orange-500/20'
            }`}
            title="Add to Cart"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
