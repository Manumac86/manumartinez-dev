import type { Education } from "./types"

export const education: Education[] = [
  { school: "Universidad Nacional de Río Cuarto", degree: "Telecommunications Engineering", years: "2004 – 2014" },
  { school: "Colegio Universitario IES", degree: "Multimedia Design & Business", years: "2013 – 2015" },
  { school: "Platzi", degree: "13 certifications · AI, Architecture, Backend", years: "2019 – 2024" },
]

export const certifications: string[] = [
  "Web Development",
  "Front End Architecture",
  "Artificial Intelligence",
  "Backend with Node.js: REST API with Express",
  "Terminal & Command line",
  "Arrays in JavaScript",
  "Software Architecture",
  "Backend Architecture",
  "MongoDB Atlas",
  "CSS Architecture",
  "Server Side Render",
  "Astro Advanced",
  "Authentication, Microservices & Redis",
  "SCRUM",
  "React Fundamentals",
]

export const languages = [
  { name: "Español", level: "es" },
  { name: "English", level: "en" },
  { name: "Français", level: "fr" },
] as const
