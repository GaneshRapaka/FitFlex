package com.fitflex.service;

import com.fitflex.dto.DeliveryStatusUpdateRequest;
import com.fitflex.model.DeliveryTracking;
import com.fitflex.model.Order;
import com.fitflex.model.Role;
import com.fitflex.model.User;
import com.fitflex.repository.DeliveryTrackingRepository;
import com.fitflex.repository.OrderRepository;
import com.fitflex.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DeliveryService {

    private final DeliveryTrackingRepository trackingRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DeliveryService(DeliveryTrackingRepository trackingRepository, 
                           OrderRepository orderRepository,
                           UserRepository userRepository) {
        this.trackingRepository = trackingRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public DeliveryTracking getTrackingByCode(String code) {
        return trackingRepository.findByTrackingCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Tracking record not found: " + code));
    }

    public DeliveryTracking getTrackingByOrderId(Long orderId) {
        return getTrackingByOrderId(orderId, null);
    }

    public DeliveryTracking getTrackingByOrderId(Long orderId, String callerEmail) {
        DeliveryTracking tracking = trackingRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Tracking record not found for order id: " + orderId));

        if (callerEmail != null) {
            User caller = userRepository.findByEmail(callerEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found: " + callerEmail));
            Order order = tracking.getOrder();
            boolean isBuyer = order != null && order.getBuyer() != null && order.getBuyer().getId().equals(caller.getId());
            boolean isSeller = order != null && order.getStore() != null && order.getStore().getSeller() != null
                    && order.getStore().getSeller().getId().equals(caller.getId());
            boolean isAdmin = caller.getRole() == Role.ROLE_ADMIN;

            if (!isBuyer && !isSeller && !isAdmin) {
                throw new AccessDeniedException("Unauthorized to view delivery tracking for order #" + orderId);
            }
        }

        return tracking;
    }

    @Transactional
    public DeliveryTracking updateTrackingStatus(Long trackingId, DeliveryStatusUpdateRequest req) {
        return updateTrackingStatus(trackingId, req, null);
    }

    @Transactional
    public DeliveryTracking updateTrackingStatus(Long trackingId, DeliveryStatusUpdateRequest req, String callerEmail) {
        DeliveryTracking tracking = trackingRepository.findById(trackingId)
                .orElseThrow(() -> new IllegalArgumentException("Tracking not found: " + trackingId));

        Order order = tracking.getOrder();
        if (callerEmail != null) {
            User caller = userRepository.findByEmail(callerEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found: " + callerEmail));
            boolean isSeller = order != null && order.getStore() != null && order.getStore().getSeller() != null
                    && order.getStore().getSeller().getId().equals(caller.getId());
            boolean isAdmin = caller.getRole() == Role.ROLE_ADMIN;

            if (!isSeller && !isAdmin) {
                throw new AccessDeniedException("Unauthorized: Seller does not own this shipment");
            }
        }

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

        if ("DELIVERED".equalsIgnoreCase(req.getStatus())) {
            tracking.setDeliveredTime(LocalDateTime.now());
            if (order != null) {
                tracking.setCodAmountCollected(order.getTotalAmount());
                order.setOrderStatus("DELIVERED");
                order.setPaymentStatus("COLLECTED");
                orderRepository.save(order);
            }
        } else if ("OUT_FOR_DELIVERY".equalsIgnoreCase(req.getStatus())) {
            if (order != null) {
                order.setOrderStatus("OUT_FOR_DELIVERY");
                orderRepository.save(order);
            }
        } else if ("PICKED_UP".equalsIgnoreCase(req.getStatus())) {
            tracking.setPickupTime(LocalDateTime.now());
            if (order != null) {
                order.setOrderStatus("SHIPPED");
                orderRepository.save(order);
            }
        }

        return trackingRepository.save(tracking);
    }
}

