package com.example.providers.service;

import com.example.providers.model.Proveedor;
import com.example.providers.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    public List<Proveedor> getAll() {
        return proveedorRepository.findAll();
    }

    public Optional<Proveedor> getById(Long id) {
        return proveedorRepository.findById(id);
    }

    public Proveedor create(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public Proveedor update(Long id, Proveedor details) {
        return proveedorRepository.findById(id).map(proveedor -> {
            proveedor.setNombre(details.getNombre());
            proveedor.setTipo(details.getTipo());
            proveedor.setCiudad(details.getCiudad());
            return proveedorRepository.save(proveedor);
        }).orElseThrow(() -> new RuntimeException("Proveedor not found"));
    }

    public void delete(Long id) {
        proveedorRepository.deleteById(id);
    }
}
