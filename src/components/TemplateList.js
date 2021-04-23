import React from 'react';
import { List, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

const Item = List.Item;
const templates = [
  {
    id: 1,
    name: '钢筋混凝土柱检测记录',
    store: 'columns',
    enable: true,
    row: 4,
  },
  {
    id: 2,
    name: '钢筋混凝土梁检测记录',
    store: 'beams',
    enable: true,
    row: 4,
  },
  {
    id: 3,
    name: '墙钢筋及厚度检测记录',
    store: 'walls',
    enable: true,
    row: 4,
  },
  {
    id: 4,
    name: '板钢筋及厚度检测记录',
    store: 'floors',
    enable: true,
    row: 5, //每页导出记录个数
  },
];

function TemplateList({ project, history }) {
  const handleItemClick = (template) => {
    if (template.enable) {
      sessionStorage.setItem('curProject', JSON.stringify(project));
      sessionStorage.setItem('curTemplate', JSON.stringify(template));
      history.push('/records');
    }
  };
  return (
    <WingBlank>
      <List>
        {templates.map((template) => (
          <Item
            arrow="horizontal"
            disabled={!template.enable}
            key={template.id}
            extra={template.enable ? '' : '不可用'}
            onClick={() => {
              handleItemClick(template);
            }}
          >
            {template.name}
          </Item>
        ))}
      </List>
    </WingBlank>
  );
}

export default withRouter(TemplateList);
