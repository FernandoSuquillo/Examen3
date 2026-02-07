package com.example.policies.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Poliza {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String numeroPoliza;

    private String tipo;
    private String estado;
}
