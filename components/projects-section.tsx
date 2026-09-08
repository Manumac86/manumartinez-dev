import { Lightbulb, FileText, Users, Trophy } from "lucide-react";

const projects = [
  {
    name: "Fintio",
    tagline: "AI-Powered Financial Tracker & Advisor Platform",
    description:
      "Developing a comprehensive AI-powered financial tracking and advisory platform designed for individuals and SMBs seeking smarter money management. Fintio leverages artificial intelligence to provide personalized financial insights, automated expense categorization, cash flow forecasting, and actionable recommendations. The platform bridges the gap between complex financial data and informed decision-making, empowering users to track spending patterns, optimize budgets, and plan for growth.",
    icon: Lightbulb,
  },
  {
    name: "Milano",
    tagline: "Enterprise CRM & Commercial Management Platform",
    description:
      "Building a modern, intuitive enterprise CRM that centralizes the entire commercial lifecycle—from lead acquisition to invoicing and payment collection. Designed for mid-sized B2B companies (10-200 employees), Milano solves the critical problem of fragmented data across spreadsheets, emails, and disconnected tools. The platform provides real-time pipeline visibility, automated follow-up workflows, integrated invoicing, and performance analytics for sales teams. Milano delivers a single source of truth for customer relationships, eliminating duplicate efforts, reducing manual errors, and enabling data-driven decisions across the commercial operation.",
    icon: Users,
  },
  {
    name: "Parrot",
    tagline: "Internal Documentation & Project Management Platform",
    description:
      "Built Parrot, centralized documentation platform for managing client projects, internal methodologies, and company knowledge. The platform serves as the single source of truth for all technical acceleration engagements, housing PRDs, roadmaps, sprint planning, analysis documents, and legal templates. Developed using MDX and Nextra (Next.js documentation framework), Parrot enables seamless collaboration between teams and clients while maintaining structured, version-controlled documentation.",
    icon: FileText,
  },
  {
    name: "FCP Contest App",
    tagline: "Contests app for Fundación Cultural Patagonia",
    description:
      "Built a full-stack Contests Management Platform for Fundación Cultural Patagonia, enabling the organization to create, manage, and run art competitions across multiple disciplines including dance, music, and writing. Developed a Next.js frontend paired with a custom Node.js CMS, featuring audiovisual content management for participant submissions, a robust scoring system, and public voting functionality. The platform streamlined contest operations, improved participant engagement, and provided organizers with a centralized tool to manage the entire competition lifecycle.",
    icon: Trophy,
  },
];

export function ProjectsSection() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Projects</h2>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border"
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground text-lg">{project.name}</h3>
                <p className="text-primary text-sm mt-1">{project.tagline}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
