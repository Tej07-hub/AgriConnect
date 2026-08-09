package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.CartRequest;
import com.agriconnect.dto.CartResponse;
import com.agriconnect.entity.Cart;
import com.agriconnect.entity.Customer;
import com.agriconnect.repository.CustomerRepository;
import com.agriconnect.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CustomerRepository customerRepository;

    // Add Product to Cart
    @PostMapping
    public Cart addToCart(@RequestBody CartRequest request,
                          Authentication authentication) {

        String email = authentication.getName();

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Cart cart = new Cart();
        cart.setCustomerId(customer.getCustomerId());
        cart.setProductId(request.getProductId());
        cart.setQuantity(request.getQuantity());

        return cartService.addToCart(cart);
    }

    // View My Cart
    @GetMapping
    public List<CartResponse> getMyCart(Authentication authentication) {

        String email = authentication.getName();

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return cartService.getCartByCustomer(customer.getCustomerId());
    }

    // Remove Item From Cart
    @DeleteMapping("/{cartId}")
    public String removeFromCart(@PathVariable Integer cartId) {

        cartService.removeFromCart(cartId);

        return "Item removed from cart successfully.";
    }
}