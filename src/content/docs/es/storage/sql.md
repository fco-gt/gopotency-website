---
title: Almacenamiento SQL
description: Implementación ligera de SQL para PostgreSQL y SQLite.
---

El soporte de almacenamiento SQL proporciona una implementación directa utilizando `database/sql`. Está optimizado para PostgreSQL y SQLite, utilizando marcadores de posición posicionales y la sintaxis "ON CONFLICT".

## Configuración

```go
import idempotencySQL "github.com/fco-gt/gopotency/storage/sql"

// Pasa tu conexión *sql.DB y el nombre de la tabla
store := idempotencySQL.NewSQLStorage(db, "idempotency_records")
```

## Esquema de la Base de Datos

Necesitas crear dos tablas. Aquí tienes el SQL para PostgreSQL/SQLite:

```sql
-- Tabla de registros
CREATE TABLE idempotency_records (
    key TEXT PRIMARY KEY,
    data BYTEA, -- o BLOB para SQLite
    expires_at TIMESTAMP
);

-- Tabla de bloqueos
CREATE TABLE idempotency_records_locks (
    key TEXT PRIMARY KEY,
    expires_at TIMESTAMP
);
```

## Características

- **Sin Dependencia de ORM**: Utiliza la biblioteca estándar `database/sql`.
- **Operaciones Atómicas**: Aprovecha las operaciones a nivel de fila para una seguridad distribuida.
- **Personalizable**: Puedes especificar el nombre de la tabla base durante la inicialización.
