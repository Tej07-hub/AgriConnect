package com.agriconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByCustomerId(Integer customerId);
    Optional<Order> findById(Integer orderId);
    
    long countByStatus(String status);

    List<Order> findByStatus(String status);

}