# Sistema de Gestión de Siniestros (Distribuido)

## Descripción
Este sistema gestiona **Pólizas**, **Proveedores** y **Siniestros** mediante una arquitectura de microservicios distribuida, desplegada en Kubernetes.

## Componentes

1.  **Frontend**: Aplicación Web (React + Vite) para la gestión integral.
2.  **Policies Service**: Microservicio independiente (MySQL) para gestión de Pólizas.
3.  **Providers Service**: Microservicio independiente (PostgreSQL) para gestión de Proveedores (Talleres, Clínicas, Grúas).
4.  **Claims Service**: Microservicio central (MySQL) para gestión de Siniestros. Consume los servicios de Policies y Providers para validar la integridad de los datos.

## Tecnologías
- **Java 17 & Spring Boot 3** (Backend)
- **React 18 & Vite** (Frontend)
- **MySQL & PostgreSQL** (Bases de datos)
- **Docker & Kubernetes** (Contenedorización y Orquestación)
- **Spring Cloud OpenFeign** (Comunicación entre microservicios)

## Requisitos Previos
- Docker Desktop (con Kubernetes habilitado)
- Java 17
- Node.js (opcional, para ejecución local)

## Despliegue Automático

1.  Abra PowerShell en la carpeta raíz del proyecto.
2.  Ejecute el script de compilación y despliegue:
    ```powershell
    .\build_and_deploy.ps1
    ```
    *Este script compilará todos los servicios, creará las imágenes Docker y aplicará los manifestos de Kubernetes.*

## Verificación
Ejecute el siguiente comando para verificar que todos los pods estén corriendo:
```bash
kubectl get pods
```

## Acceso al Sistema

| Componente | URL | Descripción |
|------------|-----|-------------|
| **Frontend** | [http://localhost](http://localhost) | Interfaz gráfica |
| **Pólizas API** | [http://localhost:8081/api/polizas](http://localhost:8081/api/polizas) | Gestión Pólizas |
| **Proveedores API** | [http://localhost:8082/api/proveedores](http://localhost:8082/api/proveedores) | Gestión Proveedores |
| **Siniestros API** | [http://localhost:8083/api/siniestros](http://localhost:8083/api/siniestros) | Gestión Siniestros |

## Endpoints Principales

-   `GET /api/polizas`: Listar pólizas
-   `POST /api/polizas`: Crear póliza
-   `GET /api/proveedores`: Listar proveedores
-   `POST /api/proveedores`: Crear proveedor
-   `GET /api/siniestros`: Listar siniestros
-   `POST /api/siniestros`: Registrar siniestro (Requiere ID de Póliza y Proveedor válidos)

## Notas
-   Si los servicios no son accesibles en `localhost`, verifique que el tipo `LoadBalancer` sea soportado por su entorno de Kubernetes o utilice `kubectl port-forward`.
-   La persistencia de datos es volátil (contenedores) para propósitos de demostración.
