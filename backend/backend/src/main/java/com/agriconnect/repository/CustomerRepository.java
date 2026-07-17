package com.agriconnect.repository;

import java.util.Optional;
import com.agriconnect.entity.Customer;
import com.agriconnect.repository.CustomerRepository;

import org.springframework.data.jpa.repository.JpaRepository;



public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);
    
}