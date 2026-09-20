# Storybook

## Setup
- Storybook 8 with `@storybook/react-vite` builder.
- Config files in `.storybook/main.ts` and `.storybook/preview.ts`.
- Stories live in `src/stories/`.

## Story File Rules
- One story file per component: `<ComponentName>.stories.ts`.
- Use `.ts` extension (not `.tsx`) unless the story needs JSX — keep stories declarative with `args` only.
- Import app CSS at the top of every story file so the visual context is consistent:
  ```ts
  import '../App.css';
  import '../index.css';
  ```
- Always use `satisfies Meta<typeof Component>` for the meta object — this gives full type inference on args.
- Export the meta as `default` and individual stories as named exports.

## Story Structure
```ts
import '../App.css';
import '../index.css';
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../components';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen', // or 'centered' for isolated components
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    propA: 'value',
  },
};
```

## Naming Conventions
- `title` format: `'Components/<ComponentName>'` — matches the component name.
- Story export names are PascalCase and describe the variant: `WithCopyright`, `WithoutMenu`, `EmptyList`.

## What Belongs in Stories
- Only `args` that exercise different prop combinations.
- `parameters` for layout overrides.
- No business logic, no state management, no mocks of internal hooks in story files.
- If a story needs a decorator (e.g., `ThemeProvider`), add it in `.storybook/preview.ts` globally, not in each story file.

## Autodocs
- All stories must include `tags: ['autodocs']` so documentation is auto-generated.
- Provide JSDoc comments on component props (in `src/lib/index.ts`) to enrich the Storybook docs panel.

## Running Storybook
```bash
pnpm storybook          # dev server on port 6006
pnpm build-storybook    # static build
```
