// @flow
export type CALLBACK_TYPE = 'ACCEPT' | 'APPROACHING' | 'LEAVED';

export interface ILocationCallback {
  approaching: Boolean;
  code: CALLBACK_TYPE;
  created_at: Number;
  latitude: Number;
  longitude: Number;
  type: String;
}
