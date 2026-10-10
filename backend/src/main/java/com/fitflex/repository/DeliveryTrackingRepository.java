package com.fitflex.repository;

import com.fitflex.model.DeliveryTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryTrackingRepository extends JpaRepository<DeliveryTracking, Long> {
    Optional<DeliveryTracking> findByTrackingCode(String trackingCode);
    Optional<DeliveryTracking> findByOrderId(Long orderId);
}
