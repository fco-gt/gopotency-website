---
title: Middleware para Gin
description: Cómo usar GoPotency con el framework web Gin.
---

El middleware para Gin es la forma más fácil de integrar la idempotencia en su aplicación Gin.

## Instalación

```bash
go get github.com/fco-gt/gopotency/middleware/gin
```

## Uso Básico

```go
import (
    "github.com/fco-gt/gopotency"
    ginmw "github.com/fco-gt/gopotency/middleware/gin"
    "github.com/fco-gt/gopotency/storage/memory"
)

func main() {
    manager, _ := idempotency.NewManager(idempotency.Config{
        Storage: memory.NewMemoryStorage(),
    })

    r := gin.Default()
    r.Use(ginmw.Idempotency(manager))

    r.POST("/pagos", manejarPago)
    r.Run()
}
```

## Cómo se comporta

- **Detección Automática**: Extrae automáticamente la clave de idempotencia según su configuración.
- **Encabezado de Repetición**: Si una respuesta se repite desde la caché, añade `X-Idempotent-Replayed: true` a los encabezados de respuesta.
- **Códigos de Estado**:
    - `409 Conflict`: Si una petición con la misma clave ya se está procesando.
    - `422 Unprocessable Entity`: Si el cuerpo de la petición difiere de la petición original para esa clave.
