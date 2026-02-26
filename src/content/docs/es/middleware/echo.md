---
title: Middleware para Echo
description: Integración de GoPotency con el framework web Echo.
---

GoPotency proporciona una integración perfecta con el framework [Echo](https://echo.labstack.com/) a través de su middleware específico para Echo.

## Instalación

Asegúrate de tener GoPotency instalado:

```bash
go get github.com/fco-gt/gopotency
```

## Uso Básico

```go
package main

import (
	"net/http"

	idempotency "github.com/fco-gt/gopotency"
	echomw "github.com/fco-gt/gopotency/middleware/echo"
	"github.com/fco-gt/gopotency/storage/memory"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// 1. Inicializar el almacenamiento y el manager
	store := memory.NewMemoryStorage()
	manager, _ := idempotency.NewManager(idempotency.Config{
		Storage: store,
	})

	// 2. Registrar el middleware
	e.Use(echomw.Idempotency(manager))

	// 3. Definir rutas
	e.POST("/orders", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "captured"})
	})

	e.Logger.Fatal(e.Start(":8080"))
}
```

## Configuración

Puedes personalizar el comportamiento del middleware pasando un objeto `Config` a la función `NewManager`. Consulta la **[Guía de Configuración](/es/guides/configuration)** para más detalles.

### Requerir Claves

Para rutas críticas, puedes imponer que una clave debe estar presente:

```go
manager, _ := idempotency.NewManager(idempotency.Config{
    Storage:    store,
    RequireKey: true, // Devolverá 400 si falta el encabezado
})
```

## Estrategia de Clave Personalizada

Por defecto, el middleware busca el encabezado `Idempotency-Key`. Puedes cambiar esto o usar una estrategia personalizada (como el hashing del cuerpo de la solicitud) en la configuración del manager.
