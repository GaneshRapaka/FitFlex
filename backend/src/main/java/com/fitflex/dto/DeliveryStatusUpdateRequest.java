package com.fitflex.dto;

import jakarta.validation.constraints.NotBlank;

public class DeliveryStatusUpdateRequest {
    @NotBlank
    private String status; // SELLER_PROCESSING, PICKED_UP, AT_HYDERABAD_HUB, OUT_FOR_DELIVERY, DELIVERED
    private String currentLocality;
    private String deliveryAgentName;
    private String deliveryAgentPhone;

    public DeliveryStatusUpdateRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCurrentLocality() { return currentLocality; }
    public void setCurrentLocality(String currentLocality) { this.currentLocality = currentLocality; }

    public String getDeliveryAgentName() { return deliveryAgentName; }
    public void setDeliveryAgentName(String deliveryAgentName) { this.deliveryAgentName = deliveryAgentName; }

    public String getDeliveryAgentPhone() { return deliveryAgentPhone; }
    public void setDeliveryAgentPhone(String deliveryAgentPhone) { this.deliveryAgentPhone = deliveryAgentPhone; }
}
