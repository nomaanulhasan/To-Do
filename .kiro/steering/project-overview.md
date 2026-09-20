# Project Overview

## What This Is
A personal To-Do List web app built with React 18, TypeScript, Vite, and Material UI (MUI v5). It persists tasks in `localStorage` and uses Emotion for theming. Storybook is set up for UI component development.

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 18 (JSX transform, no import needed) |
| Language | TypeScript 5 — strict mode enabled |
| Build tool | Vite 6 with `@vitejs/plugin-react-swc` |
| UI library | MUI v9 (`@mui/material`, `@mui/icons-material`) |
| Styling | Emotion (`@emotion/react`, `@emotion/styled`) + CSS variables |
| Theme | Custom MUI theme in `src/assets/theme.tsx` |
| Font | Roboto via `@fontsource/roboto` v5 |
| State | React `useState` / `useEffect` — no external state library |
| Persistence | `localStorage` |
| Stories | Storybook 8 |
| Package manager | pnpm |
| Linting | ESLint 9 flat config (`eslint.config.js`) with `typescript-eslint`, `react-hooks`, `react-refresh`, `storybook` plugins |

## Entry Points
- `src/main.tsx` — mounts React app, wraps with `ThemeProvider` + `CssBaseline`
- `src/App.tsx` — root component, owns all todo state and handlers
- `index.html` — Vite HTML template

## Key Directories
```
src/
  assets/     — theme config (theme.tsx), static assets
  components/ — all UI components + barrel index.ts
  lib/        — shared types/interfaces (index.ts)
  stories/    — Storybook story files
```

## App Behavior
- Todos are stored as `TodoItemProps[]` in `localStorage` under key `LOCAL_TODO_LIST`.
- State is initialized lazily from `localStorage` via the `useState` initializer function.
- Adding, toggling, and deleting todos are handled in `App.tsx` and passed down as props.
- The UI is a fixed-header, scrollable list, fixed-footer single-page layout constrained to `maxWidth="sm"`.
