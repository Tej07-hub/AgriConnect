package com.agriconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Cart;
import com.agriconnect.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add product to cart
    public Cart addToCart(Cart cart) {

        Cart existingCart = cartRepository.findByCustomerIdAndProductId(
                cart.getCustomerId(),
                cart.getProductId());

        if (existingCart != null) {
            existingCart.setQuantity(
                    existingCart.getQuantity() + cart.getQuantity());
            return cartRepository.save(existingCart);
        }

        return cartRepository.save(cart);
    }

    // Get all cart items of a customer
    public List<Cart> getCartByCustomer(Integer customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    // Remove item from cart
    public void removeFromCart(Integer cartId) {
        cartRepository.deleteById(cartId);
    }
}