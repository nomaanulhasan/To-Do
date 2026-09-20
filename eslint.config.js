import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  // Ignore build output and node_modules
  { ignores: ['dist', 'node_modules', 'storybook-static'] },

  // Base JS + TS recommended rules for source files
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Storybook rules for story files
  {
    files: ['src/stories/**/*.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    extends: [...storybook.configs['flat/recommended']],
    rules: {
      // @storybook/react is correct for type-only imports (Meta, StoryObj)
      // The no-renderer-packages rule incorrectly fires on `import type`
      'storybook/no-renderer-packages': 'off',
    },
  },
);
