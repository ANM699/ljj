let db = null;

const initDB = async () =>
  await new Promise((resolve, reject) => {
    const request = window.indexedDB.open("ljjDB", 2);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      let objectStore = null;
      if (!db.objectStoreNames.contains("projects")) {
        //项目表
        db.createObjectStore("projects", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("columns")) {
        //柱记录表
        objectStore = db.createObjectStore("columns", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("projectId", "projectId", { unique: false });
      }
      if (!db.objectStoreNames.contains("beams")) {
        //梁记录表
        objectStore = db.createObjectStore("beams", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("projectId", "projectId", { unique: false });
      }
      if (!db.objectStoreNames.contains("walls")) {
        //墙记录表
        objectStore = db.createObjectStore("walls", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("projectId", "projectId", { unique: false });
      }
      if (!db.objectStoreNames.contains("floors")) {
        //板记录表
        objectStore = db.createObjectStore("floors", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("projectId", "projectId", { unique: false });
      }
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      resolve(db);
    };
    request.onerror = function () {
      reject();
      console.error("数据库初始化失败！");
    };
  });

export const insertData = async (store, data) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const request = db
      .transaction([store], "readwrite")
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
      .transaction(store, "readonly")
      .objectStore(store)
      .openCursor();
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
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
      .transaction(store, "readonly")
      .objectStore(store)
      .index(indexName)
      .openCursor(range);
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
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

//根据key查询数据
export const selectDataByKey = async (store, key) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const request = db.transaction(store).objectStore(store).get(key);
    request.onsuccess = function (event) {
      const data = event.target.result;
      resolve(data);
      db.close();
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据查询失败！`);
    };
  });
};

//更新数据
export const updateData = async (store, value) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const request = db
      .transaction(store, "readwrite")
      .objectStore(store)
      .put(value);
    request.onsuccess = function () {
      resolve();
      db.close();
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据更新失败！`);
    };
  });
};

//根据key删除数据
export const deleteData = async (store, key) => {
  await initDB();
  return await new Promise((resolve, reject) => {
    const request = db
      .transaction(store, "readwrite")
      .objectStore(store)
      .delete(key);
    request.onsuccess = function () {
      resolve();
      db.close();
    };
    request.onerror = function () {
      reject();
      console.error(`${store}数据删除失败！`);
    };
  });
};

export const deleteDB = async () => {
  return await new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase("ljjDB");
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject();
      console.error("数据库删除失败！");
    };
  });
};
