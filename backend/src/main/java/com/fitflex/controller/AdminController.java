package com.fitflex.controller;

import com.fitflex.model.Order;
import com.fitflex.model.Settlement;
import com.fitflex.model.Store;
import com.fitflex.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final SettlementRepository settlementRepository;

    public AdminController(StoreRepository storeRepository,
                           OrderRepository orderRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository,
                           SettlementRepository settlementRepository) {
        this.storeRepository = storeRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.settlementRepository = settlementRepository;
    }

    @GetMapping("/stores")
    public ResponseEntity<List<Store>> getAllStores() {
        return ResponseEntity.ok(storeRepository.findAll());
    }

    @PutMapping("/stores/{id}/approval")
    public ResponseEntity<Store> updateStoreApproval(
            @PathVariable Long id,
            @RequestParam boolean approved) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Store not found with id: " + id));
        store.setApproved(approved);
        return ResponseEntity.ok(storeRepository.save(store));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getPlatformAnalytics() {
        List<Order> allOrders = orderRepository.findAll();
        List<Store> allStores = storeRepository.findAll();
        List<Settlement> allSettlements = settlementRepository.findAll();

        BigDecimal totalGmv = BigDecimal.ZERO;
        long deliveredCount = 0;

        for (Order o : allOrders) {
            if (!"CANCELLED".equalsIgnoreCase(o.getOrderStatus())) {
                totalGmv = totalGmv.add(o.getTotalAmount());
            }
            if ("DELIVERED".equalsIgnoreCase(o.getOrderStatus())) {
                deliveredCount++;
            }
        }

        BigDecimal totalPlatformFee = BigDecimal.ZERO;
        for (Settlement s : allSettlements) {
            totalPlatformFee = totalPlatformFee.add(s.getPlatformFee());
        }

        long approvedStores = allStores.stream().filter(Store::isApproved).count();

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalGmv", totalGmv);
        metrics.put("platformRevenue", totalPlatformFee);
        metrics.put("totalOrders", allOrders.size());
        metrics.put("deliveredOrders", deliveredCount);
        metrics.put("totalStores", allStores.size());
        metrics.put("approvedStores", approvedStores);
        metrics.put("pendingStores", allStores.size() - approvedStores);
        metrics.put("totalProducts", productRepository.count());
        metrics.put("totalUsers", userRepository.count());

        return ResponseEntity.ok(metrics);
    }
}
