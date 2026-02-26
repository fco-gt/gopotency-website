---
title: Storage Backends
description: Where GoPotency stores idempotency records.
---

GoPotency requires a storage backend to persist request records and atomic locks. You can choose the one that best fits your infrastructure.

## Available Backends

### In-Memory

Designed for development, testing, or single-instance applications where persistence across restarts is not critical.

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

- **Pros**: Ultra-fast, zero configuration, no external dependencies.
- **Cons**: Data is lost on restart, limited to a single server instance.

### Redis (Distributed)

The recommended choice for high-available, distributed systems. It provides shared storage and locking across multiple server nodes.

```go
import "github.com/fco-gt/gopotency/storage/redis"

// Connect to a local or remote Redis instance
store, err := redis.NewRedisStorage(ctx, "localhost:6379", "password")
```

- **Pros**: High performance, handles distributed locking natively, scales horizontally.

### GORM (Database Agnostic)

If you are already using GORM, this backend allows you to use any database supported by the ORM (PostgreSQL, MySQL, SQLite, etc.) without writing custom SQL.

```go
import (
    idempotencyGorm "github.com/fco-gt/gopotency/storage/gorm"
    "gorm.io/gorm"
)

// Pass your existing *gorm.DB connection
store := idempotencyGorm.NewGormStorage(db)

// Important: Run AutoMigrate once
db.AutoMigrate(&idempotencyGorm.IdempotencyRecord{}, &idempotencyGorm.IdempotencyLock{})
```

### SQL (PostgreSQL/SQLite)

A lightweight SQL implementation using `database/sql` directly. Optimized for PostgreSQL and SQLite.

```go
import idempotencySQL "github.com/fco-gt/gopotency/storage/sql"

store := idempotencySQL.NewSQLStorage(db, "idempotency_records")
```

## Custom Storage

You can implement the `Storage` interface to use any other technology (MongoDB, DynamoDB, etc.):

```go
type Storage interface {
	Get(ctx context.Context, key string) (*Record, error)
	Set(ctx context.Context, record *Record, ttl time.Duration) error
	Delete(ctx context.Context, key string) error
	Exists(ctx context.Context, key string) (bool, error)
	TryLock(ctx context.Context, key string, ttl time.Duration) (bool, error)
	Unlock(ctx context.Context, key string) error
	Close() error
}
```
