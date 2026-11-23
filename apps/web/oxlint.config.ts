import { defineConfig } from 'oxlint';
import typescriptAnalysis from 'oxlint-config-universe/typescript-analysis';
import web from 'oxlint-config-universe/web';

export default defineConfig({
  extends: [web, typescriptAnalysis],
  plugins: ['react', 'typescript', 'oxc'],
  rules: {
    // Required for React Fast Refresh in Vite
    'react/only-export-components': ['warn', { allowConstantExport: true }],
  },
  ignorePatterns: ['dist/'],
});
