package com.yognasetu.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    private String gender;
    private String state;
    private String casteCategory;
    private Double annualIncome;
    private LocalDate dob;
    private String occupation;
}
