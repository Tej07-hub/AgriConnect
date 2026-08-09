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

        if (product.getStock() == null || product.getStock() < 0) {
            product.setStock(0);
        }

        product.setInStock(product.getStock() > 0);

        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Products By Retailer
    public List<Product> getProductsByRetailerId(Integer retailerId) {
        return productRepository.findByRetailerId(retailerId);
    }

    // Get Product By ProductId and RetailerId
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

        if (product.getStock() == null || product.getStock() < 0) {
            product.setStock(0);
        }

        product.setInStock(product.getStock() > 0);

        return productRepository.save(product);
    }

    // Delete Product
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    // Search Products
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // Filter By Category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // Search by Product Name
    public List<Product> searchByProductName(String productName) {
        return productRepository.findByNameContainingIgnoreCase(productName);
    }

    // Filter by Category
    public List<Product> filterByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // Search by Product Name and Category
    public List<Product> searchByProductNameAndCategory(String productName, String category) {
        return productRepository.findByNameContainingIgnoreCaseAndCategoryIgnoreCase(productName, category);
    }
    
    public Product updateStock(Integer productId, Integer retailerId, Integer stock) {

        Product product = productRepository
                .findByProductIdAndRetailerId(productId, retailerId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (stock < 0) {
            throw new RuntimeException("Stock cannot be negative");
        }

        product.setStock(stock);
        product.setInStock(stock > 0);

        return productRepository.save(product);
    }

}