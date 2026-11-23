/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // jest-expo defaults + ESM-only UI libraries (HeroUI Native, Uniwind, Tailwind helpers).
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|heroui-native|uniwind|tailwind-variants|tailwind-merge))',
    '/node_modules/react-native-reanimated/plugin/',
    '/node_modules/@react-native/babel-preset/',
  ],
};
