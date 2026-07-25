package com.yognasetu.controller;

import com.yognasetu.dto.ApiResponse;
import com.yognasetu.dto.SchemeDto;
import com.yognasetu.service.SchemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin Operations Controller", description = "Privileged routes for schema curators and platform administrators")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    @Autowired
    private SchemeService schemeService;

    @PostMapping("/schemes")
    @Operation(summary = "Create a new government scheme", description = "Saves a new scheme details definition document")
    public ResponseEntity<ApiResponse<SchemeDto>> createNewScheme(@Valid @RequestBody SchemeDto schemeDto) {
        SchemeDto created = schemeService.createScheme(schemeDto);
        ApiResponse<SchemeDto> response = ApiResponse.<SchemeDto>builder()
                .message("Scheme created successfully")
                .data(created)
                .build();
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/schemes/{id}")
    @Operation(summary = "Update an existing scheme record", description = "Updates eligibility conditions or documents needed list")
    public ResponseEntity<ApiResponse<SchemeDto>> updateSchemeDetails(@PathVariable String id, @Valid @RequestBody SchemeDto schemeDto) {
        SchemeDto updated = schemeService.updateScheme(id, schemeDto);
        ApiResponse<SchemeDto> response = ApiResponse.<SchemeDto>builder()
                .message("Scheme updated successfully")
                .data(updated)
                .build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/schemes/{id}")
    @Operation(summary = "Soft delete / deactivate a scheme", description = "Deactivates a scheme so it is filtered out of catalog searches")
    public ResponseEntity<ApiResponse<Void>> deleteScheme(@PathVariable String id) {
        schemeService.deleteScheme(id);
        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .message("Scheme deleted/deactivated successfully")
                .build();
        return ResponseEntity.ok(response);
    }
}
