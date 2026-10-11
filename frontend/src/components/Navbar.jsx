import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  ShoppingBag, 
  Search, 
  MapPin, 
  Truck, 
  User, 
  Heart,
  ChevronDown,
  Store, 
  ShieldAlert, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  LogOut
} from 'lucide-react';

const HYDERABAD_LOCALITIES = [
  'All Hyderabad',
  'Banjara Hills',
  'Jubilee Hills',
  'Madhapur',
  'Gachibowli',
  'Kukatpally',
  'Kondapur',
  'Secunderabad'
];

const Navbar = () => {
  const { 
    currentRole, 
    switchRole, 
    currentUser,
    cart, 
    setIsCartOpen, 
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAuthModalOpen,
    filters, 
    setFilters,
    orders,
    setTrackingOrder 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTrackLastOrder = () => {
    if (orders && orders.length > 0) {
      setTrackingOrder(orders[0]);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090a0d]/95 backdrop-blur-md border-b border-gray-800/80">
      
      {/* Role Banner if in Seller or Admin mode */}
      {currentRole !== 'BUYER' && (
        <div className="bg-orange-500/10 border-b border-orange-500/30 py-1.5 px-4 text-xs flex items-center justify-between text-orange-300">
          <div className="flex items-center gap-2 font-bold max-w-7xl mx-auto w-full">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>Active Portal: {currentRole === 'SELLER' ? 'Merchant Dashboard (IronCore Banjara Hills)' : 'Platform Administration Operations HQ'}</span>
            <button
              onClick={() => switchRole('BUYER')}
              className="ml-auto underline hover:text-white font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>Return to Customer Marketplace</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => {
              if (currentRole !== 'BUYER') switchRole('BUYER');
              setFilters(prev => ({ ...prev, category: 'all', gender: 'all', locality: 'all', query: '' }));
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white uppercase italic font-heading">
                  FIT<span className="text-orange-500">FLEX</span>
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 font-extrabold px-1.5 py-0.5 rounded tracking-widest border border-orange-500/30">
                  HYD
                </span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Athletic Marketplace
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          {currentRole === 'BUYER' && (
            <nav className="hidden xl:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-300">
              <button 
                onClick={() => setFilters(prev => ({ ...prev, gender: 'all', category: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.gender === 'all' && filters.category === 'all' ? 'text-orange-500' : ''}`}
              >
                All Drops
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees', gender: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'oversized-tees' ? 'text-orange-500' : ''}`}
              >
                Oversized
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets', gender: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'active-dresses-sets' ? 'text-orange-500' : ''}`}
              >
                Dresses & Sets
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'stringers-tanks', gender: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'stringers-tanks' ? 'text-orange-500' : ''}`}
              >
                Stringers
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'joggers-shorts', gender: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'joggers-shorts' ? 'text-orange-500' : ''}`}
              >
                Joggers & Shorts
              </button>
            </nav>
          )}

          {/* Search Trigger Bar & Hyderabad Locality Selector */}
          {currentRole === 'BUYER' && (
            <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-sm lg:max-w-md">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex-1 bg-[#14161f] hover:bg-[#1a1d28] border border-gray-800 rounded-full py-2 px-3.5 flex items-center justify-between text-xs text-gray-400 transition"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Search gym fits, 240 GSM tees...</span>
                </div>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-mono">
                  ⌘K
                </span>
              </button>

              {/* Locality Dropdown */}
              <div className="relative">
                <select
                  value={filters.locality === 'all' ? 'All Hyderabad' : filters.locality}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters(prev => ({ ...prev, locality: val === 'All Hyderabad' ? 'all' : val }));
                  }}
                  className="bg-[#14161f] border border-gray-800 text-[11px] text-gray-200 font-semibold rounded-full py-2 pl-7 pr-3 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer hover:border-gray-700 transition"
                >
                  {HYDERABAD_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#14161f] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
                <MapPin className="w-3 h-3 text-orange-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Live Delivery Tracker Pill */}
            {orders.length > 0 && (
              <button
                onClick={handleTrackLastOrder}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-orange-400 bg-[#14161f] hover:bg-[#191c26] border border-gray-800 px-3 py-2 rounded-full transition shadow-sm"
                title="Track Live Hyderabad Delivery"
              >
                <Truck className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">Track</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-gray-300 hover:text-rose-400 bg-[#14161f] hover:bg-[#191c26] border border-gray-800 rounded-full transition"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-orange-500 hover:bg-orange-600 text-white font-bold p-2.5 sm:px-4 sm:py-2 rounded-full transition flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-black text-orange-400 text-[10px] font-black px-1.5 py-0.2 rounded-full border border-orange-400/40">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 bg-[#14161f] hover:bg-[#191c26] border border-gray-800 p-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold text-gray-200 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xs">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span className="hidden lg:inline text-xs max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#13151b] border border-gray-800 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-gray-800/80">
                    <p className="font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      {currentRole === 'BUYER' ? 'Verified Buyer' : currentRole === 'SELLER' ? 'Merchant Partner' : 'Admin Operations'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleTrackLastOrder();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1a1d27] rounded-xl flex items-center gap-2 font-medium"
                    >
                      <Truck className="w-3.5 h-3.5 text-orange-400" />
                      <span>My Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsWishlistOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1a1d27] rounded-xl flex items-center gap-2 font-medium"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span>Saved Wishlist ({wishlist.length})</span>
                    </button>
                  </div>

                  {/* Portal & Demo Switcher Section */}
                  <div className="pt-2 border-t border-gray-800/80">
                    <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      Portal & Account Access
                    </span>

                    {currentRole !== 'BUYER' && (
                      <button
                        onClick={() => {
                          switchRole('BUYER');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1a1d27] rounded-xl flex items-center gap-2 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        <span>Buyer Marketplace</span>
                      </button>
                    )}

                    {currentRole !== 'SELLER' && (
                      <button
                        onClick={() => {
                          switchRole('SELLER');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1a1d27] rounded-xl flex items-center gap-2 font-medium"
                      >
                        <Store className="w-3.5 h-3.5 text-orange-400" />
                        <span>IronCore Seller Portal</span>
                      </button>
                    )}

                    {currentRole !== 'ADMIN' && (
                      <button
                        onClick={() => {
                          switchRole('ADMIN');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#1a1d27] rounded-xl flex items-center gap-2 font-medium"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Admin Oversight HQ</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-orange-400 hover:bg-orange-500/10 rounded-xl flex items-center gap-2 font-bold mt-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Switch Account / Demo Logins</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-gray-400 hover:text-white rounded-lg bg-[#14161f] border border-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0d0f14] border-b border-gray-800 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-[#191c25] border border-gray-800 rounded-xl p-2.5 text-xs text-gray-400 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Hyderabad drops...</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, gender: 'all', category: 'all' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#14161f] border border-gray-800 rounded-xl text-left hover:text-orange-400"
            >
              All Drops
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'oversized-tees' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#14161f] border border-gray-800 rounded-xl text-left hover:text-orange-400"
            >
              Oversized Tees
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'active-dresses-sets' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#14161f] border border-gray-800 rounded-xl text-left hover:text-orange-400"
            >
              Dresses & Sets
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'stringers-tanks' }));
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 bg-[#14161f] border border-gray-800 rounded-xl text-left hover:text-orange-400"
            >
              Stringers & Tanks
            </button>
          </div>

          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-400">Hyderabad Hub:</span>
            <select
              value={filters.locality === 'all' ? 'All Hyderabad' : filters.locality}
              onChange={(e) => {
                const val = e.target.value;
                setFilters(prev => ({ ...prev, locality: val === 'All Hyderabad' ? 'all' : val }));
              }}
              className="bg-[#14161f] border border-gray-800 text-xs text-orange-400 font-bold rounded-lg py-1 px-2"
            >
              {HYDERABAD_LOCALITIES.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
