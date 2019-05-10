/*
 * @file reducers for items
 */

import * as ActionTypes from '../actions';

const initialState = {
  isFetching: false,
  items: [],
};

const { pendingOf, fulfilledOf } = ActionTypes;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case pendingOf(ActionTypes.FETCH_ENTRY_LIST):
      return {
        ...state,
        isFetching: true,
      };

    case fulfilledOf(ActionTypes.FETCH_ENTRY_LIST):
      return {
        ...state,
        isFetching: false,
        items: payload,
      };

    default:
      return state;
  }
}

