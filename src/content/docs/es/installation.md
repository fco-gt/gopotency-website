---
title: Instalación
description: Cómo instalar GoPotency en tu proyecto de Go.
---

Instalar **GoPotency** es sencillo usando módulos de Go.

## Prerrequisito

- Go 1.21 o superior (ya que usamos el paquete `slices` de la librería estándar).

## Comando

En tu terminal, navega al directorio de tu proyecto y ejecuta:

```bash
go get github.com/fco-gt/gopotency
```

## Importando el paquete

Luego puedes importar el paquete principal y el backend de almacenamiento que desees usar:

```go
import (
    "github.com/fco-gt/gopotency"
    "github.com/fco-gt/gopotency/storage/memory"
)
```
