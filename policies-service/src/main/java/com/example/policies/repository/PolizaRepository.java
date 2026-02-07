package com.example.policies.repository;

import com.example.policies.model.Poliza;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PolizaRepository extends JpaRepository<Poliza, Long> {
    Optional<Poliza> findByNumeroPoliza(String numeroPoliza);
}
