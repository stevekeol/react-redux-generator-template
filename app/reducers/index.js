/*
 * @file main file for reducers
 */

import { combineReducers } from 'redux';
import items from './items';
import editor from './editor';
import remoteRequest from './remoteRequest';

const rootReducer = combineReducers({
  items,
  editor,
  remoteRequest
});

export default rootReducer;
