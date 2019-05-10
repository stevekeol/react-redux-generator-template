/*
 * @file reducers for items
 */

import * as ActionTypes from '../actions';

const initialState = {
  isFetching: false,
  users: []
};

const { pendingOf, fulfilledOf } = ActionTypes;

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {

    case pendingOf(ActionTypes.FETCH_ROMOTE_DATA):
      return {
        ...state,
        isFetching: true,
      };

    case fulfilledOf(ActionTypes.FETCH_ROMOTE_DATA):
      return {
        ...state,
        isFetching: false,
        users: payload,
      };

    default:
      return state;
  }
}

