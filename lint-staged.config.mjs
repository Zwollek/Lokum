import path from 'node:path';

const root = import.meta.dirname;

/** Paths relative to an app directory, quoted for the shell. */
const relative = (dir, files) =>
  files.map((file) => `"${path.relative(path.join(root, dir), file)}"`).join(' ');

/** Oxlint (with autofix) using the app's own config. */
const oxlint = (app) => (files) =>
  `pnpm --dir apps/${app} exec oxlint --deny-warnings --fix ${relative(`apps/${app}`, files)}`;

/** php-cs-fixer + PHPStan through scripts/api-php.sh (Docker or local PHP 8.5). */
const php = (files) => {
  const commands = [
    `scripts/api-php.sh vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php --path-mode=intersection ${relative('apps/api', files)}`,
  ];

  // PHPStan analyses only our code (see phpstan.dist.neon).
  const analysed = files.filter((file) => {
    const rel = path.relative(path.join(root, 'apps/api'), file);
    return /^(src|tests)\//.test(rel) && rel !== 'tests/bootstrap.php';
  });
  if (analysed.length > 0) {
    commands.push(
      `scripts/api-php.sh vendor/bin/phpstan analyse --memory-limit=1G --no-progress ${relative('apps/api', analysed)}`,
    );
  }

  return commands;
};

/** @type {import('lint-staged').Configuration} */
export default {
  'apps/web/**/*.{ts,tsx}': oxlint('web'),
  'apps/mobile/**/*.{ts,tsx}': oxlint('mobile'),
  '*.{ts,tsx,js,mjs,cjs,json,md,yml,yaml,css}': 'prettier --write --ignore-unknown',
  'apps/api/**/*.php': php,
};
