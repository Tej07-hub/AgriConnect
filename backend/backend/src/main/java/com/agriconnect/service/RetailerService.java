package com.agriconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class RetailerService {

    @Autowired
    private RetailerRepository retailerRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Save a new retailer
    public Retailer saveRetailer(Retailer retailer) {

        // Encrypt login password
        retailer.setPassword(passwordEncoder.encode(retailer.getPassword()));

        // Encrypt transaction password
        retailer.setTransactionPassword(
                passwordEncoder.encode(retailer.getTransactionPassword()));

        return retailerRepository.save(retailer);
    }

    // Get all retailers
    public List<Retailer> getAllRetailers() {
        return retailerRepository.findAll();
    }

    // Get retailer by ID
    public Retailer getRetailerById(Integer id) {
        return retailerRepository.findById(id).orElse(null);
    }

    // Delete retailer
    public void deleteRetailer(Integer id) {
        retailerRepository.deleteById(id);
    }

    public boolean emailExists(String email) {

        System.out.println("Checking email = " + email);

        boolean exists = retailerRepository.existsByEmail(email);

        System.out.println("Email exists = " + exists);

        return exists;
    }

    // Check mobile exists
    public boolean mobileExists(String mobile) {
        return retailerRepository.existsByMobile(mobile);
    }
    
    public Retailer login(String email, String password) {

        Optional<Retailer> retailer = retailerRepository.findByEmail(email);

        if (retailer.isPresent()) {

            if (passwordEncoder.matches(password, retailer.get().getPassword())) {
                return retailer.get();
            }

        }

        return null;
    }
    
}