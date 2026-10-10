package com.fitflex.service;

import com.fitflex.dto.AuthResponse;
import com.fitflex.dto.LoginRequest;
import com.fitflex.dto.RegisterRequest;
import com.fitflex.model.Role;
import com.fitflex.model.Store;
import com.fitflex.model.User;
import com.fitflex.repository.StoreRepository;
import com.fitflex.repository.UserRepository;
import com.fitflex.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       StoreRepository storeRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered: " + request.getEmail());
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole() != null ? request.getRole() : Role.ROLE_BUYER);
        user.setLocality(request.getLocality() != null ? request.getLocality() : "Hyderabad Central");
        user.setAddress(request.getAddress());
        user = userRepository.save(user);

        Long storeId = null;
        String storeName = null;

        // If registered as SELLER, create store profile
        if (user.getRole() == Role.ROLE_SELLER) {
            Store store = new Store();
            store.setSeller(user);
            store.setStoreName(request.getStoreName() != null && !request.getStoreName().isBlank() ?
                    request.getStoreName() : user.getName() + " Activewear Hub");
            store.setDescription(request.getStoreDescription() != null ?
                    request.getStoreDescription() : "Verified Hyderabad Gym & Activewear Seller");
            store.setLocality(user.getLocality());
            store.setAddress(user.getAddress() != null ? user.getAddress() : user.getLocality() + ", Hyderabad");
            store.setContactNumber(user.getPhone());
            store = storeRepository.save(store);
            storeId = store.getId();
            storeName = store.getStoreName();
        }

        String token = tokenProvider.generateTokenFromEmail(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getLocality(), storeId, storeName);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        Long storeId = null;
        String storeName = null;
        if (user.getRole() == Role.ROLE_SELLER) {
            Store store = storeRepository.findBySeller(user).orElse(null);
            if (store != null) {
                storeId = store.getId();
                storeName = store.getStoreName();
            }
        }

        String token = tokenProvider.generateTokenFromEmail(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getLocality(), storeId, storeName);
    }

    public AuthResponse getCurrentUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));

        Long storeId = null;
        String storeName = null;
        if (user.getRole() == Role.ROLE_SELLER) {
            Store store = storeRepository.findBySeller(user).orElse(null);
            if (store != null) {
                storeId = store.getId();
                storeName = store.getStoreName();
            }
        }

        return new AuthResponse(null, user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getLocality(), storeId, storeName);
    }
}
