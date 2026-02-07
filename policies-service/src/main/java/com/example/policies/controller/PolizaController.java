package com.example.policies.controller;

import com.example.policies.model.Poliza;
import com.example.policies.service.PolizaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/polizas")
@CrossOrigin(origins = "*")
public class PolizaController {

    @Autowired
    private PolizaService service;

    @GetMapping
    public List<Poliza> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poliza> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Poliza create(@RequestBody Poliza poliza) {
        return service.create(poliza);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Poliza> update(@PathVariable Long id, @RequestBody Poliza poliza) {
        try {
            return ResponseEntity.ok(service.update(id, poliza));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
