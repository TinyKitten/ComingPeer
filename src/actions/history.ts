import { Action } from 'redux';
import { ILocationCallback } from '../models/LocationCallback';

export enum ActionNames {
  AddHistory = 'history/add_history',
  ClearHistory = 'history/clear_history'
}

export interface IAddHistoryPayload {
  history: ILocationCallback;
}

interface IAddHistoryAction extends Action {
  type: ActionNames.AddHistory;
  payload: IAddHistoryPayload;
}

export const addHistory = (payload: IAddHistoryPayload): IAddHistoryAction => ({
  payload,
  type: ActionNames.AddHistory
});

interface IClearHistoryAction extends Action {
  type: ActionNames.ClearHistory;
}

export const clearHistory = (): IClearHistoryAction => ({
  type: ActionNames.ClearHistory
});

export type HistoryActions = IAddHistoryAction | IClearHistoryAction;
