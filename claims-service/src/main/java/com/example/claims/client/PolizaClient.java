package com.example.claims.client;

import com.example.claims.dto.PolizaDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "policies-service", url = "${POLICIES_SERVICE_URL:http://localhost:8081/api/polizas}")
public interface PolizaClient {
    @GetMapping("/{id}")
    PolizaDTO getById(@PathVariable("id") Long id);
}
