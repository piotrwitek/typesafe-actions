import { RouterAction, LocationChangeAction } from 'react-router-redux';
type ReactRouterAction = RouterAction | LocationChangeAction;

import * as bugReportSandboxActions from '../bug-report-sandbox/actions';
import { ActionType } from 'typesafe-actions';

export type RootAction =
  | ReactRouterAction
  | ActionType<typeof bugReportSandboxActions>;
