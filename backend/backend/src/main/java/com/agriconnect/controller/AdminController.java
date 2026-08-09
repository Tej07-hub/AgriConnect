package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.AdminDashboardResponse;
import com.agriconnect.dto.LoginRequest;
import com.agriconnect.dto.LoginResponse;
import com.agriconnect.entity.Admin;
import com.agriconnect.security.JwtUtil;
import com.agriconnect.service.AdminService;
import com.agriconnect.dto.CategoryRequest;
import com.agriconnect.dto.AdminDashboardResponse;
import com.agriconnect.entity.Category;
import com.agriconnect.entity.Product;
import com.agriconnect.entity.Retailer;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse loginAdmin(@RequestBody LoginRequest request) {

        Admin admin = adminService.login(
                request.getEmail(),
                request.getPassword());

        if (admin != null) {

            String token = jwtUtil.generateToken(admin.getEmail());

            return new LoginResponse(
                    true,
                    "Login Successful",
                    token,
                    admin.getAdminId()
            );
        }

        return new LoginResponse(
                false,
                "Invalid Email or Password",
                null,
                null
        );
    }
    
    @PostMapping("/register")
    public String registerAdmin() {

        Admin admin = new Admin();

        admin.setName("Super Admin");
        admin.setEmail("admin@agriconnect.com");
        admin.setPassword("admin123");

        adminService.saveAdmin(admin);

        return "Admin Created Successfully";
    }
    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {
        return adminService.getDashboard();
    }
    
 // ===========================
 // Category Management
 // ===========================

 // Get All Categories
 @GetMapping("/categories")
 public List<Category> getAllCategories() {
     return adminService.getAllCategories();
 }

 // Add Category
 @PostMapping("/categories")
 public Category addCategory(@RequestBody CategoryRequest request) {
     return adminService.addCategory(request);
 }

 // Update Category
 @PutMapping("/categories/{id}")
 public Category updateCategory(@PathVariable Integer id,
                                @RequestBody CategoryRequest request) {

     return adminService.updateCategory(id, request);
 }

 // Delete Category
 @DeleteMapping("/categories/{id}")
 public String deleteCategory(@PathVariable Integer id) {

     adminService.deleteCategory(id);

     return "Category deleted successfully";
 }
 @GetMapping("/products")
 public List<Product> getAllProducts() {
     return adminService.getAllProducts();
 }
 @GetMapping("/products/{id}")
 public Product getProductById(@PathVariable Integer id) {
     return adminService.getProductById(id);
 }
 @GetMapping("/products/search")
 public List<Product> searchProducts(@RequestParam String keyword) {
     return adminService.searchProducts(keyword);
 }
 @DeleteMapping("/products/{id}")
 public String deleteProduct(@PathVariable Integer id) {

     adminService.deleteProduct(id);

     return "Product deleted successfully";
 }
 
 @GetMapping("/retailers")
 public List<Retailer> getAllRetailers() {
     return adminService.getAllRetailers();
 }
 
 @GetMapping("/retailers/{id}")
 public Retailer getRetailer(@PathVariable Integer id) {
     return adminService.getRetailerById(id);
 }
 
 @DeleteMapping("/retailers/{id}")
 public String deleteRetailer(@PathVariable Integer id) {

     adminService.deleteRetailer(id);

     return "Retailer deleted successfully";
 }
 
 @PatchMapping("/retailers/{id}/status")
 public Retailer updateRetailerStatus(
         @PathVariable Integer id,
         @RequestParam String status) {

     return adminService.updateRetailerStatus(id, status);
 }
 
 
 
 
 
 
 
 
 
 
 
}