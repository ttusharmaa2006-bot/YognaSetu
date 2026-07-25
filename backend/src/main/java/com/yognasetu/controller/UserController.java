package com.yognasetu.controller;

import com.yognasetu.dto.ApiResponse;
import com.yognasetu.dto.SchemeDto;
import com.yognasetu.dto.UserProfileDto;
import com.yognasetu.model.User;
import com.yognasetu.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User Controller", description = "Endpoints for user profile and bookmark management")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @Operation(summary = "Get current user profile details", description = "Returns user details and nested demographics profile")
    public ResponseEntity<ApiResponse<User>> getProfile(Principal principal) {
        User user = userService.getUserProfile(principal.getName());
        ApiResponse<User> response = ApiResponse.<User>builder()
                .message("Profile details retrieved successfully")
                .data(user)
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    @Operation(summary = "Update user demographics profile", description = "Updates caste, age, state, and income for eligibility checking validation")
    public ResponseEntity<ApiResponse<Void>> updateProfile(Principal principal, @Valid @RequestBody UserProfileDto profileDto) {
        userService.updateUserProfile(principal.getName(), profileDto);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .message("Profile updated successfully")
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bookmarks/{schemeId}")
    @Operation(summary = "Bookmark a scheme", description = "Adds a scheme reference to the user's bookmark list")
    public ResponseEntity<ApiResponse<Void>> addBookmark(Principal principal, @PathVariable String schemeId) {
        userService.bookmarkScheme(principal.getName(), schemeId);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .message("Scheme bookmarked successfully")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/bookmarks")
    @Operation(summary = "Get user's bookmarked schemes", description = "Returns a list of schemes bookmarked by the authenticated user")
    public ResponseEntity<ApiResponse<List<SchemeDto>>> getBookmarks(Principal principal) {
        List<SchemeDto> bookmarks = userService.getUserBookmarks(principal.getName());
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .message("Bookmarks list retrieved successfully")
                .data(bookmarks)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/bookmarks/{schemeId}")
    @Operation(summary = "Remove a bookmark", description = "Removes a scheme reference from the user's saved list")
    public ResponseEntity<ApiResponse<Void>> removeBookmark(Principal principal, @PathVariable String schemeId) {
        userService.removeBookmark(principal.getName(), schemeId);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .message("Bookmark removed successfully")
                .build();
        return ResponseEntity.ok(response);
    }
}
