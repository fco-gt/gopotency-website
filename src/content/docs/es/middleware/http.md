---
title: Middleware HTTP Estándar
description: Usando GoPotency con el paquete net/http de la librería estándar.
---

GoPotency proporciona un middleware compatible con `http.Handler` para uso con la librería estándar.

## Instalación

```bash
go get github.com/fco-gt/gopotency/middleware/http
```

## Uso Básico

```go
import (
    "github.com/fco-gt/gopotency"
    httpmw "github.com/fco-gt/gopotency/middleware/http"
    "github.com/fco-gt/gopotency/storage/memory"
)

func main() {
    manager, _ := idempotency.NewManager(idempotency.Config{
        Storage: memory.NewMemoryStorage(),
    })

    mux := http.NewServeMux()
    manejadorFinal := http.HandlerFunc(miManejador)

    // Envolver el manejador
    mux.Handle("/enviar", httpmw.Idempotency(manager)(manejadorFinal))

    http.ListenAndServe(":8080", mux)
}
```
