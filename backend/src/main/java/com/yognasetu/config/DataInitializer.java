package com.yognasetu.config;

import com.yognasetu.enums.Role;
import com.yognasetu.enums.SchemeType;
import com.yognasetu.model.Eligibility;
import com.yognasetu.model.Scheme;
import com.yognasetu.model.User;
import com.yognasetu.repository.SchemeRepository;
import com.yognasetu.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SchemeRepository schemeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, SchemeRepository schemeRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.schemeRepository = schemeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed Admin User
        if (!userRepository.existsByEmail("admin@yognasetu.gov.in")) {
            User admin = User.builder()
                    .fullName("Admin User")
                    .name("Admin User")
                    .email("admin@yognasetu.gov.in")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ROLE_ADMIN)
                    .createdAt(Instant.now())
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Seeded default Admin user: admin@yognasetu.gov.in / Admin@123");
        }

        // Seed Standard User
        if (!userRepository.existsByEmail("user@yognasetu.gov.in")) {
            User citizen = User.builder()
                    .fullName("Citizen User")
                    .name("Citizen User")
                    .email("user@yognasetu.gov.in")
                    .password(passwordEncoder.encode("User@123"))
                    .role(Role.ROLE_USER)
                    .createdAt(Instant.now())
                    .build();
            userRepository.save(citizen);
            System.out.println(">>> Seeded default Citizen user: user@yognasetu.gov.in / User@123");
        }

        // Seed Schemes if empty
        if (schemeRepository.count() == 0) {
            Scheme pmkisan = Scheme.builder()
                    .title("Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)")
                    .description("Income support scheme for all landholding farmer families across the country to enable them to take care of expenses related to agriculture and domestic needs.")
                    .category("Agriculture")
                    .department("Ministry of Agriculture & Farmers Welfare")
                    .schemeType(SchemeType.CENTRAL)
                    .benefits("Financial benefit of ₹6,000 per year transferred directly into bank accounts in three equal installments of ₹2,000.")
                    .requiredDocuments(List.of("Aadhaar Card", "Land Holding Documents", "Bank Account Passbook"))
                    .officialWebsite("https://pmkisan.gov.in")
                    .officialLink("https://pmkisan.gov.in")
                    .imageUrl("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80")
                    .lastDate(LocalDate.of(2026, 12, 31))
                    .active(true)
                    .eligibility(Eligibility.builder()
                            .minAge(18)
                            .maxAge(75)
                            .genders(List.of("MALE", "FEMALE", "OTHER"))
                            .casteCategories(List.of("GENERAL", "OBC", "SC", "ST"))
                            .maxAnnualIncome(600000.0)
                            .occupations(List.of("Farmer"))
                            .build())
                    .createdAt(Instant.now())
                    .build();

            Scheme postMatric = Scheme.builder()
                    .title("Post Matric Scholarship for SC/ST Students")
                    .description("Scholarship scheme to provide financial assistance to Scheduled Caste and Scheduled Tribe students studying at post-matriculation or post-secondary stage.")
                    .category("Education")
                    .department("Ministry of Social Justice and Empowerment")
                    .schemeType(SchemeType.CENTRAL)
                    .benefits("Complete tuition fee waiver, maintenance allowance, and book grant up to ₹20,000 per academic year.")
                    .requiredDocuments(List.of("Caste Certificate", "Income Certificate", "Marksheet of Previous Class", "Aadhaar Card", "Bank Passbook"))
                    .officialWebsite("https://scholarships.gov.in")
                    .officialLink("https://scholarships.gov.in")
                    .imageUrl("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80")
                    .lastDate(LocalDate.of(2026, 10, 31))
                    .active(true)
                    .eligibility(Eligibility.builder()
                            .minAge(16)
                            .maxAge(30)
                            .genders(List.of("MALE", "FEMALE"))
                            .casteCategories(List.of("SC", "ST"))
                            .maxAnnualIncome(250000.0)
                            .occupations(List.of("Student"))
                            .build())
                    .createdAt(Instant.now())
                    .build();

            Scheme ayushman = Scheme.builder()
                    .title("Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)")
                    .description("The world's largest government-funded health assurance scheme providing health coverage for secondary and tertiary care hospitalization.")
                    .category("Healthcare")
                    .department("Ministry of Health and Family Welfare")
                    .schemeType(SchemeType.CENTRAL)
                    .benefits("Health cover of ₹5,000,000 (₹5 Lakhs) per family per year for secondary and tertiary hospitalization across empaneled hospitals.")
                    .requiredDocuments(List.of("Aadhaar Card", "Ration Card", "PM-JAY Golden Card"))
                    .officialWebsite("https://pmjay.gov.in")
                    .officialLink("https://pmjay.gov.in")
                    .imageUrl("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80")
                    .lastDate(LocalDate.of(2027, 12, 31))
                    .active(true)
                    .eligibility(Eligibility.builder()
                            .minAge(0)
                            .maxAge(100)
                            .genders(List.of("MALE", "FEMALE", "OTHER"))
                            .casteCategories(List.of("GENERAL", "OBC", "SC", "ST", "MINORITY"))
                            .maxAnnualIncome(300000.0)
                            .occupations(List.of("Unemployed", "Farmer", "Self-Employed"))
                            .build())
                    .createdAt(Instant.now())
                    .build();

            schemeRepository.saveAll(List.of(pmkisan, postMatric, ayushman));
            System.out.println(">>> Seeded 3 default active government schemes into MongoDB.");
        }
    }
}
