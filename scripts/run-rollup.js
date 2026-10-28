'use strict';

/**
 * Spawn Rollup with the OpenSSL legacy provider on Node 17+.
 * rollup-plugin-size-snapshot still measures the ES bundle with webpack 4,
 * whose hash helper fails on OpenSSL 3 unless that provider is enabled.
 * Older Node versions keep the original Rollup invocation.
 */

const path = require('path');
const { spawnSync } = require('child_process');

const major = Number(process.versions.node.split('.')[0]);
const env = Object.assign({}, process.env);
if (major >= 17) {
  const flag = '--openssl-legacy-provider';
  const current = env.NODE_OPTIONS || '';
  if (current.indexOf(flag) === -1) {
    env.NODE_OPTIONS = (current + ' ' + flag).trim();
  }
}

const rollupBin = path.join(
  __dirname,
  '..',
  'node_modules',
  'rollup',
  'dist',
  'bin',
  'rollup'
);
const result = spawnSync(process.execPath, [rollupBin, '-c'], {
  cwd: path.join(__dirname, '..'),
  env: env,
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status == null ? 1 : result.status);
