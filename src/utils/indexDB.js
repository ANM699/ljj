let db = null;

const initDB = async () =>
  await new Promise((resolve, reject) => {
    const request = window.indexedDB.open("ljjDB");
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects", { autoIncrement: true });
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
  const db = await initDB();
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

export const selectAllData = async (store) => {
  const db = await initDB();
  return await new Promise((resolve, reject) => {
    const data = [];
    const request = db
      .transaction(store, "readonly")
      .objectStore(store)
      .openCursor();
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const item = { id: cursor.key, ...cursor.value };
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
