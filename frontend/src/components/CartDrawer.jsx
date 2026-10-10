import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartTotal, 
    updateQuantity, 
    removeFromCart,
    setIsCheckoutOpen 
  } = useApp();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1499;
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = FREE_SHIPPING_THRESHOLD - cartTotal;
  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : 49;
  const grandTotal = cartTotal + shippingFee;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111319] border-l border-gray-800 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-base font-black uppercase text-white tracking-wider">
                Your Gym Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Hyderabad Delivery Progress Meter */}
          <div className="bg-[#181a24] p-3.5 border-b border-gray-800">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-gray-300">
                {diffToFree > 0
                  ? `Add ₹${diffToFree} more for Free Hyderabad Express Delivery`
                  : '🎉 You have unlocked FREE Express Delivery in Hyderabad!'}
              </span>
              <span className="text-orange-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-[#1a1d26] rounded-full flex items-center justify-center mx-auto text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-gray-300">Your Gym Bag is Empty</p>
                <p className="text-xs text-gray-500">Discover top activewear drops from Hyderabad sellers!</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition uppercase"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#161821] border border-gray-800/80 rounded-2xl p-3 flex gap-3 group hover:border-gray-700 transition"
                >
                  {/* Standalone Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-800 shrink-0 relative">
                    <img 
                      src={item.product.apparelImageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white uppercase line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-400 p-0.5 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <span className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-200 font-bold">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3 h-3 text-orange-400" />
                          <span>{item.product.store?.locality || 'Hyderabad'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-black text-white">
                        ₹{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-[#1c1f2b] border border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-orange-400 text-gray-400 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-orange-400 text-gray-400 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#14161f] border-t border-gray-800 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Hyderabad Local Delivery</span>
                  <span className={shippingFee === 0 ? "text-emerald-400 font-bold" : "text-white font-bold"}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-gray-800">
                  <span>Cash on Delivery Amount</span>
                  <span className="text-orange-400">₹{grandTotal}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Zero advance payment needed. Pay in Cash / UPI to delivery partner upon arrival.</span>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Proceed to COD Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
