import {} from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Services = typeof import('./index').default;
}
