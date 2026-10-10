package com.fitflex.service;

import com.fitflex.dto.OrderCheckoutRequest;
import com.fitflex.model.*;
import com.fitflex.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final DeliveryTrackingRepository deliveryTrackingRepository;
    private final SettlementRepository settlementRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        DeliveryTrackingRepository deliveryTrackingRepository,
                        SettlementRepository settlementRepository,
                        ProductRepository productRepository,
                        ProductVariantRepository variantRepository,
                        CartItemRepository cartItemRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.deliveryTrackingRepository = deliveryTrackingRepository;
        this.settlementRepository = settlementRepository;
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(String buyerEmail, OrderCheckoutRequest request) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new IllegalArgumentException("Buyer not found"));

        List<CartItem> cartItems = cartItemRepository.findByUser(buyer);
        if (cartItems.isEmpty() && (request.getItems() == null || request.getItems().isEmpty())) {
            throw new IllegalArgumentException("Cart is empty");
        }

        Store store = null;
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItemsToSave = new ArrayList<>();

        Order order = new Order();
        order.setBuyer(buyer);
        order.setOrderNumber("FF-HYD-" + (100000 + new Random().nextInt(900000)));
        order.setBuyerName(request.getBuyerName() != null ? request.getBuyerName() : buyer.getName());
        order.setBuyerPhone(request.getBuyerPhone() != null ? request.getBuyerPhone() : buyer.getPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setDeliveryLocality(request.getDeliveryLocality() != null ? request.getDeliveryLocality() : "Madhapur");
        order.setDeliveryPincode(request.getDeliveryPincode());
        order.setDeliveryNotes(request.getDeliveryNotes());
        order.setPaymentMethod("COD"); // Cash on Delivery
        order.setPaymentStatus("PENDING");
        order.setOrderStatus("PLACED");

        if (!cartItems.isEmpty()) {
            for (CartItem ci : cartItems) {
                if (store == null) {
                    store = ci.getProduct().getStore();
                }
                BigDecimal itemPrice = ci.getProduct().getPrice();
                BigDecimal subTotal = itemPrice.multiply(BigDecimal.valueOf(ci.getQuantity()));
                totalAmount = totalAmount.add(subTotal);

                // Reduce inventory stock
                Optional<ProductVariant> variantOpt = variantRepository.findByProductIdAndSize(ci.getProduct().getId(), ci.getSelectedSize());
                if (variantOpt.isPresent()) {
                    ProductVariant v = variantOpt.get();
                    v.setStockQuantity(Math.max(0, v.getStockQuantity() - ci.getQuantity()));
                    variantRepository.save(v);
                }

                OrderItem oi = new OrderItem(order, ci.getProduct(), ci.getSelectedSize(), itemPrice, ci.getQuantity());
                orderItemsToSave.add(oi);
            }
            cartItemRepository.deleteByUserId(buyer.getId());
        } else {
            for (OrderCheckoutRequest.OrderItemCheckout itemReq : request.getItems()) {
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found: " + itemReq.getProductId()));
                if (store == null) {
                    store = product.getStore();
                }
                BigDecimal itemPrice = product.getPrice();
                BigDecimal subTotal = itemPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
                totalAmount = totalAmount.add(subTotal);

                Optional<ProductVariant> variantOpt = variantRepository.findByProductIdAndSize(product.getId(), itemReq.getSize());
                if (variantOpt.isPresent()) {
                    ProductVariant v = variantOpt.get();
                    v.setStockQuantity(Math.max(0, v.getStockQuantity() - itemReq.getQuantity()));
                    variantRepository.save(v);
                }

                OrderItem oi = new OrderItem(order, product, itemReq.getSize(), itemPrice, itemReq.getQuantity());
                orderItemsToSave.add(oi);
            }
        }

        order.setStore(store);
        order.setTotalAmount(totalAmount);
        order = orderRepository.save(order);

        for (OrderItem oi : orderItemsToSave) {
            oi.setOrder(order);
        }
        orderItemRepository.saveAll(orderItemsToSave);
        order.setItems(orderItemsToSave);

        // Create Delivery Tracking
        DeliveryTracking tracking = new DeliveryTracking();
        tracking.setOrder(order);
        tracking.setTrackingCode("HYD-EXP-" + (100000 + new Random().nextInt(900000)));
        tracking.setCourierPartner("FitFlex Local Express (Hyderabad Fleet)");
        tracking.setEstimatedDelivery(LocalDateTime.now().plusHours(24));
        tracking.setCurrentStatus("SELLER_PROCESSING");
        tracking.setCurrentLocality(store != null ? store.getLocality() + " Hub" : "Hyderabad Dispatch Hub");
        deliveryTrackingRepository.save(tracking);
        order.setDeliveryTracking(tracking);

        // Create Seller Settlement Record
        if (store != null) {
            BigDecimal feePercent = BigDecimal.valueOf(0.085); // 8.5% platform fee
            BigDecimal platformFee = totalAmount.multiply(feePercent);
            BigDecimal netPayout = totalAmount.subtract(platformFee);
            Settlement settlement = new Settlement(store, order, totalAmount, platformFee, netPayout);
            settlementRepository.save(settlement);
        }

        return order;
    }

    public List<Order> getBuyerOrders(String buyerEmail) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyer.getId());
    }

    public List<Order> getSellerOrders(Long storeId) {
        return orderRepository.findByStoreIdOrderByCreatedAtDesc(storeId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderId));
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus) {
        Order order = getOrderById(orderId);
        order.setOrderStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        DeliveryTracking tracking = order.getDeliveryTracking();
        if (tracking != null) {
            if ("SHIPPED".equalsIgnoreCase(newStatus)) {
                tracking.setCurrentStatus("PICKED_UP");
                tracking.setPickupTime(LocalDateTime.now());
            } else if ("OUT_FOR_DELIVERY".equalsIgnoreCase(newStatus)) {
                tracking.setCurrentStatus("OUT_FOR_DELIVERY");
            } else if ("DELIVERED".equalsIgnoreCase(newStatus)) {
                tracking.setCurrentStatus("DELIVERED");
                tracking.setDeliveredTime(LocalDateTime.now());
                tracking.setCodAmountCollected(order.getTotalAmount());
                order.setPaymentStatus("COLLECTED");

                // Update settlement
                settlementRepository.findByOrderId(order.getId()).ifPresent(settlement -> {
                    settlement.setStatus("SETTLED");
                    settlement.setSettledAt(LocalDateTime.now());
                    settlementRepository.save(settlement);
                });
            }
            deliveryTrackingRepository.save(tracking);
        }

        return orderRepository.save(order);
    }
}
