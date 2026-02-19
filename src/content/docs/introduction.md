---
title: Introduction
description: Learn about GoPotency and how it helps you build robust APIs.
---

**GoPotency** is a flexible, framework-agnostic Go package designed to handle idempotency in HTTP APIs.

## What is Idempotency?

Idempotency ensures that performing the same request multiple times produces the same result as performing it once, without additional side effects. This is crucial for:

- **Payment Processing**: Avoiding double-charging a customer if a network timeout occurs.
- **Resource Creation**: Preventing duplicate entries in a database when a client retries a request.
- **Critical Operations**: Any API action where a repeated execution could lead to inconsistent state.

## Core Philosophy

GoPotency was built with three main goals in mind:

1. **Simplicity**: Easy to integrate with just a few lines of code.
2. **Flexibility**: Works with any framework (Gin, net/http, Echo, etc.) and any storage backend.
3. **Robustness**: Handles concurrent requests safely and provides clear error handling for edge cases like request mismatches.

## How it Works

When a request arrives with an `Idempotency-Key`:
1. **Deduplication**: It checks if a successful response for that key already exists.
2. **Locking**: If the request is new, it acquires an atomic lock to ensure no other instance processes the same key simultaneously.
3. **Caching**: Once finished, it stores the response (status code, headers, and body).
4. **Replaying**: Future requests with the same key receive the cached response instantly.
