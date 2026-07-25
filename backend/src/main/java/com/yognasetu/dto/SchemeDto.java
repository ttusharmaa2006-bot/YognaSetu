package com.yognasetu.dto;

import com.yognasetu.enums.SchemeType;
import com.yognasetu.model.Eligibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchemeDto {

    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Eligibility is required")
    private Eligibility eligibility;

    @NotBlank(message = "Benefits is required")
    private String benefits;

    @NotEmpty(message = "Required documents cannot be empty")
    private List<String> requiredDocuments;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Scheme type is required")
    private SchemeType schemeType;

    @NotBlank(message = "Official website is required")
    @URL(message = "Official website must be a valid URL")
    private String officialWebsite;

    private LocalDate lastDate;

    private String officialLink;

    private String imageUrl;

    @Builder.Default
    private Boolean active = true;

    private Instant createdAt;

    private Instant updatedAt;
}
