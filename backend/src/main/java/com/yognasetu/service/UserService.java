package com.yognasetu.service;

import com.yognasetu.dto.*;
import com.yognasetu.model.User;
import java.util.List;

public interface UserService {
    AuthResponse registerUser(RegisterRequest request);
    AuthResponse authenticateUser(AuthRequest request);
    User getUserProfile(String email);
    void updateUserProfile(String email, UserProfileDto profileDto);
    void bookmarkScheme(String email, String schemeId);
    List<SchemeDto> getUserBookmarks(String email);
    void removeBookmark(String email, String schemeId);
}
