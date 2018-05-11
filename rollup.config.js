import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'out/index.js',
    output: {
      name: 'TypesafeActions',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      sourceMaps(),
      uglify(),
      filesize(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'out/index.js',
    external: ['tslib'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [filesize()],
  },
];
