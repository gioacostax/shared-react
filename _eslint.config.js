/**
 * This file can be used to define Eslint configuration,
 * more info in https://eslint.org/docs/latest/use/configure/configuration-files/
 */

import { fixupPluginRules } from '@eslint/compat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import("eslint").Linter.Config} */
export default [
  /**
   * React config
   * - eslint-plugin-react
   * - eslint-plugin-react-hooks
   * - eslint-plugin-jsx-a11y
   * - @types/eslint__js
   * - @eslint/compat (for legacy support)
   */
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    ...pluginReact.configs.flat.recommended,
    ...pluginReactHooks.configs['jsx-runtime'],
    plugins: {
      ...pluginReact.configs.flat.all.plugins,
      'jsx-a11y': jsxA11y,
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
];
