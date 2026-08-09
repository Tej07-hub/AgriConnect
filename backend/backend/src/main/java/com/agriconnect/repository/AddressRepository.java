package com.agriconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agriconnect.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    List<Address> findByCustomerId(Integer customerId);

    Optional<Address> findByCustomerIdAndIsDefaultTrue(Integer customerId);
}