package com.agriconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Product;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByRetailerId(Integer retailerId);
    Optional<Product> findByProductIdAndRetailerId(Integer productId, Integer retailerId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryIgnoreCase(String category);

}