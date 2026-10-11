import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchProducts } from '../api/productsApi';
import ProductCard from './ProductCard';
import { 
  Filter, 
  Sparkles, 
  MapPin, 
  SlidersHorizontal,
  Flame, 
  RotateCcw,
  Eye,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { slug: 'all', label: 'All Drops' },
  { slug: 'oversized-tees', label: 'Oversized Tees' },
  { slug: 'active-dresses-sets', label: 'Dresses & Sets' },
  { slug: 'stringers-tanks', label: 'Stringers & Tanks' },
  { slug: 'compression-wear', label: 'Compression' },
  { slug: 'joggers-shorts', label: 'Joggers & Shorts' },
];

const LOCALITIES = [
  { slug: 'all', label: 'All Localities' },
  { slug: 'Banjara Hills', label: 'Banjara Hills' },
  { slug: 'Jubilee Hills', label: 'Jubilee Hills' },
  { slug: 'Madhapur', label: 'Madhapur' },
  { slug: 'Gachibowli', label: 'Gachibowli' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Drops' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const CatalogSection = () => {
  const { filters, setFilters } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const items = await fetchProducts(filters);
      setProducts(items);
      setLoading(false);
    };
    loadData();
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      locality: 'all',
      query: '',
      sortBy: 'featured'
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Interactive Feature Announcement Card */}
      <div className="bg-[#12141c] border border-orange-500/30 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase text-white tracking-wider font-heading">
                Dual-Perspective Fit Experience
              </h3>
              <span className="text-[10px] bg-orange-500 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                SIGNATURE
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5 max-w-2xl">
              By default, see the garment in clean flat-lay silhouette. <strong className="text-orange-400 font-semibold">Hover your cursor (or tap toggle)</strong> over any piece to see how it hangs on a real fitness athlete!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 shrink-0 bg-[#171a24] px-3 py-1.5 rounded-full border border-gray-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Verified Local Hyderabad Garments</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.slug }))}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                filters.category === cat.slug
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#13151e] text-gray-400 border border-gray-800/80 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Toolbar: Gender, Locality, Sort, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800/80">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Gender Pills */}
            <div className="flex items-center bg-[#13151e] border border-gray-800/80 p-1 rounded-xl text-xs font-semibold text-gray-400">
              {['all', 'Men', 'Women'].map(gender => (
                <button
                  key={gender}
                  onClick={() => setFilters(prev => ({ ...prev, gender }))}
                  className={`px-3 py-1 rounded-lg transition uppercase text-[11px] font-bold ${
                    filters.gender === gender 
                      ? 'bg-gray-800 text-white shadow-sm' 
                      : 'hover:text-white'
                  }`}
                >
                  {gender === 'all' ? 'All Genders' : gender}
                </button>
              ))}
            </div>

            {/* Locality Selector Pill */}
            <div className="relative">
              <select
                value={filters.locality === 'all' ? 'All Localities' : filters.locality}
                onChange={(e) => {
                  const val = e.target.value;
                  setFilters(prev => ({ ...prev, locality: val === 'All Localities' ? 'all' : val }));
                }}
                className="bg-[#13151e] border border-gray-800/80 text-xs text-gray-200 font-semibold rounded-xl py-1.5 pl-7 pr-3 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.slug} value={loc.label} className="bg-[#13151e]">
                    {loc.label}
                  </option>
                ))}
              </select>
              <MapPin className="w-3.5 h-3.5 text-orange-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Active search tag if query active */}
            {filters.query && (
              <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs px-2.5 py-1 rounded-xl">
                <span>Search: "{filters.query}"</span>
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                  className="hover:text-white font-bold ml-1"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Sort By Dropdown & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:inline">
              Showing <strong className="text-gray-300">{products.length}</strong> drops
            </span>

            <div className="flex items-center gap-1.5 bg-[#13151e] border border-gray-800/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filters.sortBy || 'featured'}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-transparent text-gray-200 focus:outline-none cursor-pointer text-xs"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-[#13151e] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(filters.category !== 'all' || filters.gender !== 'all' || filters.locality !== 'all' || filters.query) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="bg-[#111319] rounded-2xl border border-gray-800/60 aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-[#111319] border border-gray-800/80 rounded-3xl p-8">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 text-gray-500 mx-auto flex items-center justify-center">
            <Filter className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-tight">No Activewear Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            No drops match the current filters. Try selecting a different category or clearing your locality filter.
          </p>
          <button
            onClick={resetFilters}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </section>
  );
};

export default CatalogSection;
