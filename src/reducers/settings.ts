import { ActionNames, SettingsActions } from '../actions/settings';
import { ISettings } from '../models/Settings';

export interface ISettingsState {
  settings: ISettings | null;
  error: Error | null;
}

const initialState: ISettingsState = {
  error: null,
  settings: null
};

const historyReducer = (state = initialState, action: SettingsActions) => {
  switch (action.type) {
    case ActionNames.FetchSettings:
      return {
        ...state,
        settings: action.payload.settings
      };
    case ActionNames.SaveSettings:
      return {
        ...state,
        settings: action.payload.settings
      };
    default:
      return state;
  }
};

export default historyReducer;
