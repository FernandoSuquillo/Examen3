package com.example.claims.service;

import com.example.claims.client.PolizaClient;
import com.example.claims.client.ProveedorClient;
import com.example.claims.dto.PolizaDTO;
import com.example.claims.dto.ProveedorDTO;
import com.example.claims.model.Siniestro;
import com.example.claims.repository.SiniestroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SiniestroService {

    @Autowired
    private SiniestroRepository repository;

    @Autowired
    private PolizaClient polizaClient;

    @Autowired
    private ProveedorClient proveedorClient;

    public List<Siniestro> getAll() {
        return repository.findAll();
    }

    public Optional<Siniestro> getById(Long id) {
        return repository.findById(id);
    }

    public Siniestro create(Siniestro siniestro) {
        // Validate Poliza
        PolizaDTO poliza = polizaClient.getById(siniestro.getPolizaId());
        if (poliza == null) {
            throw new RuntimeException("Poliza no encontrada");
        }

        // Validate Proveedor
        ProveedorDTO proveedor = proveedorClient.getById(siniestro.getProveedorId());
        if (proveedor == null) {
            throw new RuntimeException("Proveedor no encontrado");
        }

        return repository.save(siniestro);
    }

    public Siniestro update(Long id, Siniestro details) {
        return repository.findById(id).map(siniestro -> {
            siniestro.setFecha(details.getFecha());
            siniestro.setDescripcion(details.getDescripcion());
            siniestro.setMontoEstimado(details.getMontoEstimado());
            siniestro.setEstado(details.getEstado());

            if (details.getPolizaId() != null) {
                PolizaDTO p = polizaClient.getById(details.getPolizaId());
                if (p != null)
                    siniestro.setPolizaId(details.getPolizaId());
            }
            if (details.getProveedorId() != null) {
                ProveedorDTO pr = proveedorClient.getById(details.getProveedorId());
                if (pr != null)
                    siniestro.setProveedorId(details.getProveedorId());
            }

            return repository.save(siniestro);
        }).orElseThrow(() -> new RuntimeException("Siniestro no encontrado"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
