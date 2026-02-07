package com.example.policies.service;

import com.example.policies.model.Poliza;
import com.example.policies.repository.PolizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PolizaService {

    @Autowired
    private PolizaRepository polizaRepository;

    public List<Poliza> getAll() {
        return polizaRepository.findAll();
    }

    public Optional<Poliza> getById(Long id) {
        return polizaRepository.findById(id);
    }

    public Poliza create(Poliza poliza) {
        return polizaRepository.save(poliza);
    }

    public Poliza update(Long id, Poliza details) {
        return polizaRepository.findById(id).map(poliza -> {
            poliza.setNumeroPoliza(details.getNumeroPoliza());
            poliza.setTipo(details.getTipo());
            poliza.setEstado(details.getEstado());
            return polizaRepository.save(poliza);
        }).orElseThrow(() -> new RuntimeException("Poliza not found"));
    }

    public void delete(Long id) {
        polizaRepository.deleteById(id);
    }
}
