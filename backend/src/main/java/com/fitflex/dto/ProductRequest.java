package com.fitflex.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Map;

public class ProductRequest {
    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal price;

    private BigDecimal originalPrice;

    private Integer discountPercent;

    @NotBlank
    private String categorySlug;

    private String gender; // Men, Women, Unisex

    @NotBlank
    private String apparelImageUrl; // Standalone apparel flat-lay

    @NotBlank
    private String modelImageUrl; // On-person fitness model hover

    private String fabricDetails;

    private String fitType;

    private String badge;

    // Size to stock map, e.g. {"S": 10, "M": 15, "L": 20, "XL": 10}
    private Map<String, Integer> sizeStock;

    public ProductRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getApparelImageUrl() { return apparelImageUrl; }
    public void setApparelImageUrl(String apparelImageUrl) { this.apparelImageUrl = apparelImageUrl; }

    public String getModelImageUrl() { return modelImageUrl; }
    public void setModelImageUrl(String modelImageUrl) { this.modelImageUrl = modelImageUrl; }

    public String getFabricDetails() { return fabricDetails; }
    public void setFabricDetails(String fabricDetails) { this.fabricDetails = fabricDetails; }

    public String getFitType() { return fitType; }
    public void setFitType(String fitType) { this.fitType = fitType; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Map<String, Integer> getSizeStock() { return sizeStock; }
    public void setSizeStock(Map<String, Integer> sizeStock) { this.sizeStock = sizeStock; }
}
