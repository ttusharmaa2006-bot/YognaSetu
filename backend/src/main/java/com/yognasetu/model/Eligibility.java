package com.yognasetu.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Eligibility {
    private Integer minAge;
    private Integer maxAge;
    private List<String> genders;
    private List<String> casteCategories;
    private Double maxAnnualIncome;
    private List<String> occupations;
}
