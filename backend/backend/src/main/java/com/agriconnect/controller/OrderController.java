package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.OrderRequest;
import com.agriconnect.dto.OrderResponse;
import com.agriconnect.dto.OrderStatusRequest;
import com.agriconnect.entity.Order;
import com.agriconnect.entity.OrderItem;
import com.agriconnect.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ===========================
    // CUSTOMER
    // ===========================

    // Place Order
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(
            @RequestBody OrderRequest request) {

        return ResponseEntity.ok(
                orderService.placeOrder(request)
        );
    }

    // Get Logged-in Customer Orders
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders() {

        return ResponseEntity.ok(
                orderService.getMyOrders()
        );
    }

    // Get Order Items
    @GetMapping("/{orderId}/items")
    public ResponseEntity<List<OrderItem>> getOrderItems(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.getOrderItems(orderId)
        );
    }

    // Cancel Order
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.cancelOrder(orderId)
        );
    }


    // ===========================
    // RETAILER
    // ===========================

    // Get All Orders for Logged-in Retailer
    @GetMapping("/retailer")
    public ResponseEntity<List<Order>> getRetailerOrders() {

        return ResponseEntity.ok(
                orderService.getMyRetailerOrders()
        );
    }

    // Get Specific Order Details for Logged-in Retailer
    @GetMapping("/retailer/{orderId}")
    public ResponseEntity<OrderResponse> getRetailerOrderDetails(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.getRetailerOrderDetails(orderId)
        );
    }


    // ===========================
    // UPDATE ORDER STATUS
    // ===========================

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestBody OrderStatusRequest request) {

        Order order = orderService.updateOrderStatus(
                orderId,
                request.getStatus()
        );

        return ResponseEntity.ok(order);
    }
}