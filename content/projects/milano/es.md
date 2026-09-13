---
name: "Milano"
tag: "Plataforma de operaciones con equipo de IA para empresas de servicios"
excerpt: "Una empresa de servicios pequeña lleva los proyectos en una herramienta, los clientes en otra, las facturas en una tercera y la caja en hojas de cálculo. Milano junta gestión ágil de proyectos, CRM, facturación española, tesorería y planificación financiera en una sola app con un único modelo de datos, y lo expone por API y MCP para que agentes de IA hagan el trabajo mecánico. Nació como herramienta interna de Collybrix y hoy se está convirtiendo en producto multi-tenant."
year: "2025"
role: "Dirección técnica y de producto · desarrollo principal"
status: "En producción (uso interno) · beta privada como SaaS"
stack:
  - Next.js 16
  - React 19
  - MongoDB
  - Clerk
  - MCP · AI Gateway
url: https://milano.collybrix.com
cover: /projects/milano.jpg
gallery:
  - /projects/milano-board.jpg
  - /projects/milano-metrics.jpg
  - /projects/milano-crm.jpg
  - /projects/milano-roadmap.jpg
  - /projects/milano-invoicing.jpg
  - /projects/milano-cto.jpg
order: 1
source: es
---

## El problema

Una empresa de servicios pequeña, una consultora o una software factory, lleva los proyectos en una herramienta, los clientes en otra, las facturas en una tercera y la caja en hojas de cálculo. Nadie tiene la foto completa, y mantener las cuatro cosas sincronizadas se come horas cada semana. Ese era el día a día de Collybrix con cuatro SaaS sueltos.

## Qué es Milano

Una sola aplicación, un solo modelo de datos, seis módulos:

- **Proyectos**: gestión ágil con sprints, tareas y tiempos.
- **CRM**: pipeline comercial, del lead a la propuesta.
- **Facturación**: adaptada a la normativa española.
- **Tesorería**: cobros, pagos y posición de caja.
- **Planificación financiera**: previsiones sobre datos reales, no sobre exportaciones.
- **AI Team**: agentes que hacen el trabajo mecánico, seguimientos, conciliaciones, informes, sobre los mismos datos que ve el equipo.

Todo lo que hace una persona en la interfaz está disponible por API y por MCP, con más de 40 herramientas que un agente puede usar. El módulo de IA no es un chat pegado al lado: es un miembro más del equipo con acceso a los mismos módulos.

## Decisiones técnicas

- **Un único modelo de datos** en MongoDB, en lugar de integrar cuatro productos. Es lo que hace posible que un agente cruce proyectos, facturas y caja en una sola operación.
- **Next.js 16 y React 19** con App Router y componentes de servidor; el cliente carga solo lo interactivo.
- **Clerk** con organizaciones como base del multi-tenant: cada empresa es un tenant aislado desde el primer día.
- **MCP server propio** sobre el AI Gateway de Vercel con modelos Claude, de modo que cualquier agente compatible con MCP, propio o de terceros, puede operar Milano.
- **Desarrollo asistido por IA** de principio a fin: el proyecto arrancó en v0 y sigue con Claude Code y especificaciones en OpenSpec.

## Estado

Milano arrancó en noviembre de 2025 y publicó su primera versión etiquetada en diciembre. Hoy está en producción como herramienta interna de Collybrix, con el equipo completo usándolo a diario, y con billing y multi-tenant desplegados y validándose con una organización de demostración. Todavía no tiene clientes de pago: es una beta privada como SaaS.
