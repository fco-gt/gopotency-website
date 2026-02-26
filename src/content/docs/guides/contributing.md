---
title: Contributing
description: Learn how to contribute to GoPotency and use the development tools.
---

We welcome contributions of all kinds! Whether you are fixing a bug, improving documentation, or adding a new feature, your help is appreciated.

## Development Setup

To get started with development, clone the repository and install the dependencies:

```bash
git clone https://github.com/fco-gt/gopotency
cd gopotency
go mod download
```

## Using the Makefile

We include a `Makefile` to simplify common development tasks.

| Command      | Description                                                     |
| :----------- | :-------------------------------------------------------------- |
| `make test`  | Runs all unit tests with the race detector enabled.             |
| `make bench` | Runs all performance benchmarks.                                |
| `make build` | Compiles all example applications in the `examples/` directory. |
| `make lint`  | Runs the linter (requires `golangci-lint`).                     |
| `make help`  | Shows a list of all available commands.                         |

## Submitting a Pull Request

1. **Create a Branch**: Use a descriptive name like `feature/new-storage` or `fix/error-typo`.
2. **Write Tests**: Ensure your changes are covered by unit tests.
3. **Run Benchmarks**: If your change affects the core flow, run `make bench` to ensure no performance regression.
4. **Pass CI**: GitHub Actions will automatically run `make test` and `make build` on your PR.
5. **Request Review**: Once the checks pass, wait for a maintainer to review your code.
