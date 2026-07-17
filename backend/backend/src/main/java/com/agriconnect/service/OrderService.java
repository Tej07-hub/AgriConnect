package com.agriconnect.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Cart;
import com.agriconnect.entity.Order;
import com.agriconnect.entity.OrderItem;
import com.agriconnect.entity.Product;
import com.agriconnect.repository.CartRepository;
import com.agriconnect.repository.OrderItemRepository;
import com.agriconnect.repository.OrderRepository;
import com.agriconnect.repository.ProductRepository;
import java.math.BigDecimal;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order placeOrder(Integer customerId) {
    	
    	

        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        BigDecimal total = BigDecimal.ZERO;

        for (Cart cart : cartItems) {
            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            total = total.add(
                product.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity()))
            );
        }
        
        Order order = new Order();
        order.setCustomerId(customerId);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        for (Cart cart : cartItems) {

            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Check stock availability
            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getName());
            }

            // Reduce stock
            product.setStock(product.getStock() - cart.getQuantity());
            productRepository.save(product);

            OrderItem item = new OrderItem();

            item.setOrderId(savedOrder.getOrderId());
            item.setProductId(product.getProductId());
            item.setRetailerId(product.getRetailerId());
            item.setQuantity(cart.getQuantity());
            item.setPrice(product.getPrice());

            orderItemRepository.save(item);
        }

        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    public List<Order> getOrdersByCustomer(Integer customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
    
    public List<OrderItem> getOrderItems(Integer orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
    
    public List<Order> getOrdersByRetailer(Integer retailerId) {

        List<OrderItem> orderItems = orderItemRepository.findByRetailerId(retailerId);

        List<Order> orders = new ArrayList<>();

        for (OrderItem item : orderItems) {
            Order order = orderRepository.findById(item.getOrderId()).orElse(null);

            if (order != null && !orders.contains(order)) {
                orders.add(order);
            }
        }

        return orders;
    }
    
    public Order updateOrderStatus(Integer orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<String> validStatuses = List.of(
                "PLACED",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
        );

        status = status.toUpperCase();

        if (!validStatuses.contains(status)) {
            throw new RuntimeException("Invalid order status");
        }

        order.setStatus(status);

        return orderRepository.save(order);
    }
    
    public Order cancelOrder(Integer orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("DELIVERED".equalsIgnoreCase(order.getStatus())) {
            throw new RuntimeException("Delivered orders cannot be cancelled");
        }

        order.setStatus("CANCELLED");

        return orderRepository.save(order);
    }
    
}