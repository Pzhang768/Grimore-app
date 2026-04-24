# CLAUDE.md — Grimore-app

Frontend for Grimoire: a Next.js dashboard that lets non-technical users run AI agent workflows. MVP use case is job search automation.

**Stack:** Next.js (App Router), MUI, Redux Toolkit, TanStack Query, React Hook Form + Zod, SSE

## Repository Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── sign-up/
│   └── (protected)/
│       ├── dashboard/         # Home — active teams, recent runs
│       ├── teams/
│       │   ├── new/           # Create team, pick agents
│       │   └── [teamId]/
│       │       ├── context/   # Per-agent preferences
│       │       └── run/       # Live decision log + deliverable
│       └── layout.tsx         # Auth guard
├── components/                # Reusable UI components
├── hooks/                     # Custom React hooks
├── store/                     # Redux Toolkit slices
├── services/                  # TanStack Query hooks + API calls
├── utils/                     # Shared utilities
└── types/                     # Shared TypeScript types
```

Each component: `ComponentName/ComponentName.tsx`, `ComponentName.test.tsx`, `index.ts`.

One Redux slice per domain: `agentSlice`, `teamSlice`, `runSlice`.
One TanStack Query hook per resource: `useTeams`, `useRun`, `useAgents`.

## Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
npm test             # Run tests (100% coverage required)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
npm run type-check   # TypeScript check
```

## Environment Variables (`.env.local`)

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Code Rules

- **[Architecture](../rules/architecture.md)** — layered architecture, SSE streaming, Redux vs TanStack Query split
- **[General](../rules/general.md)** — naming conventions, TypeScript quality rules
- **[Testing](../rules/testing.md)** — 100% coverage, Vitest + RTL, mocking
- **[CI & Git](../rules/ci.md)** — branch strategy, conventional commits, pre-commit hooks
- **[DRY](../rules/dry.md)** / **[KISS](../rules/kiss.md)** / **[SOLID](../rules/solid.md)** / **[YAGNI](../rules/yagni.md)**

## Design

See `docs/design-guidance.md` for all UI tokens, component standards, and colour rules.
