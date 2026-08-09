package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.ProductRequest;
import com.agriconnect.dto.StockRequest;
import com.agriconnect.entity.Product;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;
import com.agriconnect.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private RetailerRepository retailerRepository;

    // ==========================
    // Add Product
    // ==========================
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

        // Assign logged-in retailer
        product.setRetailerId(retailer.getRetailerId());

        return productService.addProduct(product);
    }

    // ==========================
    // Get Logged-in Retailer's Products
    // ==========================
    @GetMapping("/my-products")
    public List<Product> getMyProducts(Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        return productService.getProductsByRetailerId(
                retailer.getRetailerId());
    }

    // ==========================
    // Get All Products
    // ==========================
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // ==========================
    // Get Product By ID
    // ==========================
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    // ==========================
    // Update Product
    // ==========================
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Integer id,
                                 @RequestBody ProductRequest request,
                                 Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        Product product = productService.getProductByIdAndRetailerId(
                id,
                retailer.getRetailerId());

        if (product == null) {
            throw new RuntimeException("Product not found or access denied");
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setUnit(request.getUnit());
        product.setImageUrl(request.getImageUrl());

        return productService.updateProduct(product);
    }

    // ==========================
    // Delete Product
    // ==========================
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Integer id,
                                Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        Product product = productService.getProductByIdAndRetailerId(
                id,
                retailer.getRetailerId());

        if (product == null) {
            throw new RuntimeException("Product not found or access denied");
        }

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }

    // ==========================
    // Customer APIs
    // ==========================

    @GetMapping("/customer")
    public List<Product> getProductsForCustomers() {
        return productService.getAllProducts();
    }

    @GetMapping("/customer/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }

    @GetMapping("/customer/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // ==========================
    // Search APIs
    // ==========================

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
    
    @PatchMapping("/{productId}/stock")
    public ResponseEntity<Product> updateStock(
            @PathVariable Integer productId,
            @RequestBody StockRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        Product product = productService.updateStock(
                productId,
                retailer.getRetailerId(),
                request.getStock());

        return ResponseEntity.ok(product);
    }
}