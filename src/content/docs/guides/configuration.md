---
title: Configuration
description: Detailed look at GoPotency configuration options.
---

Explore how to customize GoPotency to fit your specific needs.

## The Config Struct

The `idempotency.Config` struct is used to initialize the manager.

```go
manager, err := idempotency.NewManager(idempotency.Config{
	// Storage is the backend storage implementation (required)
		Storage: store,

    // TTL is the time-to-live for idempotency records. Default: 24h
		TTL: 24 * time.Hour,

    // LockTimeout is the maximum time a lock can be held. Default: 5m
		LockTimeout: 5 * time.Minute,

    // KeyStrategy is the strategy for generating keys. Default: HeaderBased
		KeyStrategy: key.HeaderBased("Idempotency-Key"),

    // RequestHasher computes a hash for validation. Default: BodyHasher
		RequestHasher: hash.BodyHasher(),

    // AllowedMethods: ["POST", "PUT", "PATCH", "DELETE"] by default
		AllowedMethods: []string{"POST", "PUT", "PATCH", "DELETE"},

    // ErrorHandler allows custom error responses.
    // See the Error Handling guide for more details.
		ErrorHandler: func(err error) (statusCode int, body any) {
			return 500, gin.H{"error": err.Error()}
		},

    // Events (optional)
		OnCacheHit: func(key string) {
			metrics.Increment("idempotency.hit")
		},
		OnCacheMiss: func(key string) {
			metrics.Increment("idempotency.miss")
		},
		OnLockConflict: func(key string) {
			metrics.Increment("idempotency.lock_conflict")
		},
	})
```

## Key Options

### TTL (Time To Live)

Defines how long a response is kept in cache. Once expired, the key can be reused for a new request.

### Lock Timeout

Prevents deadlocks. If a process starts but never finishes (e.g., the server crashes), the lock will expire after this time, allowing retries.

### Allowed Methods

By default, GoPotency only applies idempotency to mutation methods (POST, PUT, PATCH, DELETE). You can customize this list if needed.

## Event Hooks

Use hooks to monitor your idempotency layer:

```go
Config{
    OnCacheHit: func(key string) {
        metrics.Increment("idempotency.hit")
    },
    OnCacheMiss: func(key string) {
        metrics.Increment("idempotency.miss")
    },
}
```
