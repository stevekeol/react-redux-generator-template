/*
 * @file storage based on localStorage
 */

import uuid from 'uuid';

const STORAGE = window.localStorage;
const STORAGE_KEY = 'deskmark';

export function getAll() {
  return new Promise((resolve) => {
    const results = STORAGE.getItem(STORAGE_KEY);

    try {
      resolve(
        results
        ? JSON.parse(results)
        : []
      );
    } catch (e) {
      resolve([]);
    }
  });
}

export function saveAll(results) {
  return new Promise((resolve) => {
    STORAGE.setItem(
      STORAGE_KEY,
      JSON.stringify(results) // 将一个json对象挂载在一个名为'deskmark'的键上，应该JSON.stringify()序列化该对象。
    );

    resolve(); // 即：向下一个链式调用不返回任何值
  });
}

export function getEntry(id) {
  return getAll()
    .then(
      results => results.find(
        result => result.id === id
      )
    );
}


export function insertEntry(title, content) {
  const entry = {
    title,
    content,
    id: uuid.v4(),
    time: new Date().getTime(),
  };

  return getAll()
    .then(results => [...results, entry]) // results是getAll()中resolve返回的结果
    .then(saveAll)
    .then(() => entry); // 返回entry.
}

export function deleteEntry(id) {
  return getAll()
    .then(
      results => results.filter(
        result => result.id !== id
      )
    )
    .then(saveAll);
    // 当使用了saveAll()则只要删除一个item，所有的item都被删除了。
    // 解释： saveAll()立即执行，即也在getAll()这个异步操作之前，
    // 但是saveAll()没有传递任何参数值进来，因此相当于强行给STORAGE_KEY赋了空值。
    // 此处其实暗藏着，前一个then传递回来的results作为参数给了saveAll）
}

export function updateEntry(id, title, content) {
  let entry;
  return getAll()
    .then(
      results => results.map(
        result => (
          result.id === id
          ? (entry = {
            ...result,
            title,
            content,
          })
          : result
        )
      )
    )
    .then(saveAll)
    .then(() => entry);
}
