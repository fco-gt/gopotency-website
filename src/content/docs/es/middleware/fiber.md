---
title: Middleware para Fiber
description: Integración de GoPotency con el framework web Fiber.
---

GoPotency soporta el framework [Fiber](https://gofiber.io/) a través de un middleware de alto rendimiento diseñado para la velocidad y la confiabilidad.

## Instalación

Asegúrate de tener GoPotency instalado:

```bash
go get github.com/fco-gt/gopotency
```

## Uso Básico

```go
package main

import (
	idempotency "github.com/fco-gt/gopotency"
	fibermw "github.com/fco-gt/gopotency/middleware/fiber"
	"github.com/fco-gt/gopotency/storage/memory"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// 1. Inicializar el almacenamiento y el manager
	store := memory.NewMemoryStorage()
	manager, _ := idempotency.NewManager(idempotency.Config{
		Storage: store,
	})

	// 2. Registrar el middleware
	app.Use(fibermw.Idempotency(manager))

	// 3. Definir rutas
	app.Post("/payments", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "Pago recibido",
			"transaction_id": "tx_98765",
		})
	})

	app.Listen(":8080")
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
