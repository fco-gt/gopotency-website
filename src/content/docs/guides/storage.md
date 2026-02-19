---
title: Storage Backends
description: Where GoPotency stores idempotency records.
---

GoPotency requires a storage backend to persist request logs and atomic locks.

## Available Backends

### In-Memory (Standard)
Perfect for development, testing, or single-instance applications where persistence across restarts is not required.

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

*   **Pros**: Extremely fast, no external dependencies.
*   **Cons**: Data is lost on server restart, not suitable for distributed systems.

## Roadmap

We are working on adding more robust storage options for production environments:

- **Redis**: Ideal for distributed systems and high-availability setups.
- **SQL (PostgreSQL/MySQL)**: For projects that prefer vertical scaling or already use a relational database.

## Custom Storage

Implement the `Storage` interface to use any database:

```go
type MyStore struct {}

func (s *MyStore) Get(ctx context.Context, key string) (*Record, error) { ... }
func (s *MyStore) Set(ctx context.Context, record *Record, ttl time.Duration) error { ... }
// ... and other methods (Delete, Exists, TryLock, Unlock, Close)
```
