package com.agriconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.CustomerProfileResponse;
import com.agriconnect.dto.UpdateCustomerProfileRequest;
import com.agriconnect.entity.Customer;
import com.agriconnect.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean emailExists(String email) {
        return customerRepository.existsByEmail(email);
    }

    public boolean mobileExists(String mobile) {
        return customerRepository.existsByMobile(mobile);
    }

    public Customer saveCustomer(Customer customer) {

        customer.setPassword(passwordEncoder.encode(customer.getPassword()));

        return customerRepository.save(customer);
    }

    public Customer login(String email, String password) {

        Customer customer = customerRepository
                .findByEmail(email)
                .orElse(null);

        if (customer != null &&
                passwordEncoder.matches(password, customer.getPassword())) {

            return customer;
        }

        return null;
    }

    // ==============================
    // Get Logged-in Customer Profile
    // ==============================

    public CustomerProfileResponse getCustomerProfile() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Customer customer = customerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return new CustomerProfileResponse(
                customer.getCustomerId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getMobile(),
                customer.getAddress(),
                customer.getCity(),
                customer.getState(),
                customer.getPincode()
        );
    }

    // ==========================
    // Update Customer Profile
    // ==========================

    public CustomerProfileResponse updateCustomerProfile(
            UpdateCustomerProfileRequest request) {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Customer customer = customerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFullName(request.getFullName());
        customer.setMobile(request.getMobile());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());

        customer = customerRepository.save(customer);

        return new CustomerProfileResponse(
                customer.getCustomerId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getMobile(),
                customer.getAddress(),
                customer.getCity(),
                customer.getState(),
                customer.getPincode()
        );
    }
    
    public Customer getCustomerByEmail(String email) {

        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}