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

        record CheckoutItemDTO(Product product, String size, int quantity) {}
        List<CheckoutItemDTO> itemsToProcess = new ArrayList<>();

        if (!cartItems.isEmpty()) {
            for (CartItem ci : cartItems) {
                itemsToProcess.add(new CheckoutItemDTO(ci.getProduct(), ci.getSelectedSize(), ci.getQuantity()));
            }
        } else {
            for (OrderCheckoutRequest.OrderItemCheckout itemReq : request.getItems()) {
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found: " + itemReq.getProductId()));
                itemsToProcess.add(new CheckoutItemDTO(product, itemReq.getSize(), itemReq.getQuantity()));
            }
        }

        // Group items by merchant store for automatic multi-vendor order splitting
        Map<Store, List<CheckoutItemDTO>> storeItemsMap = new LinkedHashMap<>();
        for (CheckoutItemDTO item : itemsToProcess) {
            Store store = item.product().getStore();
            storeItemsMap.computeIfAbsent(store, k -> new ArrayList<>()).add(item);
        }

        String datePart = java.time.format.DateTimeFormatter.ofPattern("yyMMdd").format(java.time.LocalDate.now());
        List<Order> createdOrders = new ArrayList<>();

        for (Map.Entry<Store, List<CheckoutItemDTO>> entry : storeItemsMap.entrySet()) {
            Store store = entry.getKey();
            List<CheckoutItemDTO> storeItems = entry.getValue();

            BigDecimal storeTotal = BigDecimal.ZERO;
            List<OrderItem> orderItemsToSave = new ArrayList<>();

            String orderEntropy = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
            Order order = new Order();
            order.setBuyer(buyer);
            order.setStore(store);
            order.setOrderNumber("FF-HYD-" + datePart + "-" + orderEntropy);
            order.setBuyerName(request.getBuyerName() != null ? request.getBuyerName() : buyer.getName());
            order.setBuyerPhone(request.getBuyerPhone() != null ? request.getBuyerPhone() : buyer.getPhone());
            order.setDeliveryAddress(request.getDeliveryAddress());
            order.setDeliveryLocality(request.getDeliveryLocality() != null ? request.getDeliveryLocality() : "Madhapur");
            order.setDeliveryPincode(request.getDeliveryPincode());
            order.setDeliveryNotes(request.getDeliveryNotes());
            order.setPaymentMethod("COD");
            order.setPaymentStatus("PENDING");
            order.setOrderStatus("PLACED");

            for (CheckoutItemDTO item : storeItems) {
                Product product = item.product();
                BigDecimal itemPrice = product.getPrice();
                BigDecimal subTotal = itemPrice.multiply(BigDecimal.valueOf(item.quantity()));
                storeTotal = storeTotal.add(subTotal);

                // Concurrency control with pessimistic lock
                Optional<ProductVariant> variantOpt = variantRepository.findByProductIdAndSizeForUpdate(product.getId(), item.size());
                if (variantOpt.isPresent()) {
                    ProductVariant v = variantOpt.get();
                    if (v.getStockQuantity() < item.quantity()) {
                        throw new IllegalStateException("Insufficient stock for " + product.getName() + " (Size: " + item.size() + "). Available: " + v.getStockQuantity());
                    }
                    v.setStockQuantity(v.getStockQuantity() - item.quantity());
                    variantRepository.save(v);
                }

                OrderItem oi = new OrderItem(order, product, item.size(), itemPrice, item.quantity());
                orderItemsToSave.add(oi);
            }

            order.setTotalAmount(storeTotal);
            order = orderRepository.save(order);

            for (OrderItem oi : orderItemsToSave) {
                oi.setOrder(order);
            }
            orderItemRepository.saveAll(orderItemsToSave);
            order.setItems(orderItemsToSave);

            // Create Delivery Tracking for this store's shipment
            String trackingEntropy = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
            DeliveryTracking tracking = new DeliveryTracking();
            tracking.setOrder(order);
            tracking.setTrackingCode("HYD-EXP-" + datePart + "-" + trackingEntropy);
            tracking.setCourierPartner("FitFlex Local Express (Hyderabad Fleet)");
            tracking.setEstimatedDelivery(LocalDateTime.now().plusHours(24));
            tracking.setCurrentStatus("SELLER_PROCESSING");
            tracking.setCurrentLocality(store != null ? store.getLocality() + " Hub" : "Hyderabad Dispatch Hub");
            deliveryTrackingRepository.save(tracking);
            order.setDeliveryTracking(tracking);

            // Create Seller Settlement Record
            if (store != null) {
                BigDecimal feePercent = BigDecimal.valueOf(0.085); // 8.5% platform fee
                BigDecimal platformFee = storeTotal.multiply(feePercent).setScale(2, java.math.RoundingMode.HALF_UP);
                BigDecimal netPayout = storeTotal.subtract(platformFee).setScale(2, java.math.RoundingMode.HALF_UP);
                Settlement settlement = new Settlement(store, order, storeTotal, platformFee, netPayout);
                settlementRepository.save(settlement);
            }

            createdOrders.add(order);
        }

        if (!cartItems.isEmpty()) {
            cartItemRepository.deleteByUserId(buyer.getId());
        }

        return createdOrders.get(0);
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
        return getOrderById(orderId, null);
    }

    public Order getOrderById(Long orderId, String callerEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + orderId));
        if (callerEmail != null) {
            User caller = userRepository.findByEmail(callerEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found: " + callerEmail));
            boolean isBuyer = order.getBuyer() != null && order.getBuyer().getId().equals(caller.getId());
            boolean isSeller = order.getStore() != null && order.getStore().getSeller() != null
                    && order.getStore().getSeller().getId().equals(caller.getId());
            boolean isAdmin = caller.getRole() == com.fitflex.model.Role.ROLE_ADMIN;

            if (!isBuyer && !isSeller && !isAdmin) {
                throw new org.springframework.security.access.AccessDeniedException("Unauthorized to view order details for order #" + orderId);
            }
        }
        return order;
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus) {
        return updateOrderStatus(orderId, newStatus, null);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String newStatus, String callerEmail) {
        Order order = getOrderById(orderId, callerEmail);
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
