// import { createSelector } from 'reselect';

import { SandboxState } from './reducer';

export const getItems = (state: SandboxState) => state.items;
