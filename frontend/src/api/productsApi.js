import api from './client';

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "IronCore Pump Heavy Oversized Tee",
    category: { slug: "oversized-tees", name: "Oversized Tees" },
    gender: "Men",
    price: 999,
    originalPrice: 1599,
    discountPercent: 38,
    // Flat garment / standalone dress or tee
    apparelImageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    // Muscular athlete wearing it on hover
    modelImageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "100% Combed Heavy French Terry (240 GSM)",
    fitType: "Extreme Oversized Drop Shoulder",
    badge: "BESTSELLER",
    rating: 4.9,
    reviewCount: 84,
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad"
    },
    variants: [
      { id: 101, size: "S", stockQuantity: 15 },
      { id: 102, size: "M", stockQuantity: 25 },
      { id: 103, size: "L", stockQuantity: 20 },
      { id: 104, size: "XL", stockQuantity: 12 },
      { id: 105, size: "XXL", stockQuantity: 8 },
    ]
  },
  {
    id: 2,
    name: "AuraFlex Sculpt Tennis & Gym Active Dress",
    category: { slug: "active-dresses-sets", name: "Active Dresses & Sets" },
    gender: "Women",
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    // Clean standalone flat-lay dress
    apparelImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    // Athletic model wearing the sculpted dress on hover
    modelImageUrl: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "78% Nylon, 22% Spandex ButterSoft Fabric",
    fitType: "Athletic Sculpted Fit",
    badge: "TRENDING DROP",
    rating: 4.95,
    reviewCount: 112,
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad"
    },
    variants: [
      { id: 201, size: "XS", stockQuantity: 10 },
      { id: 202, size: "S", stockQuantity: 18 },
      { id: 203, size: "M", stockQuantity: 22 },
      { id: 204, size: "L", stockQuantity: 14 },
    ]
  },
  {
    id: 3,
    name: "IronCore Raw-Cut Gym Stringer",
    category: { slug: "stringers-tanks", name: "Stringers & Tanks" },
    gender: "Men",
    price: 699,
    originalPrice: 1199,
    discountPercent: 42,
    // Flat garment
    apparelImageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    // Muscular bodybuilder wearing it in gym
    modelImageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "95% Cotton, 5% Lycra Breathable",
    fitType: "Deep Cut Stringer",
    badge: "FLAT 42% OFF",
    rating: 4.8,
    reviewCount: 46,
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad"
    },
    variants: [
      { id: 301, size: "S", stockQuantity: 8 },
      { id: 302, size: "M", stockQuantity: 30 },
      { id: 303, size: "L", stockQuantity: 25 },
      { id: 304, size: "XL", stockQuantity: 15 },
    ]
  },
  {
    id: 4,
    name: "AuraFlex Seamless Ribbed Crop & Legging Set",
    category: { slug: "active-dresses-sets", name: "Active Dresses & Sets" },
    gender: "Women",
    price: 1799,
    originalPrice: 2999,
    discountPercent: 40,
    // Flat-lay outfit
    apparelImageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
    // Fitness trainer wearing the full activewear set
    modelImageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "Seamless Micro-Ribbed High-Compression Fabric",
    fitType: "Second-Skin Compression",
    badge: "LIMITED EDITION",
    rating: 4.9,
    reviewCount: 67,
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad"
    },
    variants: [
      { id: 401, size: "S", stockQuantity: 14 },
      { id: 402, size: "M", stockQuantity: 20 },
      { id: 403, size: "L", stockQuantity: 16 },
    ]
  },
  {
    id: 5,
    name: "IronCore Tapered Zip-Pocket Gym Joggers",
    category: { slug: "joggers-shorts", name: "Joggers & Shorts" },
    gender: "Men",
    price: 1199,
    originalPrice: 1899,
    discountPercent: 36,
    // Flat lay track pant
    apparelImageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop",
    // Athlete wearing joggers
    modelImageUrl: "https://images.unsplash.com/photo-1483721074574-e8b919d8544e?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "Poly-Spandex Brushed French Terry with 4-Way Flex",
    fitType: "Ankle Cuffed Tapered",
    badge: "NEW DROP",
    rating: 4.7,
    reviewCount: 39,
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad"
    },
    variants: [
      { id: 501, size: "M", stockQuantity: 18 },
      { id: 502, size: "L", stockQuantity: 22 },
      { id: 503, size: "XL", stockQuantity: 10 },
    ]
  },
  {
    id: 6,
    name: "AuraFlex High-Impact Cross-Back Sports Bra",
    category: { slug: "compression-wear", name: "Compression Wear" },
    gender: "Women",
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    // Flat standalone sports bra
    apparelImageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    // Fit model wearing it
    modelImageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "Breathable High-Bounce Lycra with Removable Cups",
    fitType: "High Impact Support",
    badge: "BESTSELLER",
    rating: 4.85,
    reviewCount: 52,
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad"
    },
    variants: [
      { id: 601, size: "S", stockQuantity: 12 },
      { id: 602, size: "M", stockQuantity: 20 },
      { id: 603, size: "L", stockQuantity: 15 },
    ]
  },
  {
    id: 7,
    name: "IronCore 'NO MERCY' Acid-Wash Graphic Tee",
    category: { slug: "oversized-tees", name: "Oversized Tees" },
    gender: "Unisex",
    price: 1099,
    originalPrice: 1699,
    discountPercent: 35,
    // Flat lay shirt
    apparelImageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
    // Athlete model wearing it
    modelImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "100% Bio-Washed Vintage Cotton (250 GSM)",
    fitType: "Relaxed Boxy Fit",
    badge: "HOT DEAL",
    rating: 4.88,
    reviewCount: 91,
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad"
    },
    variants: [
      { id: 701, size: "S", stockQuantity: 10 },
      { id: 702, size: "M", stockQuantity: 15 },
      { id: 703, size: "L", stockQuantity: 18 },
      { id: 704, size: "XL", stockQuantity: 8 },
    ]
  },
  {
    id: 8,
    name: "AuraFlex 6\" Sculpting High-Waist Biker Shorts",
    category: { slug: "joggers-shorts", name: "Joggers & Shorts" },
    gender: "Women",
    price: 849,
    originalPrice: 1399,
    discountPercent: 39,
    // Flat garment
    apparelImageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    // Athlete wearing it
    modelImageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    fabricDetails: "ButterSoft Non-Sheer Spandex",
    fitType: "High Waist 6-inch Inseam",
    badge: "POPULAR",
    rating: 4.91,
    reviewCount: 73,
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad"
    },
    variants: [
      { id: 801, size: "XS", stockQuantity: 8 },
      { id: 802, size: "S", stockQuantity: 16 },
      { id: 803, size: "M", stockQuantity: 24 },
      { id: 804, size: "L", stockQuantity: 12 },
    ]
  }
];

export const fetchProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.gender && filters.gender !== 'all') params.append('gender', filters.gender);
    if (filters.locality && filters.locality !== 'all') params.append('locality', filters.locality);
    if (filters.query) params.append('query', filters.query);

    const response = await api.get(`/products?${params.toString()}`);
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    console.warn('Backend API unavailable, using local high-performance store data:', error.message);
    let filtered = [...INITIAL_PRODUCTS];
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category?.slug === filters.category);
    }
    if (filters.gender && filters.gender !== 'all') {
      filtered = filtered.filter(p => p.gender?.toLowerCase() === filters.gender?.toLowerCase() || p.gender === 'Unisex');
    }
    if (filters.locality && filters.locality !== 'all') {
      filtered = filtered.filter(p => p.store?.locality?.toLowerCase().includes(filters.locality.toLowerCase()));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    return filtered;
  }
};
