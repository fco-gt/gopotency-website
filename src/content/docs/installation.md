---
title: Installation
description: How to install GoPotency in your Go project.
---

Installing **GoPotency** is straightforward using Go modules.

## Prerequisite

- Go 1.21 or higher (as we use the `slices` package from the standard library).

## Command

In your terminal, navigate to your project directory and run:

```bash
go get github.com/fco-gt/gopotency
```

## Importing the package

You can then import the core package and the storage backend you want to use:

```go
import (
    "github.com/fco-gt/gopotency"
    "github.com/fco-gt/gopotency/storage/memory"
)
```
