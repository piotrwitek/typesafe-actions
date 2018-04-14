import { createActionDeprecated, withType, action } from '.';

const deprecatedCreateAction = createActionDeprecated;
const newCreateAction = withType(
  'GET_TODO',
  type => (token: string, id: string) => ({
    type,
    payload: id,
    meta: token,
  })
);

const newCreateActionPlus = withType(
  'GET_TODO',
  type => (token: string, id: string) => action(type, id, token)
);
