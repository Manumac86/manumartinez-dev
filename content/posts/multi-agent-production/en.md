---
title: 'Multi-agent systems in production: what actually breaks'
excerpt: >-
  After launching AKAIO v1.0 — Gen AI, agents and semantic search — the failures
  were never the model. They were state, cost, and trust.
tag: AI Engineering
date: '2026-08-21'
template: article
source: es
draft: true
translatedFrom: es
sourceHash: 18fa91543261ed76
---

## The model is almost never the problem

When we launched AKAIO v1.0 we had a reasonable agent architecture: an orchestrator, half a dozen specialized agents, and semantic search over Milvus. In the first ninety days in production, none of the serious incidents came from the model. They came from three much less glamorous places.

## 1. State

An agent calling another agent calling a tool generates an execution tree. If that tree isn't persisted, any retry starts from scratch, and a timeout halfway through leaves the user with half a result and a full bill.

```ts
type RunStep = {
  id: string
  parent?: string
  agent: string
  input: unknown
  output?: unknown
  status: "pending" | "ok" | "failed"
}
```

The solution wasn't a new framework: it was treating each step as an immutable event and rebuilding state from the log.

## 2. Cost

Cost per user doesn't scale with the number of requests, it scales with the **depth** of the conversation. An agent that summarizes the history every three turns saved more money than any model change.

## 3. Trust

> A system that gets it right 95% of the time and doesn't know when it fails is worse than one that gets it right 85% of the time and says so.

We added a confidence score per response and an explicit escape route to a human. The abandonment rate dropped by half.

## What I'd do differently

- Persist the execution tree from day one.
- Measure cost per conversation, not per request.
- Design the "I don't know" before the "here you go".
