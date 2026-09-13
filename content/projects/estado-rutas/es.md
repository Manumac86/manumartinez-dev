---
name: "Estado de rutas · Río Negro"
tag: "El parte oficial de transitabilidad, convertido en mapa y planificador con IA"
excerpt: "Vialidad Rionegrina publica cada día el estado de las rutas provinciales como una tabla en PDF. En invierno, quien viaja a Bariloche, El Bolsón o la Línea Sur necesita saber si el camino está transitable, si piden cadenas o 4×4, y no leerse un documento. Esta app lee ese parte con IA, lo convierte en datos filtrables, lo dibuja en un mapa y arma un planificador de recorrido que analiza tramo a tramo el estado del camino. En español e inglés, para turistas."
year: "2026"
role: "Proyecto personal · diseño y desarrollo, de la idea a producción"
status: "En producción · datos del parte oficial"
stack:
  - Next.js 16
  - AI SDK · Claude
  - MongoDB
  - Leaflet
  - Vercel Blob
url: https://estado-rutas-arg.vercel.app
cover: /projects/rutas.jpg
gallery:
  - /projects/rutas-planner.jpg
order: 4
source: es
---

## El problema

Vialidad Rionegrina publica cada día un parte de transitabilidad de las rutas provinciales de Río Negro: una tabla en PDF con el estado de cada tramo, si exige cadenas o 4×4 y las observaciones del día. Es información oficial y valiosa, pero está pensada para leerse, no para consultarse. En pleno Operativo Invierno, quien va a Bariloche, El Bolsón o cruza la Línea Sur quiere una respuesta concreta: ¿puedo pasar por acá, y en qué condiciones?

## Qué hace

- **Resumen del parte** con los tramos por estado: transitable con precaución, con extrema precaución, intransitable, y cuántos piden cadenas o 4×4.
- **Destinos turísticos** como atajo: tocás Bariloche o Las Grutas y ves solo sus rutas de acceso.
- **Filtros** por estado, calzada (pavimento o ripio), zona y requisitos del vehículo, con buscador por ruta, localidad o tramo.
- **Mapa** con cada tramo coloreado según su estado, sobre calles o satélite.
- **Planificador de recorrido**: elegís origen y destino y la app encadena los tramos que atraviesa, calcula distancia y tiempo con la velocidad que permite el estado de cada uno, y un asistente de IA resume el peor tramo, las alertas y los consejos, usando solo los datos del parte.
- **Consejos de manejo invernal** en la Patagonia y enlaces a las fuentes oficiales.
- Todo en **español e inglés**, porque buena parte de quienes consultan son turistas.

## Cómo lee el parte

El parte llega como PDF o como foto. El endpoint de subida comprueba la firma real del archivo, no el tipo que declara el cliente, y se lo pasa a **Claude Haiku 4.5** con un esquema estricto: extraer solo lo que dice el documento, un tramo por fila, contrastando cada uno con un catálogo de tramos conocidos para heredar su traza en el mapa y sus nodos del planificador. Si el documento no es un parte, devuelve una lista vacía y no se guarda nada. El resultado se persiste en MongoDB y el archivo original en Vercel Blob, con un historial acotado.

## Decisiones técnicas

- **Extracción con salida estructurada**, no con texto libre: el modelo rellena un esquema validado con zod, y el prompt trata el contenido del documento como datos, nunca como instrucciones.
- **Dos modelos para dos trabajos**: Haiku para la extracción, que es mecánica y frecuente, y **Claude Sonnet 4.6** para el análisis del recorrido, donde importa el criterio. Ambos a través del AI Gateway de Vercel.
- **El planificador no le pregunta a la IA por dónde ir**: es un Dijkstra sobre la geometría real de cada tramo. El modelo recibe kilómetros, velocidades y minutos ya calculados y solo interpreta el estado del camino.
- **Endurecido para estar en público**: comprobación de origen contra CSRF, límite de peticiones por IP, tamaños máximos de archivo y de cuerpo, y validación de todo lo que entra al prompt para que nadie use la app como proxy gratuito de un LLM.
- **Next.js 16 y React 19**, shadcn/ui sobre Base UI, TanStack Query para el estado del cliente y Leaflet para el mapa. Código abierto con licencia MIT.

## Estado

En producción y con datos reales del Operativo Invierno 2026. Lo diseñé y construí en un día con desarrollo asistido por IA, partiendo de un proyecto de Claude Design, y lo publiqué el mismo día. Los datos se reemplazan subiendo el parte oficial de cada jornada.
