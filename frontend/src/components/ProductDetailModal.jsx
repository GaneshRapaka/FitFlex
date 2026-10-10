import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingBag, Truck, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

const ProductDetailModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useApp();
  const [activeView, setActiveView] = useState('model'); // 'apparel' or 'model'
  const [selectedSize, setSelectedSize] = useState('M');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addToCart(product, selectedSize, 1);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#13151b] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white transition border border-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Visual Area with Dual-View Switcher */}
          <div className="relative bg-[#181a22] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-800">
            
            {/* Main Visual Display */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-inner border border-gray-800">
              <img
                src={activeView === 'apparel' ? product.apparelImageUrl : product.modelImageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500 transform hover:scale-105"
              />

              {/* Status pill in corner */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-orange-400 border border-gray-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeView === 'apparel' ? 'Standalone Apparel Only' : 'On-Person Athlete Fit'}</span>
              </div>
            </div>

            {/* Visual View Toggle Pills */}
            <div className="flex items-center gap-2 mt-4 bg-[#101217] p-1.5 rounded-full border border-gray-800">
              <button
                onClick={() => setActiveView('apparel')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeView === 'apparel'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                👕 Flat Lay Apparel
              </button>
              <button
                onClick={() => setActiveView('model')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeView === 'model'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🏋️ Athlete / Model Fit
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2 text-center">
              Toggle to compare flat-lay silhouette with real athlete muscular drape.
            </p>
          </div>

          {/* Right Product Details Area */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Local Seller Tag */}
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{product.store?.storeName} • {product.store?.locality}, Hyderabad</span>
              </div>

              <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating || 4.8}</span>
                </div>
                <span className="text-gray-500 text-xs">({product.reviewCount || 42} verified Hyderabad gym reviews)</span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-black text-white">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    SAVE {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description & Specs */}
              <p className="text-xs text-gray-300 mt-4 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] bg-[#1a1c24] p-3 rounded-xl border border-gray-800">
                <div>
                  <span className="text-gray-400 block font-medium">Fabric Quality:</span>
                  <span className="text-gray-200 font-bold">{product.fabricDetails || '100% Combed Heavy Cotton'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Fit Silhouette:</span>
                  <span className="text-gray-200 font-bold">{product.fitType || 'Athletic Drop-Shoulder'}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span>Select Size:</span>
                  <span className="text-orange-400 font-bold">{selectedSize}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 rounded-xl text-xs font-black flex items-center justify-center border transition-all ${
                        selectedSize === sz
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                          : 'bg-[#181a22] text-gray-300 border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hyderabad Local Guarantees */}
              <div className="space-y-2 mt-5 text-xs text-gray-300 pt-3 border-t border-gray-800">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Cash on Delivery (COD) available with zero upfront payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Truck className="w-4 h-4 shrink-0 text-orange-400" />
                  <span>Express Dispatch from {product.store?.locality || 'Hyderabad'} Hub within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Size {selectedSize} to Cart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;
