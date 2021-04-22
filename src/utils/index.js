//计算数组平均值并保留一位小数
export const average = (arr) => {
  const reducer = (accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue);
  return arr.length ? (arr.reduce(reducer) / arr.length).toFixed(1) : '';
};

//用指定的值将数字补齐到指定的长度
const fillArr = (arr, len, value) => {
  if (arr.length > len) return arr;
  return arr.concat(new Array(len - arr.length).fill(value));
};

//将数组按照指定长度分组并补齐到指定长度，然后转换成对象加上日期,设备属性
const chunk = (arr, len, key) => {
  const result = [];
  for (let i = 0; i < arr.length; i += len) {
    result.push({
      records: fillArr(arr.slice(i, i + len), len, {}),
      date: key,
      equip: arr[i].equip,
    });
  }
  return result;
};

//按属性对object分类
const groupBy = (objectArray, property) => {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

//分页
const paging = (object, len) => {
  let result = [];
  for (const key in object) {
    result = result.concat(chunk(object[key], len, key));
  }
  return result;
};

//将记录数据处理成导出格式
export const handleRecords = (list, len) => {
  //先按日期分组
  const temp = groupBy(list, 'date');
  //按模板每页的记录条数分页
  return paging(temp, len);
};
