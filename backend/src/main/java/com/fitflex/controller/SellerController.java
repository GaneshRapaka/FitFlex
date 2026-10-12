package com.fitflex.controller;

import com.fitflex.model.Order;
import com.fitflex.model.ProductVariant;
import com.fitflex.model.Store;
import com.fitflex.service.OrderService;
import com.fitflex.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
@PreAuthorize("hasAuthority('ROLE_SELLER') or hasAuthority('ROLE_ADMIN')")
public class SellerController {

    private final SellerService sellerService;
    private final OrderService orderService;

    public SellerController(SellerService sellerService, OrderService orderService) {
        this.sellerService = sellerService;
        this.orderService = orderService;
    }

    @GetMapping("/my-store")
    public ResponseEntity<Store> getMyStore(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(sellerService.getSellerStore(userDetails.getUsername()));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getSellerOrders(@AuthenticationPrincipal UserDetails userDetails) {
        Store store = sellerService.getSellerStore(userDetails.getUsername());
        return ResponseEntity.ok(orderService.getSellerOrders(store.getId()));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics(@AuthenticationPrincipal UserDetails userDetails) {
        Store store = sellerService.getSellerStore(userDetails.getUsername());
        return ResponseEntity.ok(sellerService.getSellerAnalytics(store.getId()));
    }

    @PutMapping("/inventory/{variantId}")
    public ResponseEntity<ProductVariant> updateStock(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long variantId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(sellerService.updateVariantStock(variantId, quantity, userDetails.getUsername()));
    }
}
