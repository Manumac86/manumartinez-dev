import type { Post } from "./types"

export const posts: Post[] = [
  {
    slug: "multi-agent-production",
    date: "2026-08-21",
    min: 9,
    tag: "AI Engineering",
    title: { en: "Multi-agent systems in production: what actually breaks", es: "Sistemas multi-agente en producción: qué se rompe de verdad" },
    excerpt: {
      en: "After shipping AKAIO v1.0 — Gen AI, agents and semantic search — the failures were never the model. They were state, cost and trust.",
      es: "Después de lanzar AKAIO v1.0 — Gen AI, agentes y búsqueda semántica — los fallos nunca fueron el modelo. Fueron estado, coste y confianza.",
    },
  },
  {
    slug: "technical-cofounder-playbook",
    date: "2026-07-03",
    min: 7,
    tag: "Startups",
    title: { en: "From idea to 100K users: the technical co-founder playbook", es: "De la idea a 100K usuarios: el playbook del co-founder técnico" },
    excerpt: {
      en: "The five decisions that matter in the first ninety days, and the twenty that don't.",
      es: "Las cinco decisiones que importan en los primeros noventa días, y las veinte que no.",
    },
  },
  {
    slug: "prds-for-ai-products",
    date: "2026-05-18",
    min: 6,
    tag: "Product",
    title: { en: "PRDs for AI products: writing specs when the model is the feature", es: "PRDs para productos con IA: especificar cuando el modelo es la feature" },
    excerpt: {
      en: "Acceptance criteria don't survive non-determinism. Here's the template we use at Collybrix instead.",
      es: "Los criterios de aceptación no sobreviven al no-determinismo. Esta es la plantilla que usamos en Collybrix.",
    },
  },
  {
    slug: "why-equity",
    date: "2026-03-30",
    min: 5,
    tag: "Collybrix",
    title: { en: "Why we take equity: aligning incentives in technical acceleration", es: "Por qué tomamos equity: alinear incentivos en la aceleración técnica" },
    excerpt: {
      en: "Fee-only makes us a vendor. Equity-only makes us a gamble. The hybrid is the point.",
      es: "Solo fee nos hace un proveedor. Solo equity nos hace una apuesta. El híbrido es el punto.",
    },
  },
]
