package com.fitflex.service;

import com.fitflex.dto.ProductRequest;
import com.fitflex.model.*;
import com.fitflex.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository,
                          ProductVariantRepository variantRepository,
                          CategoryRepository categoryRepository,
                          StoreRepository storeRepository,
                          UserRepository userRepository) {
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.categoryRepository = categoryRepository;
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
    }

    public List<Product> getAllProducts(String category, String gender, String locality, String query) {
        boolean hasFilter = (category != null && !category.isBlank()) ||
                            (gender != null && !gender.isBlank()) ||
                            (locality != null && !locality.isBlank()) ||
                            (query != null && !query.isBlank());

        if (hasFilter) {
            String cat = (category != null && !category.isBlank() && !category.equalsIgnoreCase("all")) ? category.trim() : null;
            String gen = (gender != null && !gender.isBlank() && !gender.equalsIgnoreCase("all")) ? gender.trim() : null;
            String loc = (locality != null && !locality.isBlank() && !locality.equalsIgnoreCase("all")) ? locality.trim() : null;
            String q = (query != null && !query.isBlank()) ? query.trim() : null;

            return productRepository.searchProducts(cat, gen, loc, q);
        }

        return productRepository.findByIsActiveTrue();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
    }

    public List<Product> getProductsByStore(Long storeId) {
        return productRepository.findByStoreId(storeId);
    }

    @Transactional
    public Product createProduct(String sellerEmail, ProductRequest request) {
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found"));

        Store store = storeRepository.findBySeller(seller)
                .orElseThrow(() -> new IllegalArgumentException("No store profile found for this seller"));

        Category category = categoryRepository.findBySlug(request.getCategorySlug())
                .orElseGet(() -> categoryRepository.save(new Category(request.getCategorySlug(), request.getCategorySlug(), "")));

        Product product = new Product();
        product.setStore(store);
        product.setCategory(category);
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOriginalPrice(request.getOriginalPrice() != null ? request.getOriginalPrice() : request.getPrice());
        product.setDiscountPercent(request.getDiscountPercent() != null ? request.getDiscountPercent() : 0);
        product.setGender(request.getGender() != null ? request.getGender() : "Unisex");
        product.setApparelImageUrl(request.getApparelImageUrl());
        product.setModelImageUrl(request.getModelImageUrl());
        product.setFabricDetails(request.getFabricDetails());
        product.setFitType(request.getFitType());
        product.setBadge(request.getBadge());
        product.setActive(true);

        Product savedProduct = productRepository.save(product);

        List<ProductVariant> variants = new ArrayList<>();
        if (request.getSizeStock() != null && !request.getSizeStock().isEmpty()) {
            for (Map.Entry<String, Integer> entry : request.getSizeStock().entrySet()) {
                variants.add(new ProductVariant(savedProduct, entry.getKey(), "Standard", entry.getValue()));
            }
        } else {
            // Default sizes
            variants.add(new ProductVariant(savedProduct, "S", "Standard", 15));
            variants.add(new ProductVariant(savedProduct, "M", "Standard", 25));
            variants.add(new ProductVariant(savedProduct, "L", "Standard", 20));
            variants.add(new ProductVariant(savedProduct, "XL", "Standard", 10));
        }

        variantRepository.saveAll(variants);
        savedProduct.setVariants(variants);
        return savedProduct;
    }

    @Transactional
    public void deleteProduct(Long id, String callerEmail) {
        Product product = getProductById(id);
        User caller = userRepository.findByEmail(callerEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + callerEmail));
        boolean isOwner = product.getStore() != null && product.getStore().getSeller() != null
                && product.getStore().getSeller().getEmail().equals(callerEmail);
        boolean isAdmin = caller.getRole() == Role.ROLE_ADMIN;

        if (!isOwner && !isAdmin) {
            throw new org.springframework.security.access.AccessDeniedException("Unauthorized: You do not own this product.");
        }
        product.setActive(false);
        productRepository.save(product);
    }
}
