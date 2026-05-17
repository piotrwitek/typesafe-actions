import { createAction } from './create-action';
import { createAsyncAction } from './create-async-action';
import { createCustomAction } from './create-custom-action';

describe('action creator metadata', () => {
  it('exposes the action type on createCustomAction creators', () => {
    const creator = createCustomAction('CREATE_CUSTOM_ACTION');

    expect(creator.type).toBe('CREATE_CUSTOM_ACTION');
  });

  it('matches createCustomAction actions by type', () => {
    const creator = createCustomAction('CREATE_CUSTOM_ACTION');

    expect(creator.match(creator())).toBe(true);
    expect(creator.match({ type: 'OTHER_ACTION' })).toBe(false);
  });

  it('returns false when matching nullish values', () => {
    const creator = createCustomAction('CREATE_CUSTOM_ACTION');

    expect(creator.match(null)).toBe(false);
    expect(creator.match(undefined)).toBe(false);
  });

  it('exposes the action type on createAction creators', () => {
    const creator = createAction('CREATE_ACTION')<number>();

    expect(creator.type).toBe('CREATE_ACTION');
  });

  it('matches createAction actions by type', () => {
    const creator = createAction('CREATE_ACTION')<number>();

    expect(creator.match(creator(1))).toBe(true);
    expect(creator.match({ type: 'OTHER_ACTION' })).toBe(false);
  });

  it('exposes metadata on async action creators', () => {
    const asyncCreator = createAsyncAction(
      'FETCH_REQUEST',
      'FETCH_SUCCESS',
      'FETCH_FAILURE'
    )<undefined, number, Error>();

    expect(asyncCreator.request.type).toBe('FETCH_REQUEST');
    expect(asyncCreator.request.match(asyncCreator.request())).toBe(true);
    expect(asyncCreator.success.type).toBe('FETCH_SUCCESS');
    expect(asyncCreator.success.match(asyncCreator.success(1))).toBe(true);
    expect(asyncCreator.failure.type).toBe('FETCH_FAILURE');
    expect(asyncCreator.failure.match(asyncCreator.success(1))).toBe(false);
  });
});
