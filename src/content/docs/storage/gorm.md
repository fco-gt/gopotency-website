---
title: GORM Storage
description: Using GORM for database-agnostic idempotency persistence.
---

If you are already using GORM, this backend allows you to use any database supported by the ORM (PostgreSQL, MySQL, SQL Server, SQLite, etc.) without writing custom SQL.

## Setup

```go
import (
    idempotencyGorm "github.com/fco-gt/gopotency/storage/gorm"
    "gorm.io/gorm"
)

// Pass your existing *gorm.DB connection
store := idempotencyGorm.NewGormStorage(db)
```

## Database Migration

GoPotency requires two tables: `idempotency_records` and `idempotency_locks`. You can automatically create them using GORM's `AutoMigrate`:

```go
db.AutoMigrate(&idempotencyGorm.IdempotencyRecord{}, &idempotencyGorm.IdempotencyLock{})
```

## Features

- **Database Agnostic**: Works with any platform supported by GORM.
- **Transactional Support**: Uses standard GORM mechanisms for storage operations.
- **Easy Integration**: Perfect for projects that already rely on GORM for their data layer.
