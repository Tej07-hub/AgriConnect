package com.agriconnect.service;

import java.math.BigDecimal;

import java.util.Set;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agriconnect.dto.OrderItemResponse;
import com.agriconnect.dto.OrderResponse;
import com.agriconnect.entity.Address;
import com.agriconnect.entity.Cart;
import com.agriconnect.entity.Customer;
import com.agriconnect.entity.Order;
import com.agriconnect.entity.OrderItem;
import com.agriconnect.entity.OrderStatus;
import com.agriconnect.entity.Product;
import com.agriconnect.repository.AddressRepository;
import com.agriconnect.repository.CartRepository;
import com.agriconnect.repository.CustomerRepository;
import com.agriconnect.repository.OrderItemRepository;
import com.agriconnect.repository.OrderRepository;
import com.agriconnect.repository.ProductRepository;
import com.agriconnect.entity.Retailer;
import com.agriconnect.repository.RetailerRepository;
import com.agriconnect.dto.OrderRequest;
import com.agriconnect.service.NotificationService;


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

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private RetailerRepository retailerRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private AddressRepository addressRepository;
    
    

    private Integer getLoggedInCustomerId() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        Customer customer = customerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return customer.getCustomerId();
    }

    @Transactional
    public Order placeOrder(OrderRequest request) {

        Integer customerId = getLoggedInCustomerId();

        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal total = BigDecimal.ZERO;

        for (Cart cart : cartItems) {

            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            total = total.add(
                    product.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity())));
        }
        
     // Validate address
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Access denied");
        }

        Order order = new Order();
        order.setCustomerId(customerId);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setTotalAmount(total);

        // Address and Payment
        order.setAddressId(request.getAddressId());
        order.setPaymentMethod(request.getPaymentMethod());
        
        
        

        Order savedOrder = orderRepository.save(order);
        for (Cart cart : cartItems) {

            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Check stock availability
            if (product.getStock() < cart.getQuantity()) {
                throw new RuntimeException(
                        product.getName() + " has only " + product.getStock() + " item(s) available");
            }
            
            

            // Create Order Item
            OrderItem item = new OrderItem();
            item.setOrderId(savedOrder.getOrderId());
            item.setProductId(product.getProductId());
            item.setRetailerId(product.getRetailerId());
            item.setQuantity(cart.getQuantity());
            item.setPrice(product.getPrice());
            item.setStatus("PLACED");   // <-- Add this line

            orderItemRepository.save(item);

            // Reduce stock
            int remainingStock = product.getStock() - cart.getQuantity();
            product.setStock(remainingStock);

            // Update stock status
            product.setInStock(remainingStock > 0);

            productRepository.save(product);
        }

     // Customer Notification
        notificationService.createNotification(
                customerId,
                "CUSTOMER",
                "Order Placed",
                "Your order #" + savedOrder.getOrderId() + " has been placed successfully."
        );

        // Retailer Notifications
        for (Cart cart : cartItems) {

            Product product = productRepository.findById(cart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            notificationService.createNotification(
                    product.getRetailerId(),
                    "RETAILER",
                    "New Order",
                    "You have received a new order #" + savedOrder.getOrderId()
            );
        }

        // Clear Cart
        cartRepository.deleteByCustomerId(customerId);

        return savedOrder;
    }
    // ===========================
    // CUSTOMER ORDERS (DTO)
    // ===========================

    public List<OrderResponse> getMyOrders() {

        Integer customerId = getLoggedInCustomerId();

        List<Order> orders = orderRepository.findByCustomerId(customerId);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {

            OrderResponse response = new OrderResponse();

            response.setOrderId(order.getOrderId());
            response.setOrderDate(order.getOrderDate());
            response.setStatus(order.getStatus());
            response.setTotalAmount(order.getTotalAmount());

            List<OrderItem> orderItems =
                    orderItemRepository.findByOrderId(order.getOrderId());

            List<OrderItemResponse> itemResponses = new ArrayList<>();

            for (OrderItem item : orderItems) {

                Product product = productRepository
                        .findById(item.getProductId())
                        .orElse(null);

                OrderItemResponse dto = new OrderItemResponse();

                dto.setProductId(item.getProductId());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getPrice());
                dto.setStatus(item.getStatus());
                

                if (product != null) {

                    dto.setProductName(product.getName());
                    dto.setCategory(product.getCategory());
                    dto.setImageUrl(product.getImageUrl());

                    dto.setSubtotal(
                            item.getPrice().multiply(
                                    BigDecimal.valueOf(item.getQuantity())));
                }

                itemResponses.add(dto);
            }

            response.setItems(itemResponses);

            responses.add(response);
        }

        return responses;
    }

    // ===========================
    // ORDER ITEMS
    // ===========================

    public List<OrderItem> getOrderItems(Integer orderId) {

        Integer customerId = getLoggedInCustomerId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Access denied");
        }

        return orderItemRepository.findByOrderId(orderId);
    }

    // ===========================
    // RETAILER ORDERS
    // ===========================

    public List<Order> getRetailerOrders(Integer retailerId) {

        List<OrderItem> items = orderItemRepository.findByRetailerId(retailerId);

        Set<Integer> orderIds = items.stream()
                .map(OrderItem::getOrderId)
                .collect(Collectors.toSet());

        return orderRepository.findAllById(orderIds);
    }
    
    public List<Order> getMyRetailerOrders() {

        Integer retailerId = getLoggedInRetailerId();

        return getRetailerOrders(retailerId);
    }
    
    
    // ===========================
    // UPDATE STATUS
    // ===========================

 // ===========================
 // UPDATE STATUS
 // ===========================

    public Order updateOrderStatus(Integer orderId, String status) {

        Integer retailerId = getLoggedInRetailerId();

        List<OrderItem> items =
                orderItemRepository.findByRetailerIdAndOrderId(retailerId, orderId);

        if (items.isEmpty()) {
            throw new RuntimeException("Access Denied");
        }

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

        // Update only this retailer's items
        for (OrderItem item : items) {
            item.setStatus(status);
        }

        orderItemRepository.saveAll(items);

        
        
        // Update overall order status
        updateOverallOrderStatus(orderId);

        Order updatedOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Customer Notification
        notificationService.createNotification(
                updatedOrder.getCustomerId(),
                "CUSTOMER",
                "Order Updated",
                "Your order #" + updatedOrder.getOrderId()
                        + " status is now " + updatedOrder.getStatus()
        );

        return updatedOrder;
    }
    
    private void updateOverallOrderStatus(Integer orderId) {

        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        boolean allDelivered = true;
        boolean allShipped = true;
        boolean allProcessing = true;
        boolean anyCancelled = false;

        for (OrderItem item : items) {

            String status = item.getStatus();

            if (!"DELIVERED".equals(status)) {
                allDelivered = false;
            }

            if (!"SHIPPED".equals(status) && !"DELIVERED".equals(status)) {
                allShipped = false;
            }

            if (!"PROCESSING".equals(status)
                    && !"SHIPPED".equals(status)
                    && !"DELIVERED".equals(status)) {
                allProcessing = false;
            }

            if ("CANCELLED".equals(status)) {
                anyCancelled = true;
            }
        }

        if (allDelivered) {
            order.setStatus("DELIVERED");
        } else if (allShipped) {
            order.setStatus("SHIPPED");
        } else if (allProcessing) {
            order.setStatus("PROCESSING");
        } else if (anyCancelled) {
            order.setStatus("PARTIALLY_CANCELLED");
        } else {
            order.setStatus("PLACED");
        }

        orderRepository.save(order);
    }

    // ===========================
    // CANCEL ORDER
    // ===========================

    public Order cancelOrder(Integer orderId) {

        Integer customerId = getLoggedInCustomerId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Access denied");
        }

        if ("DELIVERED".equalsIgnoreCase(order.getStatus())) {
            throw new RuntimeException("Delivered orders cannot be cancelled");
        }

        order.setStatus("CANCELLED");

        Order cancelledOrder = orderRepository.save(order);

        notificationService.createNotification(
                cancelledOrder.getCustomerId(),
                "CUSTOMER",
                "Order Cancelled",
                "Your order #" + cancelledOrder.getOrderId() + " has been cancelled."
        );

        return cancelledOrder;
    }
    private Integer getLoggedInRetailerId() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Retailer retailer = retailerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));

        return retailer.getRetailerId();
    }
    public List<Order> getRetailerOrdersByStatus(Integer retailerId, String status) {

        List<OrderItem> items = orderItemRepository.findByRetailerId(retailerId);

        Set<Integer> orderIds = items.stream()
                .filter(item -> item.getStatus().equalsIgnoreCase(status))
                .map(OrderItem::getOrderId)
                .collect(Collectors.toSet());

        return orderRepository.findAllById(orderIds);
    }

    public long countRetailerOrders(Integer retailerId) {
        return getRetailerOrders(retailerId).size();
    }

    public long countCompletedOrders(Integer retailerId) {

        return getRetailerOrders(retailerId)
                .stream()
                .filter(order ->
                        order.getStatus().equalsIgnoreCase("DELIVERED"))
                .count();
    }
    public long countPendingOrders(Integer retailerId) {

        return orderItemRepository.findByRetailerId(retailerId)
                .stream()
                .filter(item -> item.getStatus().equalsIgnoreCase("PLACED"))
                .count();
    }
    
 // ===========================
 // RETAILER ORDER DETAILS
 // ===========================

 public OrderResponse getRetailerOrderDetails(Integer orderId) {

     Integer retailerId = getLoggedInRetailerId();

     Order order = orderRepository.findById(orderId)
             .orElseThrow(() ->
                     new RuntimeException("Order not found"));

     // IMPORTANT:
     // Only get items belonging to logged-in retailer
     List<OrderItem> retailerItems =
             orderItemRepository.findByRetailerIdAndOrderId(
                     retailerId,
                     orderId
             );

     if (retailerItems.isEmpty()) {
         throw new RuntimeException(
                 "You are not allowed to view this order"
         );
     }

     OrderResponse response = new OrderResponse();

     response.setOrderId(order.getOrderId());
     response.setOrderDate(order.getOrderDate());

     response.setStatus(order.getStatus());

     List<OrderItemResponse> itemResponses =
             new ArrayList<>();

     BigDecimal retailerTotal = BigDecimal.ZERO;

     for (OrderItem item : retailerItems) {

         Product product = productRepository
                 .findById(item.getProductId())
                 .orElse(null);

         OrderItemResponse itemResponse =
                 new OrderItemResponse();

         itemResponse.setProductId(
                 item.getProductId()
         );

         itemResponse.setQuantity(
                 item.getQuantity()
         );

         itemResponse.setPrice(
                 item.getPrice()
         );

         itemResponse.setStatus(
                 item.getStatus()
         );

         if (product != null) {

             itemResponse.setProductName(
                     product.getName()
             );

             itemResponse.setCategory(
                     product.getCategory()
             );

             itemResponse.setImageUrl(
                     product.getImageUrl()
             );

             BigDecimal subtotal =
                     item.getPrice().multiply(
                             BigDecimal.valueOf(
                                     item.getQuantity()
                             )
                     );

             itemResponse.setSubtotal(subtotal);

             retailerTotal =
                     retailerTotal.add(subtotal);
         }

         itemResponses.add(itemResponse);
     }

     response.setItems(itemResponses);

     // Only this retailer's total
     response.setTotalAmount(retailerTotal);

     return response;
 }    
    
    
    
    

}