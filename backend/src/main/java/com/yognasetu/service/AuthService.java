package com.yognasetu.service;

import com.yognasetu.dto.AuthResponse;
import com.yognasetu.dto.LoginRequest;
import com.yognasetu.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
