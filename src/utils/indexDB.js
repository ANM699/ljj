export const addToStore = (db, store, data) => {
  const request = db
    .transaction([store], 'readwrite')
    .objectStore(store)
    .add(data);
  request.onerror = function (e) {
    console.log(`${store}数据添加失败！`);
  };
  request.onsuccess = function (e) {
    console.log(`${store}数据添加成功！`);
  };
};
