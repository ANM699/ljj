let db = null;

const initDB = async () =>
  await new Promise((resolve, reject) => {
    const request = window.indexedDB.open('ljjDB');
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      let objectStore = null;
      if (!db.objectStoreNames.contains('projects')) {
        //项目表
        db.createObjectStore('projects', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('columns')) {
        //柱记录表
        objectStore = db.createObjectStore('columns', { autoIncrement: true });
        objectStore.createIndex('projectId', 'projectId', { unique: false });
      }
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };
    request.onerror = function () {
      reject();
      console.error('数据库初始化失败！');
    };
  });

export const insertData = async (store, data) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readwrite')
      .objectStore(store)
      .add(data);
    request.onsuccess = function (event) {
      const id = event.target.result;
      resolve(id);
      db.close();
      //   console.log(`${store}数据添加成功！`);
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据添加失败！`);
    };
  });
};
//查询所有数据
export const selectAllData = async (store) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const data = [];
    const request = db
      .transaction(store, 'readonly')
      .objectStore(store)
      .openCursor();
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        console.log(cursor);
        const item = { id: cursor.primaryKey, ...cursor.value };
        data.push(item);
        cursor.continue();
      } else {
        resolve(data);
        db.close();
      }
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据查询失败！`);
    };
  });
};
//根据索引条件查询数据
export const selectDataByIndex = async (store, indexName, params) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const data = [];
    const range = IDBKeyRange.only(params);
    const request = db
      .transaction(store, 'readonly')
      .objectStore(store)
      .index(indexName)
      .openCursor(range);
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const item = { id: cursor.primaryKey, ...cursor.value };
        data.push(item);
        cursor.continue();
      } else {
        resolve(data);
        db.close();
      }
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据查询失败！`);
    };
  });
};
