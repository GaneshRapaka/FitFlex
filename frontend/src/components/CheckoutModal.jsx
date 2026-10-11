import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  QrCode, 
  Banknote, 
  Zap,
  ArrowRight,
  Clock
} from 'lucide-react';

const HYDERABAD_LOCALITIES = [
  'Madhapur',
  'Banjara Hills',
  'Jubilee Hills',
  'Gachibowli',
  'Kukatpally',
  'Kondapur',
  'Hitec City',
  'Secunderabad'
];

const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    rawSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal, 
    currentUser, 
    placeOrder 
  } = useApp();

  const [formData, setFormData] = useState({
    buyerName: currentUser?.name || 'Rahul Sharma',
    buyerPhone: currentUser?.phone || '+91 98765 43210',
    deliveryLocality: currentUser?.locality || 'Madhapur',
    deliveryAddress: currentUser?.address || 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
    landmark: 'Near Cyber Towers',
    pincode: '500081',
    deliveryNotes: 'Please ring the doorbell. Keep COD change ready.',
    speed: 'EXPRESS_SAME_DAY', // 'EXPRESS_SAME_DAY' or 'STANDARD_24H'
    paymentMethod: 'COD' // 'COD' or 'UPI'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#111319] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl my-6 text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#141620]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight font-heading">
                Express Hyderabad Checkout
              </h3>
              <p className="text-xs text-gray-400">100% Cash On Delivery Available Across Hyderabad</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Section 1: Customer Contact Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <User className="w-3.5 h-3.5 text-orange-400" />
              <span>Contact Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  className="w-full bg-[#181a24] border border-gray-800 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Mobile Number (For Courier OTP)</label>
                <input
                  type="tel"
                  required
                  value={formData.buyerPhone}
                  onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                  className="w-full bg-[#181a24] border border-gray-800 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Hyderabad Delivery Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Hyderabad Delivery Location</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Locality / Hub</label>
                <select
                  value={formData.deliveryLocality}
                  onChange={(e) => setFormData({ ...formData, deliveryLocality: e.target.value })}
                  className="w-full bg-[#181a24] border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  {HYDERABAD_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#181a24] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#181a24] border border-gray-800 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1">Flat / Building / Street Address</label>
              <textarea
                required
                rows={2}
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="w-full bg-[#181a24] border border-gray-800 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Section 3: Delivery Speed */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span>Choose Delivery Speed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setFormData({ ...formData, speed: 'EXPRESS_SAME_DAY' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  formData.speed === 'EXPRESS_SAME_DAY'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-[#181a24] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-orange-400" />
                    <span>SwiftFleet Express</span>
                  </span>
                  <span className="text-[10px] bg-orange-500 text-white font-black px-1.5 py-0.2 rounded">
                    FASTEST
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Same-Day Dispatch (Arriving within 3-4 hours)</p>
              </div>

              <div
                onClick={() => setFormData({ ...formData, speed: 'STANDARD_24H' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  formData.speed === 'STANDARD_24H'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-[#181a24] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Standard Hyderabad</span>
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Next-Day Courier Delivery (24-48 Hours)</p>
              </div>
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Banknote className="w-3.5 h-3.5 text-orange-400" />
              <span>Payment Option</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  formData.paymentMethod === 'COD'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-[#181a24] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  <span>Cash on Delivery (COD)</span>
                </div>
                <p className="text-[11px] text-gray-400">Zero upfront payment. Pay with Cash or UPI upon inspection.</p>
              </div>

              <div
                onClick={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  formData.paymentMethod === 'UPI'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-[#181a24] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>UPI Instant QR</span>
                </div>
                <p className="text-[11px] text-gray-400">GPay, PhonePe, Paytm, or BHIM directly.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Order Breakdown */}
          <div className="bg-[#141620] border border-gray-800 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Items ({cart.length} drops)</span>
              <span className="text-gray-200">₹{rawSubtotal}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Discount applied</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-400">
              <span>Hyderabad Courier Speed</span>
              <span className="text-gray-200">
                {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-gray-800">
              <span>Total Payable</span>
              <span className="text-orange-400 font-extrabold text-base">₹{cartTotal}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-orange-500/25 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-95"
          >
            {isSubmitting ? (
              <span>Confirming Hyderabad Dispatch...</span>
            ) : (
              <>
                <span>Place Order ({formData.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Pay via UPI'})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[10px] text-gray-400 text-center">
            By placing an order, you agree to inspect the parcel with our local Hyderabad courier rider before final payment.
          </p>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
