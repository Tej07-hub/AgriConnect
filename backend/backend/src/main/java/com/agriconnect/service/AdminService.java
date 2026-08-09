package com.agriconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.AdminDashboardResponse;
import com.agriconnect.dto.CategoryRequest;
import com.agriconnect.entity.Admin;
import com.agriconnect.entity.Category;
import com.agriconnect.entity.Product;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.AdminRepository;
import com.agriconnect.repository.CategoryRepository;
import com.agriconnect.repository.CustomerRepository;
import com.agriconnect.repository.OrderRepository;
import com.agriconnect.repository.ProductRepository;
import com.agriconnect.repository.RetailerRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RetailerRepository retailerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ===========================
    // Admin Login
    // ===========================

    public Admin login(String email, String password) {

        Admin admin = adminRepository.findByEmail(email).orElse(null);

        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }

        return null;
    }

    // ===========================
    // Register Admin
    // ===========================

    public Admin saveAdmin(Admin admin) {

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        return adminRepository.save(admin);
    }

    // ===========================
    // Dashboard
    // ===========================

    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse dashboard = new AdminDashboardResponse();

        dashboard.setTotalCustomers(customerRepository.count());
        dashboard.setTotalRetailers(retailerRepository.count());
        dashboard.setTotalCategories(categoryRepository.count());
        dashboard.setTotalProducts(productRepository.count());
        dashboard.setTotalOrders(orderRepository.count());

        dashboard.setPendingOrders(orderRepository.countByStatus("Pending"));
        dashboard.setConfirmedOrders(orderRepository.countByStatus("Confirmed"));
        dashboard.setShippedOrders(orderRepository.countByStatus("Shipped"));
        dashboard.setDeliveredOrders(orderRepository.countByStatus("Delivered"));
        dashboard.setCancelledOrders(orderRepository.countByStatus("Cancelled"));

        return dashboard;
    }

    // ===========================
    // Category Management
    // ===========================

    // Get All Categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Add Category
    public Category addCategory(CategoryRequest request) {

        if (categoryRepository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        category.setStatus(request.getStatus());

        return categoryRepository.save(category);
    }

    // Update Category
    public Category updateCategory(Integer id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        category.setStatus(request.getStatus());

        return categoryRepository.save(category);
    }

    // Delete Category
    public void deleteCategory(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(category);
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Product getProductById(Integer id) {

        return productRepository.findByProductId(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    public void deleteProduct(Integer id) {

        Product product = productRepository.findByProductId(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }
    public List<Product> searchProducts(String keyword) {

        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    public List<Retailer> getAllRetailers() {
        return retailerRepository.findAll();
    }
    
    public Retailer getRetailerById(Integer id) {

        return retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
    }
    
    public void deleteRetailer(Integer id) {

        Retailer retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        retailerRepository.delete(retailer);
    }
    
    public Retailer updateRetailerStatus(Integer id, String status) {

        Retailer retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        retailer.setStatus(status.toUpperCase());

        return retailerRepository.save(retailer);
    }
}