# Grimoire — Product Requirements Document

## 1. Overview

Grimoire lets non-technical users run AI agent workflows through a simple dashboard — no code or setup required.

Users build a team of agents, give each one instructions, and let them work together until the task is done. The user watches a live log and gets the final result.

**MVP:** Job search — agents find listings, score fit, and tailor a resume. User gets a shortlist and a tailored resume per role. Agents do not apply on the user's behalf.

---

## 2. Problem

Setting up AI agents today requires technical knowledge most people don't have. Grimoire handles all of that so users can focus on the outcome.

---

## 3. Target User

Recent graduates and early-career professionals (0–5 years). Large market, frequent job searching, comfortable with iteration.

---

## 4. Core Concepts

- **Agent** — an AI unit with one job (e.g. "Find listings", "Edit resume")
- **Team** — a group of agents the user assembles for a task
- **Context** — per-agent instructions set by the user before the run (e.g. "target role: product manager", "location: remote")
- **Decision Loop** — the cycle where agents run, share results, and refine
- **Deliverable** — the final output the user receives

---

## 5. AI Provider

Claude Haiku 4.5 for all agents at MVP. Provider is abstracted so models can be swapped per agent in v2.

---

## 6. MVP Scope

### In
- Account creation and login
- Dashboard: create a team, pick agents, set context per agent
- Pre-built job search agents (see Section 7)
- Agent runs: agents share results and collaborate
- Live decision log
- Final output: shortlist + tailored resume per role
- Subscription billing (Stripe)

### Out
- Auto-applying to jobs
- Custom agent creation
- Scheduled runs
- LinkedIn, Gmail, or ATS integrations
- Admin panel

---

## 7. Job Search Agents

| Agent | Job | Input | Output |
|---|---|---|---|
| **Job Listing Fetcher** | Finds relevant roles | Role title, location, level, keywords | List of job postings |
| **Fit Analyser** | Scores each listing against the user's profile | Listings + resume | Ranked shortlist with reasoning |
| **Resume Tailoring Agent** | Rewrites resume to match each role | Resume + job description | Tailored resume per role |
| **Coordinator** | Passes context between agents, signals completion | All outputs | Shared context, done signal |

---

## 8. How Agents Work Together

Agents run in order: Fetch → Analyse → Tailor. After each full pass the user sees the output and decides to continue, stop, or adjust. Capped at 3 passes.

In v2: tailor each shortlisted job in parallel, and add an evaluator agent that decides when quality is good enough.

---

## 9. Dashboard Screens

1. **Home** — active teams, recent runs, quick-create button
2. **Create Team** — pick agents, name the team
3. **Agent Context** — set preferences per agent before running
4. **Run View** — live log, agent status, pass count
5. **Deliverable** — shortlist + resumes, download/copy

---

## 10. Data & Inputs

- User uploads resume (PDF or Word)
- User fills in role preferences via form (title, location, level, keywords)
- User pastes job descriptions directly — no URL fetching at MVP
- Seek URL fetching is a v2 candidate
- LinkedIn scraping is out of scope permanently (TOS risk)

---

## 11. Tech Stack

### Frontend
- **Next.js** — App Router
- **MUI** — components
- **Redux Toolkit** — client state
- **TanStack Query** — server state
- **React Hook Form + Zod** — forms
- **SSE** — live agent log streaming
- **Vitest + React Testing Library** — testing
- **Husky, ESLint, Prettier** — code quality

### Backend
- **Go + Gin** — API server and agent orchestration

### AI
- **Claude Haiku 4.5** — all agents at MVP
- **Abstracted provider interface** — swap models per agent in v2

### Database
- **PostgreSQL** — local for dev
- **GORM** — ORM

### Auth
- **Supabase Auth** — login, email verification, password recovery, OAuth

### File Storage
- **Supabase Storage** — resume uploads

### Payments
- **Stripe** — subscriptions

### Deployment
- **Vercel** — frontend
- **Railway** — Go backend + Postgres
