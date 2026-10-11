import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Tag, 
  CheckCircle2,
  Percent
} from 'lucide-react';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    rawSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal,
    updateQuantity, 
    removeFromCart, 
    setIsCheckoutOpen,
    promoCode,
    applyPromo,
    setQuickViewProduct
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 1499;
  const progressToFree = Math.min(100, Math.round((rawSubtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - rawSubtotal);

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromo(inputCode);
    setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111319] border-l border-gray-800 text-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight font-heading">Your Cart</h3>
                <p className="text-xs text-gray-400">{cart.length} unique drop{cart.length === 1 ? '' : 's'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#141620] px-5 py-3 border-b border-gray-800/80">
            <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
              {amountNeededForFree > 0 ? (
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-orange-400" />
                  <span>Add <strong className="text-orange-400">₹{amountNeededForFree}</strong> more for Free Same-Day Delivery!</span>
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Unlocked Free Express Local Delivery in Hyderabad!</span>
                </span>
              )}
              <span className="text-gray-400">{progressToFree}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressToFree}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-800/60">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#171a24] border border-gray-800 flex items-center justify-center text-gray-600">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200 uppercase">Your Cart is Empty</h4>
                  <p className="text-xs text-gray-500 mt-1">Explore our latest 240 GSM drops and gym sets.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-3.5">
                  <img
                    src={item.product.apparelImageUrl}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-gray-900 border border-gray-800 shrink-0 cursor-pointer"
                    onClick={() => {
                      setQuickViewProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          className="text-xs font-bold text-white hover:text-orange-400 transition cursor-pointer line-clamp-1"
                          onClick={() => {
                            setQuickViewProduct(item.product);
                            setIsCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-rose-400 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                        <span className="bg-[#181a24] px-2 py-0.5 rounded border border-gray-800 font-bold text-gray-200">
                          Size: {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span className="text-gray-500">{item.product.store?.locality}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800/40">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#181a24] border border-gray-800 rounded-lg p-0.5 text-xs font-bold">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-white text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-white">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-500 block">
                            (₹{item.product.price} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#141620] border-t border-gray-800 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter Coupon (HYDFIT10)"
                    className="w-full bg-[#181a24] border border-gray-800 rounded-xl py-2 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <span className="flex items-center gap-1 font-bold">
                    <Percent className="w-3 h-3" />
                    <span>Coupon {promoCode} Applied</span>
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-400 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-gray-200 font-semibold">₹{rawSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Hyderabad Local Delivery</span>
                  <span className="font-semibold text-gray-200">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-gray-800">
                  <span>Total Amount</span>
                  <span className="text-orange-400">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-95"
              >
                <span>Proceed with Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Advance Payment • Pay upon doorstep inspection</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
