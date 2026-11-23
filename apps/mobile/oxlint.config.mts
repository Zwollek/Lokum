// .mts: the Expo package is CommonJS (metro.config.js), so the config must be an ES module explicitly.
import { defineConfig } from 'oxlint';
import native from 'oxlint-config-universe/native';
import typescriptAnalysis from 'oxlint-config-universe/typescript-analysis';

export default defineConfig({
  extends: [native, typescriptAnalysis],
  ignorePatterns: ['.expo/', 'src/uniwind-types.d.ts', 'expo-env.d.ts'],
});
