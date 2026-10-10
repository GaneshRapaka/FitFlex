package com.fitflex.dto;

import com.fitflex.model.Role;

public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String locality;
    private Long storeId;
    private String storeName;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String name, String email, Role role, String locality, Long storeId, String storeName) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.locality = locality;
        this.storeId = storeId;
        this.storeName = storeName;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getLocality() { return locality; }
    public void setLocality(String locality) { this.locality = locality; }

    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
}
