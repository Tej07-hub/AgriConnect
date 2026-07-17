package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.entity.Cart;
import com.agriconnect.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add product to cart
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    // Get all cart items of a customer
    @GetMapping("/customer/{customerId}")
    public List<Cart> getCart(@PathVariable Integer customerId) {
        return cartService.getCartByCustomer(customerId);
    }

    // Remove item from cart
    @DeleteMapping("/remove/{cartId}")
    public String removeFromCart(@PathVariable Integer cartId) {
        cartService.removeFromCart(cartId);
        return "Item removed from cart successfully.";
    }
}