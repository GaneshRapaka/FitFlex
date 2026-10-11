import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CatalogSection from './components/CatalogSection';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import ProductDetailModal from './components/ProductDetailModal';
import SearchModal from './components/SearchModal';
import WishlistDrawer from './components/WishlistDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { Zap, CheckCircle2 } from 'lucide-react';

const MainLayout = () => {
  const { currentRole, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0d] text-gray-100 selection:bg-orange-500 selection:text-white antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161822]/95 backdrop-blur-md text-white border border-orange-500/40 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 fill-orange-400" />
          </div>
          <span className="tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Brand Navbar */}
      <Navbar />

      {/* Dynamic View based on User Role */}
      <main className="flex-1">
        {currentRole === 'BUYER' && (
          <>
            <HeroBanner />
            <CatalogSection />
          </>
        )}

        {currentRole === 'SELLER' && <SellerDashboard />}

        {currentRole === 'ADMIN' && <AdminDashboard />}
      </main>

      {/* Global Modals & Drawers */}
      <SearchModal />
      <WishlistDrawer />
      <AuthModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <ProductDetailModal />

      {/* Brand Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
