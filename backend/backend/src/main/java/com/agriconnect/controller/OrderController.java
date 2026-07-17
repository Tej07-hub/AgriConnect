package com.agriconnect.controller;

import com.agriconnect.entity.Order;
import com.agriconnect.entity.OrderItem;
import com.agriconnect.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{customerId}")
    public Order placeOrder(@PathVariable Integer customerId) {
        return orderService.placeOrder(customerId);
    }

    @GetMapping("/customer/{customerId}")
    public List<Order> getOrders(@PathVariable Integer customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }
    
    @GetMapping("/{orderId}/items")
    public List<OrderItem> getOrderItems(@PathVariable Integer orderId) {
        return orderService.getOrderItems(orderId);
    }
    
    @GetMapping("/retailer/{retailerId}")
    public List<Order> getRetailerOrders(@PathVariable Integer retailerId) {
        return orderService.getOrdersByRetailer(retailerId);
    }
    
    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Integer orderId,
                                   @RequestParam String status) {

        return orderService.updateOrderStatus(orderId, status);
    }
    
    @PutMapping("/{orderId}/cancel")
    public Order cancelOrder(@PathVariable Integer orderId) {
        return orderService.cancelOrder(orderId);
    }
    
}