import type { Project } from "./types"

export const projects: Project[] = [
  {
    slug: "fintio",
    name: "Fintio",
    year: "2025",
    role: "Founder & Architect",
    stack: ["Next.js", "Python", "LLM agents", "Postgres"],
    tag: { en: "AI-powered financial tracker & advisor", es: "Tracker y asesor financiero con IA" },
    desc: {
      en: "Financial tracking and advisory platform for individuals and SMBs: automated expense categorization, cash-flow forecasting and actionable recommendations, powered by AI.",
      es: "Plataforma de seguimiento y asesoría financiera para personas y PyMEs: categorización automática de gastos, proyección de cash-flow y recomendaciones accionables, con IA.",
    },
  },
  {
    slug: "milano",
    name: "Milano",
    year: "2025",
    role: "Product & Tech lead",
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
    role: "Builder",
    stack: ["Nextra", "MDX", "Next.js"],
    tag: { en: "Documentation & project management platform", es: "Plataforma de documentación y gestión de proyectos" },
    desc: {
      en: "Collybrix's internal knowledge system: PRDs, roadmaps, sprint plans, analysis and legal templates, version-controlled and shared with clients.",
      es: "El sistema de conocimiento interno de Collybrix: PRDs, roadmaps, sprints, análisis y plantillas legales, versionado y compartido con clientes.",
    },
  },
  {
    slug: "fcp",
    name: "FCP Contest App",
    year: "2024",
    role: "Full-stack",
    stack: ["Next.js", "Node.js CMS", "Media"],
    tag: { en: "Contest platform for Fundación Cultural Patagonia", es: "Plataforma de concursos para Fundación Cultural Patagonia" },
    desc: {
      en: "End-to-end contest management for dance, music and writing competitions: audiovisual submissions, scoring system and public voting.",
      es: "Gestión integral de concursos de danza, música y escritura: envíos audiovisuales, sistema de puntuación y voto público.",
    },
  },
]
