package com.agriconnect.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RetailerRepository retailerRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Retailer not found"));

        return User.builder()
                .username(retailer.getEmail())
                .password(retailer.getPassword())
                .authorities("RETAILER")
                .build();
    }
}