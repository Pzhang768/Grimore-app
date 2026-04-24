# Grimoire Design Guidance

The visual source of truth for all UI work. All new components and changes to existing components must follow these guidelines.

---

## Design Philosophy

1. **Clarity over decoration** — users are managing agent workflows, not browsing a marketing site. Every element should reduce cognitive load, not add to it.
2. **Status is everything** — agents have states (idle, running, complete, error). The UI must make status unambiguous at a glance.
3. **Dark-first** — the dashboard context suits a dark theme. It reduces eye strain during long sessions and reinforces the "Grimoire" brand identity.
4. **MUI tokens only** — never hardcode hex values. All colours, spacing, and typography go through the MUI theme.

---

## MUI Theme

All design tokens are defined in `frontend/src/theme.ts`. Reference tokens via `theme.*` or the `sx` prop — never use raw hex values in components.

### Colour Palette

```ts
// theme.ts
palette: {
  mode: 'dark',
  primary: {
    main: '#4B5563',        // Charcoal — primary actions, links, brand
    light: '#6B7280',       // Hover state, subtle highlights
    dark: '#374151',        // Active / pressed state
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#00D4AA',        // Mint — success, online, confirm
    light: '#33DDBB',
    dark: '#00A885',
    contrastText: '#000000',
  },
  error: {
    main: '#FF4757',        // Agent error state
    light: '#FF6B78',
    dark: '#CC3344',
  },
  warning: {
    main: '#FFB020',        // Agent warning / past-due
    light: '#FFC84D',
    dark: '#CC8C1A',
  },
  background: {
    default: '#0D0B1E',     // Page background — deep void
    paper: '#1A1635',       // Cards, panels, modals
  },
  divider: '#2D2852',
  text: {
    primary: '#F0EEFF',     // Main text on dark bg
    secondary: '#9490B8',   // Muted labels, descriptions
    disabled: '#4A4770',
  },
}
```

### Agent Status Colours

Agent states must always use these specific colours for consistency:

| Status | Colour | Token |
|---|---|---|
| Idle | `#9490B8` | `text.secondary` |
| Running | `#4B5563` | `primary.main` |
| Complete | `#00D4AA` | `secondary.main` |
| Error | `#FF4757` | `error.main` |
| Waiting (checkpoint) | `#FFB020` | `warning.main` |

### Colour Rules

- Never hardcode a hex value in a component — use `theme.palette.*`
- `primary` (charcoal) is for user-initiated actions and brand identity only
- `secondary` (mint) is for success states and positive confirmations
- Status colours are reserved for their semantic meaning — do not repurpose them
- Background surfaces use `background.default` (page) and `background.paper` (cards/panels)

---

## Typography

MUI typography is configured with two fonts:

| Font | Usage |
|---|---|
| **Inter** | All functional UI — labels, body, buttons, inputs |
| **Space Grotesk** | Display headings on marketing/landing pages only |

```ts
typography: {
  fontFamily: '"Inter", sans-serif',
  h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
  h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
  h3: { fontWeight: 600 },
  h4: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none' },
}
```

### Rules

- `textTransform: 'none'` is set globally on buttons — never override to uppercase
- Headings inside the dashboard use `h3` / `h4` (Inter, not Space Grotesk)
- Space Grotesk is for landing/marketing pages only
- Never use arbitrary `fontSize` values — use the MUI scale (`body1`, `body2`, `caption`, etc.)

---

## Spacing

MUI's default spacing unit is `8px`. Always use multiples via `theme.spacing()` or the `sx` prop:

```tsx
// ✅ Correct
sx={{ p: 2, gap: 1.5, mt: 3 }}

// ❌ Wrong
sx={{ padding: '13px', marginTop: '20px' }}
```

| Context | Value |
|---|---|
| Page sections | `p: 4` / `p: 6` |
| Cards / panels | `p: 3` |
| Form groups | `gap: 2` |
| Inline elements | `gap: 1` |
| Button padding (default) | MUI default — do not override |

---

## Border Radius

Three tiers only:

| Tier | Value | Usage |
|---|---|---|
| Small | `8px` | Inputs, chips, badges, code blocks |
| Medium | `12px` | Cards, panels, dialogs |
| Large | `16px` | Agent cards, team builder tiles |

```ts
shape: {
  borderRadius: 8,  // MUI default — inputs, small elements
}
```

For medium and large, apply via `sx={{ borderRadius: '12px' }}` or define as component variants in the theme.

---

## Shadows & Elevation

| Level | Usage |
|---|---|
| `elevation={0}` | Flat — inline content, table rows |
| `elevation={1}` | Cards, panels |
| `elevation={4}` | Dropdowns, popovers |
| `elevation={8}` | Dialogs, modals |
| `elevation={16}` | Critical overlays |

Every floating element (menu, popover, dialog) must have an elevation. Flat cards are fine for content areas.

---

## Components

### Buttons

- Use MUI `Button` — do not build custom button components
- `variant="contained"` — primary actions (Run Team, Save, Create)
- `variant="outlined"` — secondary actions (Cancel, Edit)
- `variant="text"` — low-priority actions (Skip, Dismiss)
- `color="error"` — destructive actions only (Delete)
- Never set `textTransform` — it is globally set to `none`
- Loading state: use `loading` prop on `LoadingButton` from `@mui/lab`

### Inputs & Forms

- Use `TextField` with `variant="outlined"` consistently
- Always pair with a `label` — no placeholder-only inputs
- Error state via `error` + `helperText` props
- Form layout: use `Stack` with `gap={2}`, not manual margins

### Cards & Panels

- Use MUI `Card` with `elevation={1}` for agent cards and team tiles
- `CardHeader`, `CardContent`, `CardActions` for structured cards
- Avoid custom `div` wrappers where MUI layout components exist

### Agent Decision Log

- Use MUI `Timeline` from `@mui/lab` for the decision log view
- Each agent step is a `TimelineItem`
- Status dot colour follows the Agent Status Colours table above

### Status Chips

- Use MUI `Chip` for agent status badges
- `size="small"`, `variant="outlined"`
- Colour via the agent status table — pass as `color` prop where possible, `sx` otherwise

### Dialogs / Modals

- Use MUI `Dialog` — never build custom modals
- `maxWidth="sm"` for confirmations, `maxWidth="md"` for forms
- Always include a `DialogTitle`, `DialogContent`, `DialogActions`
- Close on backdrop click unless the action is destructive

---

## Responsive Breakpoints

MUI breakpoints:

| Breakpoint | Width | Usage |
|---|---|---|
| `xs` | 0px+ | Mobile (base styles) |
| `sm` | 600px+ | Minor adjustments |
| `md` | 900px+ | Tablet — primary breakpoint |
| `lg` | 1200px+ | Desktop |

- Primary breakpoint is `md` — most layout changes happen here
- Use `useMediaQuery(theme.breakpoints.down('md'))` for programmatic responsive logic
- Dashboard sidebar collapses at `md`

---

## Accessibility

- All interactive elements must support keyboard navigation
- Use MUI's built-in `focusVisibleClassName` — do not remove default focus rings
- Icon-only buttons must have `aria-label`
- Colour alone must never be the only indicator of status — pair with an icon or label
- All form inputs must have an associated `label` (not just `placeholder`)

---

## Rules Summary

- Never hardcode hex values — use `theme.palette.*`
- Never use arbitrary spacing — use `theme.spacing()` via `sx`
- Never build custom versions of MUI components that already exist
- Status colours are semantic — do not repurpose them
- Dark theme is the default and only supported mode at MVP
- All UI work must reference this document before implementation
