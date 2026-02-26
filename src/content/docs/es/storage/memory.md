---
title: Almacenamiento en Memoria
description: Uso del almacenamiento en memoria para desarrollo y pruebas.
---

El soporte de almacenamiento en memoria está diseñado para el desarrollo, las pruebas o las aplicaciones de una sola instancia donde la persistencia a través de los reinicios no es crítica.

## Configuración

```go
import "github.com/fco-gt/gopotency/storage/memory"

store := memory.NewMemoryStorage()
```

## Características

- **Sin Configuración**: No se requiere una base de datos externa ni configuración adicional.
- **Alto Rendimiento**: El acceso a los datos es casi instantáneo.
- **Bloqueos Atómicos**: Implementa un bloqueo seguro para hilos para una única instancia.

## Limitaciones

:::caution
Los datos se pierden al reiniciar la aplicación. Este soporte **no es adecuado** para entornos distribuidos donde se ejecutan múltiples instancias del servidor, ya que no compartirán el mismo estado.
:::
