---
title: Almacenamiento Redis
description: Uso de Redis para escalabilidad horizontal y bloqueo distribuido.
---

Redis es la opción recomendada para sistemas distribuidos de alta disponibilidad. Proporciona almacenamiento compartido y bloqueo atómico a través de múltiples nodos de servidor.

## Configuración

```go
import "github.com/fco-gt/gopotency/storage/redis"

// Conéctate a una instancia de Redis local o remota
store, err := redis.NewRedisStorage(ctx, "localhost:6379", "password")
```

## Características

- **Bloqueo Distribuido**: Maneja de forma nativa la concurrencia a través de múltiples instancias de servidor.
- **Soporte TTL**: Expira automáticamente los registros según tu configuración.
- **Escalabilidad Horizontal**: Permite que tu API escale mientras mantiene el estado de idempotencia.

## Mejores Prácticas

- **Pool de Conexiones**: `NewRedisStorage` utiliza el cliente oficial `go-redis`, que maneja el pool de conexiones.
- **Latencia de Red**: Coloca tu instancia de Redis cerca de tus nodos de API para minimizar la sobrecarga de las verificaciones de idempotencia.
