package com.yognasetu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EligibilityRequest {

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Caste/Social Category is required")
    private String casteCategory;

    @NotNull(message = "Annual family income is required")
    @Min(value = 0, message = "Income cannot be negative")
    private Double annualIncome;

    @NotBlank(message = "Occupation is required")
    private String occupation;
}
