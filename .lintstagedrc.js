module.exports = {
  '**/*.{ts,tsx}': [
    'eslint . --cache --fix',
    'prettier --write',
    () => 'tsc --skipLibCheck --noEmit',
  ],
};
