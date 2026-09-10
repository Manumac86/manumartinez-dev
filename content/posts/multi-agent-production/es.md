---
title: "Sistemas multi-agente en producción: qué se rompe de verdad"
excerpt: "Después de lanzar AKAIO v1.0 — Gen AI, agentes y búsqueda semántica — los fallos nunca fueron el modelo. Fueron estado, coste y confianza."
tag: AI Engineering
date: 2026-08-21
template: article
source: es
---

## El modelo casi nunca es el problema

Cuando lanzamos AKAIO v1.0 teníamos una arquitectura de agentes razonable: un orquestador, media docena de agentes especializados y búsqueda semántica sobre Milvus. En los primeros noventa días de producción, ninguno de los incidentes graves vino del modelo. Vinieron de tres sitios mucho menos glamurosos.

## 1. Estado

Un agente que llama a otro agente que llama a una herramienta genera un árbol de ejecución. Si ese árbol no se persiste, cualquier reintento parte de cero, y un timeout a mitad de camino deja al usuario con medio resultado y una factura entera.

```ts
type RunStep = {
  id: string
  parent?: string
  agent: string
  input: unknown
  output?: unknown
  status: "pending" | "ok" | "failed"
}
```

La solución no fue un framework nuevo: fue tratar cada paso como un evento inmutable y reconstruir el estado desde el log.

## 2. Coste

El coste por usuario no escala con el número de peticiones, escala con la **profundidad** de la conversación. Un agente que resume el historial cada tres turnos ahorró más dinero que cualquier cambio de modelo.

## 3. Confianza

> Un sistema que acierta el 95 % de las veces y no sabe cuándo falla es peor que uno que acierta el 85 % y lo dice.

Añadimos una puntuación de confianza por respuesta y una vía de escape explícita hacia un humano. La tasa de abandono bajó a la mitad.

## Qué haría distinto

- Persistir el árbol de ejecución desde el día uno.
- Medir coste por conversación, no por request.
- Diseñar el "no lo sé" antes que el "aquí tienes".
