package com.agriconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findByOrderId(Integer orderId);
    
    List<OrderItem> findByRetailerId(Integer retailerId);
    
    

}