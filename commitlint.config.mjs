// Conventional Commits rules from CLAUDE.md ("Commity").
const apiModules = [
  'shared',
  'identity',
  'property',
  'lease',
  'billing',
  'maintenance',
  'expense',
  'content',
  'document',
  'reporting',
];

/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'style',
        'perf',
        'test',
        'docs',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'header-max-length': [2, 'always', 72],
    // Warning only: a new scope should be added here, not block the commit.
    'scope-enum': [
      1,
      'always',
      [
        'api',
        ...apiModules.map((module) => `api/${module}`),
        'web',
        'mobile',
        'theme',
        'api-client',
        'i18n',
        'config',
        'db',
        'docker',
        'docs',
        'deps',
      ],
    ],
  },
};
