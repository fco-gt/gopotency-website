---
title: Rendimiento y Benchmarks
description: Conozca el impacto en el rendimiento y los objetivos de GoPotency.
---

GoPotency está diseñado para ser ligero y altamente eficiente, asegurando que las comprobaciones de idempotencia añadan una latencia mínima a sus peticiones de API.

## Benchmarks

Realizamos benchmarks regulares para monitorear el rendimiento. A continuación se muestran resultados representativos para el manager principal utilizando almacenamiento en memoria.

| Operación                               | Tiempo      | Asignación de Memoria |
| :-------------------------------------- | :---------- | :-------------------- |
| **Comprobación de Idempotencia**        | ~520 ns/op  | 128 B/op              |
| **Flujo Completo (Bloqueo + Guardado)** | ~1500 ns/op | 256 B/op              |

_Mediciones realizadas en un Intel i7-11700K @ 3.60GHz._

## Consejos de Rendimiento

Para obtener el mejor rendimiento de GoPotency en producción:

1. **Use Redis para Sistemas Distribuidos**: Redis maneja el bloqueo distribuido eficientemente y escala mejor que las bases de datos relacionales para este caso de uso específico.
2. **TTL Adecuado**: Establecer un TTL excesivamente grande para los registros puede llevar a un alto uso de memoria/almacenamiento. Elija un TTL que coincida con la ventana de reintento de sus clientes.
3. **Middleware Selectivo**: Aplique el middleware solo a los métodos que realmente necesitan idempotencia (usualmente `POST`, `PATCH` y `DELETE`).

## Bloqueo Distribuido

Al usar backends de Redis o SQL, GoPotency implementa bloqueo distribuido para evitar que múltiples instancias de servidor procesen la misma petición simultáneamente. Esto es crucial para mantener la consistencia del estado en todo su clúster.
