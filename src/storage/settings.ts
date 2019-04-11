import { AsyncStorage } from 'react-native';

import { ISettings } from '../models/Settings';

export const fetchSettings = async (): Promise<ISettings | null> => {
  try {
    const value = await AsyncStorage.getItem('settings');
    if (value !== null) {
      return Promise.resolve(JSON.parse(value));
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(null);
};

export const saveSettings = async (settings: ISettings): Promise<void> => {
  try {
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  } catch (error) {
    return Promise.reject(error);
  }
  return Promise.resolve();
};
