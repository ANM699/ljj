import React from 'react';
import { List, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

const Item = List.Item;
const templates = [
  {
    id: 1,
    name: '钢筋混凝土柱检测记录',
    enable: true,
  },
  {
    id: 2,
    name: '钢筋混凝土梁检测记录',
    enable: false,
  },
  {
    id: 3,
    name: '墙钢筋及厚度检测记录',
    enable: false,
  },
  {
    id: 4,
    name: '板钢筋及厚度检测记录',
    enable: false,
  },
];

function TemplateList({ project, history }) {
  const handleItemClick = (template) => {
    if (template.enable) {
      sessionStorage.setItem('curProject', JSON.stringify(project));
      sessionStorage.setItem('curTemplate', JSON.stringify(template));
      history.push('/record/List');
    }
  };
  return (
    <WingBlank>
      <List>
        {templates.map((template) => (
          <Item
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
