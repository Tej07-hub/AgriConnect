package com.agriconnect.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.ApiResponse;
import com.agriconnect.dto.LoginRequest;
import com.agriconnect.dto.LoginResponse;
import com.agriconnect.dto.RegisterCustomerRequest;
import com.agriconnect.entity.Customer;
import com.agriconnect.security.JwtUtil;
import com.agriconnect.service.CustomerService;
import com.agriconnect.service.NotificationService;
import com.agriconnect.dto.CustomerProfileResponse;
import com.agriconnect.dto.UpdateCustomerProfileRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.agriconnect.entity.Notification;

import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private NotificationService notificationService;

    @PostMapping("/register")
    public ApiResponse registerCustomer(
            @RequestBody RegisterCustomerRequest request) {

        if (customerService.emailExists(request.getEmail())) {
            return new ApiResponse(false, "Email already registered");
        }

        if (customerService.mobileExists(request.getMobile())) {
            return new ApiResponse(false, "Mobile already registered");
        }

        Customer customer = new Customer();

        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setMobile(request.getMobile());
        customer.setPassword(request.getPassword());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());

        customerService.saveCustomer(customer);

        return new ApiResponse(true, "Customer registered successfully");
    }
    @PostMapping("/login")
    public LoginResponse loginCustomer(@RequestBody LoginRequest request) {

        Customer customer = customerService.login(
                request.getEmail(),
                request.getPassword());

        if (customer != null) {

            String token = jwtUtil.generateToken(customer.getEmail());

            return new LoginResponse(
                    true,
                    "Login Successful",
                    token,
                    customer.getCustomerId()
            );
        }

        return new LoginResponse(
                false,
                "Invalid Email or Password",
                null,
                null
        );
    
    }
    @GetMapping("/profile")
    public ResponseEntity<CustomerProfileResponse> getCustomerProfile() {

        CustomerProfileResponse response = customerService.getCustomerProfile();

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<CustomerProfileResponse> updateCustomerProfile(
            @RequestBody UpdateCustomerProfileRequest request) {

        CustomerProfileResponse response =
                customerService.updateCustomerProfile(request);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/notifications")
    public List<Notification> getNotifications(Authentication authentication) {

        Customer customer = customerService.getCustomerByEmail(authentication.getName());

        return notificationService.getNotifications(
                customer.getCustomerId(),
                "CUSTOMER");
    }
    
    @PatchMapping("/notifications/{id}/read")
    public Notification markAsRead(@PathVariable Integer id) {

        return notificationService.markAsRead(id);
    }
    
    @PatchMapping("/notifications/read-all")
    public String markAllAsRead(Authentication authentication) {

        Customer customer = customerService.getCustomerByEmail(authentication.getName());

        notificationService.markAllAsRead(
                customer.getCustomerId(),
                "CUSTOMER");

        return "All notifications marked as read.";
    }
    
    @GetMapping("/notifications/unread-count")
    public long getUnreadCount(Authentication authentication) {

        Customer customer = customerService.getCustomerByEmail(authentication.getName());

        return notificationService.getUnreadCount(
                customer.getCustomerId(),
                "CUSTOMER");
    }
}