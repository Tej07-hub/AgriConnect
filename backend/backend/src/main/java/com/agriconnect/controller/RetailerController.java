package com.agriconnect.controller;
import com.agriconnect.dto.LoginResponse;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.entity.Retailer;
import com.agriconnect.service.RetailerService;

import com.agriconnect.dto.RegisterRequest;
import com.agriconnect.dto.LoginRequest;
import com.agriconnect.dto.ApiResponse;

import com.agriconnect.security.JwtUtil;
import com.agriconnect.dto.LoginResponse;
import com.agriconnect.security.JwtUtil;

@RestController
@RequestMapping("/api/retailers")
@CrossOrigin(origins = "http://localhost:5173")
public class RetailerController {

    @Autowired
    private RetailerService retailerService;
    
    @Autowired
    private JwtUtil jwtUtil;
    

    @PostMapping("/register")
    public ApiResponse registerRetailer(@RequestBody RegisterRequest request) {

        if (retailerService.emailExists(request.getEmail())) {
            return new ApiResponse(false, "Email already registered");
        }

        if (retailerService.mobileExists(request.getMobile())) {
            return new ApiResponse(false, "Mobile number already registered");
        }

        Retailer retailer = new Retailer();

        retailer.setFullName(request.getFullName());
        retailer.setEmail(request.getEmail());
        retailer.setMobile(request.getMobile());
        retailer.setPassword(request.getPassword());
        retailer.setTransactionPassword(request.getTransactionPassword());
        retailer.setShopName(request.getShopName());
        retailer.setAddress(request.getAddress());
        retailer.setCity(request.getCity());
        retailer.setState(request.getState());
        retailer.setPincode(request.getPincode());
        retailer.setStatus("ACTIVE");

        retailerService.saveRetailer(retailer);

        return new ApiResponse(true, "Retailer registered successfully");
    }
    
    @PostMapping("/login")
    public LoginResponse loginRetailer(@RequestBody LoginRequest request) {

        Retailer retailer = retailerService.login(
                request.getEmail(),
                request.getPassword());

        if (retailer != null) {

            String token = jwtUtil.generateToken(retailer.getEmail());

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
    
    // Get All Retailers
    @GetMapping
    public List<Retailer> getAllRetailers() {
        return retailerService.getAllRetailers();
    }

    // Get Retailer By ID
    @GetMapping("/{id}")
    public Retailer getRetailer(@PathVariable Integer id) {
        return retailerService.getRetailerById(id);
    }

    // Delete Retailer
    @DeleteMapping("/{id}")
    public String deleteRetailer(@PathVariable Integer id) {
        retailerService.deleteRetailer(id);
        return "Retailer deleted successfully";
    }
}