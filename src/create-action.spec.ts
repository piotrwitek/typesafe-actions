import { action, actionCreator, createActionDeprecated } from '.';

const deprecatedCreateAction = createActionDeprecated;
const newCreateAction = actionCreator(
  'GET_TODO',
  type => (token: string, id: string) => ({
    type,
    payload: id,
    meta: token,
  })
);

const newCreateActionPlus = actionCreator(
  'GET_TODO',
  type => (token: string, id: string) => action(type, id, token)
);
