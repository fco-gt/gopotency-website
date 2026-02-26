---
title: Redis Storage
description: Using Redis for horizontal scalability and distributed locking.
---

Redis is the recommended choice for high-availability, distributed systems. It provides shared storage and atomic locking across multiple server nodes.

## Setup

```go
import "github.com/fco-gt/gopotency/storage/redis"

// Connect to a local or remote Redis instance
store, err := redis.NewRedisStorage(ctx, "localhost:6379", "password")
```

## Features

- **Distributed Locking**: Natively handles concurrency across multiple server instances.
- **TTL Support**: Automatically expires records based on your configuration.
- **Horizontal Scaling**: Allows your API to scale while maintaining idempotency state.

## Best Practices

- **Connection Pooling**: `NewRedisStorage` uses the official `go-redis` client, which handles connection pooling.
- **Network Latency**: Place your Redis instance close to your API nodes to minimize the overhead of idempotency checks.
