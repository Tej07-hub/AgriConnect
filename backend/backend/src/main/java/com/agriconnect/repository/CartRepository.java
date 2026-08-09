package com.agriconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    // Get all cart items of a customer
    List<Cart> findByCustomerId(Integer customerId);

    // Check if a product already exists in customer's cart
    Optional<Cart> findByCustomerIdAndProductId(Integer customerId, Integer productId);

    // Delete all items from a customer's cart
    void deleteByCustomerId(Integer customerId);
    
    
}