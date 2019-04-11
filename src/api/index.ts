import { API_URL } from '../../settings';
import { ILocationCallback } from '../models/LocationCallback';
import { ILocationSendPayload } from '../models/LocationSendPayload';
import { ISettings } from '../models/Settings';

export const sendLocation = async (
  settings: ISettings,
  payload: ILocationSendPayload
): Promise<ILocationCallback> => {
  const response = await fetch(
    `${API_URL}/peers/${settings.peerId}/locations`,
    {
      body: JSON.stringify(payload),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST',
      mode: 'cors',
      referrer: 'no-referrer'
    }
  ).catch(Promise.reject);
  if (!response) {
    return Promise.reject();
  }
  if (response.status !== 201) {
    return Promise.reject(response);
  }
  return response.json().catch(Promise.reject);
};
