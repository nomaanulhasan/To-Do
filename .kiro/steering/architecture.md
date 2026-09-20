# Architecture & File Structure

## Directory Layout
```
src/
  assets/
    theme.tsx          — MUI theme config (createTheme). Only theming code here.
  components/
    <ComponentName>.tsx — One component per file. Max 100 lines.
    index.ts            — Barrel export for all public components.
  lib/
    index.ts            — All shared TypeScript types and interfaces.
  utils/               — (add when needed) Pure utility/helper functions. No JSX.
  hooks/               — (add when needed) Custom React hooks. One hook per file.
  constants/           — (add when needed) App-wide constant values (keys, configs).
  stories/
    <Component>.stories.ts — Storybook stories. No logic — args only.
  App.tsx              — Root component. Owns global state and top-level handlers.
  App.css              — CSS variables + root/app-level styles only.
  index.css            — Global resets, body/html, scrollbar styles.
  main.tsx             — ReactDOM.createRoot, ThemeProvider, CssBaseline.
  vite-env.d.ts        — Vite type declarations. Do not modify.
```

## Separation of Concerns

### Types → `src/lib/index.ts`
All shared interfaces and types live here. Never define a type inline in a component file if it is used by more than one file. Types that are purely internal to a single component may be defined at the top of that component file.

### Logic → `App.tsx` or custom hooks in `src/hooks/`
State and business logic lives in `App.tsx`. When logic grows complex or needs reuse, extract it into a custom hook (`useTodoList.ts`, etc.) in `src/hooks/`.

### Data / Constants → `src/constants/` or top of relevant file
Static data arrays (e.g., the `apps` navigation array in `Header.tsx`) belong at module scope, outside the component body. If shared across files, move to `src/constants/index.ts`.

### Utils → `src/utils/`
Pure functions with no React dependencies (e.g., formatting, filtering, sorting helpers) belong in `src/utils/`. They must be independently testable.

### Theme → `src/assets/theme.tsx`
Only MUI `createTheme` config. Do not import components or business logic here.

## State Management
- All todo state lives in `App.tsx` via `useState`.
- `localStorage` sync is handled in `App.tsx` via a single `useEffect`.
- Child components receive only what they need via props — no prop drilling beyond two levels.
- When prop drilling exceeds two levels or state is shared across unrelated trees, introduce React Context.

## Data Flow
```
App.tsx (state owner)
  ├── Header       — no state, display only
  ├── TodoForm     — receives setTodoList callback, manages its own input state
  ├── TodoList     — receives todoList + handlers, renders list
  │     └── TodoListItem — receives single todo + action callbacks
  └── Footer       — no state, display only
```

## Adding New Features — Checklist
1. Define types/interfaces in `src/lib/index.ts` first.
2. Create the component in `src/components/` (max 100 lines).
3. Export it from `src/components/index.ts`.
4. If logic is complex, extract a custom hook in `src/hooks/`.
5. Add a Storybook story in `src/stories/`.
6. Re-run lint before committing: `pnpm lint`.
