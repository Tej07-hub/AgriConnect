package com.agriconnect.service;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.RetailerDashboardResponse;
import com.agriconnect.entity.Order;
import com.agriconnect.entity.OrderItem;
import com.agriconnect.repository.OrderItemRepository;
import com.agriconnect.repository.OrderRepository;
import com.agriconnect.repository.ProductRepository;

@Service
public class RetailerDashboardService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    public RetailerDashboardResponse getDashboard(Integer retailerId) {

        RetailerDashboardResponse response = new RetailerDashboardResponse();

        // Product statistics
        response.setTotalProducts(
                (int) productRepository.countByRetailerId(retailerId));

        response.setLowStockProducts(
                (int) productRepository.countByRetailerIdAndStockLessThan(retailerId, 10));

        List<OrderItem> orderItems = orderItemRepository.findByRetailerId(retailerId);

        Set<Integer> processedOrders = new HashSet<>();

        int pending = 0;
        int processing = 0;
        int shipped = 0;
        int delivered = 0;
        int cancelled = 0;

        BigDecimal revenue = BigDecimal.ZERO;

        for (OrderItem item : orderItems) {

            // Skip duplicate orders
            if (processedOrders.contains(item.getOrderId())) {
                continue;
            }

            processedOrders.add(item.getOrderId());

            Order order = orderRepository.findById(item.getOrderId()).orElse(null);

            if (order == null) {
                continue;
            }

            switch (order.getStatus().toUpperCase()) {

                case "PLACED":
                    pending++;
                    break;

                case "PROCESSING":
                    processing++;
                    break;

                case "SHIPPED":
                    shipped++;
                    break;

                case "DELIVERED":
                    delivered++;
                    revenue = revenue.add(order.getTotalAmount());
                    break;

                case "CANCELLED":
                    cancelled++;
                    break;
            }
        }

        response.setTotalOrders(processedOrders.size());
        response.setPendingOrders(pending);
        response.setProcessingOrders(processing);
        response.setShippedOrders(shipped);
        response.setDeliveredOrders(delivered);
        response.setCancelledOrders(cancelled);
        response.setTotalRevenue(revenue);

        return response;
    }
}