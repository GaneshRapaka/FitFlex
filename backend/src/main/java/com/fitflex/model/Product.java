package com.fitflex.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal originalPrice;

    private Integer discountPercent = 0;

    private String gender; // Men, Women, Unisex

    // The standalone dress / flat-lay activewear shot (visible by default)
    @Column(nullable = false, length = 1000)
    private String apparelImageUrl;

    // The athlete / person wearing the dress / activewear (revealed on hover)
    @Column(nullable = false, length = 1000)
    private String modelImageUrl;

    private String fabricDetails; // e.g. "88% Polyester, 12% Spandex Quick-Dry"

    private String fitType; // e.g. "Oversized Fit", "Muscle Fit", "Compression"

    private String badge; // "BESTSELLER", "NEW DROP", "FLAT 40% OFF"

    private Double rating = 4.8;

    private Integer reviewCount = 24;

    private boolean isActive = true;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ProductVariant> variants = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Store getStore() { return store; }
    public void setStore(Store store) { this.store = store; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

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

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public List<ProductVariant> getVariants() { return variants; }
    public void setVariants(List<ProductVariant> variants) { this.variants = variants; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
