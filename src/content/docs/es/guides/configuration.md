---
title: Configuración
description: Vista detallada de las opciones de configuración de GoPotency.
---

Explore cómo personalizar GoPotency para adaptarse a sus necesidades específicas.

## La Estructura Config

La estructura `idempotency.Config` se utiliza para inicializar el manager.

```go
manager, err := idempotency.NewManager(idempotency.Config{
		// Storage es la implementación del backend (requerido)
		Storage: store,

		// TTL es el tiempo de vida de los registros. Por defecto: 24h
		TTL: 24 * time.Hour,

		// LockTimeout es el tiempo máximo que se mantiene un bloqueo. Por defecto: 5m
		LockTimeout: 5 * time.Minute,

		// KeyStrategy es la estrategia para generar claves. Por defecto: HeaderBased
		KeyStrategy: key.HeaderBased("Idempotency-Key"),

		// RequestHasher calcula un hash para validación. Por defecto: BodyHasher
		RequestHasher: hash.BodyHasher(),

		// AllowedMethods: ["POST", "PUT", "PATCH", "DELETE"] por defecto
		AllowedMethods: []string{"POST", "PUT", "PATCH", "DELETE"},

		// RequireKey si es true, devuelve 400 si falta la clave. Por defecto: false
		RequireKey: true,

		// ErrorHandler permite respuestas de error personalizadas.
		// Consulte la guía de Manejo de Errores para más detalles.
		ErrorHandler: func(err error) (statusCode int, body any) {
			return 500, gin.H{"error": err.Error()}
		},

		// Eventos (opcional)
		OnCacheHit: func(key string) {
			metrics.Increment("idempotency.hit")
		},
		OnCacheMiss: func(key string) {
			metrics.Increment("idempotency.miss")
		},
		OnLockConflict: func(key string) {
			metrics.Increment("idempotency.lock_conflict")
		},
	})
```

## Opciones Clave

### TTL (Tiempo de Vida)

Define cuánto tiempo se mantiene una respuesta en caché. Una vez expirada, la clave puede reutilizarse para una nueva petición.

### Tiempo de Bloqueo (Lock Timeout)

Previene bloqueos infinitos. Si un proceso comienza pero nunca termina (ej. el servidor se cae), el bloqueo expirará después de este tiempo, permitiendo reintentos.

### Métodos Permitidos

Por defecto, GoPotency solo aplica idempotencia a métodos de mutación (POST, PUT, PATCH, DELETE). Puede personalizar esta lista si es necesario.

### Requerir Clave (Require Key)

Si se establece en `true`, el middleware devolverá un `400 Bad Request` si falta la clave de idempotencia para un método o ruta permitida. Esto es útil para imponer la idempotencia en endpoints críticos.

## Ganchos de Eventos (Hooks)

Use ganchos para monitorear su capa de idempotencia:

```go
Config{
    OnCacheHit: func(key string) {
        metrics.Increment("idempotency.hit")
    },
    OnCacheMiss: func(key string) {
        metrics.Increment("idempotency.miss")
    },
}
```
