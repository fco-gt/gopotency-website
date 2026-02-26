---
title: Storage Overview
description: Choosing the right storage backend for GoPotency.
---

GoPotency requires a storage backend to persist request records and manage distributed locks. The choice of storage affects the performance, scalability, and durability of your idempotency system.

## Role of Storage

The storage backend handles two critical tasks:

1.  **Result Caching**: Storing the response body, status code, and headers so they can be replayed.
2.  **Concurrency Control**: Handling atomic locks to ensure that two identical requests don't start processing at the exact same time.

## Choosing a Backend

| Backend                          | Best Use Case                         | Distributed? | Complexity |
| :------------------------------- | :------------------------------------ | :----------: | :--------: |
| **[In-Memory](/storage/memory)** | Development, Testing, Single Node     |      No      |  Very Low  |
| **[Redis](/storage/redis)**      | High-scale, Distributed APIs          |     Yes      |   Medium   |
| **[SQL](/storage/sql)**          | Postgres/SQLite, minimal dependencies |     Yes      |   Medium   |
| **[GORM](/storage/gorm)**        | Existing GORM projects                |     Yes      |    Low     |

## Interface

If you need to support a different database (e.g., MongoDB, DynamoDB), you can implement the `Storage` interface:

```go
type Storage interface {
    Get(ctx context.Context, key string) (*idempotency.Record, error)
    Set(ctx context.Context, record *idempotency.Record, ttl time.Duration) error
    Delete(ctx context.Context, key string) error
    Exists(ctx context.Context, key string) (bool, error)
    TryLock(ctx context.Context, key string, ttl time.Duration) (bool, error)
    Unlock(ctx context.Context, key string) error
    Close() error
}
```
