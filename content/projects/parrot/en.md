---
name: "Parrot"
tag: "Living documentation and an AI-queryable second brain"
excerpt: "Project documentation goes stale the moment it is written, and the real knowledge lives scattered across the repo, Drive, meetings and the management tool. Parrot ingests all of those sources, generates and regenerates technical and product documentation from code and specs, and answers questions in natural language with mandatory citations. When there is no evidence, it says so instead of making something up."
year: "2025"
role: "Technical & product lead · main developer"
status: "Internal beta"
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
translatedFrom: es
---

## The problem

Software documentation goes stale the moment it is written. The real knowledge lives scattered across the repository, Google Drive, meetings and the team's management tool. When someone asks "how does X work?" or "what did we decide about Y?", nobody finds the answer, or finds an outdated one. Before: searching five places by hand. Now: one question, one answer with its source.

## What Parrot is

A second brain for software teams, with two functions that feed each other:

- **Living documentation**: it ingests repositories, Google Drive and the team's management tools through MCP, and generates and regenerates technical and product documentation from code and specs. When the code changes, the documentation changes.
- **Answers with mandatory citations**: any natural-language question is answered with the exact sources it comes from. When there is no evidence in the corpus, Parrot replies that it is not documented instead of making something up.

Each organisation has its own space with several projects, and each project its corpus, its sources and a document explorer with lexical search.

## Technical decisions

- **Hybrid retrieval with reranking**: vector search in Pinecone combined with lexical search, and a reranking step before generation. That is what holds the hit rate up.
- **Citations as a constraint, not decoration**: the model can only state what it can point to in the corpus, and the system explicitly measures when it should say "not documented".
- **A home-grown evaluation harness**: a set of golden questions with known answers runs against every pipeline change, so an improvement in one case can't silently break another.
- **Vercel AI Gateway with Claude Sonnet** for embeddings and generation, without coupling to a provider.
- **Next.js 15 and React 19** in a Turborepo monorepo, MongoDB Atlas for metadata and normalised text, and Clerk organisations for multi-tenancy.
- AI-assisted development with OpenSpec specifications.

## Results

Measured with the evaluation harness on 50 golden questions:

| Metric | Value |
|---|---|
| Retrieves the right document (hit@k) | 98% |
| Correct answers | 95% |
| Detects that something is not documented | 100% |

## Status

Parrot started in August 2025 as a static documentation template and pivoted in July 2026 to a hosted retrieval-augmented app, built almost entirely in three weeks. Today it is an internal Collybrix beta already working on real corpora.
