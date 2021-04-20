export const addToStore = (db, store, data) =>
  new Promise((resolve, reject) => {
    const request = db
      .transaction([store], 'readwrite')
      .objectStore(store)
      .add(data);
    request.onerror = function (e) {
      reject();
      console.error(`${store}数据添加失败！`);
    };
    request.onsuccess = function (e) {
      resolve();
      //   console.log(`${store}数据添加成功！`);
    };
  });
