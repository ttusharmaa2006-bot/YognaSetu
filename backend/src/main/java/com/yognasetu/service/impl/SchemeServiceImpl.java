package com.yognasetu.service.impl;

import com.yognasetu.dto.SchemeDto;
import com.yognasetu.exception.ResourceNotFoundException;
import com.yognasetu.model.Scheme;
import com.yognasetu.repository.SchemeRepository;
import com.yognasetu.service.SchemeService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SchemeServiceImpl implements SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeServiceImpl(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    @Override
    public SchemeDto createScheme(SchemeDto schemeDto) {
        Scheme scheme = convertToEntity(schemeDto);
        scheme.setCreatedAt(Instant.now());
        scheme.setUpdatedAt(Instant.now());
        Scheme saved = schemeRepository.save(scheme);
        return convertToDto(saved);
    }

    @Override
    public SchemeDto updateScheme(String id, SchemeDto schemeDto) {
        Scheme existing = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with id: " + id));

        existing.setTitle(schemeDto.getTitle());
        existing.setDescription(schemeDto.getDescription());
        existing.setCategory(schemeDto.getCategory());
        existing.setEligibility(schemeDto.getEligibility());
        existing.setBenefits(schemeDto.getBenefits());
        existing.setRequiredDocuments(schemeDto.getRequiredDocuments());
        existing.setOfficialWebsite(schemeDto.getOfficialWebsite());
        existing.setDepartment(schemeDto.getDepartment());
        existing.setSchemeType(schemeDto.getSchemeType());
        existing.setLastDate(schemeDto.getLastDate());
        existing.setOfficialLink(schemeDto.getOfficialLink());
        existing.setImageUrl(schemeDto.getImageUrl());
        
        if (schemeDto.getActive() != null) {
            existing.setActive(schemeDto.getActive());
        }
        
        existing.setUpdatedAt(Instant.now());
        Scheme saved = schemeRepository.save(existing);
        return convertToDto(saved);
    }

    @Override
    public void deleteScheme(String id) {
        Scheme existing = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with id: " + id));
        existing.setActive(false);
        existing.setUpdatedAt(Instant.now());
        schemeRepository.save(existing);
    }

    @Override
    public List<SchemeDto> getActiveSchemes() {
        return schemeRepository.findByActiveTrue()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SchemeDto getSchemeById(String id) {
        Scheme scheme = schemeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scheme not found with id: " + id));
        if (!Boolean.TRUE.equals(scheme.getActive())) {
            throw new ResourceNotFoundException("Scheme is not active");
        }
        return convertToDto(scheme);
    }

    @Override
    public List<SchemeDto> searchSchemes(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getActiveSchemes();
        }
        String sanitizedKeyword = keyword.trim().replaceAll("[\\[\\](){}*+?^$|\\\\]", "\\\\$0");
        return schemeRepository.searchSchemes(sanitizedKeyword)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SchemeDto> getSchemesByCategory(String category) {
        return schemeRepository.findByCategoryIgnoreCaseAndActiveTrue(category)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SchemeDto> getLatestActiveSchemes() {
        return schemeRepository.findTop6ByActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SchemeDto> getFeaturedSchemes() {
        return schemeRepository.findTop5ByActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private SchemeDto convertToDto(Scheme scheme) {
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

    private Scheme convertToEntity(SchemeDto dto) {
        return Scheme.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .eligibility(dto.getEligibility())
                .benefits(dto.getBenefits())
                .requiredDocuments(dto.getRequiredDocuments())
                .officialWebsite(dto.getOfficialWebsite())
                .department(dto.getDepartment())
                .schemeType(dto.getSchemeType())
                .lastDate(dto.getLastDate())
                .officialLink(dto.getOfficialLink())
                .imageUrl(dto.getImageUrl())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }
}
