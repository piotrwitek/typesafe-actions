import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

/**
 * based on https://github.com/palmerhq/tsdx/blob/master/src/createRollupConfig.ts
 */

const babelOptions = (format /* : 'cjs' | 'es' | 'umd' */) => ({
  exclude: /node_modules/,
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.mjs', '.json'],
  presets: [['@babel/preset-env']],
  plugins: [
    require.resolve('babel-plugin-annotate-pure-calls'),
    require.resolve('babel-plugin-dev-expression'),
  ],
});

function createConfig(
  format, //: 'cjs' | 'umd' | 'es',
  env, //: 'development' | 'production',
  opts //: { input: string; name: string; target: 'node' | 'browser' }
) {
  return {
    input: opts.input,
    external: id => !id.startsWith('./') && !path.isAbsolute(id),
    output: {
      file: `dist/${pkg.name}.${format}.${env}.js`,
      format,
      freeze: false,
      esModule: false,
      treeshake: {
        propertyReadSideEffects: false,
      },
      name: opts.name,
      sourcemap: true,
      // exports: 'named',
    },
    plugins: [
      nodeResolve({
        mainFields: ['module', 'jsnext', 'main'],
        browser: format !== 'cjs',
      }),
      format === 'umd' &&
        commonjs({
          include: /\/node_modules\//,
        }),
      json(),
      babel(babelOptions(format)),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      sourceMaps(),
      sizeSnapshot({
        printInfo: false,
      }),
      env === 'production' &&
        terser({
          sourcemap: true,
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
            // collapse_vars: false,
          },
          ecma: 5,
          toplevel: format === 'es' || format === 'cjs',
          warnings: true,
        }),
    ],
  };
}

export default [
  createConfig('cjs', 'development', {
    input: './out/index.js',
  }),
  createConfig('cjs', 'production', {
    input: './out/index.js',
  }),
  createConfig('es', 'production', {
    input: './out/index.js',
  }),
  createConfig('umd', 'development', {
    input: './out/index.js',
    name: 'TypesafeActions',
  }),
  createConfig('umd', 'production', {
    input: './out/index.js',
    name: 'TypesafeActions',
  }),
];
