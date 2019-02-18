import * as T from './type-helpers';
import { action } from './action';

it.skip('skip', () => undefined);

describe('with symbol', () => {
  const ACTION = Symbol(1);
  const withSymbol = () => action(ACTION as any);
  // @dts-jest:pass:snap -> { type: any; }
  withSymbol(); // => { type: ACTION }
});

describe('with type only', () => {
  const withTypeOnly = () => action('ACTION');
  // @dts-jest:pass:snap -> { type: "ACTION"; }
  withTypeOnly(); // => { type: 'ACTION' }
});

describe('with payload', () => {
  const withPayload = (message: string) => action('ACTION', message);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string; }
  withPayload('Hello!'); // => { type: 'ACTION',payload: 'Hello!' }
});

describe('with optional payload', () => {
  const withOptionalPayload = (message?: string) => action('ACTION', message);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; }
  withOptionalPayload(); // => { type: 'ACTION' }
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; }
  withOptionalPayload('Hello!'); // => { type: 'ACTION', payload: 'Hello!' }
});

describe('with meta', () => {
  const withMeta = (scope: string) => action('ACTION', undefined, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; meta: string; }
  withMeta('info'); // => { type: 'ACTION', meta: 'info' }
});

describe('with optional meta', () => {
  const withOptionalMeta = (scope?: string) =>
    action('ACTION', undefined, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; meta: string | undefined; }
  withOptionalMeta(); // => { type: 'ACTION' }
  // @dts-jest:pass:snap -> { type: "ACTION"; meta: string | undefined; }
  withOptionalMeta('info'); // => { type: 'ACTION', meta: 'info' }
});

describe('with payload and meta', () => {
  const withPayloadAndMeta = (message: string, scope: string) =>
    action('ACTION', message, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string; meta: string; }
  withPayloadAndMeta('Hello!', 'info'); // => { type: 'ACTION', payload: 'Hello!', meta: 'info' }
});

describe('with optional payload and meta', () => {
  const withOptionalPayloadAndMeta = (scope: string, message?: string) =>
    action('ACTION', message, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; meta: string; }
  withOptionalPayloadAndMeta('info'); // => { type: 'ACTION', meta: 'info' }
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; meta: string; }
  withOptionalPayloadAndMeta('info', 'Hello!'); // => { type: 'ACTION', payload: 'Hello!', meta: 'info' }
});

describe('with payload and optional meta', () => {
  const withPayloadAndOptionalMeta = (message: string, scope?: string) =>
    action('ACTION', message, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string; meta: string | undefined; }
  withPayloadAndOptionalMeta('Hello!'); // => { type: 'ACTION', payload: 'Hello!' }
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string; meta: string | undefined; }
  withPayloadAndOptionalMeta('Hello!', 'info'); // => { type: 'ACTION', payload: 'Hello!', meta: 'info' }
});

describe('with optional payload and optional meta', () => {
  const withOptionalPayloadAndOptionalMeta = (
    message?: string,
    scope?: string
  ) => action('ACTION', message, scope);
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; meta: string | undefined; }
  withOptionalPayloadAndOptionalMeta(); // => { type: 'ACTION' }
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; meta: string | undefined; }
  withOptionalPayloadAndOptionalMeta('Hello!'); // => { type: 'ACTION', payload: 'Hello!' }
  // @dts-jest:pass:snap -> { type: "ACTION"; payload: string | undefined; meta: string | undefined; }
  withOptionalPayloadAndOptionalMeta('Hello!', 'info'); // => { type: 'ACTION', payload: 'Hello!', meta: 'info' }
});
