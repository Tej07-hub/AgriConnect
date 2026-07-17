package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.entity.Product;
import com.agriconnect.service.ProductService;

import org.springframework.security.core.Authentication;
import com.agriconnect.dto.ProductRequest;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private RetailerRepository retailerRepository;

    // Add Product
    @PostMapping
    public Product addProduct(@RequestBody ProductRequest request,
                              Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setUnit(request.getUnit());
        product.setImageUrl(request.getImageUrl());

        // Automatically assign the logged-in retailer
        product.setRetailerId(retailer.getRetailerId());

        return productService.addProduct(product);
    }
    // Get All Products
    @GetMapping
    public List<Product> getAllProducts(Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        return productService.getProductsByRetailerId(
                retailer.getRetailerId());
    }

    // Get Product By ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    // Update Product
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Integer id,
                                 @RequestBody ProductRequest request,
                                 Authentication authentication) {

        // Logged-in retailer email
        String email = authentication.getName();

        // Find retailer
        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        // Find product owned by this retailer
        Product product = productService.getProductByIdAndRetailerId(
                id,
                retailer.getRetailerId());

        if (product == null) {
            throw new RuntimeException("Product not found or access denied");
        }

        // Update fields
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setUnit(request.getUnit());
        product.setImageUrl(request.getImageUrl());

        return productService.updateProduct(product);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Integer id,
                                Authentication authentication) {

        // Logged-in retailer email
        String email = authentication.getName();

        // Find retailer
        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        // Find product owned by this retailer
        Product product = productService.getProductByIdAndRetailerId(
                id,
                retailer.getRetailerId());

        if (product == null) {
            throw new RuntimeException("Product not found or access denied");
        }

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }
    
    @GetMapping("/customer")
    public List<Product> getProductsForCustomers() {
        return productService.getAllProducts();
    }
    
    @GetMapping("/customer/search")
    public List<Product> searchProducts(
            @RequestParam String keyword) {

        return productService.searchProducts(keyword);
    }
    
    @GetMapping("/customer/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {

        System.out.println("CATEGORY API HIT: " + category);

        return productService.getProductsByCategory(category);
    }
    
    @GetMapping("/search")
    public List<Product> searchProduct(@RequestParam String productName) {
        return productService.searchByProductName(productName);
    }

    @GetMapping("/category")
    public List<Product> filterByCategory(@RequestParam String category) {
        return productService.filterByCategory(category);
    }

    @GetMapping("/search-category")
    public List<Product> searchByProductAndCategory(
            @RequestParam String productName,
            @RequestParam String category) {

        return productService.searchByProductNameAndCategory(productName, category);
    }
}