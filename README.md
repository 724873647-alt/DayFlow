# DayFlow

A personal intelligent workspace, built mobile-first. DayFlow brings planning, tasks, curated information, daily reflection and an AI assistant into one calm workspace.

## Product principles
- Durable PostgreSQL persistence; no production reliance on browser-only storage.
- Real AI calls through a server-side provider adapter; no fabricated assistant responses.
- Responsive web first, with an API designed for a future Android client.
- Small, testable increments with transparent implementation status.

## Current status
This repository is the initial application foundation. The first milestone delivers a responsive workspace shell, persistent task/plan APIs, database schema, and setup documentation. AI, news ingestion, authentication, notifications, and Android integration are staged for subsequent milestones and are not represented as complete.

## Stack
- Web: React, TypeScript, Vite
- API: Node.js, TypeScript, Express, Zod
- Data: PostgreSQL, Drizzle ORM
- Tests: Vitest, Supertest

## Quick start
Requirements: Node.js 20+, Docker Compose.

```bash
cp .env.example .env
docker compose up -d db
npm install
npm run db:migrate
npm run dev
```

Web: http://localhost:5173 · API: http://localhost:3001/api/health

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for configuration and implementation notes.
