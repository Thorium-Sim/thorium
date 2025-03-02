import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Enable TypeScript support
  tseslint.configs.base,
  
  // Base ESLint configuration
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin
    },
    rules: {
      // Preserve existing rules
      'no-console': 'off',
      
      // React rules
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Apply prettier config last to avoid conflicts
  prettier,

  // Ignore patterns (converted from previous config)
  {
    ignores: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/build/**',
      '**/server/build/**',
      '**/.cache/**',
      '**/locales/**',
      '**/src/models/**',
      '**/test/**',
      '**/coverage/**',
      '**/scripts/**',
      '**/node_modules/**',
      '**/build/**',
      '**/TweenMax.min.js',
      '**/plopfile.js',
      '**/config/**',
      '**/build/**',
      '**/server/build/**',
      '**/cache/**',
      '**/locales/**',
      '**/src/models/**',
      '**/packages/**',
      '**/tempServer/**',
      '**/temp/**',
      '**/client/dist/**',
      "**/Universe/**",
      "**/*.d.ts"
    ]
  }
); 