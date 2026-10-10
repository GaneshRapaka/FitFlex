package com.fitflex.repository;

import com.fitflex.model.Store;
import com.fitflex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findBySeller(User seller);
    Optional<Store> findBySellerId(Long sellerId);
    List<Store> findByLocalityIgnoreCase(String locality);
    List<Store> findByIsApprovedTrue();
}
