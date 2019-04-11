import { Action, Dispatch } from 'redux';

import { ISettings } from '../models/Settings';
import {
  fetchSettings as fetchSettingsUitl,
  saveSettings as saveSettingsUtil
} from '../storage/settings';

export enum ActionNames {
  FetchSettings = 'settings/fetch_settings',
  SaveSettings = 'settings/save_settings'
}

interface IFetchSettingsPayload {
  settings: ISettings;
}

interface IFetchSettingsAction extends Action {
  type: ActionNames.FetchSettings;
  payload: IFetchSettingsPayload;
}

export const fetchSettings = (settings: ISettings): IFetchSettingsAction => ({
  payload: {
    settings
  },
  type: ActionNames.FetchSettings
});

export const fetchSettingsAsync = () => async (dispatch: Dispatch<any>) => {
  const settings = await fetchSettingsUitl();
  if (settings) {
    dispatch(fetchSettings(settings));
  }
};

interface ISaveSettingsPayload {
  settings: ISettings;
}

interface ISaveSettingsAction extends Action {
  type: ActionNames.SaveSettings;
  payload: ISaveSettingsPayload;
}

export const saveSettings = (settings: ISettings): ISaveSettingsAction => ({
  payload: {
    settings
  },
  type: ActionNames.SaveSettings
});

export const saveSettingsAsync = (settings: ISettings) => async (
  dispatch: Dispatch<any>
) => {
  await saveSettingsUtil(settings);
  dispatch(saveSettings(settings));
};

export type SettingsActions = IFetchSettingsAction | ISaveSettingsAction;
