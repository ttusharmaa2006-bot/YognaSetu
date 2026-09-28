package com.yognasetu.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@Tag(name = "System Root Controller", description = "Base root health and API metadata endpoint")
public class RootController {

    @GetMapping("/")
    @Operation(summary = "Root API health check and index", description = "Returns service availability status and links to documentation and endpoints")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "YognaSetu API Server");
        response.put("version", "1.0.0");
        response.put("docs", "/swagger-ui.html");
        response.put("health", "/actuator/health");
        response.put("schemes", "/api/v1/schemes");
        return ResponseEntity.ok(response);
    }
}
