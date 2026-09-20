# TypeScript & Linting

## TypeScript Configuration
The project uses TypeScript 5 in **strict mode**. All flags below are active — do not disable them.

```json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noFallthroughCasesInSwitch": true
```

## Type Rules

### Always type function parameters and return values
```ts
// Bad
const toggleTodo = (id, completed) => { ... }

// Good
const toggleTodo = (id: string, completed: boolean): void => { ... }
```

### Prefer interfaces over type aliases for object shapes
Use `interface` for object/props types. Use `type` for unions, intersections, or aliases.
```ts
// Props → interface
interface TodoItemProps { id: string; title: string; completed: boolean; }

// Union → type alias
type Status = 'active' | 'completed' | 'archived';

// Composition → type alias
type TodoListItemProps = TodoItemProps & TodoListItemActions;
```

### Never use `any`
Use `unknown` when the type is genuinely unknown and narrow it. Use proper generic types instead.

### Avoid non-null assertion `!` unless unavoidable
The one accepted exception is `document.getElementById('root') as HTMLElement` in `main.tsx` since Vite guarantees the element exists.

### No explicit `React.FC` or `React.FunctionComponent`
Use plain function declarations or arrow functions with typed props. The JSX transform is enabled so `React` does not need to be imported for JSX.

```ts
// Bad
const MyComp: React.FC<Props> = ({ prop }) => ...

// Good
export default function MyComp({ prop }: Props) { ... }
```

### Type-only imports
When importing only types, use `import type`:
```ts
import type { Meta, StoryObj } from '@storybook/react';
```

## Where Types Live
- **Shared types** (used in 2+ files) → `src/lib/index.ts`
- **Component-local types** (used only in that file) → top of that component file
- **Never** define types inside function bodies or JSX

## ESLint Rules
Active plugins: `@typescript-eslint`, `react-hooks`, `react-refresh`, `storybook`.

Enforced rules to always follow:
- `react-hooks/rules-of-hooks` — hooks only at top level, not inside conditions or loops.
- `react-hooks/exhaustive-deps` — include all reactive values in `useEffect`/`useCallback` deps.
- `react-refresh/only-export-components` — each component file exports only the component (and its types).
- `@typescript-eslint/recommended` — all recommended TS rules.
- `eslint:recommended` — no unused vars, no undef, etc.

Run lint before every commit:
```bash
pnpm lint
```
The script is configured with ESLint 9 flat config (`eslint.config.js`). Any error fails the run.

## Common Mistakes to Avoid
- Leaving `console.log` in committed code — remove or replace with a proper logging util.
- Using `// eslint-disable` without a documented reason — avoid entirely if possible.
- Importing `React` explicitly for JSX — the project uses the automatic JSX transform; it's not needed (except in `main.tsx` for `React.StrictMode`).
- Defining event handler types as `any` — use `MouseEvent<HTMLElement>`, `FormEvent<HTMLFormElement>`, etc. from React.
- Using `defaultProps` on function components — use default parameter values instead.
