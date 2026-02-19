---
title: Key Strategies
description: Learn how GoPotency generates and identifies idempotency keys.
---

A `KeyStrategy` is responsible for extracting or generating a unique identifier for a request.

## Available Strategies

### Header-Based (Default)

The most common approach. The client is responsible for sending a unique key in a specific HTTP header.

```go
import "github.com/fco-gt/gopotency/key"

// Default behavior: looks for "Idempotency-Key"
manager, err := idempotency.NewManager(idempotency.Config{
		KeyStrategy: key.HeaderBased("Idempotency-Key"),
	})
```

### Body Hash

Useful when you want to enforce idempotency based on the request content itself, without requiring the client to manage keys.

```go
KeyStrategy: key.BodyHash()
```

_Note: This will generate a SHA-256 hash of the request body._

### Composite

A hybrid approach. It first tries to find a key in the headers; if not found, it falls back to hashing the request body.

```go
KeyStrategy: key.Composite("Idempotency-Key")
```

## Custom Strategy

You can implement your own strategy by fulfilling the `KeyStrategy` interface:

```go
type MyCustomStrategy struct{}

func (s *MyCustomStrategy) Generate(req *idempotency.Request) (string, error) {
    // Your custom logic here (e.g., using a combination of UserID and OrderID)
    return fmt.Sprintf("user-%d-order-%s", req.UserID, req.Body.OrderID), nil
}
```
