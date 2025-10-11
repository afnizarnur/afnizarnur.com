import sharedConfig from '@afnizarnur/config-eslint';

export default [
  ...sharedConfig,
  {
    ignores: ['dist', 'node_modules', '.turbo']
  }
];
