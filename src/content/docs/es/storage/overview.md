---
title: Vista General de Almacenamiento
description: Elegir el soporte de almacenamiento adecuado para GoPotency.
---

GoPotency requiere un soporte de almacenamiento para persistir los registros de las solicitudes y gestionar los bloqueos distribuidos. La elección del almacenamiento afecta el rendimiento, la escalabilidad y la durabilidad de tu sistema de idempotencia.

## Rol del Almacenamiento

El soporte de almacenamiento maneja dos tareas críticas:

1.  **Caché de Resultados**: Almacenar el cuerpo de la respuesta, el código de estado y los encabezados para que puedan ser repetidos.
2.  **Control de Concurrencia**: Manejar bloqueos atómicos para asegurar que dos solicitudes idénticas no comiencen a procesarse exactamente al mismo tiempo.

## Eligiendo un Soporte

| Soporte                              | Mejor Caso de Uso                     | ¿Distribuido? | Complejidad |
| :----------------------------------- | :------------------------------------ | :-----------: | :---------: |
| **[En Memoria](/es/storage/memory)** | Desarrollo, Pruebas, Nodo Único       |      No       |  Muy Baja   |
| **[Redis](/es/storage/redis)**       | APIs Distribuidas de Gran Escala      |      Sí       |    Media    |
| **[SQL](/es/storage/sql)**           | Postgres/SQLite, dependencias mínimas |      Sí       |    Media    |
| **[GORM](/es/storage/gorm)**         | Proyectos que ya usan GORM            |      Sí       |    Baja     |

## Interfaz

Si necesitas soportar una base de datos diferente (por ejemplo, MongoDB, DynamoDB), puedes implementar la interfaz `Storage`:

```go
type Storage interface {
    Get(ctx context.Context, key string) (*idempotency.Record, error)
    Set(ctx context.Context, record *idempotency.Record, ttl time.Duration) error
    Delete(ctx context.Context, key string) error
    Exists(ctx context.Context, key string) (bool, error)
    TryLock(ctx context.Context, key string, ttl time.Duration) (bool, error)
    Unlock(ctx context.Context, key string) error
    Close() error
}
```
