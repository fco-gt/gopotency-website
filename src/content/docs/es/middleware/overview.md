---
title: Vista General de Middleware
description: Cómo funciona el middleware de GoPotency en diferentes frameworks.
---

GoPotency proporciona middleware listo para usar para los frameworks web de Go más populares. Todos los middlewares comparten la misma lógica central y configuración, lo que garantiza un comportamiento consistente independientemente del framework que elijas.

## Cómo funciona

El middleware intercepta las solicitudes entrantes y realiza los siguientes pasos:

1.  **Extracción de Clave**: Busca una clave de idempotencia (generalmente en los encabezados).
2.  **Validación**: Verifica si el método de la solicitud está permitido y si se requiere una clave.
3.  **Verificación de Idempotencia**: Consulta el almacenamiento para ver si la solicitud ya ha sido procesada.
4.  **Bloqueo**: Si es una solicitud nueva, adquiere un bloqueo atómico para evitar el procesamiento duplicado concurrente.
5.  **Ejecución**: Pasa la solicitud a tu manejador.
6.  **Almacenamiento**: Una vez que tu manejador termina, almacena la respuesta para una futura repetición.

## Frameworks Soportados

Actualmente proporcionamos soporte oficial para:

- **[Gin](/es/middleware/gin)**
- **[Echo](/es/middleware/echo)**
- **[Fiber](/es/middleware/fiber)**
- **[HTTP Estándar](/es/middleware/http)**

## Granularidad por Ruta

Una de las fortalezas de GoPotency es su flexibilidad. Puedes aplicar el middleware de forma global o solo en rutas específicas donde la idempotencia es crítica (por ejemplo, pagos, creación de pedidos).

### Global vs Específico por Ruta

Aunque puedes aplicar el middleware globalmente, recomendamos aplicarlo solo a las rutas que cambian el estado para minimizar la sobrecarga.

```go
// Ejemplo: Aplicando solo a una ruta POST específica (Gin)
r.POST("/orders", mw.Idempotency(manager), createOrder)
```

## Requerir Claves

Si deseas imponer que un cliente **deba** proporcionar una clave de idempotencia para una ruta específica, puedes establecer `RequireKey: true` en tu configuración. El middleware devolverá automáticamente un `400 Bad Request` si falta la clave.
