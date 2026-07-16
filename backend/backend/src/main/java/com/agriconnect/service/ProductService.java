package com.agriconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Product;
import com.agriconnect.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add Product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> getProductsByRetailerId(Integer retailerId) {
        return productRepository.findByRetailerId(retailerId);
    }

    public Product getProductByIdAndRetailerId(Integer productId, Integer retailerId) {

        return productRepository
                .findByProductIdAndRetailerId(productId, retailerId)
                .orElse(null);
    }

    // Get Product By ID
    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    // Update Product
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    // Delete Product
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
    
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }
}