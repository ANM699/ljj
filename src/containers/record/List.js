import React, { useState, useEffect } from 'react';
import { NavBar, List, Button, WhiteSpace } from 'antd-mobile';
import Container from '../../components/Container';
import { selectDataByIndex } from '../../utils/indexDB';

const Item = List.Item;

export default function Rlist({ history }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    selectDataByIndex('columns', 'projectId', project.id).then((res) => {
      setColumns(res);
    });
  }, []);

  const handleClick = () => {
    history.push('/record/add');
  };
  return (
    <>
      <NavBar mode="dark">{project.name}</NavBar>
      <div className="title">{template.name}</div>
      <Container>
        <List>
          {columns.map((column) => (
            <Item key={column.id} extra={column.date}>
              {column.location}
            </Item>
          ))}
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={handleClick}>
          添加记录
        </Button>
      </Container>
    </>
  );
}
