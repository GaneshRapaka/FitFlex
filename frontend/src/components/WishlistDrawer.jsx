import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const WishlistDrawer = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setQuickViewProduct 
  } = useApp();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = INITIAL_PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111319] border-l border-gray-800 text-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight">Saved Drops</h3>
                <p className="text-xs text-gray-400">{wishlist.length} item{wishlist.length === 1 ? '' : 's'} in your wishlist</p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-800/60">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-600">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200 uppercase">Your Wishlist is Empty</h4>
                  <p className="text-xs text-gray-500 mt-1">Tap the heart icon on any drop to save pieces for your next order.</p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div key={product.id} className="py-4 first:pt-0 flex gap-3.5">
                  <img
                    src={product.apparelImageUrl}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-gray-900 border border-gray-800 shrink-0 cursor-pointer"
                    onClick={() => {
                      setQuickViewProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          className="text-xs font-bold text-white hover:text-orange-400 transition cursor-pointer line-clamp-1"
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsWishlistOpen(false);
                          }}
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-gray-500 hover:text-rose-400 transition p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{product.fabricDetails}</p>
                      <div className="text-xs font-bold text-white mt-1">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="text-[10px] text-gray-500 line-through ml-1.5 font-normal">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          addToCart(product, 'M', 1);
                          toggleWishlist(product.id);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg flex items-center gap-1.5 shadow-sm transition"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
