import { ActionNames, HistoryActions } from '../actions/history';
import { ILocationCallback } from '../models/LocationCallback';

export interface IHistoryState {
  histories: ILocationCallback[];
}

const initialState: IHistoryState = {
  histories: []
};

const historyReducer = (state = initialState, action: HistoryActions) => {
  switch (action.type) {
    case ActionNames.AddHistory:
      return {
        ...state,
        histories: [action.payload.history, ...state.histories]
      };
    case ActionNames.ClearHistory:
      return { ...state, histories: [] };
    default:
      return state;
  }
};

export default historyReducer;
