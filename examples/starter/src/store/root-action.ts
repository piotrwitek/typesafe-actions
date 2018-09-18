import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { SandboxAction } from '../bug-report-sandbox/';

type ReactRouterAction = RouterAction | LocationChangeAction;
export type RootAction = ReactRouterAction | SandboxAction;
