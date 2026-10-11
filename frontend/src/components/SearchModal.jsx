import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Flame, ArrowRight, MapPin } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const POPULAR_SEARCHES = [
  'Oversized Pump Cover',
  'Tennis Dress',
  'Raw-Cut Stringer',
  '240 GSM Acid Wash',
  'Seamless Legging Set',
  'Banjara Hills'
];

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setFilters, setQuickViewProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredResults = searchTerm.trim() === '' 
    ? [] 
    : INITIAL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabricDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.store.locality.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSelectProduct = (product) => {
    setQuickViewProduct(product);
    setIsSearchOpen(false);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setFilters(prev => ({ ...prev, query: tag }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#111319] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="relative border-b border-gray-800 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search activewear, 240 GSM pump covers, gym sets..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="p-1 text-gray-500 hover:text-gray-300 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded font-medium"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Quick Tags / Trending */}
          {searchTerm.trim() === '' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Trending Hyderabad Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="text-xs bg-[#191c25] hover:bg-orange-500/20 hover:text-orange-300 hover:border-orange-500/40 border border-gray-800 text-gray-300 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5"
                  >
                    <span>{tag}</span>
                    <ArrowRight className="w-3 h-3 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {filteredResults.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Found {filteredResults.length} matching drops:
              </span>
              <div className="divide-y divide-gray-800/60">
                {filteredResults.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="flex items-center gap-3.5 py-2.5 px-2 hover:bg-[#191c25] rounded-xl cursor-pointer transition"
                  >
                    <img
                      src={product.apparelImageUrl}
                      alt={product.name}
                      className="w-12 h-14 object-cover rounded-lg bg-gray-900 border border-gray-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
                        <span className="text-[10px] text-orange-400 font-semibold bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                          {product.gender}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{product.fabricDetails}</p>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{product.store.locality}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-white">₹{product.price}</span>
                      {product.discountPercent > 0 && (
                        <div className="text-[10px] font-bold text-emerald-400">{product.discountPercent}% OFF</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchTerm.trim() !== '' && filteredResults.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-sm font-semibold">No activewear pieces found for "{searchTerm}"</p>
              <p className="text-xs text-gray-500 mt-1">Try searching for "Oversized", "Dress", "Banjara Hills", or "240 GSM".</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SearchModal;
