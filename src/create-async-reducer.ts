import { isActionOf } from './is-action-of';
import { Action, Reducer } from './type-helpers';

type AsyncActionGroup = {
  request: (...args: any[]) => Action;
  success: (...args: any[]) => Action;
  failure: (...args: any[]) => Action;
};

export function createLoadingReducer(
  asyncAction: AsyncActionGroup,
  initialState = false
): Reducer<boolean, Action> {
  return (state = initialState, action) => {
    if (isActionOf(asyncAction.request, action)) {
      return true;
    }
    if (isActionOf([asyncAction.success, asyncAction.failure], action)) {
      return false;
    }
    return state;
  };
}

export function createErrorReducer<TError = Error>(
  asyncAction: AsyncActionGroup,
  initialState: TError | null = null
): Reducer<TError | null, Action> {
  return (state = initialState, action) => {
    if (isActionOf(asyncAction.failure, action)) {
      return (action as { payload: TError }).payload;
    }
    if (isActionOf([asyncAction.request, asyncAction.success], action)) {
      return null;
    }
    return state;
  };
}

export function createAsyncReducer<TSuccess, TError = Error>(
  asyncAction: AsyncActionGroup,
  initialData: TSuccess | null = null
): Reducer<{ loading: boolean; error: TError | null; data: TSuccess | null }, Action> {
  const loading = createLoadingReducer(asyncAction);
  const error = createErrorReducer<TError>(asyncAction);
  return (
    state = { loading: false, error: null, data: initialData },
    action
  ) => {
    const nextLoading = loading(state.loading, action);
    const nextError = error(state.error, action);
    let data = state.data;
    if (isActionOf(asyncAction.request, action)) {
      data = initialData;
    } else if (isActionOf(asyncAction.success, action)) {
      data = (action as { payload: TSuccess }).payload;
    }
    return { loading: nextLoading, error: nextError, data };
  };
}
