---
title: Almacenamiento GORM
description: Uso de GORM para la persistencia de idempotencia agnóstica de la base de datos.
---

Si ya estás usando GORM, este soporte te permite usar cualquier base de datos compatible con el ORM (PostgreSQL, MySQL, SQL Server, SQLite, etc.) sin escribir SQL personalizado.

## Configuración

```go
import (
    idempotencyGorm "github.com/fco-gt/gopotency/storage/gorm"
    "gorm.io/gorm"
)

// Pasa tu conexión *gorm.DB existente
store := idempotencyGorm.NewGormStorage(db)
```

## Migración de la Base de Datos

GoPotency requiere dos tablas: `idempotency_records` e `idempotency_locks`. Puedes crearlas automáticamente usando `AutoMigrate` de GORM:

```go
db.AutoMigrate(&idempotencyGorm.IdempotencyRecord{}, &idempotencyGorm.IdempotencyLock{})
```

## Características

- **Agnóstico de la Base de Datos**: Funciona con cualquier plataforma soportada por GORM.
- **Soporte Transaccional**: Utiliza los mecanismos estándar de GORM para las operaciones de almacenamiento.
- **Fácil Integración**: Perfecto para proyectos que ya confían en GORM para su capa de datos.
