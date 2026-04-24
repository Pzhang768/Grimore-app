# Grimore-app

Next.js frontend for Grimoire — an agentic workflow dashboard. MVP use case: job search automation.

## Prerequisites

- Node.js 22

## Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Runs at `http://localhost:3000`. Requires [Grimore-api](https://github.com/Pzhang768/Grimore-api) running on `:8080`.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Go backend URL (`http://localhost:8080`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm test             # Run tests (100% coverage required)
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix
npm run format       # Prettier
npm run type-check   # TypeScript check
```
