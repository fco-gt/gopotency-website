---
title: Echo Middleware
description: Integrating GoPotency with the Echo web framework.
---

GoPotency provides a seamless integration with the [Echo](https://echo.labstack.com/) framework through its Echo-specific middleware.

## Installation

Ensure you have GoPotency installed:

```bash
go get github.com/fco-gt/gopotency
```

## Basic Usage

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

	// 1. Initialize storage and manager
	store := memory.NewMemoryStorage()
	manager, _ := idempotency.NewManager(idempotency.Config{
		Storage: store,
	})

	// 2. Register middleware
	e.Use(echomw.Idempotency(manager))

	// 3. Define routes
	e.POST("/orders", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "captured"})
	})

	e.Logger.Fatal(e.Start(":8080"))
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
