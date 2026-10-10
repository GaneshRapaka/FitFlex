package com.fitflex.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_trackings")
public class DeliveryTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, unique = true)
    private String trackingCode; // e.g. "HYD-EXP-789012"

    private String courierPartner = "FitFlex Local Hyderabad Express";

    private String deliveryAgentName = "Ramesh Kumar";

    private String deliveryAgentPhone = "+91 98490 12345";

    @Column(nullable = false)
    private String currentStatus = "SELLER_PROCESSING"; // SELLER_PROCESSING, PICKED_UP, AT_HYDERABAD_HUB, OUT_FOR_DELIVERY, DELIVERED

    private LocalDateTime pickupTime;

    private LocalDateTime estimatedDelivery;

    private LocalDateTime deliveredTime;

    private BigDecimal codAmountCollected;

    private String currentLocality = "Madhapur Hub";

    public DeliveryTracking() {}

    public DeliveryTracking(Order order, String trackingCode, String courierPartner, LocalDateTime estimatedDelivery) {
        this.order = order;
        this.trackingCode = trackingCode;
        this.courierPartner = courierPartner;
        this.estimatedDelivery = estimatedDelivery;
        this.currentStatus = "SELLER_PROCESSING";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public String getTrackingCode() { return trackingCode; }
    public void setTrackingCode(String trackingCode) { this.trackingCode = trackingCode; }

    public String getCourierPartner() { return courierPartner; }
    public void setCourierPartner(String courierPartner) { this.courierPartner = courierPartner; }

    public String getDeliveryAgentName() { return deliveryAgentName; }
    public void setDeliveryAgentName(String deliveryAgentName) { this.deliveryAgentName = deliveryAgentName; }

    public String getDeliveryAgentPhone() { return deliveryAgentPhone; }
    public void setDeliveryAgentPhone(String deliveryAgentPhone) { this.deliveryAgentPhone = deliveryAgentPhone; }

    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }

    public LocalDateTime getPickupTime() { return pickupTime; }
    public void setPickupTime(LocalDateTime pickupTime) { this.pickupTime = pickupTime; }

    public LocalDateTime getEstimatedDelivery() { return estimatedDelivery; }
    public void setEstimatedDelivery(LocalDateTime estimatedDelivery) { this.estimatedDelivery = estimatedDelivery; }

    public LocalDateTime getDeliveredTime() { return deliveredTime; }
    public void setDeliveredTime(LocalDateTime deliveredTime) { this.deliveredTime = deliveredTime; }

    public BigDecimal getCodAmountCollected() { return codAmountCollected; }
    public void setCodAmountCollected(BigDecimal codAmountCollected) { this.codAmountCollected = codAmountCollected; }

    public String getCurrentLocality() { return currentLocality; }
    public void setCurrentLocality(String currentLocality) { this.currentLocality = currentLocality; }
}
