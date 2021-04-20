import React, { useContext } from 'react';
import { List, WhiteSpace, Modal, Button } from 'antd-mobile';
import Container from '../component/Container';
import DBContext from '../context';
import { addToStore } from '../utils/indexDB';

const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

export default function Main() {
  const db = useContext(DBContext);
  const handleButtonClick = () => {
    prompt(
      '项目名称',
      null,
      [
        {
          text: '取消',
        },
        {
          text: '确定',
          onPress: (value) => {
            if (value && db) {
              addToStore(db, 'projects', value);
            } else {
            }
          },
        },
      ],
      'default',
      null,
      ['请输入项目名称']
    );
  };

  const handleItemClick = () => {
    localStorage.setItem('project');
  };

  return (
    <Container>
      <List>
        <Item arrow="horizontal" onClick={handleItemClick}>
          项目1
        </Item>
        <Item arrow="horizontal">项目2</Item>
        <Item arrow="horizontal">项目3</Item>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={handleButtonClick}>
        创建新项目
      </Button>
    </Container>
  );
}
