package com.fitflex.service;

import com.fitflex.dto.DeliveryStatusUpdateRequest;
import com.fitflex.model.DeliveryTracking;
import com.fitflex.model.Order;
import com.fitflex.repository.DeliveryTrackingRepository;
import com.fitflex.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DeliveryService {

    private final DeliveryTrackingRepository trackingRepository;
    private final OrderRepository orderRepository;

    public DeliveryService(DeliveryTrackingRepository trackingRepository, OrderRepository orderRepository) {
        this.trackingRepository = trackingRepository;
        this.orderRepository = orderRepository;
    }

    public DeliveryTracking getTrackingByCode(String code) {
        return trackingRepository.findByTrackingCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Tracking record not found: " + code));
    }

    public DeliveryTracking getTrackingByOrderId(Long orderId) {
        return trackingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Tracking record not found for order id: " + orderId));
    }

    @Transactional
    public DeliveryTracking updateTrackingStatus(Long trackingId, DeliveryStatusUpdateRequest req) {
        DeliveryTracking tracking = trackingRepository.findById(trackingId)
                .orElseThrow(() -> new IllegalArgumentException("Tracking not found: " + trackingId));

        tracking.setCurrentStatus(req.getStatus());
        if (req.getCurrentLocality() != null) {
            tracking.setCurrentLocality(req.getCurrentLocality());
        }
        if (req.getDeliveryAgentName() != null) {
            tracking.setDeliveryAgentName(req.getDeliveryAgentName());
        }
        if (req.getDeliveryAgentPhone() != null) {
            tracking.setDeliveryAgentPhone(req.getDeliveryAgentPhone());
        }

        Order order = tracking.getOrder();
        if ("DELIVERED".equalsIgnoreCase(req.getStatus())) {
            tracking.setDeliveredTime(LocalDateTime.now());
            tracking.setCodAmountCollected(order.getTotalAmount());
            order.setOrderStatus("DELIVERED");
            order.setPaymentStatus("COLLECTED");
            orderRepository.save(order);
        } else if ("OUT_FOR_DELIVERY".equalsIgnoreCase(req.getStatus())) {
            order.setOrderStatus("OUT_FOR_DELIVERY");
            orderRepository.save(order);
        } else if ("PICKED_UP".equalsIgnoreCase(req.getStatus())) {
            tracking.setPickupTime(LocalDateTime.now());
            order.setOrderStatus("SHIPPED");
            orderRepository.save(order);
        }

        return trackingRepository.save(tracking);
    }
}
