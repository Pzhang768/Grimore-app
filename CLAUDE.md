# CLAUDE.md — Grimore-app

Frontend for Grimoire: a Next.js dashboard that lets non-technical users run AI agent workflows. MVP use case is job search automation.

**Stack:** Next.js 15 (App Router), MUI v9, Redux Toolkit, TanStack Query, React Hook Form + Zod, SSE

---

## Repository Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── sign-up/
│   ├── (marketing)/              # Public pages — TopNav injected via layout
│   │   ├── layout.tsx
│   │   └── page.tsx              # Hero landing page
│   └── (protected)/
│       ├── dashboard/            # Home — active teams, recent runs
│       ├── teams/
│       │   ├── new/              # Create team, pick agents
│       │   └── [teamId]/
│       │       ├── context/      # Per-agent preferences
│       │       └── run/          # Live decision log + deliverable
│       └── layout.tsx            # Auth guard
├── components/                   # Reusable UI components
├── hooks/                        # Custom React hooks
├── store/                        # Redux Toolkit slices
├── services/                     # TanStack Query hooks + API calls
├── utils/                        # Shared utilities
└── types/                        # Shared TypeScript types
```

---

## Component Conventions

Every component lives in its own folder — no exceptions:

```
ComponentName/
  ComponentName.tsx
  ComponentName.test.tsx   # co-located, 100% coverage required
  index.ts                 # re-exports default (and named types if any)
```

Sub-components that belong to one parent live under a `_components/` subfolder inside the parent's folder:

```
Hero/
  HeroLogForward.tsx
  index.ts
  _components/
    Eyebrow/
      Eyebrow.tsx
      index.ts
    FloatingLabel/
      FloatingLabel.tsx
      index.ts
    ArrowIcon/
      ArrowIcon.tsx
      index.ts
```

Naming: don't repeat parent context in child names. Inside `Hero/_components/`, the child is `Eyebrow` not `HeroEyebrow`.

Every sub-component gets its own named folder under `_components/` — never a bare `.tsx` file dropped directly. If a component is used by more than one parent, promote it to `src/components/` at the top level.

---

## Existing Shared Components

| Component           | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `StatusDot`         | Agent status indicator with pulse animation. Props: `status`, `size`  |
| `AgentLogPanel`     | Streaming mock log panel. Props: `steps`, `speed`, `compact`, `title` |
| `GrimChip`          | Pill badge with tinted border/bg. Props: `color`, `sx`                |
| `BulletDot`         | Inline separator dot for trust rows and copy                          |
| `TopNav`            | Global marketing nav with constellation logo + auth buttons           |
| `ConstellationMark` | SVG logo mark (inside `TopNav/`). Props: `size`, `accent`, `ink`      |
| `Providers`         | Root provider tree: ThemeProvider > CssBaseline > Redux > QueryClient |

---

## Button Variants

Three custom variants are registered in `src/theme.ts`. Use these — do not recreate them with inline `sx`:

| Variant                            | Use case                                 | Key traits                                                    |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `variant="cta"`                    | Primary action (hero CTAs, form submits) | Mint fill, dark text, glow shadow, 15px, `borderRadius: 10px` |
| `variant="ghost"`                  | Secondary action alongside a CTA         | Transparent, divider border, 15px, `borderRadius: 10px`       |
| `variant="navGhost"`               | Nav bar secondary button                 | Paper bg, divider border, 14px                                |
| `variant="text"` (MUI, overridden) | Soft nav links                           | `text.primary` colour, 14px, no border                        |

Example:

```tsx
<Button component={Link} href="/sign-up" variant="cta" endIcon={<ArrowIcon />}>
  Get started free
</Button>
<Button variant="ghost">See how it works</Button>
```

To add a new variant, declare it in `src/theme.ts` under `MuiButton.variants` and add the TypeScript augmentation at the top of that file.

---

## MUI Patterns

**Always use MUI components** — never build custom versions of things MUI already provides (modals, chips, inputs, buttons, cards).

**MUI tokens only** — never hardcode hex values in components. All colours go through `theme.palette.*` or the `sx` prop with palette tokens (`'secondary.main'`, `'text.disabled'`, etc.).

**Typography variants for fonts** — never set `fontFamily` in `sx`. Use `variant="h1"` / `variant="h2"` etc. and let the theme supply the font. For non-Typography elements that need Space Grotesk (e.g. nav logo), use `Typography component={Link}` or `Typography component="span"` rather than a raw `Box` with inline `fontFamily`.

**Palette colours in JS** — when a component needs the resolved hex at runtime (e.g. to construct a dynamic `background` string), use `useTheme()` to read `palette.*` — never hardcode the hex. Example:

```tsx
const { palette } = useTheme()
const color = palette.secondary.main // '#00D4AA'
```

**`GrimChip` color prop** — accepts a `PaletteColor` key (`'secondary'`, `'primary'`, `'error'`, `'warning'`, `'text.secondary'`, `'text.disabled'`), not a raw hex string. Resolved internally via `useTheme()`.

**Repetitive UI patterns** — if you find yourself writing the same `sx` block in two places, extract it into a shared component or a theme variant. `GrimChip` and `BulletDot` exist for exactly this reason.

**Spacing** — always use the MUI spacing scale (`sx={{ p: 2, gap: 1.5 }}`). Never raw pixel values.

---

## Layout Rules

- The `(marketing)` route group layout owns `minHeight: 100vh` as a flex column. Marketing pages use `flex: 1` to fill remaining space — never set `minHeight: 100vh` inside a page component.
- The `TopNav` is rendered by `(marketing)/layout.tsx` automatically — never import it inside a page component.
- When two-column grid layouts have an animated/streaming right panel, make the right column `alignSelf: stretch` with `position: relative` and position the panel absolutely inside it. This prevents the right panel's growth from affecting the left column's vertical position.

---

## Design Tokens

Full reference in `docs/design-guidance.md`. Key rules:

- **Fonts:** Inter for all functional UI. Space Grotesk for marketing/landing headings only.
- **Agent status colours** map to palette tokens — use `useTheme()` to resolve them, never hardcode:
  - `idle` → `palette.text.secondary`
  - `running` → `palette.primary.light`
  - `complete` → `palette.secondary.main`
  - `error` → `palette.error.main`
  - `waiting` → `palette.warning.main`
- **Border radius tiers:** `8px` small (inputs, chips), `12px` medium (cards), `16px` large (agent cards).
- **Dark-first** — dark theme is the only supported mode at MVP.

---

## Environment Variables

Never use `!` non-null assertions on `process.env.*`. Validate at module load and fail fast:

```ts
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
```

---

## Redux vs TanStack Query

- **TanStack Query** — all server state (fetching, caching, mutations against the API).
- **Redux** — client-only UI state (selected team, run view mode, sidebar open/closed).

One slice per domain: `agentSlice`, `teamSlice`, `runSlice`.
One query hook per resource: `useTeams`, `useRun`, `useAgents`.

Use the typed hooks from `src/store/index.ts`:

```ts
import { useAppDispatch, useAppSelector } from '@/store'
```

Never add placeholder slices to satisfy Redux's "at least one reducer" requirement — leave `reducer: {}` empty until a real slice exists.

---

## Testing

- 100% coverage on all metrics (statements, branches, functions, lines) — enforced by Vitest thresholds.
- Tests are co-located: `ComponentName/ComponentName.test.tsx`.
- Use `vi.useFakeTimers()` for components with `setTimeout`/`setInterval` (e.g. `AgentLogPanel`).
- E2E tests live in `e2e/` and are excluded from Vitest — run separately with `npm run test:e2e`.

---

## Commands

```bash
npm run dev            # Dev server on localhost:3000
npm run build          # Production build
npm test               # Vitest with 100% coverage
npm run test:e2e       # Playwright E2E
npm run lint           # ESLint (zero warnings)
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier format
npm run format:check   # Prettier check
npm run type-check     # TypeScript check
```

---

## Environment Variables (`.env.local`)

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
