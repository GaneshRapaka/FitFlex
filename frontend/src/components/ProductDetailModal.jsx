import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Ruler, 
  Heart,
  ChevronRight,
  Info,
  Zap,
  ArrowRight
} from 'lucide-react';

const ProductDetailModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setIsCartOpen
  } = useApp();

  const [activeView, setActiveView] = useState('model'); // 'apparel' or 'model'
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState('500081');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);

  const selectedVariant = product.variants?.find(v => v.size === selectedSize);
  const stock = selectedVariant ? selectedVariant.stockQuantity : 10;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#111319] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl my-6 text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Floating Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/75 hover:bg-black text-gray-300 hover:text-white transition border border-gray-700/80 shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-800/80">
          
          {/* Left Column: Visual Showcase & Dual-Perspective Switcher */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col items-center justify-between bg-[#141620]">
            
            {/* Main Visual Display */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#181a24] border border-gray-800 shadow-xl group">
              <img
                src={activeView === 'apparel' ? product.apparelImageUrl : product.modelImageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500 transform group-hover:scale-105"
              />

              {/* Top View Badge */}
              <div className="absolute top-3.5 left-3.5 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-orange-400 border border-gray-700 flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeView === 'apparel' ? 'Standalone Apparel Silhouette' : 'On-Athlete Muscular Fit'}</span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md border shadow transition ${
                  wishlisted 
                    ? 'bg-rose-500 border-rose-400 text-white' 
                    : 'bg-black/70 border-gray-700 text-gray-300 hover:text-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Segmented Dual-View Toggle Pill */}
            <div className="w-full max-w-sm mt-5">
              <div className="flex bg-[#0e1017] p-1.5 rounded-2xl border border-gray-800 shadow-inner">
                <button
                  onClick={() => setActiveView('apparel')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeView === 'apparel'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Flat Lay Silhouette</span>
                </button>
                <button
                  onClick={() => setActiveView('model')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeView === 'model'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Worn On Athlete</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                Toggle above to compare garment drape and athlete muscle cut.
              </p>
            </div>

            {/* Store Hub info under visual */}
            <div className="mt-5 w-full bg-[#11131a] border border-gray-800/80 rounded-2xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-xs">{product.store?.storeName}</h5>
                  <span className="text-[11px] text-gray-400">{product.store?.locality}, Hyderabad Hub</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                VERIFIED STORE
              </span>
            </div>

          </div>

          {/* Right Column: Specifications, Sizing, Pincode & Actions */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Top Tags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-extrabold px-2.5 py-0.8 rounded uppercase tracking-wider">
                    {product.badge || 'HYD DROP'}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold">
                    {product.gender} • {product.category?.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating || 4.9}</span>
                  <span className="text-gray-500 text-[10px]">({product.reviewCount || 42} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-heading">
                {product.name}
              </h2>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-white">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {product.description || product.fabricDetails}
              </p>

              {/* Technical Spec Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="bg-[#181a24] p-2.5 rounded-xl border border-gray-800">
                  <span className="text-gray-500 block uppercase font-bold text-[10px]">Fabric Weight</span>
                  <span className="text-gray-200 font-bold">{product.fabricDetails}</span>
                </div>
                <div className="bg-[#181a24] p-2.5 rounded-xl border border-gray-800">
                  <span className="text-gray-500 block uppercase font-bold text-[10px]">Cut Profile</span>
                  <span className="text-gray-200 font-bold">{product.fitType || "Athletic Tapered"}</span>
                </div>
              </div>

              {/* Size Selector with Size Chart Trigger */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-300">Select Size:</span>
                    <span className="text-xs font-black text-orange-400">{selectedSize}</span>
                    {stock <= 5 && (
                      <span className="text-[10px] text-amber-400 font-bold ml-1">
                        (Only {stock} remaining in Banjara hub)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 underline decoration-dotted"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? "Hide Size Chart" : "Size Chart & Fit Guide"}</span>
                  </button>
                </div>

                {/* Size Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {(product.variants || []).map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedSize(v.size)}
                      className={`text-xs font-bold py-2 px-3.5 rounded-xl border transition-all ${
                        selectedSize === v.size
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20 scale-105'
                          : 'bg-[#181a24] text-gray-300 border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>

                {/* Collapsible Size Guide Table */}
                {showSizeGuide && product.sizeGuide && (
                  <div className="mt-3 p-3.5 bg-[#141620] border border-gray-800 rounded-2xl text-xs space-y-2 animate-in fade-in">
                    <span className="font-bold text-white block text-[11px] uppercase tracking-wider">
                      Measurements (Inches)
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                      <div className="text-gray-500">Size</div>
                      <div className="text-gray-400">Chest</div>
                      <div className="text-gray-400">Length</div>
                      <div className="text-gray-400">Shoulder</div>
                      {Object.entries(product.sizeGuide).map(([sz, meas]) => (
                        <React.Fragment key={sz}>
                          <div className={`py-1 rounded font-bold ${sz === selectedSize ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300'}`}>
                            {sz}
                          </div>
                          <div className="py-1 text-gray-300">{meas.chest}</div>
                          <div className="py-1 text-gray-300">{meas.length || '-'}</div>
                          <div className="py-1 text-gray-300">{meas.shoulder || '-'}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Local Hyderabad Delivery Checker */}
              <div className="bg-[#141620] border border-gray-800 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-gray-200">
                    <Truck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Hyderabad Delivery Estimate</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">100% COD</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Hyderabad Pincode"
                    className="bg-[#191c26] border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 w-36 focus:outline-none focus:border-orange-500 font-mono"
                  />
                  <button
                    onClick={() => setPincodeChecked(true)}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold px-3 py-1.5 rounded-xl transition"
                  >
                    Check
                  </button>
                  {pincodeChecked && (
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Same-Day Local Dispatch (2-4 hrs)</span>
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions Row: Quantity, Add to Cart & Buy Now */}
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#181a24] border border-gray-800 rounded-xl p-1 text-xs font-bold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#1c1f2b] hover:bg-[#252a3a] border border-gray-700 text-white font-extrabold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow"
                >
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                  <span>Add to Cart</span>
                </button>

                {/* Buy with COD Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Order with COD</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Doorstep Trial Available</span>
                </span>
                <span>•</span>
                <span>Hyderabad Instant Exchanges</span>
                <span>•</span>
                <span>Zero Advance Payment</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;
