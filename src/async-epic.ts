/**
 * @name typesafe-actions/async-epic
 * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 * @copyright Copyright (c) 2017 Piotr Witek
 * @license MIT
 */

/**
 * RxJS-backed helpers. Import from `typesafe-actions/async-epic` so the root
 * `typesafe-actions` entry does not load RxJS.
 */

export {
  createAsyncEpic,
  handleAsyncAction,
  catchErrorAndHandleWithAction,
  takeUntilAction,
} from './create-async-epic';

export {
  AsyncActionCreatorMap,
  AsyncEpicOutputAction,
  AsyncConcurrency,
  CreateAsyncEpicOptions,
  HandleAsyncActionOptions,
} from './create-async-epic';
