package com.example.claims.controller;

import com.example.claims.model.Siniestro;
import com.example.claims.service.SiniestroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/siniestros")
@CrossOrigin(origins = "*")
public class SiniestroController {

    @Autowired
    private SiniestroService service;

    @GetMapping
    public List<Siniestro> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Siniestro> getById(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Siniestro> create(@RequestBody Siniestro siniestro) {
        try {
            return ResponseEntity.ok(service.create(siniestro));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Siniestro> update(@PathVariable Long id, @RequestBody Siniestro siniestro) {
        try {
            return ResponseEntity.ok(service.update(id, siniestro));
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
