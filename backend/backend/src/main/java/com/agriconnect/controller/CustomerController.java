package com.agriconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.ApiResponse;
import com.agriconnect.dto.LoginRequest;
import com.agriconnect.dto.LoginResponse;
import com.agriconnect.dto.RegisterCustomerRequest;
import com.agriconnect.entity.Customer;
import com.agriconnect.security.JwtUtil;
import com.agriconnect.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtUtil jwtUtil;

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
    public LoginResponse loginCustomer(
            @RequestBody LoginRequest request) {

        Customer customer = customerService.login(
                request.getEmail(),
                request.getPassword());

        if (customer != null) {

            String token = jwtUtil.generateToken(customer.getEmail());
            System.out.println("Generated Token: " + token);
         

            return new LoginResponse(
                    true,
                    "Login Successful",
                    token
            );
        }

        return new LoginResponse(
                false,
                "Invalid Email or Password",
                null
        );
    }
}