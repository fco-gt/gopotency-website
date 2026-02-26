---
title: Performance & Benchmarks
description: Learn about GoPotency's overhead and performance goals.
---

GoPotency is designed to be lightweight and highly efficient, ensuring that idempotency checks add minimal latency to your API requests.

## Benchmarks

We run regular benchmarks to monitor performance. Below are representative results for the core manager using in-memory storage.

| Operation                    | Time        | Memory Allocation |
| :--------------------------- | :---------- | :---------------- |
| **Idempotency Check**        | ~520 ns/op  | 128 B/op          |
| **Full Flow (Lock + Store)** | ~1500 ns/op | 256 B/op          |

_Measurements taken on an Intel i7-11700K @ 3.60GHz._

## Performance Tips

To get the best performance out of GoPotency in production:

1. **Use Redis for Distributed Systems**: Redis handles distributed locking efficiently and scales better than relational databases for this specific use case.
2. **Proper TTL**: Setting an excessively large TTL for records can lead to high memory/storage usage. Choose a TTL that matches your client's retry window.
3. **Selective Middleware**: Only apply the middleware to methods that actually need idempotency (usually `POST`, `PATCH`, and `DELETE`).

## Distributed Locking

When using Redis or SQL backends, GoPotency implements distributed locking to prevent multiple server instances from processing the same request simultaneously. This is crucial for maintaining state consistency across your entire cluster.
