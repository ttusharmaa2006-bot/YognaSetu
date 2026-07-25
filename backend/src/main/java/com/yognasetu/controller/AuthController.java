package com.yognasetu.controller;

import com.yognasetu.dto.ApiResponse;
import com.yognasetu.dto.AuthRequest;
import com.yognasetu.dto.AuthResponse;
import com.yognasetu.dto.LoginRequest;
import com.yognasetu.dto.RegisterRequest;
import com.yognasetu.model.User;
import com.yognasetu.service.AuthService;
import com.yognasetu.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping({"/api/v1/auth", "/api/auth"})
@Tag(name = "Authentication Controller", description = "Endpoints for user registration and login session validation")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user record with standard citizen or administrator rights")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        ApiResponse<AuthResponse> apiResponse = ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("User registered successfully")
                .data(response)
                .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user credentials", description = "Validates the user email and password, and returns a signed JWT")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        ApiResponse<AuthResponse> apiResponse = ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Authentication successful")
                .data(response)
                .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get current authenticated user", description = "Returns details of the currently authenticated session user")
    public ResponseEntity<ApiResponse<AuthResponse>> getMe(Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User user = userService.getUserProfile(principal.getName());
        AuthResponse response = AuthResponse.builder()
                .userId(user.getId())
                .name(user.getFullName() != null ? user.getFullName() : user.getName())
                .role(user.getRole() != null ? user.getRole().name() : "ROLE_USER")
                .build();
        ApiResponse<AuthResponse> apiResponse = ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("User session is active")
                .data(response)
                .build();
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
