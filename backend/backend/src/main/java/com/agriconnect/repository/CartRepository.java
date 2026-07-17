package com.agriconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findByCustomerId(Integer customerId);

    Cart findByCustomerIdAndProductId(Integer customerId, Integer productId);
}