import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  ShoppingBag, 
  Search, 
  MapPin, 
  Truck, 
  User, 
  Store, 
  ShieldAlert, 
  Menu, 
  X 
} from 'lucide-react';

const HYDERABAD_LOCALITIES = [
  'All Localities',
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
    cart, 
    setIsCartOpen, 
    filters, 
    setFilters,
    orders,
    setTrackingOrder 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.query || '');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, query: searchInput }));
  };

  const handleTrackLastOrder = () => {
    if (orders && orders.length > 0) {
      setTrackingOrder(orders[0]);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => switchRole('BUYER')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Dumbbell className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                  FIT<span className="text-orange-500">FLEX</span>
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-1.5 py-0.5 rounded tracking-widest border border-orange-500/30">
                  HYD
                </span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                Shop Local. Stay Active.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {currentRole === 'BUYER' && (
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-300">
              <button 
                onClick={() => setFilters(prev => ({ ...prev, gender: 'all', category: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.gender === 'all' && filters.category === 'all' ? 'text-orange-500' : ''}`}
              >
                All Drops
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, gender: 'Men', category: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.gender === 'Men' ? 'text-orange-500' : ''}`}
              >
                Men
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, gender: 'Women', category: 'all' }))}
                className={`transition-colors hover:text-orange-400 ${filters.gender === 'Women' ? 'text-orange-500' : ''}`}
              >
                Women
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'oversized-tees' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'oversized-tees' ? 'text-orange-500' : ''}`}
              >
                Oversized
              </button>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'active-dresses-sets' }))}
                className={`transition-colors hover:text-orange-400 ${filters.category === 'active-dresses-sets' ? 'text-orange-500' : ''}`}
              >
                Dresses & Sets
              </button>
            </nav>
          )}

          {/* Search & Hyderabad Hub Selector */}
          {currentRole === 'BUYER' && (
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search gym stringers, oversized tees, dresses..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#181a20] border border-gray-700/80 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
              </form>

              {/* Locality Dropdown */}
              <div className="relative">
                <select
                  value={filters.locality === 'all' ? 'All Localities' : filters.locality}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters(prev => ({ ...prev, locality: val === 'All Localities' ? 'all' : val }));
                  }}
                  className="bg-[#181a20] border border-gray-700/80 text-xs text-gray-200 font-medium rounded-full py-2 px-3 pl-8 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  {HYDERABAD_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#181a20] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
                <MapPin className="w-3.5 h-3.5 text-orange-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Action Tools & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Role Switcher Pills */}
            <div className="hidden sm:flex items-center bg-[#181a20] p-1 rounded-full border border-gray-800 text-xs font-semibold">
              <button
                onClick={() => switchRole('BUYER')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  currentRole === 'BUYER'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Buyer</span>
              </button>
              <button
                onClick={() => switchRole('SELLER')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  currentRole === 'SELLER'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller</span>
              </button>
              <button
                onClick={() => switchRole('ADMIN')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  currentRole === 'ADMIN'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Track Orders Button */}
            {orders.length > 0 && (
              <button
                onClick={handleTrackLastOrder}
                className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-orange-400 bg-[#181a20] border border-gray-700/80 px-3 py-2 rounded-full transition"
                title="Track Active Delivery"
              >
                <Truck className="w-3.5 h-3.5 text-orange-400" />
                <span>Track Order</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-0.5"></span>
              </button>
            )}

            {/* Cart Trigger Button */}
            {currentRole === 'BUYER' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#181a20] border border-gray-700/80 hover:border-orange-500 text-white transition group"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-200 group-hover:text-orange-400 transition" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d0f12]">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#12141a] border-b border-gray-800 px-4 py-4 space-y-3">
          <div className="flex justify-center gap-2 pb-2 border-b border-gray-800">
            <button
              onClick={() => { switchRole('BUYER'); setIsMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${currentRole === 'BUYER' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
            >
              Buyer Mode
            </button>
            <button
              onClick={() => { switchRole('SELLER'); setIsMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${currentRole === 'SELLER' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
            >
              Seller Hub
            </button>
            <button
              onClick={() => { switchRole('ADMIN'); setIsMobileMenuOpen(false); }}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${currentRole === 'ADMIN' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
            >
              Admin Mode
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search gym wear..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-[#1c1f26] border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-xs text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
            <button
              onClick={() => { setFilters(prev => ({ ...prev, gender: 'all', category: 'all' })); setIsMobileMenuOpen(false); }}
              className="bg-[#1c1f26] p-2 rounded text-left text-gray-200"
            >
              All Drops
            </button>
            <button
              onClick={() => { setFilters(prev => ({ ...prev, gender: 'Men', category: 'all' })); setIsMobileMenuOpen(false); }}
              className="bg-[#1c1f26] p-2 rounded text-left text-gray-200"
            >
              Men's Gym Wear
            </button>
            <button
              onClick={() => { setFilters(prev => ({ ...prev, gender: 'Women', category: 'all' })); setIsMobileMenuOpen(false); }}
              className="bg-[#1c1f26] p-2 rounded text-left text-gray-200"
            >
              Women's Gym Wear
            </button>
            <button
              onClick={() => { setFilters(prev => ({ ...prev, category: 'oversized-tees' })); setIsMobileMenuOpen(false); }}
              className="bg-[#1c1f26] p-2 rounded text-left text-gray-200"
            >
              Oversized Tees
            </button>
            <button
              onClick={() => { setFilters(prev => ({ ...prev, category: 'active-dresses-sets' })); setIsMobileMenuOpen(false); }}
              className="bg-[#1c1f26] p-2 rounded text-left text-gray-200"
            >
              Active Dresses & Sets
            </button>
            {orders.length > 0 && (
              <button
                onClick={() => { handleTrackLastOrder(); setIsMobileMenuOpen(false); }}
                className="bg-orange-500/20 text-orange-400 border border-orange-500/40 p-2 rounded text-left font-bold"
              >
                Track Live Order
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
