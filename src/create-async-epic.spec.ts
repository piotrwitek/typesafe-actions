import { of, throwError } from 'rxjs';
import { createAsyncAction } from './create-async-action';
import { createAsyncEpic } from './create-async-epic';

const loadAsync = createAsyncAction(
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD_FAILURE',
  'LOAD_CANCEL'
)<void, string, Error, void>();

const noCancelAsync = createAsyncAction(
  'NO_CANCEL_REQUEST',
  'NO_CANCEL_SUCCESS',
  'NO_CANCEL_FAILURE'
)<void, string, Error>();

// @dts-jest:group createAsyncEpic
{
  // @dts-jest:pass:snap
  createAsyncEpic(loadAsync, () => of('result'));

  // @dts-jest:pass:snap
  createAsyncEpic(noCancelAsync, () => of('result'));
}
