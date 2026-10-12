import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const AppContext = createContext();

const STORAGE_KEYS = {
  CART: 'fitflex_cart_v2',
  ORDERS: 'fitflex_orders_v2',
  WISHLIST: 'fitflex_wishlist_v2',
  ROLE: 'fitflex_role_v2',
  USER: 'fitflex_user_v2',
};

const DEFAULT_BUYER = {
  id: 1,
  name: 'Rahul Sharma',
  email: 'rahul@fitflex.hyd',
  role: 'ROLE_BUYER',
  phone: '+91 98765 43210',
  locality: 'Madhapur',
  address: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
};

const DEFAULT_SELLER = {
  id: 2,
  name: 'Vikram Rao',
  email: 'ironcore@fitflex.hyd',
  role: 'ROLE_SELLER',
  phone: '+91 99887 76655',
  locality: 'Banjara Hills',
  address: 'Road No 10, Banjara Hills, Hyderabad - 500034',
  storeName: 'IronCore Activewear Hub',
  storeId: 1
};

const DEFAULT_ADMIN = {
  id: 4,
  name: 'FitFlex Admin HQ',
  email: 'admin@fitflex.hyd',
  role: 'ROLE_ADMIN',
  phone: '+91 90000 00000',
  locality: 'Gachibowli',
  address: 'FitFlex HQ, Financial District, Hyderabad - 500032'
};

const INITIAL_ORDERS = [
  {
    id: 101,
    orderNumber: 'FF-HYD-84291',
    buyerName: 'Rahul Sharma',
    buyerPhone: '+91 98765 43210',
    totalAmount: 999,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING_DELIVERY',
    orderStatus: 'OUT_FOR_DELIVERY',
    deliveryLocality: 'Madhapur',
    deliveryAddress: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
    deliveryNotes: 'Call upon arrival at gate. Keep COD change ready.',
    speed: 'EXPRESS_SAME_DAY',
    items: [
      {
        id: 1,
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        price: 999,
        quantity: 1
      }
    ],
    deliveryTracking: {
      id: 501,
      trackingCode: 'HYD-EXP-77291',
      courierPartner: 'FitFlex SwiftFleet Hyderabad',
      deliveryAgentName: 'Ramesh Kumar (Bike Fleet)',
      deliveryAgentPhone: '+91 98490 12345',
      bikePlate: 'TS 09 FF 4421',
      currentStatus: 'OUT_FOR_DELIVERY',
      currentLocality: 'Madhapur Cyber Towers Hub',
      estimatedDelivery: 'Arriving in ~35 mins (Live Delivery)'
    },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export const AppProvider = ({ children }) => {
  // Load state from localStorage or fallback
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'BUYER';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_BUYER;
    } catch {
      return DEFAULT_BUYER;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [
        {
          id: 'cart-1',
          product: INITIAL_PRODUCTS[0],
          selectedSize: 'L',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [2, 3];
    } catch {
      return [];
    }
  });

  // Filter state
  const [filters, setFilters] = useState({
    category: 'all',
    gender: 'all',
    locality: 'all',
    query: '',
    sortBy: 'featured'
  });

  // Promo code & discounts
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent or flat amount

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart actions
  const addToCart = (product, size = 'M', quantity = 1) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          selectedSize: size,
          quantity
        }
      ]);
    }

    showToast(`Added ${product.name} (${size}) to Cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(cart.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setPromoCode('');
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = appliedDiscount > 0 ? Math.round(rawSubtotal * (appliedDiscount / 100)) : 0;
  const deliveryFee = rawSubtotal >= 1499 ? 0 : 79;
  const cartTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HYDFIT10') {
      setAppliedDiscount(10);
      setPromoCode('HYDFIT10');
      showToast('🎉 Promo code HYDFIT10 applied: 10% Off!');
      return true;
    } else if (clean === 'LOCALHYD') {
      setAppliedDiscount(15);
      setPromoCode('LOCALHYD');
      showToast('🎉 Local Hyderabad perk applied: 15% Off!');
      return true;
    } else {
      showToast('Invalid promo code. Try HYDFIT10 or LOCALHYD.');
      return false;
    }
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from Wishlist.');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to your Wishlist!');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Order placement
  const placeOrder = async (checkoutData) => {
    let backendOrder = null;
    try {
      const payload = {
        buyerName: checkoutData.buyerName || currentUser.name,
        buyerPhone: checkoutData.buyerPhone || currentUser.phone,
        deliveryAddress: checkoutData.deliveryAddress,
        deliveryLocality: checkoutData.deliveryLocality || 'Madhapur',
        deliveryPincode: checkoutData.deliveryPincode || '500081',
        deliveryNotes: checkoutData.deliveryNotes || '',
        items: cart.map(ci => ({
          productId: ci.product.id,
          size: ci.selectedSize,
          quantity: ci.quantity
        }))
      };
      const res = await api.post('/orders/checkout', payload);
      if (res.data) {
        backendOrder = res.data;
      }
    } catch (err) {
      console.warn('Backend order checkout fallback to local order tracking:', err);
    }

    const newOrderNumber = backendOrder?.orderNumber || `FF-HYD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTrackingCode = backendOrder?.deliveryTracking?.trackingCode || `HYD-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: backendOrder?.id || Date.now(),
      orderNumber: newOrderNumber,
      buyerName: checkoutData.buyerName || currentUser.name,
      buyerPhone: checkoutData.buyerPhone || currentUser.phone,
      totalAmount: cartTotal,
      subtotal: rawSubtotal,
      discountAmount,
      deliveryFee,
      paymentMethod: checkoutData.paymentMethod || 'COD',
      paymentStatus: checkoutData.paymentMethod === 'UPI' ? 'PAID' : 'PENDING_DELIVERY',
      orderStatus: 'PLACED',
      speed: checkoutData.speed || 'EXPRESS_SAME_DAY',
      deliveryLocality: checkoutData.deliveryLocality || 'Madhapur',
      deliveryAddress: checkoutData.deliveryAddress,
      deliveryNotes: checkoutData.deliveryNotes || '',
      items: cart.map((ci, idx) => ({
        id: idx + 1,
        product: ci.product,
        size: ci.selectedSize,
        price: ci.product.price,
        quantity: ci.quantity
      })),
      deliveryTracking: {
        id: Date.now() + 1,
        trackingCode: newTrackingCode,
        courierPartner: 'FitFlex SwiftFleet Hyderabad',
        deliveryAgentName: 'Syed Imran (Local Express)',
        deliveryAgentPhone: '+91 98492 98765',
        bikePlate: 'TS 09 FL 8812',
        currentStatus: 'SELLER_PROCESSING',
        currentLocality: `${checkoutData.deliveryLocality || 'Banjara Hills'} Hub`,
        estimatedDelivery: checkoutData.speed === 'EXPRESS_SAME_DAY' 
          ? 'Today within 3-4 Hours (Local Express)' 
          : 'Tomorrow by 2:00 PM (Standard Local)'
      },
      createdAt: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setIsCheckoutOpen(false);
    setTrackingOrder(newOrder);
    showToast(`Order Placed Successfully! Order #${newOrderNumber}`);
    return newOrder;
  };

  // Advance delivery status simulator (for demo / user test)
  const advanceOrderStatus = (orderId) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id !== orderId) return order;

      const current = order.deliveryTracking?.currentStatus || order.orderStatus;
      let nextStatus = current;
      let nextLocality = order.deliveryTracking?.currentLocality;
      let nextEstimate = order.deliveryTracking?.estimatedDelivery;

      if (current === 'PLACED' || current === 'SELLER_PROCESSING') {
        nextStatus = 'PICKED_UP';
        nextLocality = `${order.deliveryLocality || 'Madhapur'} Transit Hub`;
        nextEstimate = 'Dispatched on Courier Bike — Arriving in 45 mins';
      } else if (current === 'PICKED_UP') {
        nextStatus = 'OUT_FOR_DELIVERY';
        nextLocality = `Near ${order.deliveryLocality || 'Madhapur'} Area`;
        nextEstimate = 'Rider is 10 mins away from your location';
      } else if (current === 'OUT_FOR_DELIVERY') {
        nextStatus = 'DELIVERED';
        nextLocality = order.deliveryAddress || 'Doorstep';
        nextEstimate = 'Delivered & COD Payment Settled';
      }

      const updated = {
        ...order,
        orderStatus: nextStatus,
        paymentStatus: nextStatus === 'DELIVERED' ? 'PAID' : order.paymentStatus,
        deliveryTracking: {
          ...order.deliveryTracking,
          currentStatus: nextStatus,
          currentLocality: nextLocality,
          estimatedDelivery: nextEstimate
        }
      };

      if (trackingOrder && trackingOrder.id === orderId) {
        setTrackingOrder(updated);
      }

      showToast(`Updated Delivery Status: ${nextStatus.replace(/_/g, ' ')}`);
      return updated;
    }));
  };

  // Role switching
  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'SELLER') {
      setCurrentUser(DEFAULT_SELLER);
      showToast('Switched to Seller Portal: IronCore Banjara Hills');
    } else if (role === 'ADMIN') {
      setCurrentUser(DEFAULT_ADMIN);
      showToast('Switched to Admin Operations HQ');
    } else {
      setCurrentUser(DEFAULT_BUYER);
      showToast('Switched to FitFlex Buyer Marketplace');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        setCurrentUser,
        cart,
        rawSubtotal,
        discountAmount,
        deliveryFee,
        cartTotal,
        promoCode,
        applyPromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        setOrders,
        placeOrder,
        advanceOrderStatus,
        wishlist,
        toggleWishlist,
        isWishlisted,
        filters,
        setFilters,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        trackingOrder,
        setTrackingOrder,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
