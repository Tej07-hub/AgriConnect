package com.agriconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agriconnect.dto.RetailerDashboardResponse;
import com.agriconnect.service.RetailerDashboardService;

@RestController
@RequestMapping("/api/retailer/dashboard")
public class RetailerDashboardController {

    @Autowired
    private RetailerDashboardService dashboardService;

    @GetMapping("/{retailerId}")
    public RetailerDashboardResponse getDashboard(
            @PathVariable Integer retailerId) {

        return dashboardService.getDashboard(retailerId);
    }
}