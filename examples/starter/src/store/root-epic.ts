import { combineEpics } from 'redux-observable';
import * as bugReportSandboxEpics from '../bug-report-sandbox/epics';

export default combineEpics(...Object.values(bugReportSandboxEpics));
