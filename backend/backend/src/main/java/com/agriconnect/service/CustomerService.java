package com.agriconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

        customer.setPassword(
                passwordEncoder.encode(customer.getPassword()));

        return customerRepository.save(customer);
    }

    public Customer login(String email, String password) {

        Customer customer = customerRepository
                .findByEmail(email)
                .orElse(null);

        if (customer != null &&
                passwordEncoder.matches(password,
                        customer.getPassword())) {

            return customer;
        }

        return null;
    }
}