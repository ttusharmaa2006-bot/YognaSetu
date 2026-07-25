package com.yognasetu.service;

import com.yognasetu.dto.*;
import com.yognasetu.model.User;
import com.yognasetu.exception.ResourceNotFoundException;
import com.yognasetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private com.yognasetu.repository.SchemeRepository schemeRepository;

    @Override
    public AuthResponse registerUser(RegisterRequest request) {
        return authService.register(request);
    }

    @Override
    public AuthResponse authenticateUser(AuthRequest request) {
        LoginRequest loginRequest = new LoginRequest(request.getEmail(), request.getPassword());
        return authService.login(loginRequest);
    }

    @Override
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Override
    public void updateUserProfile(String email, UserProfileDto profileDto) {
        User user = getUserProfile(email);

        com.yognasetu.model.UserProfile profile = user.getProfile();
        if (profile == null) {
            profile = new com.yognasetu.model.UserProfile();
        }

        profile.setGender(profileDto.getGender());
        profile.setState(profileDto.getState());
        profile.setCasteCategory(profileDto.getCasteCategory());
        profile.setAnnualIncome(profileDto.getAnnualIncome());
        profile.setDob(profileDto.getDob());
        profile.setOccupation(profileDto.getOccupation());

        user.setProfile(profile);
        user.setUpdatedAt(java.time.Instant.now());
        userRepository.save(user);
    }

    @Override
    public void bookmarkScheme(String email, String schemeId) {
        User user = getUserProfile(email);
        com.yognasetu.model.Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with id: " + schemeId));

        if (user.getSavedSchemes() == null) {
            user.setSavedSchemes(new java.util.HashSet<>());
        }

        user.getSavedSchemes().add(scheme);
        user.setUpdatedAt(java.time.Instant.now());
        userRepository.save(user);
    }

    @Override
    public List<SchemeDto> getUserBookmarks(String email) {
        User user = getUserProfile(email);
        if (user.getSavedSchemes() == null || user.getSavedSchemes().isEmpty()) {
            return Collections.emptyList();
        }

        return user.getSavedSchemes().stream()
                .filter(s -> Boolean.TRUE.equals(s.getActive()))
                .map(this::convertSchemeToDto)
                .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public void removeBookmark(String email, String schemeId) {
        User user = getUserProfile(email);
        if (user.getSavedSchemes() != null) {
            user.getSavedSchemes().removeIf(scheme -> scheme.getId() != null && scheme.getId().equals(schemeId));
            user.setUpdatedAt(java.time.Instant.now());
            userRepository.save(user);
        }
    }

    private SchemeDto convertSchemeToDto(com.yognasetu.model.Scheme scheme) {
        return SchemeDto.builder()
                .id(scheme.getId())
                .title(scheme.getTitle())
                .description(scheme.getDescription())
                .category(scheme.getCategory())
                .eligibility(scheme.getEligibility())
                .benefits(scheme.getBenefits())
                .requiredDocuments(scheme.getRequiredDocuments())
                .officialWebsite(scheme.getOfficialWebsite())
                .department(scheme.getDepartment())
                .schemeType(scheme.getSchemeType())
                .lastDate(scheme.getLastDate())
                .officialLink(scheme.getOfficialLink())
                .imageUrl(scheme.getImageUrl())
                .active(scheme.getActive())
                .createdAt(scheme.getCreatedAt())
                .updatedAt(scheme.getUpdatedAt())
                .build();
    }
}

