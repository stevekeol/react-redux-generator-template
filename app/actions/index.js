/*
 * @file main file for actions
 */

import * as storage from 'utils/storage';
import * as axios from 'utils/axios';

/*
 * Action Type的定义
 */
export const SELECT_ENTRY = 'SELECT_ENTRY';
export const CREATE_NEW_ENTRY = 'CREATE_NEW_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const CANCEL_EDIT = 'CANCEL_EDIT';

/*
 * Action creator的定义
 */
export function selectEntry(id) {
  return {
    type: SELECT_ENTRY,
    preload: {
      id // 解释1
    }
  };
}

export function createNewEntry() {
  return { type: CREATE_NEW_ENTRY };
}

export function editEntry(id) {
  return {
    type: EDIT_ENTRY,
    preload: {
      id
    }
  };
}

export function cancelEdit() {
  return { type: CANCEL_EDIT };
}


export const pendingOf = actionType => `${actionType}_PENDING`;
export const fulfilledOf = actionType => `${actionType}_FULFILLED`;
export const rejectedOf = actionType => `${actionType}_REJECTED`;

export const FETCH_ENTRY_LIST = 'FETCH_ENTRY_LIST';

export function fetchEntryList() {
  return {
    type: FETCH_ENTRY_LIST,
    payload: storage.getAll(), // storage.getAll()是一个promise是由于storage.js文件中强行定义了Promise。
                               // 因此当promiseMiddleware检测到preload是一个promise，则会自动处理一些东东。
  };
}

export function deleteEntry(id) {
  return dispatch => {
    storage.deleteEntry(id)
    .then(() => dispatch(fetchEntryList()));
  };
} // 解释3

export const UPDATE_SAVED_ENTRY = 'UPDATE_SAVED_ENTRY';

function updateSavedEntry(id) {
  return {
    type: UPDATE_SAVED_ENTRY,
    preload: {
      id
    }
  };
}

export function saveEntry(item) {
  const { title, content, id } = item;
  return dispatch => {
    if (id) {
      // 更新流程
      storage.updateEntry(id, title, content)
        .then(() => dispatch(updateSavedEntry(id)))
        .then(() => storage.getAll())
        .then(() => dispatch(fetchEntryList()));
    } else {
      // 创建流程
      storage.insertEntry(title, content)
        .then(inserted => dispatch(updateSavedEntry(inserted.id))) // 解释2
        .then(() => storage.getAll())
        .then(() => dispatch(fetchEntryList()));
    }
  };
}

/**
 * 1. preload: { id },类似这种本应该preload: { id: id }的写法，在ES6中可以简写成preload: { id };
 * 2. .then(inserted => dispatch(updateSavedEntry(inserted.id)))中的inserted是前一个异步操作返回的结果。（是吗？）
 * 3. deleteEntry(id)函数下的几个异步操作逻辑，确实既可以在action中完成，也可以在reducer中完成。
 * 		但基于需要reducer是一个纯函数，因此，这些操作逻辑还是应该在action中完成。
 * 		由于storage.js中作为deleteEntry的最后一句，saveAll()并不resolve任何东西。因此此处需要先执行storage.deleteEntry(id)，
 * 		再dispatch(fetchEntryList())去获取新状态的entryList。
 **/

export const FETCH_ROMOTE_DATA = 'FETCH_ROMOTE_DATA';

export function fetchRemoteData() {
  const option = {
    url: '/getPhone'
  };
  return {
    type: FETCH_ROMOTE_DATA,
    payload: axios.get(option)
  };
}

/**
 * 1. 调用axios.get(),可以传入参数option={url: '/getPhone', params: {ID: '12345'}}
 * 2. 调用axios.post(),可以传入参数option={url: '/postUserInfo', data: {name: 'zhang', age: '18'}}
 */
