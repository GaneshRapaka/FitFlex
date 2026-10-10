import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Package, 
  ShieldCheck,
  Bike
} from 'lucide-react';

const TRACKING_STEPS = [
  { key: 'PLACED', title: 'Order Placed', desc: 'Received by FitFlex Platform' },
  { key: 'CONFIRMED', title: 'Seller Confirmed', desc: 'Item packed at Local Store' },
  { key: 'SHIPPED', title: 'Picked Up by Courier', desc: 'FitFlex Hyderabad Express' },
  { key: 'OUT_FOR_DELIVERY', title: 'Out For Delivery', desc: 'Delivery agent on route' },
  { key: 'DELIVERED', title: 'Delivered & COD Collected', desc: 'Order fulfilled successfully' },
];

const OrderTrackingModal = () => {
  const { trackingOrder, setTrackingOrder, orders, setOrders, showToast } = useApp();

  if (!trackingOrder) return null;

  const currentStatus = trackingOrder.orderStatus || 'PLACED';

  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'CONFIRMED': return 1;
      case 'SHIPPED': return 2;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  const activeIndex = getStepIndex(currentStatus);

  // Simulation helper to advance delivery state for demo testing
  const advanceOrderStatus = () => {
    const nextStatuses = ['PLACED', 'CONFIRMED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const nextIdx = (activeIndex + 1) % nextStatuses.length;
    const nextStatus = nextStatuses[nextIdx];

    const updatedOrder = {
      ...trackingOrder,
      orderStatus: nextStatus,
      paymentStatus: nextStatus === 'DELIVERED' ? 'COLLECTED' : trackingOrder.paymentStatus
    };

    setTrackingOrder(updatedOrder);
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    showToast(`🚚 Delivery Status Updated to: ${nextStatus.replace(/_/g, ' ')}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#12141a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#161821]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black uppercase text-white tracking-wide">
                  Hyderabad Local Delivery Tracking
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Order #{trackingOrder.orderNumber} • Tracking: <span className="text-orange-400 font-bold">{trackingOrder.deliveryTracking?.trackingCode || 'HYD-EXP-77291'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setTrackingOrder(null)}
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Status Highlight Banner */}
          <div className="bg-gradient-to-r from-[#1b1e28] to-[#171a22] p-4 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-gray-400 font-medium uppercase block">Current Shipment Status</span>
              <span className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Bike className="w-5 h-5 text-orange-400" />
                {currentStatus.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-orange-300 font-medium">
                Locality Hub: {trackingOrder.deliveryLocality || 'Madhapur'}, Hyderabad
              </span>
            </div>

            {/* Quick Demo Simulator Button */}
            <button
              onClick={advanceOrderStatus}
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5"
              title="Simulate Next Delivery Step"
            >
              <span>Simulate Next Step ⚡</span>
            </button>
          </div>

          {/* Interactive Step Timeline */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-800">
            {TRACKING_STEPS.map((step, idx) => {
              const isCompleted = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.key} className="relative flex items-start gap-4">
                  {/* Step Dot */}
                  <div className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-orange-500 border-orange-400 text-white shadow-md shadow-orange-500/30'
                      : 'bg-[#181a24] border-gray-700 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold uppercase tracking-wide ${
                        isCurrent ? 'text-orange-400' : isCompleted ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] bg-orange-500 text-white font-black px-1.5 py-0.5 rounded animate-pulse">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Agent & COD Amount Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-[#181a24] p-3.5 rounded-2xl border border-gray-800">
              <span className="text-[11px] text-gray-400 block font-medium">Assigned Delivery Fleet:</span>
              <p className="text-xs font-bold text-white mt-1">
                {trackingOrder.deliveryTracking?.deliveryAgentName || 'Ramesh Kumar (Bike Fleet)'}
              </p>
              <p className="text-[11px] text-orange-400 flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3" />
                <span>{trackingOrder.deliveryTracking?.deliveryAgentPhone || '+91 98490 12345'}</span>
              </p>
            </div>

            <div className="bg-[#181a24] p-3.5 rounded-2xl border border-gray-800">
              <span className="text-[11px] text-gray-400 block font-medium">Payment Mode & Amount:</span>
              <p className="text-xs font-bold text-white mt-1">
                Cash On Delivery (COD)
              </p>
              <p className="text-xs font-black text-emerald-400 mt-0.5">
                ₹{trackingOrder.totalAmount} • {trackingOrder.paymentStatus === 'COLLECTED' ? 'PAID UPON ARRIVAL' : 'DUE AT DOORSTEP'}
              </p>
            </div>
          </div>

          {/* Destination Address */}
          <div className="text-xs bg-[#161821] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Deliver To: {trackingOrder.buyerName}</span>
              <span className="text-gray-400 text-[11px]">{trackingOrder.deliveryAddress}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderTrackingModal;
