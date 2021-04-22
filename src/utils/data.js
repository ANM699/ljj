const data = {
  projectName: '项目名称',
  total: records.length,
  pages: [
    {
      date: '2021-3-3',
      equip: '1',
      records: [{}, {}, {}, {}],
    },
    {
      date: '2021-3-3',
      equip: '',
      records: [{}, {}, {}, {}],
    },
    {
      date: '2021-3-3',
      equip: '',
      records: [{}, {}, {}, {}],
    },
  ],
};

//record
const column = {
  equip: '检测设备及名称',
  date: '检测时间',
  column: {
    position: '',
    section_s_m: [1, 2, 3],
    sSection_s_a: 2,
    bar: '',
    space_m: [1, 2, 3, 4, 5, 6],
    space_a: 5,
    space_non_m: [1, 2, 3, 4, 5, 6],
    space_non_a: 6,
    space_d: 6,
    length: 8,
  },
};
