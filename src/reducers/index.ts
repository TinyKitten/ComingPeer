import { combineReducers } from 'redux';
import history, { IHistoryState } from './history';
import settings, { ISettingsState } from './settings';

export interface IAppState {
  history: IHistoryState;
  settings: ISettingsState;
}

const reducers = combineReducers({
  history,
  settings
});

export default reducers;
