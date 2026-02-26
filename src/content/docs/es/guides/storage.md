---
title: Almacenamiento
description: Dónde guarda GoPotency los registros de idempotencia.
---

GoPotency requiere un backend de almacenamiento para persistir los registros de las peticiones y los bloqueos atómicos. Puedes elegir el que mejor se adapte a tu infraestructura.

## Backends Disponibles

### In-Memory

Diseñado para desarrollo, pruebas o aplicaciones de una sola instancia donde la persistencia entre reinicios no es crítica.

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

- **Pros**: Ultra-rápido, configuración cero, sin dependencias externas.
- **Contras**: Los datos se pierden al reiniciar, limitado a una sola instancia de servidor.

### Redis (Distribuido)

La opción recomendada para sistemas distribuidos de alta disponibilidad. Proporciona almacenamiento compartido y bloqueo entre múltiples nodos de servidor.

```go
import "github.com/fco-gt/gopotency/storage/redis"

// Conectar a una instancia de Redis local o remota
store, err := redis.NewRedisStorage(ctx, "localhost:6379", "password")
```

- **Pros**: Alto rendimiento, maneja el bloqueo distribuido de forma nativa, escala horizontalmente.

### GORM (Agnóstico de Base de Datos)

Si ya usas GORM, este backend permite usar cualquier base de datos soportada por el ORM (PostgreSQL, MySQL, SQLite, etc.) sin escribir SQL personalizado.

```go
import (
    idempotencyGorm "github.com/fco-gt/gopotency/storage/gorm"
    "gorm.io/gorm"
)

// Pasa tu conexión *gorm.DB existente
store := idempotencyGorm.NewGormStorage(db)

// Importante: Ejecuta AutoMigrate una vez
db.AutoMigrate(&idempotencyGorm.IdempotencyRecord{}, &idempotencyGorm.IdempotencyLock{})
```

### SQL (PostgreSQL/SQLite)

Una implementación ligera de SQL que usa `database/sql` directamente. Optimizada para PostgreSQL y SQLite.

```go
import idempotencySQL "github.com/fco-gt/gopotency/storage/sql"

store := idempotencySQL.NewSQLStorage(db, "idempotency_records")
```

## Almacenamiento Personalizado

Puedes implementar la interfaz `Storage` para usar cualquier otra tecnología (MongoDB, DynamoDB, etc.):

```go
type Storage interface {
	Get(ctx context.Context, key string) (*Record, error)
	Set(ctx context.Context, record *Record, ttl time.Duration) error
	Delete(ctx context.Context, key string) error
	Exists(ctx context.Context, key string) (bool, error)
	TryLock(ctx context.Context, key string, ttl time.Duration) (bool, error)
	Unlock(ctx context.Context, key string) error
	Close() error
}
```
