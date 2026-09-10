---
title: "Multi-agent systems in production: what actually breaks"
excerpt: "After shipping AKAIO v1.0 — Gen AI, agents and semantic search — the failures were never the model. They were state, cost and trust."
tag: AI Engineering
date: 2026-08-21
template: article
source: es
translatedFrom: es
---

## The model is almost never the problem

When we shipped AKAIO v1.0 we had a reasonable agent architecture: one orchestrator, half a dozen specialised agents and semantic search on top of Milvus. In the first ninety days in production, none of the serious incidents came from the model. They came from three far less glamorous places.

## 1. State

An agent calling an agent calling a tool produces an execution tree. If that tree is not persisted, every retry starts from zero, and a timeout halfway through leaves the user with half a result and a full invoice.

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

The fix was not a new framework: it was treating every step as an immutable event and rebuilding state from the log.

## 2. Cost

Cost per user does not scale with the number of requests, it scales with the **depth** of the conversation. An agent that summarises the history every three turns saved more money than any model swap.

## 3. Trust

> A system that is right 95% of the time and does not know when it fails is worse than one that is right 85% and says so.

We added a confidence score per answer and an explicit escape hatch to a human. Drop-off halved.

## What I would do differently

- Persist the execution tree from day one.
- Measure cost per conversation, not per request.
- Design the "I don't know" before the "here you go".
