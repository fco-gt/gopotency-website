---
title: Estrategias de Clave
description: Aprenda cómo GoPotency genera e identifica las claves de idempotencia.
---

Una `KeyStrategy` es responsable de extraer o generar un identificador único para una petición.

## Estrategias Disponibles

### Header-Based (Predeterminada)

El enfoque más común. El cliente es responsable de enviar una clave única en un encabezado HTTP específico.

```go
import "github.com/fco-gt/gopotency/key"

// Comportamiento por defecto: busca "Idempotency-Key"
manager, err := idempotency.NewManager(idempotency.Config{
    KeyStrategy: key.HeaderBased("Idempotency-Key"),
  })
```

### Body Hash

Útil cuando desea forzar la idempotencia basada en el contenido de la petición misma, sin requerir que el cliente maneje las claves.

```go
KeyStrategy: key.BodyHash()
```

_Nota: Esto generará un hash SHA-256 del cuerpo de la petición._

### Composite

Un enfoque híbrido. Primero intenta encontrar una clave en los encabezados; si no la encuentra, recurre al hash del cuerpo de la petición.

```go
KeyStrategy: key.Composite("Idempotency-Key")
```

## Estrategia Personalizada

Puede implementar su propia estrategia cumpliendo con la interfaz `KeyStrategy`:

```go
type MyCustomStrategy struct{}

func (s *MyCustomStrategy) Generate(req *idempotency.Request) (string, error) {
    // Tu logica customizada (ej., usando una combinacion de UserID y OrderID)
    return fmt.Sprintf("user-%d-order-%s", req.UserID, req.Body.OrderID), nil
}
```
