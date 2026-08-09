package com.agriconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.RetailerDashboardResponse;
import com.agriconnect.repository.ProductRepository;

@Service
public class DashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderService orderService;

    public RetailerDashboardResponse getDashboard(Integer retailerId) {

        RetailerDashboardResponse response = new RetailerDashboardResponse();

        response.setTotalProducts(
                productRepository.countByRetailerId(retailerId));

        response.setTotalOrders(
                orderService.countRetailerOrders(retailerId));

        response.setPendingOrders(
                orderService.countPendingOrders(retailerId));

        response.setCompletedOrders(
                orderService.countCompletedOrders(retailerId));

        response.setLowStockProducts(
                productRepository.countByRetailerIdAndStockLessThanEqual(retailerId, 5));

        response.setOutOfStockProducts(
                productRepository.countByRetailerIdAndStock(retailerId, 0));

        return response;
    }
}