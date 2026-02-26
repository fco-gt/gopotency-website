---
title: Contribución
description: Aprenda cómo contribuir a GoPotency y utilizar las herramientas de desarrollo.
---

¡Damos la bienvenida a contribuciones de todo tipo! Ya sea que estés corrigiendo un error, mejorando la documentación o añadiendo una nueva característica, tu ayuda es apreciada.

## Configuración de Desarrollo

Para comenzar con el desarrollo, clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/fco-gt/gopotency
cd gopotency
go mod download
```

## Uso del Makefile

Incluimos un `Makefile` para simplificar las tareas comunes de desarrollo.

| Comando      | Descripción                                                               |
| :----------- | :------------------------------------------------------------------------ |
| `make test`  | Ejecuta todas las pruebas unitarias con el detector de carreras activado. |
| `make bench` | Ejecuta todos los benchmarks de rendimiento.                              |
| `make build` | Compila todas las aplicaciones de ejemplo en el directorio `examples/`.   |
| `make lint`  | Ejecuta el linter (requiere `golangci-lint`).                             |
| `make help`  | Muestra una lista de todos los comandos disponibles.                      |

## Envío de un Pull Request

1. **Crear una Rama**: Usa un nombre descriptivo como `feature/nuevo-almacenamiento` o `fix/error-tipografico`.
2. **Escribir Pruebas**: Asegúrate de que tus cambios estén cubiertos por pruebas unitarias.
3. **Ejecutar Benchmarks**: Si tu cambio afecta el flujo principal, ejecuta `make bench` para asegurar que no haya regresiones de rendimiento.
4. **Pasar el CI**: GitHub Actions ejecutará automáticamente `make test` y `make build` en tu PR.
5. **Solicitar Revisión**: Una vez que las comprobaciones pasen, espera a que un mantenedor revise tu código.
