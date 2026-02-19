---
title: Introducción
description: Aprenda sobre GoPotency y cómo le ayuda a crear APIs robustas.
---

**GoPotency** es un paquete de Go flexible y agnóstico al framework diseñado para manejar la idempotencia en APIs HTTP.

## ¿Qué es la Idempotencia?

La idempotencia asegura que realizar la misma petición múltiples veces produzca el mismo resultado que realizarla una sola vez, sin efectos secundarios adicionales. Esto es crucial para:

- **Procesamiento de Pagos**: Evitar cobrar dos veces a un cliente si ocurre un tiempo de espera de red.
- **Creación de Recursos**: Prevenir entradas duplicadas en una base de datos cuando un cliente reintenta una petición.
- **Operaciones Críticas**: Cualquier acción de API donde una ejecución repetida podría llevar a un estado inconsistente.

## Filosofía Principal

GoPotency fue construido con tres objetivos principales en mente:

1. **Simplicidad**: Fácil de integrar con solo unas pocas líneas de código.
2. **Flexibilidad**: Funciona con cualquier framework (Gin, net/http, Echo, etc.) y cualquier backend de almacenamiento.
3. **Robustez**: Maneja las peticiones concurrentes de forma segura y proporciona un manejo de errores claro para casos extremos como discrepancias en las peticiones.

## Cómo Funciona

Cuando llega una petición con una `Idempotency-Key`:
1. **Deduplicación**: Comprueba si ya existe una respuesta exitosa para esa clave.
2. **Bloqueo**: Si la petición es nueva, adquiere un bloqueo atómico para asegurar que ninguna otra instancia procese la misma clave simultáneamente.
3. **Almacenamiento**: Una vez terminada, guarda la respuesta (código de estado, encabezados y cuerpo).
4. **Repetición**: Las peticiones futuras con la misma clave reciben la respuesta almacenada instantáneamente.
