package com.example.claims.client;

import com.example.claims.dto.ProveedorDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "providers-service", url = "${PROVIDERS_SERVICE_URL:http://localhost:8082/api/proveedores}")
public interface ProveedorClient {
    @GetMapping("/{id}")
    ProveedorDTO getById(@PathVariable("id") Long id);
}
