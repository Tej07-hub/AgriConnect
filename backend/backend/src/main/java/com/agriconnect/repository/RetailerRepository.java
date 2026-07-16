package com.agriconnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agriconnect.entity.Retailer;

@Repository
public interface RetailerRepository extends JpaRepository<Retailer, Integer> {

    Optional<Retailer> findByEmail(String email);

    Optional<Retailer> findByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

}