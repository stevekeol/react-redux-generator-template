/*
 * @file reducers for editor state
 */

import * as ActionTypes from '../actions';

const initialState = {
  selectedId: null,
  isEditing: false,
};

export default function editor(state = initialState, action) {
  const { type, preload } = action;

  switch (type) {
    case ActionTypes.SELECT_ENTRY:
      return Object.assign({}, state, { selectedId: preload.id });
    case ActionTypes.UPDATE_SAVED_ENTRY:
      return Object.assign({}, state, { selectedId: preload.id, isEditing: false });
    case ActionTypes.CREATE_NEW_ENTRY:
      return Object.assign({}, state, { selectedId: null, isEditing: true });
    case ActionTypes.EDIT_ENTRY:
      return Object.assign({}, state, { selectedId: preload.id, isEditing: true });
    case ActionTypes.FINISH_DELETE_ENTRY:
      return Object.assign({}, state, { selectedId: null, isEditing: false });
    case ActionTypes.CANCEL_EDIT:
      return Object.assign({}, state, { isEditing: false });
    default:
      return state;
  }
}
