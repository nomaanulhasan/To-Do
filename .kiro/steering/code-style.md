# Code Style & Conventions

## General Rules
- Max **100 lines per file**. If a file exceeds this, split it into smaller focused modules.
- No duplicate code, variables, or imports anywhere.
- No commented-out code left in committed files — delete it or use a `// TODO:` comment with context.
- No unused variables, imports, or parameters (enforced by TypeScript `strict` + `noUnusedLocals/Parameters`).
- No lint warnings — `eslint --max-warnings 0` is enforced in CI/scripts.

## Naming Conventions
| Construct | Convention | Example |
|---|---|---|
| Components | PascalCase | `TodoListItem` |
| Functions / handlers | camelCase, verb-first | `handleAddTodo`, `toggleTodo` |
| Types / Interfaces | PascalCase, no `I` prefix | `TodoItemProps`, `FooterProps` |
| Constants (module-level) | camelCase for objects/arrays, UPPER_SNAKE for primitive magic values | `apps`, `LOCAL_TODO_KEY` |
| CSS variables | `--app-<name>` | `--app-footer-bg` |
| Files | PascalCase for components, camelCase for utils/lib | `TodoForm.tsx`, `index.ts` |

## Imports Order (top → bottom)
1. React core (`react`, `react-dom`)
2. Third-party libraries (MUI, Emotion, etc.)
3. Internal aliases / absolute paths
4. Relative imports — components, then lib/utils/assets
5. CSS / style imports last

Always use named imports from `@mui/material` in a single grouped import block — never separate `import Button from '@mui/material/Button'` alongside a grouped MUI import.

**Bad:**
```ts
import Button from '@mui/material/Button';
import { TextField, Container } from '@mui/material';
```
**Good:**
```ts
import { Button, TextField, Container } from '@mui/material';
```

## Functions & Handlers
- Prefer `const` arrow functions for handlers inside components.
- Name event handlers `handle<Action>` (e.g., `handleOpenNavMenu`, `handleAddTodo`).
- Extract complex logic out of JSX — never inline multi-line logic in JSX attributes.

## Exports
- Use `export default` for components (one per file).
- Use named exports for types, interfaces, utils, and constants.
- Every directory that exposes public API must have a barrel `index.ts`.

## String Literals
- Use single quotes `'` in TypeScript/TSX (matches ESLint and existing code).
- Use template literals when interpolating variables: `` `Key: ${id}` ``.

## CSS & Styling
- App-wide CSS variables defined in `App.css` under `:root`.
- Use MUI `sx` prop for component-level styles — do not create separate CSS files per component.
- Reference CSS variables inside `sx` via `var(--app-<name>)` strings.
- Use `theme.spacing()` for spacing values when referencing the MUI theme (e.g., inside `TodoListItem`).
- Do not mix inline `style={{}}` with `sx={{}}` on the same element.
- Global resets and scrollbar styles go in `index.css`.
