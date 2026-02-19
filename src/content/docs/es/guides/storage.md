---
title: Almacenamiento
description: Dónde guarda GoPotency los registros de idempotencia.
---

GoPotency requiere un backend de almacenamiento para persistir los registros de las peticiones y los bloqueos atómicos.

## Backends Disponibles

### In-Memory (Estándar)
Perfecto para desarrollo, pruebas o aplicaciones de una sola instancia donde no se requiere persistencia entre reinicios.

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

*   **Pros**: Extremadamente rápido, sin dependencias externas.
*   **Contras**: Los datos se pierden al reiniciar el servidor, no apto para sistemas distribuidos.

## Próximamente (Roadmap)

Estamos trabajando en añadir opciones de almacenamiento más robustas para entornos de producción:

- **Redis**: Ideal para sistemas distribuidos y configuraciones de alta disponibilidad.
- **SQL (PostgreSQL/MySQL)**: Para proyectos que prefieren escalado vertical o ya usan una base de datos relacional.

## Almacenamiento Personalizado

Implemente la interfaz `Storage` para usar cualquier base de datos:

```go
type MyStore struct {}

func (s *MyStore) Get(ctx context.Context, key string) (*Record, error) { ... }
func (s *MyStore) Set(ctx context.Context, record *Record, ttl time.Duration) error { ... }
// ... y otros métodos (Delete, Exists, TryLock, Unlock, Close)
```
