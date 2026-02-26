---
title: Fiber Middleware
description: Integrating GoPotency with the Fiber web framework.
---

GoPotency supports the [Fiber](https://gofiber.io/) framework through a high-performance middleware designed for speed and reliability.

## Installation

Ensure you have GoPotency installed:

```bash
go get github.com/fco-gt/gopotency
```

## Basic Usage

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

	// 1. Initialize storage and manager
	store := memory.NewMemoryStorage()
	manager, _ := idempotency.NewManager(idempotency.Config{
		Storage: store,
	})

	// 2. Register middleware
	app.Use(fibermw.Idempotency(manager))

	// 3. Define routes
	app.Post("/payments", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "Payment received",
			"transaction_id": "tx_98765",
		})
	})

	app.Listen(":8080")
}
```

## Configuration

You can customize the middleware behavior by passing a `Config` object to the `NewManager` function. See the **[Configuration Guide](/guides/configuration)** for more details.

### Requiring Keys

For critical routes, you can enforce that a key must be present:

```go
manager, _ := idempotency.NewManager(idempotency.Config{
    Storage:    store,
    RequireKey: true, // Will return 400 if header is missing
})
```

## Custom Key Strategy

By default, the middleware looks for the `Idempotency-Key` header. You can change this or use a custom strategy (like request body hashing) in the manager configuration.
