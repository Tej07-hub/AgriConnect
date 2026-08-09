package com.agriconnect.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.RetailerProfileResponse;
import com.agriconnect.dto.UpdateRetailerProfileRequest;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class RetailerService {

    @Autowired
    private RetailerRepository retailerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ==========================
    // Register Retailer
    // ==========================

    public Retailer saveRetailer(Retailer retailer) {

        retailer.setPassword(passwordEncoder.encode(retailer.getPassword()));

        retailer.setTransactionPassword(
                passwordEncoder.encode(retailer.getTransactionPassword()));

        return retailerRepository.save(retailer);
    }

    // ==========================
    // Get All Retailers
    // ==========================

    public List<Retailer> getAllRetailers() {
        return retailerRepository.findAll();
    }

    // ==========================
    // Get Retailer By Id
    // ==========================

    public Retailer getRetailerById(Integer id) {
        return retailerRepository.findById(id).orElse(null);
    }

    // ==========================
    // Delete Retailer
    // ==========================

    public void deleteRetailer(Integer id) {
        retailerRepository.deleteById(id);
    }

    // ==========================
    // Check Email Exists
    // ==========================

    public boolean emailExists(String email) {
        return retailerRepository.existsByEmail(email);
    }

    // ==========================
    // Check Mobile Exists
    // ==========================

    public boolean mobileExists(String mobile) {
        return retailerRepository.existsByMobile(mobile);
    }

    // ==========================
    // Login
    // ==========================

    public Retailer login(String email, String password) {

        Optional<Retailer> retailer = retailerRepository.findByEmail(email);

        if (retailer.isPresent()) {

            if (passwordEncoder.matches(password,
                    retailer.get().getPassword())) {

                return retailer.get();
            }
        }

        return null;
    }

    // ==========================
    // Get Logged-in Retailer Profile
    // ==========================

    public RetailerProfileResponse getRetailerProfile() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Retailer retailer = retailerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        return new RetailerProfileResponse(
                retailer.getRetailerId(),
                retailer.getFullName(),
                retailer.getShopName(),
                retailer.getEmail(),
                retailer.getMobile(),
                retailer.getAddress(),
                retailer.getCity(),
                retailer.getState(),
                retailer.getPincode()
        );
    }

    // ==========================
    // Update Logged-in Retailer Profile
    // ==========================

    public RetailerProfileResponse updateRetailerProfile(
            UpdateRetailerProfileRequest request) {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Retailer retailer = retailerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        retailer.setFullName(request.getFullName());
        retailer.setShopName(request.getShopName());
        retailer.setMobile(request.getMobile());
        retailer.setAddress(request.getAddress());
        retailer.setCity(request.getCity());
        retailer.setState(request.getState());
        retailer.setPincode(request.getPincode());

        retailer = retailerRepository.save(retailer);

        return new RetailerProfileResponse(
                retailer.getRetailerId(),
                retailer.getFullName(),
                retailer.getShopName(),
                retailer.getEmail(),
                retailer.getMobile(),
                retailer.getAddress(),
                retailer.getCity(),
                retailer.getState(),
                retailer.getPincode()
        );
    }
    
    public Retailer getRetailerByEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
    }

}