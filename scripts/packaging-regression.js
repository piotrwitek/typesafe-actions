'use strict';

/**
 * Build-artifact regression for the RxJS split.
 *
 * The root CJS entry must load in a fixture that does not have rxjs
 * installed. The async-epic entry must keep rxjs external and work when
 * rxjs is installed.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

const rootBundles = [
  'dist/typesafe-actions.cjs.development.js',
  'dist/typesafe-actions.cjs.production.js',
  'dist/typesafe-actions.es.production.js',
  'dist/typesafe-actions.umd.development.js',
  'dist/typesafe-actions.umd.production.js',
];

const asyncEpicBundles = [
  'dist/typesafe-actions.async-epic.cjs.development.js',
  'dist/typesafe-actions.async-epic.cjs.production.js',
  'dist/typesafe-actions.async-epic.es.production.js',
];

function fail(message) {
  console.error(message);
  process.exit(1);
}

function read(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    fail(
      'Missing build artifact: ' +
        relativePath +
        '\nRun npm run build before this script.'
    );
  }
  return fs.readFileSync(fullPath, 'utf8');
}

const rootTypes = read('dist/index.d.ts');
if (
  rootTypes.indexOf('createAsyncEpic') !== -1 ||
  rootTypes.indexOf('rxjs') !== -1
) {
  fail(
    'dist/index.d.ts still references createAsyncEpic or rxjs. Root types must stay RxJS-free.'
  );
}

const asyncEpicTypes = read('dist/async-epic.d.ts');
if (asyncEpicTypes.indexOf('createAsyncEpic') === -1) {
  fail('dist/async-epic.d.ts does not export createAsyncEpic.');
}

rootBundles.forEach(relativePath => {
  const source = read(relativePath);
  if (source.indexOf('rxjs') !== -1) {
    fail(
      relativePath +
        ' references rxjs. The root entry must load without RxJS installed.'
    );
  }
});

function keepsRxjsExternal(source) {
  return /require\((['"])rxjs(?:\/operators)?\1\)|from\s*(['"])rxjs(?:\/operators)?\2/.test(
    source
  );
}

asyncEpicBundles.forEach(relativePath => {
  const source = read(relativePath);
  if (!keepsRxjsExternal(source)) {
    fail(
      relativePath +
        ' does not import rxjs. createAsyncEpic must keep RxJS external.'
    );
  }
});

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(name => {
      copyRecursive(path.join(src, name), path.join(dest, name));
    });
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function installPackageCopy(fixtureDir) {
  const dest = path.join(fixtureDir, 'node_modules', 'typesafe-actions');
  fs.mkdirSync(fixtureDir, { recursive: true });
  copyRecursive(
    path.join(repoRoot, 'package.json'),
    path.join(dest, 'package.json')
  );
  copyRecursive(path.join(repoRoot, 'index.js'), path.join(dest, 'index.js'));
  copyRecursive(
    path.join(repoRoot, 'async-epic.js'),
    path.join(dest, 'async-epic.js')
  );
  copyRecursive(path.join(repoRoot, 'dist'), path.join(dest, 'dist'));
}

function linkDependency(fixtureDir, name) {
  const source = path.join(repoRoot, 'node_modules', name);
  if (!fs.existsSync(source)) {
    fail('Missing dependency in the repo install: ' + name);
  }
  fs.symlinkSync(source, path.join(fixtureDir, 'node_modules', name), 'dir');
}

function runFixture(fixtureDir, filename, source, nodeEnv) {
  const scriptPath = path.join(fixtureDir, filename);
  fs.writeFileSync(scriptPath, source);
  const env = {
    PATH: process.env.PATH,
    HOME: process.env.HOME || '',
    TMPDIR: os.tmpdir(),
  };
  if (nodeEnv) {
    env.NODE_ENV = nodeEnv;
  }
  return spawnSync(process.execPath, [scriptPath], {
    cwd: fixtureDir,
    env: env,
    encoding: 'utf8',
  });
}

function assertSuccess(result, label) {
  if (result.error) {
    fail(label + ' could not start: ' + result.error.message);
  }
  if (result.status !== 0) {
    fail(
      label +
        ' failed with status ' +
        result.status +
        '\nstdout:\n' +
        result.stdout +
        '\nstderr:\n' +
        result.stderr
    );
  }
  process.stdout.write(label + ' passed\n' + result.stdout);
}

function typecheck(fixtureDir, filename, source) {
  fs.writeFileSync(path.join(fixtureDir, filename), source);
  const configName = filename.replace(/\.ts$/, '.json');
  fs.writeFileSync(
    path.join(fixtureDir, configName),
    JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          target: 'es6',
          module: 'commonjs',
          moduleResolution: 'node',
          noEmit: true,
          esModuleInterop: true,
        },
        files: [filename],
      },
      null,
      2
    )
  );
  const tscJs = path.join(
    repoRoot,
    'node_modules',
    'typescript',
    'lib',
    'tsc.js'
  );
  return spawnSync(process.execPath, [tscJs, '-p', configName], {
    cwd: fixtureDir,
    env: {
      PATH: process.env.PATH,
      HOME: process.env.HOME || '',
      TMPDIR: os.tmpdir(),
    },
    encoding: 'utf8',
  });
}

function assertFailure(result, label, pattern) {
  if (result.status === 0) {
    fail(label + ' unexpectedly succeeded\nstdout:\n' + result.stdout);
  }
  const output = String(result.stdout) + '\n' + String(result.stderr);
  if (!pattern.test(output)) {
    fail(label + ' failed without the expected error\n' + output);
  }
  process.stdout.write(label + ' passed\n');
}

const rootLoader = [
  "'use strict';",
  "const assert = require('assert');",
  "const actions = require('typesafe-actions');",
  "assert.strictEqual(typeof actions.createAction, 'function');",
  "assert.strictEqual(typeof actions.createAsyncAction, 'function');",
  'assert.strictEqual(actions.createAsyncEpic, undefined);',
  "const increment = actions.createAction('INCREMENT')();",
  "assert.deepStrictEqual(increment(), { type: 'INCREMENT' });",
  "console.log('createAction ok');",
  '',
].join('\n');

const asyncEpicLoader = [
  "'use strict';",
  "const assert = require('assert');",
  "const { createAsyncAction } = require('typesafe-actions');",
  "const epicApi = require('typesafe-actions/async-epic');",
  "const { of } = require('rxjs');",
  "assert.strictEqual(typeof epicApi.createAsyncEpic, 'function');",
  "assert.strictEqual(typeof epicApi.handleAsyncAction, 'function');",
  "assert.strictEqual(typeof epicApi.catchErrorAndHandleWithAction, 'function');",
  "assert.strictEqual(typeof epicApi.takeUntilAction, 'function');",
  'const ping = createAsyncAction(',
  "  'PING_REQUEST',",
  "  'PING_SUCCESS',",
  "  'PING_FAILURE'",
  ')();',
  "const epic = epicApi.createAsyncEpic(ping, () => of('pong'));",
  'const actual = [];',
  'epic(of(ping.request()), {}, {}).subscribe(action => {',
  '  actual.push(action);',
  '});',
  "assert.deepStrictEqual(actual, [ping.success('pong')]);",
  "console.log('createAsyncEpic ok');",
  '',
].join('\n');

const asyncEpicMissingRxjsLoader = [
  "'use strict';",
  "require('typesafe-actions/async-epic');",
  '',
].join('\n');

const rootTypesConsumer = [
  "import { createAction } from 'typesafe-actions';",
  '',
  "export const increment = createAction('INCREMENT')<number>();",
  '',
].join('\n');

const asyncEpicTypesConsumer = [
  "import { createAsyncAction } from 'typesafe-actions';",
  "import { createAsyncEpic } from 'typesafe-actions/async-epic';",
  '',
  'const ping = createAsyncAction(',
  "  'PING_REQUEST',",
  "  'PING_SUCCESS',",
  "  'PING_FAILURE'",
  ')<undefined, string, Error>();',
  '',
  "export const epic = createAsyncEpic(ping, () => Promise.resolve('pong'));",
  '',
].join('\n');

const rootMustNotExportEpic = [
  "import { createAsyncEpic } from 'typesafe-actions';",
  '',
  'export const epic = createAsyncEpic;',
  '',
].join('\n');

const tempRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), 'typesafe-actions-packaging-')
);
if (!path.relative(repoRoot, tempRoot).startsWith('..')) {
  fail(
    'Fixture directory must live outside the repository so module resolution cannot see node_modules/rxjs: ' +
      tempRoot
  );
}

const withoutRxjs = path.join(tempRoot, 'without-rxjs');
const withRxjs = path.join(tempRoot, 'with-rxjs');

installPackageCopy(withoutRxjs);
installPackageCopy(withRxjs);
linkDependency(withRxjs, 'rxjs');
if (fs.existsSync(path.join(repoRoot, 'node_modules', 'tslib'))) {
  linkDependency(withRxjs, 'tslib');
}

try {
  assertSuccess(
    runFixture(withoutRxjs, 'load-root.js', rootLoader),
    'root entry without rxjs (development)'
  );
  assertSuccess(
    runFixture(withoutRxjs, 'load-root-prod.js', rootLoader, 'production'),
    'root entry without rxjs (production)'
  );
  assertFailure(
    runFixture(
      withoutRxjs,
      'load-async-epic.js',
      asyncEpicMissingRxjsLoader
    ),
    'async-epic entry without rxjs',
    /Cannot find module 'rxjs'/
  );
  assertSuccess(
    runFixture(withRxjs, 'load-async-epic.js', asyncEpicLoader),
    'async-epic entry with rxjs (development)'
  );
  assertSuccess(
    runFixture(
      withRxjs,
      'load-async-epic-prod.js',
      asyncEpicLoader,
      'production'
    ),
    'async-epic entry with rxjs (production)'
  );
  assertSuccess(
    typecheck(withoutRxjs, 'root-consumer.ts', rootTypesConsumer),
    'root types without rxjs'
  );
  assertSuccess(
    typecheck(withRxjs, 'async-epic-consumer.ts', asyncEpicTypesConsumer),
    'async-epic types with rxjs'
  );
  assertFailure(
    typecheck(withoutRxjs, 'root-epic-consumer.ts', rootMustNotExportEpic),
    'root types do not export createAsyncEpic',
    /createAsyncEpic/
  );
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

console.log('packaging regression passed');
