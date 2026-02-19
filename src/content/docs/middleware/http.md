---
title: Standard HTTP Middleware
description: Using GoPotency with the standard library's net/http package.
---

GoPotency provides a middleware compatible with `http.Handler` for standard library usage.

## Installation

```bash
go get github.com/fco-gt/gopotency/middleware/http
```

## Basic Usage

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
    finalHandler := http.HandlerFunc(myHandler)

    // Wrap the handler
    mux.Handle("/submit", httpmw.Idempotency(manager)(finalHandler))

    http.ListenAndServe(":8080", mux)
}
```
