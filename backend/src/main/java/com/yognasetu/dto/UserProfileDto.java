package com.yognasetu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Caste category is required")
    private String casteCategory;

    @NotNull(message = "Annual income is required")
    @Min(value = 0, message = "Annual income cannot be negative")
    private Double annualIncome;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dob;

    @NotBlank(message = "Occupation is required")
    private String occupation;
}
