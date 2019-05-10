import axios from 'axios';
import * as config from './config';

export function get(option) {
  const initialOption = {
    method: 'get',
    baseURL: config.baseURL
  };
  const _option = Object.assign(initialOption, option);
  return new Promise((resolve) => {
    axios(_option)
      .then((res) => resolve(res.data ? res.data : []));
  });
}

export function post(option) {
  const initialOption = {
    method: 'post',
    baseURL: config.baseURL
  };
  const _option = Object.assign(initialOption, option);
  return new Promise((resolve) => {
    axios(_option)
      .then((res) => resolve(res.data ? res.data : []));
  });
}
