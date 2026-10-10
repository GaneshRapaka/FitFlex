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
import Footer from './components/Footer';
import { Zap } from 'lucide-react';

const MainLayout = () => {
  const { currentRole, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0f12] text-gray-100 selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191c26] text-white border border-orange-500/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
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
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <ProductDetailModal />

      {/* Footer */}
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
