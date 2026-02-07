package com.example.providers.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoProveedor tipo;

    private String ciudad;

    public enum TipoProveedor {
        TALLER, CLINICA, GRUA
    }
}
