package com.yognasetu.model;

import com.yognasetu.enums.SchemeType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "schemes")
public class Scheme {

    @Id
    private String id;

    @Indexed(unique = true)
    private String title;

    private String description;

    private String category;

    private Eligibility eligibility;

    private String benefits;

    private List<String> requiredDocuments;

    private String officialWebsite;

    private String department;

    private SchemeType schemeType;

    private LocalDate lastDate;

    private String officialLink;

    private String imageUrl;

    @Builder.Default
    private Boolean active = true;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
