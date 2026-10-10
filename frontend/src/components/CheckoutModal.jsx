import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, MapPin, Phone, User, Truck, CheckCircle2 } from 'lucide-react';

const HYDERABAD_LOCALITIES = [
  'Madhapur',
  'Banjara Hills',
  'Jubilee Hills',
  'Gachibowli',
  'Kukatpally',
  'Kondapur',
  'Hitech City',
  'Secunderabad',
  'Begumpet',
  'Dilsukhnagar'
];

const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cartTotal, 
    cart, 
    currentUser, 
    placeOrder 
  } = useApp();

  const [formData, setFormData] = useState({
    buyerName: currentUser?.name || 'Rahul Sharma',
    buyerPhone: currentUser?.phone || '+91 98765 43210',
    deliveryLocality: currentUser?.locality || 'Madhapur',
    deliveryAddress: currentUser?.address || 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
    deliveryNotes: 'Call before delivery. Please ensure gym apparel is in original seal.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingFee = cartTotal >= 1499 || cartTotal === 0 ? 0 : 49;
  const grandTotal = cartTotal + shippingFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#161821]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-white tracking-wide">
                Cash On Delivery (COD) Checkout
              </h2>
              <p className="text-xs text-gray-400">
                Local Hyderabad Express Dispatch • Pay upon arrival
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Order Summary Snapshot */}
          <div className="bg-[#181a24] p-3.5 rounded-2xl border border-gray-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Items in Order:</span>
              <span className="text-white font-bold">{cart.reduce((s, i) => s + i.quantity, 0)} Activewear Piece(s)</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block font-medium">Total Amount Due on Delivery:</span>
              <span className="text-base font-black text-orange-400">₹{grandTotal}</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-orange-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={formData.buyerName}
                onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>Hyderabad Contact Phone</span>
              </label>
              <input
                type="tel"
                required
                value={formData.buyerPhone}
                onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Hyderabad Delivery Locality</span>
              </label>
              <select
                value={formData.deliveryLocality}
                onChange={(e) => setFormData({ ...formData, deliveryLocality: e.target.value })}
                className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                {HYDERABAD_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#12141a] text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Pin Code
              </label>
              <input
                type="text"
                placeholder="500081"
                defaultValue="500081"
                className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Complete Delivery Address (Apartment, Street, Landmark)
            </label>
            <textarea
              rows={2}
              required
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Delivery Notes (Optional)
            </label>
            <input
              type="text"
              value={formData.deliveryNotes}
              onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
              placeholder="e.g. Leave with security / Ring bell twice"
              className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Payment Method Details (COD) */}
          <div className="bg-[#191c26] border border-orange-500/30 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-500/20" />
                <span className="text-xs font-black uppercase text-white tracking-wide">
                  Cash On Delivery (COD) Selected
                </span>
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              No prepayment or credit card required. Our local Hyderabad delivery agent will bring your order. You can inspect the package and pay via Cash or UPI on delivery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="w-1/3 bg-[#181a24] hover:bg-[#202330] text-gray-300 font-bold py-3.5 rounded-xl transition text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming Order...' : `Place Order (Pay ₹${grandTotal} on Delivery)`}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
