package com.yognasetu.controller;

import com.yognasetu.dto.ApiResponse;
import com.yognasetu.dto.SchemeDto;
import com.yognasetu.service.SchemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/schemes")
@Tag(name = "Scheme Controller", description = "Endpoints for discovering, searching, and managing government schemes")
public class SchemeController {

    private final SchemeService schemeService;

    private static final String SCHEME_REQUEST_EXAMPLE = "{" +
            "\"title\":\"Pradhan Mantri Awas Yojana\"," +
            "\"description\":\"Housing for all scheme providing subsidy on home loans.\"," +
            "\"category\":\"Housing\"," +
            "\"eligibility\":{" +
            "\"minAge\":18," +
            "\"maxAge\":70," +
            "\"genders\":[\"MALE\",\"FEMALE\"]," +
            "\"casteCategories\":[\"GENERAL\",\"OBC\",\"SC\",\"ST\"]," +
            "\"maxAnnualIncome\":600000.0," +
            "\"occupations\":[\"SELF_EMPLOYED\",\"SALARIED\",\"UNEMPLOYED\"]" +
            "}," +
            "\"benefits\":\"Interest subsidy up to 6.5% on home loans.\"," +
            "\"requiredDocuments\":[\"Aadhaar Card\",\"Income Certificate\",\"Identity Proof\"]," +
            "\"department\":\"Ministry of Housing and Urban Affairs\"," +
            "\"schemeType\":\"CENTRAL\"," +
            "\"officialWebsite\":\"https://pmaymis.gov.in\"," +
            "\"lastDate\":\"2026-12-31\"," +
            "\"imageUrl\":\"https://images.example.gov.in/pmay.jpg\"," +
            "\"active\":true" +
            "}";

    private static final String SCHEME_RESPONSE_EXAMPLE = "{" +
            "\"success\":true," +
            "\"message\":\"Operation successful\"," +
            "\"data\":{" +
            "\"id\":\"60d5ec4b8f8e123456789abc\"," +
            "\"title\":\"Pradhan Mantri Awas Yojana\"," +
            "\"description\":\"Housing for all scheme providing subsidy on home loans.\"," +
            "\"category\":\"Housing\"," +
            "\"eligibility\":{" +
            "\"minAge\":18," +
            "\"maxAge\":70," +
            "\"genders\":[\"MALE\",\"FEMALE\"]," +
            "\"casteCategories\":[\"GENERAL\",\"OBC\",\"SC\",\"ST\"]," +
            "\"maxAnnualIncome\":600000.0," +
            "\"occupations\":[\"SELF_EMPLOYED\",\"SALARIED\",\"UNEMPLOYED\"]" +
            "}," +
            "\"benefits\":\"Interest subsidy up to 6.5% on home loans.\"," +
            "\"requiredDocuments\":[\"Aadhaar Card\",\"Income Certificate\",\"Identity Proof\"]," +
            "\"department\":\"Ministry of Housing and Urban Affairs\"," +
            "\"schemeType\":\"CENTRAL\"," +
            "\"officialWebsite\":\"https://pmaymis.gov.in\"," +
            "\"lastDate\":\"2026-12-31\"," +
            "\"imageUrl\":\"https://images.example.gov.in/pmay.jpg\"," +
            "\"active\":true," +
            "\"createdAt\":\"2026-07-20T10:15:30.123Z\"," +
            "\"updatedAt\":\"2026-07-20T10:15:30.123Z\"" +
            "}," +
            "\"timestamp\":\"2026-07-20T10:15:30.123Z\"" +
            "}";

    private static final String SCHEME_LIST_RESPONSE_EXAMPLE = "{" +
            "\"success\":true," +
            "\"message\":\"Operation successful\"," +
            "\"data\":[{" +
            "\"id\":\"60d5ec4b8f8e123456789abc\"," +
            "\"title\":\"Pradhan Mantri Awas Yojana\"," +
            "\"description\":\"Housing for all scheme providing subsidy on home loans.\"," +
            "\"category\":\"Housing\"," +
            "\"eligibility\":{" +
            "\"minAge\":18," +
            "\"maxAge\":70," +
            "\"genders\":[\"MALE\",\"FEMALE\"]," +
            "\"casteCategories\":[\"GENERAL\",\"OBC\",\"SC\",\"ST\"]," +
            "\"maxAnnualIncome\":600000.0," +
            "\"occupations\":[\"SELF_EMPLOYED\",\"SALARIED\",\"UNEMPLOYED\"]" +
            "}," +
            "\"benefits\":\"Interest subsidy up to 6.5% on home loans.\"," +
            "\"requiredDocuments\":[\"Aadhaar Card\",\"Income Certificate\",\"Identity Proof\"]," +
            "\"department\":\"Ministry of Housing and Urban Affairs\"," +
            "\"schemeType\":\"CENTRAL\"," +
            "\"officialWebsite\":\"https://pmaymis.gov.in\"," +
            "\"lastDate\":\"2026-12-31\"," +
            "\"imageUrl\":\"https://images.example.gov.in/pmay.jpg\"," +
            "\"active\":true," +
            "\"createdAt\":\"2026-07-20T10:15:30.123Z\"," +
            "\"updatedAt\":\"2026-07-20T10:15:30.123Z\"" +
            "}]," +
            "\"timestamp\":\"2026-07-20T10:15:30.123Z\"" +
            "}";

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new scheme", description = "Creates a new scheme record (Admin only)", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Scheme created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "CreateSchemeResponse", value = SCHEME_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<SchemeDto>> createScheme(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Details of the new scheme to be created", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = SchemeDto.class), examples = @ExampleObject(name = "CreateSchemeRequest", value = SCHEME_REQUEST_EXAMPLE))) @Valid @RequestBody SchemeDto schemeDto) {
        SchemeDto created = schemeService.createScheme(schemeDto);
        ApiResponse<SchemeDto> response = ApiResponse.<SchemeDto>builder()
                .success(true)
                .message("Scheme created successfully")
                .data(created)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing scheme", description = "Updates an existing scheme by ID (Admin only)", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Scheme updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "UpdateSchemeResponse", value = SCHEME_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<SchemeDto>> updateScheme(
            @PathVariable String id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Updated scheme details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = SchemeDto.class), examples = @ExampleObject(name = "UpdateSchemeRequest", value = SCHEME_REQUEST_EXAMPLE))) @Valid @RequestBody SchemeDto schemeDto) {
        SchemeDto updated = schemeService.updateScheme(id, schemeDto);
        ApiResponse<SchemeDto> response = ApiResponse.<SchemeDto>builder()
                .success(true)
                .message("Scheme updated successfully")
                .data(updated)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a scheme", description = "Deactivates/soft deletes a scheme by ID (Admin only)", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Scheme deleted successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "DeleteSchemeResponse", value = "{\"success\":true,\"message\":\"Scheme deleted successfully\",\"timestamp\":\"2026-07-20T10:15:30.123Z\"}")))
    })
    public ResponseEntity<ApiResponse<Void>> deleteScheme(@PathVariable String id) {
        schemeService.deleteScheme(id);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .success(true)
                .message("Scheme deleted successfully")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Return all active schemes", description = "Retrieves all active schemes", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Active schemes list retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "GetActiveSchemesResponse", value = SCHEME_LIST_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<List<SchemeDto>>> getActiveSchemes() {
        List<SchemeDto> schemes = schemeService.getActiveSchemes();
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .success(true)
                .message("Active schemes retrieved successfully")
                .data(schemes)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Return scheme details", description = "Retrieves details of an active scheme by ID", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Scheme details retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "GetSchemeDetailsResponse", value = SCHEME_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<SchemeDto>> getSchemeDetails(@PathVariable String id) {
        SchemeDto scheme = schemeService.getSchemeById(id);
        ApiResponse<SchemeDto> response = ApiResponse.<SchemeDto>builder()
                .success(true)
                .message("Scheme details retrieved successfully")
                .data(scheme)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    @Operation(summary = "Search schemes by title, description, category, or department", description = "Searches for active schemes whose title, description, category, or department match the given keyword (case-insensitive)", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Search results retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "SearchSchemesResponse", value = SCHEME_LIST_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<List<SchemeDto>>> searchSchemes(@RequestParam String keyword) {
        List<SchemeDto> schemes = schemeService.searchSchemes(keyword);
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .success(true)
                .message("Search results retrieved successfully")
                .data(schemes)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Filter schemes by category", description = "Filters and returns active schemes of the given category (case-insensitive)", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Filtered schemes retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "FilterByCategoryResponse", value = SCHEME_LIST_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<List<SchemeDto>>> getSchemesByCategory(@PathVariable String category) {
        List<SchemeDto> schemes = schemeService.getSchemesByCategory(category);
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .success(true)
                .message("Schemes in category " + category + " retrieved successfully")
                .data(schemes)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/latest")
    @Operation(summary = "Get latest 6 active schemes", description = "Retrieves the latest 6 active schemes sorted by creation date in descending order", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Latest active schemes retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "LatestSchemesResponse", value = SCHEME_LIST_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<List<SchemeDto>>> getLatestSchemes() {
        List<SchemeDto> schemes = schemeService.getLatestActiveSchemes();
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .success(true)
                .message("Latest active schemes retrieved successfully")
                .data(schemes)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured schemes", description = "Retrieves the latest 5 active schemes acting as featured schemes", responses = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Featured schemes retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponse.class), examples = @ExampleObject(name = "FeaturedSchemesResponse", value = SCHEME_LIST_RESPONSE_EXAMPLE)))
    })
    public ResponseEntity<ApiResponse<List<SchemeDto>>> getFeaturedSchemes() {
        List<SchemeDto> schemes = schemeService.getFeaturedSchemes();
        ApiResponse<List<SchemeDto>> response = ApiResponse.<List<SchemeDto>>builder()
                .success(true)
                .message("Featured schemes retrieved successfully")
                .data(schemes)
                .build();
        return ResponseEntity.ok(response);
    }
}
