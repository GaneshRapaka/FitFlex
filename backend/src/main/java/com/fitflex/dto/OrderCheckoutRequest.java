package com.fitflex.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class OrderCheckoutRequest {
    @NotBlank
    private String buyerName;

    @NotBlank
    private String buyerPhone;

    @NotBlank
    private String deliveryAddress;

    @NotBlank
    private String deliveryLocality; // e.g. "Madhapur", "Gachibowli", "Banjara Hills"

    private String deliveryPincode;

    private String deliveryNotes;

    // Direct items checkout if not checking out active cart
    private List<OrderItemCheckout> items;

    public static class OrderItemCheckout {
        private Long productId;
        private String size;
        private Integer quantity;

        public OrderItemCheckout() {}

        public OrderItemCheckout(Long productId, String size, Integer quantity) {
            this.productId = productId;
            this.size = size;
            this.quantity = quantity;
        }

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public String getSize() { return size; }
        public void setSize(String size) { this.size = size; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    public OrderCheckoutRequest() {}

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getBuyerPhone() { return buyerPhone; }
    public void setBuyerPhone(String buyerPhone) { this.buyerPhone = buyerPhone; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public String getDeliveryLocality() { return deliveryLocality; }
    public void setDeliveryLocality(String deliveryLocality) { this.deliveryLocality = deliveryLocality; }

    public String getDeliveryPincode() { return deliveryPincode; }
    public void setDeliveryPincode(String deliveryPincode) { this.deliveryPincode = deliveryPincode; }

    public String getDeliveryNotes() { return deliveryNotes; }
    public void setDeliveryNotes(String deliveryNotes) { this.deliveryNotes = deliveryNotes; }

    public List<OrderItemCheckout> getItems() { return items; }
    public void setItems(List<OrderItemCheckout> items) { this.items = items; }
}
