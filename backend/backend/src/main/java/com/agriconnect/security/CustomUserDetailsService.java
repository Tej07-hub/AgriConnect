package com.agriconnect.security;

import org.springframework.beans.factory.annotation.Autowired;

import com.agriconnect.entity.Customer;
import com.agriconnect.repository.CustomerRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.agriconnect.entity.Admin;
import com.agriconnect.repository.AdminRepository;

import org.springframework.stereotype.Service;

import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.CustomerRepository;
import com.agriconnect.repository.RetailerRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RetailerRepository retailerRepository;
    
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Admin
        Admin admin = adminRepository.findByEmail(email).orElse(null);

        if (admin != null) {
            return User.builder()
                    .username(admin.getEmail())
                    .password(admin.getPassword())
                    .authorities("ADMIN")
                    .build();
        }

        // Retailer
        Retailer retailer = retailerRepository.findByEmail(email).orElse(null);

        if (retailer != null) {
            return User.builder()
                    .username(retailer.getEmail())
                    .password(retailer.getPassword())
                    .authorities("RETAILER")
                    .build();
        }

        // Customer
        Customer customer = customerRepository.findByEmail(email).orElse(null);

        if (customer != null) {
            return User.builder()
                    .username(customer.getEmail())
                    .password(customer.getPassword())
                    .authorities("CUSTOMER")
                    .build();
        }

        throw new UsernameNotFoundException("User not found");
    }
}