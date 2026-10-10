package com.fitflex.controller;

import com.fitflex.dto.DeliveryStatusUpdateRequest;
import com.fitflex.model.DeliveryTracking;
import com.fitflex.service.DeliveryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/track/{code}")
    public ResponseEntity<DeliveryTracking> trackByCode(@PathVariable String code) {
        return ResponseEntity.ok(deliveryService.getTrackingByCode(code));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<DeliveryTracking> getTrackingByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(deliveryService.getTrackingByOrderId(orderId));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_SELLER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DeliveryTracking> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody DeliveryStatusUpdateRequest request) {
        return ResponseEntity.ok(deliveryService.updateTrackingStatus(id, request));
    }
}
