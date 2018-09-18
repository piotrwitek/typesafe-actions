import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { SandboxItem } from './models';
import * as actions from './actions';

export type SandboxAction = ActionType<typeof actions>;

export type SandboxState = Readonly<{
  items: SandboxItem[];
}>;

export default combineReducers<SandboxState, SandboxAction>({
  items: (state = [{ id: '0', title: 'Please add more items using the form...' }], action) => {
    switch (action.type) {
      case getType(actions.add):
        return [...state, action.payload];

      default:
        return state;
    }
  },
});
