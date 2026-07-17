package com.agriconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByRetailerId(Integer retailerId);

    Optional<Product> findByProductIdAndRetailerId(Integer productId, Integer retailerId);

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByCategoryIgnoreCase(String category);

    List<Product> findByNameContainingIgnoreCaseAndCategoryIgnoreCase(
            String name,
            String category
    );
    
    long countByRetailerId(Integer retailerId);

    List<Product> findByRetailerIdAndStockLessThan(Integer retailerId, Integer stock);
   
    long countByRetailerIdAndStockLessThan(Integer retailerId, Integer stock);
}