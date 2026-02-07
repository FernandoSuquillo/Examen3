package com.example.claims.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Siniestro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String numeroCaso;

    private LocalDate fecha;
    private String descripcion;
    private Double montoEstimado;

    @Enumerated(EnumType.STRING)
    private EstadoSiniestro estado;

    private Long polizaId;
    private Long proveedorId;

    public enum EstadoSiniestro {
        ABIERTO, EN_PROCESO, CERRADO
    }
}
