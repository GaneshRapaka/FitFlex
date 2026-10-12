package com.fitflex.service;

import com.fitflex.model.*;
import com.fitflex.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
public class SellerService {

    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final OrderRepository orderRepository;
    private final SettlementRepository settlementRepository;
    private final UserRepository userRepository;

    public SellerService(StoreRepository storeRepository,
                         ProductRepository productRepository,
                         ProductVariantRepository variantRepository,
                         OrderRepository orderRepository,
                         SettlementRepository settlementRepository,
                         UserRepository userRepository) {
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.orderRepository = orderRepository;
        this.settlementRepository = settlementRepository;
        this.userRepository = userRepository;
    }

    public Store getSellerStore(String sellerEmail) {
        User seller = userRepository.findByEmail(sellerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found"));
        return storeRepository.findBySeller(seller)
                .orElseThrow(() -> new IllegalArgumentException("Store not found for seller"));
    }

    public Map<String, Object> getSellerAnalytics(Long storeId) {
        List<Order> orders = orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
        List<Product> products = productRepository.findByStoreId(storeId);
        List<Settlement> settlements = settlementRepository.findByStoreIdOrderByCreatedAtDesc(storeId);

        BigDecimal totalRevenue = BigDecimal.ZERO;
        long deliveredCount = 0;
        long pendingOrdersCount = 0;

        for (Order o : orders) {
            if ("DELIVERED".equalsIgnoreCase(o.getOrderStatus())) {
                totalRevenue = totalRevenue.add(o.getTotalAmount());
                deliveredCount++;
            } else if (!"CANCELLED".equalsIgnoreCase(o.getOrderStatus())) {
                pendingOrdersCount++;
            }
        }

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalOrders", orders.size());
        analytics.put("deliveredOrders", deliveredCount);
        analytics.put("pendingOrders", pendingOrdersCount);
        analytics.put("totalRevenue", totalRevenue);
        analytics.put("activeProductsCount", products.size());
        analytics.put("recentOrders", orders.stream().limit(10).toList());
        analytics.put("settlements", settlements);

        return analytics;
    }

    @Transactional
    public ProductVariant updateVariantStock(Long variantId, int newQuantity) {
        return updateVariantStock(variantId, newQuantity, null);
    }

    @Transactional
    public ProductVariant updateVariantStock(Long variantId, int newQuantity, String sellerEmail) {
        ProductVariant variant = variantRepository.findById(variantId)
                .orElseThrow(() -> new IllegalArgumentException("Variant not found"));
        if (sellerEmail != null) {
            User caller = userRepository.findByEmail(sellerEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Seller not found: " + sellerEmail));
            if (caller.getRole() != Role.ROLE_ADMIN) {
                Store sellerStore = storeRepository.findBySeller(caller)
                        .orElseThrow(() -> new IllegalArgumentException("Store not found for seller"));
                if (variant.getProduct() == null || variant.getProduct().getStore() == null
                        || !variant.getProduct().getStore().getId().equals(sellerStore.getId())) {
                    throw new org.springframework.security.access.AccessDeniedException("Unauthorized to modify inventory of another store's product");
                }
            }
        }
        variant.setStockQuantity(Math.max(0, newQuantity));
        return variantRepository.save(variant);
    }
}
