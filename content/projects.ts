import type { Project } from "./types"

export const projects: Project[] = [
  {
    slug: "milano",
    name: "Milano",
    year: "2025",
    role: { en: "Product & tech lead", es: "Product & tech lead" },
    stack: ["Next.js", "Node.js", "Multi-tenant", "Analytics"],
    tag: { en: "Enterprise CRM & commercial management", es: "CRM enterprise y gestión comercial" },
    desc: {
      en: "A single source of truth for the commercial lifecycle of mid-sized B2B companies — from lead to invoice to collection. Real-time pipeline, automated follow-ups, integrated invoicing.",
      es: "Una única fuente de verdad para el ciclo comercial de empresas B2B medianas — del lead a la factura y al cobro. Pipeline en tiempo real, seguimientos automáticos, facturación integrada.",
    },
  },
  {
    slug: "parrot",
    name: "Parrot",
    year: "2025",
    role: { en: "Builder", es: "Builder" },
    stack: ["Nextra", "MDX", "Next.js"],
    tag: { en: "Documentation & project management platform", es: "Plataforma de documentación y gestión de proyectos" },
    desc: {
      en: "Collybrix's internal knowledge system: PRDs, roadmaps, sprint plans, analysis and legal templates, version-controlled and shared with clients.",
      es: "El sistema de conocimiento interno de Collybrix: PRDs, roadmaps, sprints, análisis y plantillas legales, versionado y compartido con clientes.",
    },
  },
  {
    slug: "fintio",
    name: "Fintio",
    year: "2025",
    role: { en: "Founder · product, design and engineering", es: "Fundador · producto, diseño y desarrollo" },
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB Atlas", "Clerk"],
    tag: { en: "Personal annual budget planner for European households", es: "Presupuesto anual personal para hogares europeos" },
    desc: {
      en: "Running a whole year's budget in a spreadsheet works until a formula breaks, you can't open it on your phone and every January means copying and cleaning the template. Fintio turns it into an app: set up categories and projections once, log each month's transactions, and it works out carry-overs, the 50/30/20 rule, subscriptions, savings and net worth without touching a formula. I built it solo, from product to deployment; it's a public MVP in production since December 2025.",
      es: "Llevar el presupuesto de todo el año en una hoja de cálculo funciona hasta que una fórmula se rompe, no puedes abrirla desde el móvil y cada enero toca copiar y limpiar la plantilla. Fintio lo convierte en una app: configuras categorías y proyecciones una vez, registras los movimientos de cada mes, y calcula arrastres, regla 50/30/20, suscripciones, ahorro y patrimonio neto sin tocar una fórmula. Lo construí solo, de producto a despliegue; es un MVP público en producción desde diciembre de 2025.",
    },
    url: "https://fintio.app",
    cover: "/projects/fintio.jpg",
  },
  {
    slug: "fcp",
    name: "FCP Contest App",
    year: "2024",
    role: { en: "Full-stack", es: "Full-stack" },
    stack: ["Next.js", "Node.js CMS", "Media"],
    tag: { en: "Contest platform for Fundación Cultural Patagonia", es: "Plataforma de concursos para Fundación Cultural Patagonia" },
    desc: {
      en: "End-to-end contest management for dance, music and writing competitions: audiovisual submissions, scoring system and public voting.",
      es: "Gestión integral de concursos de danza, música y escritura: envíos audiovisuales, sistema de puntuación y voto público.",
    },
  },
]
