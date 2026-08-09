package com.agriconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriconnect.dto.RetailerDashboardResponse;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;
import com.agriconnect.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private RetailerRepository retailerRepository;

    @GetMapping("/retailer")
    public ResponseEntity<RetailerDashboardResponse> getDashboard(Authentication authentication) {

        String email = authentication.getName();

        Retailer retailer = retailerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        RetailerDashboardResponse response =
                dashboardService.getDashboard(retailer.getRetailerId());

        return ResponseEntity.ok(response);
    }
}