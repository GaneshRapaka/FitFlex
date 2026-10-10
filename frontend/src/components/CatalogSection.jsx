import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchProducts } from '../api/productsApi';
import ProductCard from './ProductCard';
import { 
  Filter, 
  Sparkles, 
  MapPin, 
  Layers, 
  Flame, 
  RotateCcw,
  Eye
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
  { slug: 'all', label: 'All Hyderabad' },
  { slug: 'Banjara Hills', label: 'Banjara Hills' },
  { slug: 'Jubilee Hills', label: 'Jubilee Hills' },
  { slug: 'Madhapur', label: 'Madhapur' },
  { slug: 'Gachibowli', label: 'Gachibowli' },
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
      query: ''
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Interactive Feature Announcement Banner */}
      <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/15 border border-orange-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/30">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide flex items-center gap-2">
              <span>Dual-Perspective Fit Experience</span>
              <span className="text-[10px] bg-orange-500 text-white font-black px-2 py-0.5 rounded uppercase">
                FEATURED
              </span>
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              At first you see the standalone dress / activewear flat lay. <strong className="text-orange-400">Hover your cursor (or tap toggle)</strong> over any piece to see how it looks on a real fitness model!
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.slug }))}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                filters.category === cat.slug
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-[#151720] text-gray-400 border border-gray-800 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Row: Gender & Hyderabad Locality Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-800/80">
          
          {/* Gender Filter */}
          <div className="flex items-center gap-1.5 bg-[#14161f] p-1 rounded-xl border border-gray-800 text-xs font-bold">
            {['all', 'Men', 'Women'].map((g) => (
              <button
                key={g}
                onClick={() => setFilters(prev => ({ ...prev, gender: g }))}
                className={`px-3 py-1 rounded-lg transition ${
                  filters.gender === g
                    ? 'bg-[#222633] text-orange-400 border border-orange-500/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {g === 'all' ? 'All Genders' : g}
              </button>
            ))}
          </div>

          {/* Locality Quick Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            {LOCALITIES.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => setFilters(prev => ({ ...prev, locality: loc.slug }))}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                  filters.locality === loc.slug
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                    : 'bg-[#14161f] text-gray-400 border-gray-800 hover:text-white'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Result Count & Reset Button */}
          <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
            <span>Showing <strong className="text-white">{products.length}</strong> Drops</span>
            {(filters.category !== 'all' || filters.gender !== 'all' || filters.locality !== 'all' || filters.query) && (
              <button
                onClick={resetFilters}
                className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-[11px] font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-[3/4] bg-[#14161f] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-[#13151b] rounded-3xl border border-gray-800 space-y-4">
          <Layers className="w-12 h-12 text-gray-600 mx-auto" />
          <h3 className="text-lg font-black uppercase text-white">No Drops Match Your Filters</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try switching the category or Hyderabad locality filter to view other activewear gear.
          </p>
          <button
            onClick={resetFilters}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
};

export default CatalogSection;
