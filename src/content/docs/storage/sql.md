---
title: SQL Storage
description: Lightweight SQL implementation for PostgreSQL and SQLite.
---

The SQL storage backend provides a direct implementation using `database/sql`. It is optimized for PostgreSQL and SQLite, using positional placeholders and "ON CONFLICT" syntax.

## Setup

```go
import idempotencySQL "github.com/fco-gt/gopotency/storage/sql"

// Pass your *sql.DB connection and the table name
store := idempotencySQL.NewSQLStorage(db, "idempotency_records")
```

## Database Schema

You need to create two tables. Here is the SQL for PostgreSQL/SQLite:

```sql
-- Records table
CREATE TABLE idempotency_records (
    key TEXT PRIMARY KEY,
    data BYTEA, -- or BLOB for SQLite
    expires_at TIMESTAMP
);

-- Locks table
CREATE TABLE idempotency_records_locks (
    key TEXT PRIMARY KEY,
    expires_at TIMESTAMP
);
```

## Features

- **No ORM Dependency**: Uses the standard library's `database/sql`.
- **Atomic Operations**: Leverages row-level operations for distributed safety.
- **Customizable**: You can specify the base table name during initialization.
