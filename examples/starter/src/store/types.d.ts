declare module 'MyTypes' {
  export type RootState = import('./root-reducer').RootState;
  export type RootAction = import('./root-action').RootAction;
  export type RootService = import('./root-service').RootService;
}
