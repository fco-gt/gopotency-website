---
title: In-Memory Storage
description: Using in-memory storage for development and testing.
---

The in-memory storage backend is designed for development, testing, or single-instance applications where persistence across restarts is not critical.

## Setup

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

## Characteristics

- **Zero Configuration**: No external database or setup required.
- **High Performance**: Data access is nearly instantaneous.
- **Atomic Locks**: Implements thread-safe locking for a single instance.

## Limitations

:::caution
Data is lost on application restart. This backend is **not suitable** for distributed environments where multiple server instances are running, as they will not share the same state.
:::
