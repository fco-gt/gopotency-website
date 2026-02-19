---
title: Gin Middleware
description: How to use GoPotency with the Gin web framework.
---

The Gin middleware is the easiest way to integrate idempotency into your Gin application.

## Installation

```bash
go get github.com/fco-gt/gopotency/middleware/gin
```

## Basic Usage

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

    r.POST("/payments", handlePayment)
    r.Run()
}
```

## How it behaves

- **Automatic Detection**: It automatically extracts the idempotency key based on your configuration.
- **Replay Header**: If a response is replayed from cache, it adds `X-Idempotent-Replayed: true` to the response headers.
- **Status Codes**:
    - `409 Conflict`: If a request with the same key is already being processed.
    - `422 Unprocessable Entity`: If the request body differs from the original request for that key.
