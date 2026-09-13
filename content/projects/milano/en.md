---
name: "Milano"
tag: "Operations platform with an AI team for services companies"
excerpt: "A small services company keeps projects in one tool, clients in another, invoices in a third and cash in spreadsheets. Milano brings agile project management, CRM, Spanish invoicing, treasury and financial planning into a single app with a single data model, and exposes it all through an API and MCP so AI agents can do the mechanical work. It started as Collybrix's internal tool and is now becoming a multi-tenant product."
year: "2025"
role: "Technical & product lead · main developer"
status: "In production (internal use) · private SaaS beta"
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
translatedFrom: es
---

## The problem

A small services company, a consultancy or a software factory, keeps projects in one tool, clients in another, invoices in a third and cash in spreadsheets. Nobody has the full picture, and keeping the four in sync eats hours every week. That was Collybrix's day-to-day with four separate SaaS products.

## What Milano is

One application, one data model, six modules:

- **Projects**: agile management with sprints, tasks and time tracking.
- **CRM**: the sales pipeline, from lead to proposal.
- **Invoicing**: built for Spanish regulations.
- **Treasury**: receivables, payables and cash position.
- **Financial planning**: forecasts on real data, not on exports.
- **AI Team**: agents that do the mechanical work, follow-ups, reconciliations, reports, on the same data the team sees.

Everything a person does in the interface is available through the API and through MCP, with more than 40 tools an agent can use. The AI module is not a chat bolted onto the side: it is another team member with access to the same modules.

## Technical decisions

- **A single data model** in MongoDB instead of integrating four products. It is what lets an agent cross projects, invoices and cash in one operation.
- **Next.js 16 and React 19** with the App Router and server components; the client loads only what is interactive.
- **Clerk** organisations as the basis for multi-tenancy: every company is an isolated tenant from day one.
- **A dedicated MCP server** on Vercel's AI Gateway with Claude models, so any MCP-compatible agent, in-house or third-party, can operate Milano.
- **AI-assisted development** end to end: the project started in v0 and continues with Claude Code and OpenSpec specifications.

## Status

Milano started in November 2025 and shipped its first tagged release in December. Today it runs in production as Collybrix's internal tool, used daily by the whole team, with billing and multi-tenancy deployed and being validated with a demo organisation. It has no paying customers yet: it is a private beta as a SaaS.
