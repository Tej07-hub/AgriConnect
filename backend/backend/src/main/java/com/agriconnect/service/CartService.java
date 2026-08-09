package com.agriconnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Cart;
import com.agriconnect.repository.CartRepository;
import java.math.BigDecimal;
import java.util.ArrayList;

import com.agriconnect.dto.CartResponse;
import com.agriconnect.entity.Product;
import com.agriconnect.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ProductRepository productRepository;

    // Add product to cart
    public Cart addToCart(Cart cart) {

        Optional<Cart> existingCart = cartRepository.findByCustomerIdAndProductId(
                cart.getCustomerId(),
                cart.getProductId());

        if (existingCart.isPresent()) {

            Cart cartItem = existingCart.get();

            cartItem.setQuantity(cartItem.getQuantity() + cart.getQuantity());

            return cartRepository.save(cartItem);
        }

        return cartRepository.save(cart);
    }
    // Get all cart items of a customer
    public List<CartResponse> getCartByCustomer(Integer customerId) {

        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);

        List<CartResponse> response = new ArrayList<>();

        for (Cart cart : cartItems) {

            Product product = productRepository
                    .findById(cart.getProductId())
                    .orElse(null);

            if (product == null) {
                continue;
            }

            BigDecimal totalPrice =
                    product.getPrice().multiply(
                            BigDecimal.valueOf(cart.getQuantity()));

            CartResponse item = new CartResponse();

            item.setCartId(cart.getCartId());
            item.setProductId(product.getProductId());
            item.setProductName(product.getName());
            item.setImageUrl(product.getImageUrl());
            item.setPrice(product.getPrice());
            item.setQuantity(cart.getQuantity());
            item.setTotalPrice(totalPrice);

            response.add(item);
        }

        return response;
    }

    // Remove item from cart
    public void removeFromCart(Integer cartId) {
        cartRepository.deleteById(cartId);
    }
    
    
    
}