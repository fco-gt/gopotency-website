---
title: Middleware Overview
description: How GoPotency middleware works across different frameworks.
---

GoPotency provides ready-to-use middleware for the most popular Go web frameworks. All middlewares share the same core logic and configuration, ensuring consistent behavior regardless of the framework you choose.

## How it works

The middleware intercepts incoming requests and performs the following steps:

1.  **Key Extraction**: It looks for an idempotency key (usually in the headers).
2.  **Validation**: It checks if the request method is allowed and if a key is required.
3.  **Idempotency Check**: It consults the storage to see if the request has already been processed.
4.  **Locking**: If it's a new request, it acquires an atomic lock to prevent concurrent duplicate processing.
5.  **Execution**: It passes the request to your handler.
6.  **Storage**: Once your handler finishes, it stores the response for future replay.

## Supported Frameworks

We currently provide official support for:

- **[Gin](/middleware/gin)**
- **[Echo](/middleware/echo)**
- **[Fiber](/middleware/fiber)**
- **[Standard net/http](/middleware/http)**

## Route-Specific granularity

One of GoPotency's strengths is its flexibility. You can apply the middleware globally or only to specific routes where idempotency is critical (e.g., payments, order creation).

### Global vs Route-specific

While you can apply the middleware globally, we recommend applying it only to state-changing routes to minimize overhead.

```go
// Example: Applying only to a specific POST route (Gin)
r.POST("/orders", mw.Idempotency(manager), createOrder)
```

## Requiring Keys

If you want to enforce that a client **must** provide an idempotency key for a specific route, you can set `RequireKey: true` in your configuration. The middleware will automatically return a `400 Bad Request` if the key is missing.
