import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('BUYER'); // BUYER, SELLER, ADMIN
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@fitflex.hyd',
    role: 'ROLE_BUYER',
    phone: '+91 98765 43210',
    locality: 'Madhapur',
    address: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081'
  });

  const [cart, setCart] = useState([
    {
      id: 'cart-1',
      product: INITIAL_PRODUCTS[0],
      selectedSize: 'L',
      quantity: 1,
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 101,
      orderNumber: 'FF-HYD-84291',
      buyerName: 'Rahul Sharma',
      buyerPhone: '+91 98765 43210',
      totalAmount: 999,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      orderStatus: 'OUT_FOR_DELIVERY',
      deliveryLocality: 'Madhapur',
      deliveryAddress: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
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
        courierPartner: 'FitFlex Local Hyderabad Fleet',
        deliveryAgentName: 'Ramesh Kumar (Bike Dispatcher)',
        deliveryAgentPhone: '+91 98490 12345',
        currentStatus: 'OUT_FOR_DELIVERY',
        currentLocality: 'Madhapur Cyber Towers Hub',
        estimatedDelivery: 'Today within 2 Hours (Local Express)'
      },
      createdAt: new Date().toISOString()
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    gender: 'all',
    locality: 'all',
    query: ''
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
          id: `cart-${Date.now()}`,
          product,
          selectedSize: size,
          quantity
        }
      ]);
    }

    showToast(`⚡ Added ${product.name} (Size: ${size}) to Cart!`);
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
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const placeOrder = (checkoutData) => {
    const newOrderNumber = `FF-HYD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTrackingCode = `HYD-EXP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: Date.now(),
      orderNumber: newOrderNumber,
      buyerName: checkoutData.buyerName || currentUser.name,
      buyerPhone: checkoutData.buyerPhone || currentUser.phone,
      totalAmount: cartTotal,
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      orderStatus: 'PLACED',
      deliveryLocality: checkoutData.deliveryLocality || 'Madhapur',
      deliveryAddress: checkoutData.deliveryAddress,
      deliveryNotes: checkoutData.deliveryNotes,
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
        courierPartner: 'FitFlex Local Hyderabad Fleet',
        deliveryAgentName: 'Syed Imran (Local Express)',
        deliveryAgentPhone: '+91 98492 98765',
        currentStatus: 'SELLER_PROCESSING',
        currentLocality: `${checkoutData.deliveryLocality || 'Banjara Hills'} Hub`,
        estimatedDelivery: 'Next-Day Delivery (Hyderabad)'
      },
      createdAt: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setIsCheckoutOpen(false);
    setTrackingOrder(newOrder);
    showToast(`🎉 Order Placed via Cash on Delivery! Order #${newOrderNumber}`);
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'SELLER') {
      setCurrentUser({
        id: 2,
        name: 'Vikram Rao',
        email: 'ironcore@fitflex.hyd',
        role: 'ROLE_SELLER',
        phone: '+91 99887 76655',
        locality: 'Banjara Hills',
        address: 'Road No 10, Banjara Hills, Hyderabad',
        storeName: 'IronCore Activewear Hub',
        storeId: 1
      });
      showToast('Switched to Seller Portal: IronCore Banjara Hills');
    } else if (role === 'ADMIN') {
      setCurrentUser({
        id: 4,
        name: 'Platform Admin',
        email: 'admin@fitflex.hyd',
        role: 'ROLE_ADMIN',
        phone: '+91 90000 00000',
        locality: 'Gachibowli',
        address: 'FitFlex HQ, Financial District, Hyderabad'
      });
      showToast('Switched to Admin Oversight Mode');
    } else {
      setCurrentUser({
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@fitflex.hyd',
        role: 'ROLE_BUYER',
        phone: '+91 98765 43210',
        locality: 'Madhapur',
        address: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081'
      });
      showToast('Switched to Buyer Marketplace');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        cart,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        setOrders,
        placeOrder,
        filters,
        setFilters,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
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
