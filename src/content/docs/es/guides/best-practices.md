---
title: Mejores Prácticas
description: Cómo implementar eficazmente la idempotencia en tus APIs de Go.
---

La idempotencia es una herramienta poderosa, pero debe implementarse estratégicamente para evitar sobrecargas y complejidades innecesarias. A continuación se presentan algunas mejores prácticas para usar GoPotency en producción.

## Identificación de Rutas Idempotentes

No todos los endpoints necesitan una capa de control de idempotencia. Como regla general, debes centrarte en las operaciones no idempotentes o aquellas con efectos secundarios críticos.

### ✅ Cuándo usar GoPotency:

- **Creación de Recursos (POST)**: Es el caso de uso principal. Evita que reintentos de red creen múltiples pedidos, procesen dos veces un pago o dupliquen registros de usuarios.
- **Operaciones No Deterministas (PATCH)**: Cuando una actualización depende del estado actual (ej. "incrementar: 1"). Al ser una operación incremental, repetirla sin control alteraría el resultado final.
- **Operaciones Asíncronas**: Al disparar tareas de larga duración (ej. generar un reporte pesado). Si la conexión se agota y el cliente reintenta, la librería servirá la respuesta que ya se está procesando o que ya finalizó.

### ❌ Cuándo omitirla:

- **Lectura (GET/HEAD/OPTIONS)**: Son seguros e inherentemente idempotentes. Añadir GoPotency aquí solo añade latencia y consumo de almacenamiento innecesario.
- **Reemplazos Totales (PUT)**: Según el estándar HTTP, un PUT debe ser idempotente (el resultado de 1 o 100 solicitudes es el mismo recurso). Úsalo solo si tu implementación de PUT tiene efectos secundarios secundarios.
- **Eliminaciones (DELETE)**: Una vez que un recurso se borra, ya no está. Repetir la solicitud no cambia el estado del servidor.

## Elegir la Estrategia Adecuada

GoPotency admite múltiples formas de identificar una solicitud.

### Basado en Encabezados (Recomendado)

Los clientes proporcionan una `Idempotency-Key` única (generalmente un UUID). Este es el estándar de oro por varias razones:

- **Intención del Cliente**: El cliente te dice explícitamente "esto es un reintento".
- **Seguridad**: Evita colisiones entre diferentes solicitudes del mismo usuario.

### Hashing de la Solicitud

Si no puedes confiar en que los clientes proporcionen encabezados, puedes realizar un hash del cuerpo, el método y la ruta de la solicitud.

- **Pros**: Ajustable al cliente.
- **Contras**: Pequeños cambios en el cuerpo (por ejemplo, espacios en blanco) resultan en un hash diferente. Úsalo con precaución.

## Selección de TTL

¿Cuánto tiempo debes conservar un registro?

- **Pagos**: Conserva los registros durante al menos **24-48 horas**. Si un usuario reintenta su pago después de una hora, definitivamente quieres evitar un doble cargo.
- **Creación de Pedidos**: **2-4 horas** suelen ser suficientes para las sesiones de compra típicas.
- **Tareas no críticas**: **30-60 minutos**.

## Selección de Almacenamiento

- **Instancia Única**: Usa **[En Memoria](/es/storage/memory)** por simplicidad.
- **Distribuido/Serverless**: **Debes** usar **[Redis](/es/storage/redis)** o una **base de datos (SQL/GORM)** para compartir el estado entre nodos.

## Manejo de Errores

Siempre verifica el encabezado `X-Idempotent-Replayed` en el código de tu cliente. Si es `true`, sabes que la solicitud se deduplicó con éxito, lo que puede ser útil para el registro o la depuración.
