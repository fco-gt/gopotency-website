---
title: Best Practices
description: How to effectively implement idempotency in your Go APIs.
---

Idempotency is a powerful tool, but it should be implemented strategically to avoid unnecessary overhead and complexity. Below are some best practices for using GoPotency in production.

## Identifying Idempotent Routes

Not every endpoint needs an idempotency control layer. As a general rule, you should focus on non-idempotent operations or those with critical side effects.

### ✅ When to use GoPotency:

- **Resource Creation (POST)**: This is the primary use case. It prevents network retries from creating multiple orders, processing a payment twice, or duplicating user records.
- **Non-Deterministic Operations (PATCH)**: When an update depends on the current state (e.g., "increment: 1"). As an incremental operation, repeating it without control would alter the final result.
- **Asynchronous Operations**: When triggering long-running tasks (e.g., generating a heavy report). If the connection timeouts and the client retries, the library will serve the response that is already being processed or has already finished.

### ❌ When to omit it:

- **Read Operations (GET/HEAD/OPTIONS)**: These are safe and inherently idempotent. Adding GoPotency here only adds unnecessary latency and storage consumption.
- **Total Replacements (PUT)**: According to the HTTP standard, a PUT must be idempotent (the result of 1 or 100 requests is the same resource). Use it only if your PUT implementation has secondary side effects.
- **Deletions (DELETE)**: Once a resource is deleted, it's gone. Repeating the request doesn't change the server state.

## Choosing the Right Strategy

GoPotency supports multiple ways to identify a request.

### Header-Based (Recommended)

Clients provide a unique `Idempotency-Key` (usually a UUID). This is the gold standard for many reasons:

- **Client Intent**: The client explicitly tells you "this is a retry".
- **Safety**: It prevents collisions between different requests from the same user.

### Request Hashing

If you can't rely on clients to provide headers, you can hash the request body, method, and path.

- **Pros**: Client-agnostic.
- **Cons**: Small changes in the body (e.g., whitespace) result in a different hash. Use with caution.

## TTL Selection

How long should you keep a record?

- **Payments**: Keep records for at least **24-48 hours**. If a user retries their payment after an hour, you definitely want to prevent a double charge.
- **Order Creation**: **2-4 hours** is usually sufficient for typical shopping sessions.
- **Non-critical tasks**: **30-60 minutes**.

## Storage Selection

- **Single Instance**: Use **[In-Memory](/storage/memory)** for simplicity.
- **Distributed/Serverless**: You **must** use **[Redis](/storage/redis)** or a **database (SQL/GORM)** to share state across nodes.

## Error Handling

Always check the `X-Idempotent-Replayed` header in your client code. If it's `true`, you know the request was successfully deduplicated, which can be useful for logging or debugging.
