package com.fitflex.repository;

import com.fitflex.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsActiveTrue();
    List<Product> findByStoreId(Long storeId);
    List<Product> findByCategorySlug(String slug);
    List<Product> findByGenderIgnoreCase(String gender);

    @Query("SELECT p FROM Product p WHERE p.isActive = true " +
           "AND (:category IS NULL OR LOWER(p.category.slug) = LOWER(:category)) " +
           "AND (:gender IS NULL OR LOWER(p.gender) = LOWER(:gender)) " +
           "AND (:locality IS NULL OR LOWER(p.store.locality) = LOWER(:locality)) " +
           "AND (:query IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "    OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchProducts(@Param("category") String category,
                                 @Param("gender") String gender,
                                 @Param("locality") String locality,
                                 @Param("query") String query);
}
