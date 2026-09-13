---
name: "Fintio"
tag: "Presupuesto anual personal para hogares europeos"
excerpt: "Llevar el presupuesto de todo el año en una hoja de cálculo funciona hasta que una fórmula se rompe, no puedes abrirla desde el móvil y cada enero toca copiar y limpiar la plantilla. Fintio lo convierte en una app: configuras categorías y proyecciones una vez, registras los movimientos de cada mes, y calcula arrastres, regla 50/30/20, suscripciones, ahorro y patrimonio neto sin tocar una fórmula. Lo construí solo, de producto a despliegue; es un MVP público en producción desde diciembre de 2025."
year: "2025"
role: "Fundador · producto, diseño y desarrollo"
status: "MVP público en producción"
stack:
  - Next.js 16
  - React 19
  - TypeScript
  - MongoDB Atlas
  - Clerk
url: https://fintio.app
cover: /projects/fintio.jpg
gallery:
  - /projects/fintio-features.jpg
  - /projects/fintio-security.jpg
order: 3
source: es
---

## El problema

Llevar el presupuesto de todo el año en una hoja de cálculo funciona, pero es frágil. Una fórmula que se rompe en marzo desajusta el resto del año, desde el móvil no se puede consultar ni registrar nada, y cada enero hay que copiar la plantilla, limpiarla y cruzar los dedos para no perder nada por el camino.

## Qué construí

Fintio convierte esa hoja en una aplicación web. Configuras las categorías y las proyecciones del año una sola vez, registras los movimientos mes a mes, y la app se encarga del resto: arrastres entre meses, regla 50/30/20, suscripciones recurrentes, objetivos de ahorro y patrimonio neto. Sin fórmulas que mantener y con los datos disponibles desde cualquier dispositivo.

- **Recurrentes**: los gastos e ingresos fijos se generan solos cada mes.
- **Calendario**: vista mensual para planificar movimientos.
- **Dashboard anual**: resumen del año con desglose por categoría.
- **50/30/20**: la regla aplicada sobre tus cifras reales, no sobre un ejemplo.
- **Ahorro y patrimonio neto**: objetivos y evolución en el tiempo.

## Decisiones técnicas

- **Next.js 16 y React 19** con App Router y Server Actions: la mayor parte de la app son componentes de servidor y el cliente solo carga lo interactivo.
- **MongoDB Atlas** como base de datos: un presupuesto anual es un documento natural (año → meses → movimientos) y no obliga a migrar cada vez que aparece una categoría nueva.
- **Clerk** para autenticación: registro, sesiones y recuperación de cuenta resueltos sin escribir una línea de auth propia.
- **Tailwind CSS v4 y shadcn/ui** para la interfaz, desplegada en Vercel.
- Pensado para hogares europeos: euros, varias divisas y el RGPD como requisito de diseño, no como añadido.

## Estado

Fintio está en producción desde diciembre de 2025 como MVP público, bajo el paraguas de Collybrix. Lo construí solo, de producto a despliegue. Ahora mismo trabajo en el seguimiento de cuentas y en la evolución del patrimonio neto a lo largo del tiempo.
