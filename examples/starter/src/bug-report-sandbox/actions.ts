import cuid from 'cuid';
import { createStandardAction } from 'typesafe-actions';

import { SandboxItem } from './models';

const ADD = 'ADD';

export const add = createStandardAction(ADD).map(
  (payload: { title: string }) => ({
    payload: {
      title: payload.title || 'New Item',
      id: cuid(),
    } as SandboxItem,
  })
);
