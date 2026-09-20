# Component Patterns

## Core Rules
- One component per file. File name matches component name exactly (PascalCase).
- Max **100 lines per component file**, including imports and exports.
- Prefer small, focused components. If JSX grows large, extract sub-components.
- Keep JSX return lean — no inline logic blocks inside JSX. Extract to variables or helper functions above the return.

## Component Structure (top → bottom)
```tsx
// 1. Imports
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SomeType } from '../lib';

// 2. Module-level constants (static data, config)
const ITEMS = [...];

// 3. Local interfaces (only if used only in this file)
interface Props { ... }

// 4. Component function
export default function MyComponent({ prop }: Props) {
  // 4a. Hooks
  const [state, setState] = useState(...);

  // 4b. Derived values / memos
  const derivedValue = ...;

  // 4c. Handlers
  const handleClick = () => { ... };

  // 4d. JSX — lean, no inline logic
  return (
    <Box>
      ...
    </Box>
  );
}
```

## Props
- Define props as a TypeScript interface, not inline type literals.
- If the interface is used in more than one file, move it to `src/lib/index.ts`.
- Use default parameter values for optional props instead of `defaultProps` (deprecated).

**Good:**
```tsx
export default function Footer({ showCopyright = false }: FooterProps) {
```

## Handlers
- Always extract handlers as named `const` functions above `return`. Never write complex handlers inline in JSX.

**Bad:**
```tsx
<Button onClick={() => { if (x) { doThing(); doOther(); } }}>
```
**Good:**
```tsx
const handleClick = () => {
  if (x) {
    doThing();
    doOther();
  }
};
// ...
<Button onClick={handleClick}>
```

## Conditional Rendering
- Use ternaries for simple true/false cases. Use `&&` for render-or-nothing.
- For complex conditions, extract to a variable above the return.

```tsx
// Simple — ternary ok
{showCopyright ? `Copyright © ${year}` : 'Powered By:'}

// Complex — extract to variable
const emptyState = todoList.length === 0 && <EmptyMessage />;
return <>{emptyState}<Stack>...</Stack></>;
```

## Spread Props
- Spread `{...props}` only when passing through all remaining props to a native/MUI element.
- Never use `{...{ prop1, prop2 }}` — pass props explicitly for clarity.

**Bad:**
```tsx
<TodoList {...{ todoList, toggleTodo, deleteTodo }} />
```
**Good:**
```tsx
<TodoList todoList={todoList} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
```

## MUI Usage
- Import all MUI components from `@mui/material` in a single grouped statement.
- Import MUI icons from `@mui/icons-material` separately.
- Use `sx` prop for all component-specific styles — no separate CSS files per component.
- Use `theme.spacing()` for numeric spacing when you need to reference the MUI theme directly.
- Avoid the deprecated `Hidden` component — use `sx={{ display: { xs: 'flex', md: 'none' } }}` instead.

## Accessibility
- Every interactive element that is not a button/link must have an `aria-label`.
- Icon-only buttons must have `aria-label` describing the action (e.g., `aria-label='delete'`).
- Form inputs must have an associated `label` — either via `label` prop or `aria-label`.
- Use semantic HTML where possible (`form`, `nav`, etc.) rather than generic `div/Box`.

## Keys in Lists
- Always use a stable, unique `id` as the `key` prop — never use array index.
- The `key` must be on the outermost element returned in the `.map()` — never inside a fragment wrapper.
