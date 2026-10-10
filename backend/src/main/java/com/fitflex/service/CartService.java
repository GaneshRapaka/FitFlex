package com.fitflex.service;

import com.fitflex.dto.CartItemRequest;
import com.fitflex.model.CartItem;
import com.fitflex.model.Product;
import com.fitflex.model.User;
import com.fitflex.repository.CartItemRepository;
import com.fitflex.repository.ProductRepository;
import com.fitflex.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<CartItem> getCartItems(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return cartItemRepository.findByUser(user);
    }

    @Transactional
    public CartItem addToCart(String email, CartItemRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        Optional<CartItem> existingItem = cartItemRepository
                .findByUserIdAndProductIdAndSelectedSize(user.getId(), product.getId(), request.getSelectedSize());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            return cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem(user, product, request.getSelectedSize(), request.getQuantity());
            return cartItemRepository.save(newItem);
        }
    }

    @Transactional
    public CartItem updateQuantity(String email, Long cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));

        if (!item.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Unauthorized to update this cart item");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(item);
            return null;
        }

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    @Transactional
    public void removeFromCart(String email, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));

        if (!item.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException("Unauthorized to delete this cart item");
        }

        cartItemRepository.delete(item);
    }

    @Transactional
    public void clearCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        cartItemRepository.deleteByUserId(user.getId());
    }
}
