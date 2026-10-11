package com.fitflex.service;

import com.fitflex.model.*;
import com.fitflex.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           StoreRepository storeRepository,
                           CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           ProductVariantRepository variantRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already seeded
        }

        System.out.println(">>> [FitFlex Hyderabad] Initializing demo data, local sellers, and catalog...");

        // 1. Users
        User buyer = new User();
        buyer.setName("Rahul Sharma");
        buyer.setEmail("rahul@fitflex.hyd");
        buyer.setPassword(passwordEncoder.encode("password123"));
        buyer.setPhone("+91 98765 43210");
        buyer.setRole(Role.ROLE_BUYER);
        buyer.setLocality("Madhapur");
        buyer.setAddress("Flat 402, Sai Residency, Madhapur, Hyderabad - 500081");
        userRepository.save(buyer);

        User seller1 = new User();
        seller1.setName("Vikram Rao (IronCore)");
        seller1.setEmail("ironcore@fitflex.hyd");
        seller1.setPassword(passwordEncoder.encode("password123"));
        seller1.setPhone("+91 99887 76655");
        seller1.setRole(Role.ROLE_SELLER);
        seller1.setLocality("Banjara Hills");
        seller1.setAddress("Plot 12, Road No 10, Banjara Hills, Hyderabad");
        userRepository.save(seller1);

        User seller2 = new User();
        seller2.setName("Ananya Reddy (AuraFlex)");
        seller2.setEmail("auraflex@fitflex.hyd");
        seller2.setPassword(passwordEncoder.encode("password123"));
        seller2.setPhone("+91 91234 56789");
        seller2.setRole(Role.ROLE_SELLER);
        seller2.setLocality("Jubilee Hills");
        seller2.setAddress("Road No 36, Jubilee Hills, Hyderabad");
        userRepository.save(seller2);

        User admin = new User();
        admin.setName("FitFlex Admin");
        admin.setEmail("admin@fitflex.hyd");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setPhone("+91 90000 00000");
        admin.setRole(Role.ROLE_ADMIN);
        admin.setLocality("Gachibowli");
        admin.setAddress("FitFlex HQ, Financial District, Gachibowli, Hyderabad");
        userRepository.save(admin);

        // 2. Stores
        Store store1 = new Store(
                seller1,
                "IronCore Activewear Hub",
                "Premier Hyderabad heavy-duty gym apparel, heavy acid-wash tees and stringers engineered for athletes.",
                "Banjara Hills",
                "Road No 10, Banjara Hills, Hyderabad - 500034",
                "+91 99887 76655",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
        );
        storeRepository.save(store1);

        Store store2 = new Store(
                seller2,
                "AuraFlex Athletic Studios",
                "Luxury breathable gym wear, seamless performance sets, sports bras, and sculpted dresses crafted in Hyderabad.",
                "Jubilee Hills",
                "Road No 36, Jubilee Hills, Hyderabad - 500033",
                "+91 91234 56789",
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
        );
        storeRepository.save(store2);

        // 3. Categories
        Category catOversized = categoryRepository.save(new Category("Oversized Tees", "oversized-tees", "Heavyweight drop-shoulder graphic and solid gym tees"));
        Category catStringers = categoryRepository.save(new Category("Stringers & Tanks", "stringers-tanks", "Deep-cut muscle tanks for max range of motion"));
        Category catDresses = categoryRepository.save(new Category("Active Dresses & Sets", "active-dresses-sets", "Sculpting workout dresses, bodysuits, and co-ords"));
        Category catCompression = categoryRepository.save(new Category("Compression Wear", "compression-wear", "Second-skin compression tights and rashguards"));
        Category catJoggers = categoryRepository.save(new Category("Joggers & Shorts", "joggers-shorts", "Performance taper joggers and flex shorts"));
        Category catAccessories = categoryRepository.save(new Category("Gym Accessories", "accessories", "Lifting straps, gym belts, and hydro shakers"));

        // Helper to add variants
        // 4. Products with BOTH:
        //    apparelImageUrl (Ghost / Flat-lay / Standalone Dress or Tee)
        //    modelImageUrl (Athlete / Model wearing it)

        // Product 1: IronCore Vintage Heavy Oversized Tee
        Product p1 = new Product();
        p1.setStore(store1);
        p1.setCategory(catOversized);
        p1.setName("IronCore Pump Heavy Oversized Tee");
        p1.setDescription("240 GSM 100% French Terry cotton. Designed for maximum pump showcase with dropped shoulders and ribbed crew neck. Made in Hyderabad.");
        p1.setPrice(new BigDecimal("999"));
        p1.setOriginalPrice(new BigDecimal("1599"));
        p1.setDiscountPercent(38);
        p1.setGender("Men");
        p1.setApparelImageUrl("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"); // Clean standalone tee
        p1.setModelImageUrl("https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop"); // Muscular athlete wearing it
        p1.setFabricDetails("100% Combed Heavy Cotton (240 GSM)");
        p1.setFitType("Extreme Oversized Fit");
        p1.setBadge("BESTSELLER");
        p1.setRating(4.9);
        p1.setReviewCount(84);
        p1 = productRepository.save(p1);
        seedVariants(p1);

        // Product 2: AuraFlex Sculpt Performance Gym Dress / Unitard
        Product p2 = new Product();
        p2.setStore(store2);
        p2.setCategory(catDresses);
        p2.setName("AuraFlex Sculpt Tennis & Gym Active Dress");
        p2.setDescription("Ultra-soft buttery four-way stretch fabric with built-in romper shorts, hidden ball/phone pocket, and removable bra pads. Flattering A-line silhouette.");
        p2.setPrice(new BigDecimal("1499"));
        p2.setOriginalPrice(new BigDecimal("2499"));
        p2.setDiscountPercent(40);
        p2.setGender("Women");
        p2.setApparelImageUrl("https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop"); // Flat lay dress
        p2.setModelImageUrl("https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop"); // Athletic model wearing it
        p2.setFabricDetails("78% Nylon, 22% Spandex ButterSoft Fabric");
        p2.setFitType("Athletic Sculpt Fit");
        p2.setBadge("TRENDING DROP");
        p2.setRating(4.95);
        p2.setReviewCount(112);
        p2 = productRepository.save(p2);
        seedVariants(p2);

        // Product 3: IronCore Pro Drop-Arm Stringer
        Product p3 = new Product();
        p3.setStore(store1);
        p3.setCategory(catStringers);
        p3.setName("IronCore Raw-Cut Gym Stringer");
        p3.setDescription("Deep raw-cut armholes for limitless lat flare and back visibility. Anti-chafe stitching with quick-dry sweat evaporation.");
        p3.setPrice(new BigDecimal("699"));
        p3.setOriginalPrice(new BigDecimal("1199"));
        p3.setDiscountPercent(42);
        p3.setGender("Men");
        p3.setApparelImageUrl("https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop"); // Standalone flat tank
        p3.setModelImageUrl("https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop"); // Athlete in gym working out
        p3.setFabricDetails("95% Cotton, 5% Lycra");
        p3.setFitType("Muscle Cut Stringer");
        p3.setBadge("FLAT 42% OFF");
        p3.setRating(4.8);
        p3.setReviewCount(46);
        p3 = productRepository.save(p3);
        seedVariants(p3);

        // Product 4: AuraFlex Ribbed Seamless 2-Piece Set
        Product p4 = new Product();
        p4.setStore(store2);
        p4.setCategory(catDresses);
        p4.setName("AuraFlex Seamless Ribbed Crop & Legging Set");
        p4.setDescription("Contoured compression waistband with micro-ribbed moisture-wicking weave. Non-see-through squat-proof tested in Hyderabad fitness labs.");
        p4.setPrice(new BigDecimal("1799"));
        p4.setOriginalPrice(new BigDecimal("2999"));
        p4.setDiscountPercent(40);
        p4.setGender("Women");
        p4.setApparelImageUrl("https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop"); // Flat lay matching sports set
        p4.setModelImageUrl("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop"); // Fitness model wearing the set
        p4.setFabricDetails("Seamless Ribbed Knit (Polyamide + Elastane)");
        p4.setFitType("Second-Skin Compression");
        p4.setBadge("LIMITED EDITION");
        p4.setRating(4.9);
        p4.setReviewCount(67);
        p4 = productRepository.save(p4);
        seedVariants(p4);

        // Product 5: IronCore Velocity Zipper Training Joggers
        Product p5 = new Product();
        p5.setStore(store1);
        p5.setCategory(catJoggers);
        p5.setName("IronCore Tapered Zip-Pocket Gym Joggers");
        p5.setDescription("Ergonomic knee darts, deep zip pockets for your phone during squats, and premium metallic aglet drawstrings.");
        p5.setPrice(new BigDecimal("1199"));
        p5.setOriginalPrice(new BigDecimal("1899"));
        p5.setDiscountPercent(36);
        p5.setGender("Men");
        p5.setApparelImageUrl("https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop"); // Flat lay track pants
        p5.setModelImageUrl("https://images.unsplash.com/photo-1483721074574-e8b919d8544e?q=80&w=1000&auto=format&fit=crop"); // Model wearing joggers in gym
        p5.setFabricDetails("Poly-Spandex Brushed French Terry");
        p5.setFitType("Tapered Athletic Fit");
        p5.setBadge("NEW DROP");
        p5.setRating(4.7);
        p5.setReviewCount(39);
        p5 = productRepository.save(p5);
        seedVariants(p5);

        // Product 6: AuraFlex Flex-Zone Compression Sports Bra
        Product p6 = new Product();
        p6.setStore(store2);
        p6.setCategory(catCompression);
        p6.setName("AuraFlex High-Impact Cross-Back Sports Bra");
        p6.setDescription("Engineered for HIIT, heavy lifting, and marathon training with supportive cross-back straps and breathable mesh paneling.");
        p6.setPrice(new BigDecimal("799"));
        p6.setOriginalPrice(new BigDecimal("1299"));
        p6.setDiscountPercent(38);
        p6.setGender("Women");
        p6.setApparelImageUrl("https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop"); // Flat sports bra
        p6.setModelImageUrl("https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop"); // Athlete wearing sports bra
        p6.setFabricDetails("Breathable High-Bounce Lycra");
        p6.setFitType("High Impact Support");
        p6.setBadge("BESTSELLER");
        p6.setRating(4.85);
        p6.setReviewCount(52);
        p6 = productRepository.save(p6);
        seedVariants(p6);

        // Product 7: IronCore Graphic Acid-Wash Lifting Tee
        Product p7 = new Product();
        p7.setStore(store1);
        p7.setCategory(catOversized);
        p7.setName("IronCore 'NO MERCY' Acid-Wash Graphic Tee");
        p7.setDescription("Vintage stone-washed aesthetic with distressed gym typography on the back. Premium breathable heavyweight feel.");
        p7.setPrice(new BigDecimal("1099"));
        p7.setOriginalPrice(new BigDecimal("1699"));
        p7.setDiscountPercent(35);
        p7.setGender("Unisex");
        p7.setApparelImageUrl("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"); // Flat garment
        p7.setModelImageUrl("https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop"); // Model wearing the shirt
        p7.setFabricDetails("100% Bio-Washed Vintage Cotton");
        p7.setFitType("Relaxed Boxy Fit");
        p7.setBadge("HOT DEAL");
        p7.setRating(4.88);
        p7.setReviewCount(91);
        p7 = productRepository.save(p7);
        seedVariants(p7);

        // Product 8: AuraFlex Sculpting High-Waist Biker Shorts
        Product p8 = new Product();
        p8.setStore(store2);
        p8.setCategory(catJoggers);
        p8.setName("AuraFlex 6\" Sculpting Biker Shorts");
        p8.setDescription("Seamless front panel with anti-roll waistband. Keeps everything held in comfortably without digging into your waist.");
        p8.setPrice(new BigDecimal("849"));
        p8.setOriginalPrice(new BigDecimal("1399"));
        p8.setDiscountPercent(39);
        p8.setGender("Women");
        p8.setApparelImageUrl("https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop"); // Flat garment
        p8.setModelImageUrl("https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"); // Athlete wearing shorts
        p8.setFabricDetails("ButterSoft Stretch Spandex");
        p8.setFitType("High Waist 6-inch Inseam");
        p8.setBadge("POPULAR");
        p8.setRating(4.91);
        p8.setReviewCount(73);
        p8 = productRepository.save(p8);
        seedVariants(p8);

        System.out.println(">>> [FitFlex Hyderabad] Demo database successfully seeded with 8 activewear products, 2 local sellers, and users!");
    }

    private void seedVariants(Product product) {
        List<ProductVariant> variants = List.of(
                new ProductVariant(product, "S", "Standard", 15),
                new ProductVariant(product, "M", "Standard", 25),
                new ProductVariant(product, "L", "Standard", 20),
                new ProductVariant(product, "XL", "Standard", 12),
                new ProductVariant(product, "XXL", "Standard", 8)
        );
        variantRepository.saveAll(variants);
        product.setVariants(variants);
    }
}
