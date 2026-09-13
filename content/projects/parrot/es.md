---
name: "Parrot"
tag: "Documentación viva y segundo cerebro consultable con IA"
excerpt: "La documentación de un proyecto envejece en cuanto se escribe, y el conocimiento real vive repartido entre el repo, Drive, reuniones y la herramienta de gestión. Parrot ingesta todas esas fuentes, genera y regenera documentación técnica y de producto a partir del código y las specs, y responde preguntas en lenguaje natural con citas obligatorias. Si no hay evidencia, dice que no está documentado en lugar de inventar."
year: "2025"
role: "Dirección técnica y de producto · desarrollo principal"
status: "Beta interna"
stack:
  - Next.js 15
  - Turborepo
  - MongoDB Atlas
  - Pinecone
  - AI Gateway · Claude
cover: /projects/parrot.jpg
gallery:
  - /projects/parrot-explore.jpg
order: 2
source: es
---

## El problema

La documentación de un proyecto de software envejece en cuanto se escribe. El conocimiento real vive repartido entre el repositorio, Google Drive, las reuniones y la herramienta de gestión. Cuando alguien pregunta "¿cómo funciona X?" o "¿qué se decidió sobre Y?", nadie encuentra la respuesta, o la encuentra desactualizada. Antes: buscar a mano en cinco sitios. Ahora: una pregunta, una respuesta con fuente.

## Qué es Parrot

Un segundo cerebro para equipos de software, con dos funciones que se alimentan entre sí:

- **Documentación viva**: ingesta repositorios, Google Drive y las herramientas de gestión del equipo a través de MCP, y genera y regenera documentación técnica y de producto a partir del código y las especificaciones. Cuando cambia el código, cambia la documentación.
- **Respuestas con cita obligatoria**: cualquier pregunta en lenguaje natural se responde con las fuentes exactas de las que sale. Si no hay evidencia en el corpus, Parrot contesta que no está documentado en lugar de inventar.

Cada organización tiene su propio espacio con varios proyectos, y cada proyecto su corpus, sus fuentes y su explorador de documentos con búsqueda léxica.

## Decisiones técnicas

- **Retrieval híbrido con rerank**: búsqueda vectorial en Pinecone combinada con búsqueda léxica, y un paso de reordenación antes de generar. Es lo que sostiene la tasa de acierto.
- **Citas como restricción, no como adorno**: el modelo solo puede afirmar lo que puede señalar en el corpus, y el sistema mide explícitamente cuándo debe decir "no está documentado".
- **Harness de evaluación propio**: un conjunto de preguntas de oro con respuesta conocida se ejecuta contra cada cambio del pipeline, de modo que una mejora en un caso no rompa otro sin que se note.
- **AI Gateway de Vercel con Claude Sonnet** para embeddings y generación, sin acoplarse a un proveedor.
- **Next.js 15 y React 19** en un monorepo con Turborepo, MongoDB Atlas para metadatos y texto normalizado, y Clerk con organizaciones para el multi-tenant.
- Desarrollo asistido por IA con especificaciones en OpenSpec.

## Resultados

Medido con el harness de evaluación sobre 50 preguntas de oro:

| Métrica | Valor |
|---|---|
| Recupera el documento correcto (hit@k) | 98 % |
| Respuestas correctas | 95 % |
| Detecta que algo no está documentado | 100 % |

## Estado

Parrot empezó en agosto de 2025 como una plantilla de documentación estática y pivotó en julio de 2026 a una aplicación hospedada con recuperación aumentada, construida casi por completo en tres semanas. Hoy es una beta interna de Collybrix que ya trabaja sobre corpus reales.
