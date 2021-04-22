import React, { useState, useEffect } from 'react';
import {
  List,
  Button,
  WhiteSpace,
  Flex,
  Toast,
  ActivityIndicator,
  SwipeAction,
  Modal,
} from 'antd-mobile';
import { selectDataByIndex, deleteData } from '../../utils/indexDB';
import { genReport } from '../../utils/docx';
import { handleRecords } from '../../utils/index';

const Item = List.Item;
const alert = Modal.alert;

export default function Rlist({ history }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));
  const [columns, setColumns] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    selectDataByIndex('columns', 'projectId', project.id).then((res) => {
      setColumns(res);
    });
  }, [project.id]);

  const handleAddClick = () => {
    history.push('/edit');
  };

  const handleEditClick = (id) => {
    history.push(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    alert('', '确定删除该记录？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          deleteData('columns', id).then(() => {
            const newColumns = columns.filter((column) => column.id !== id);
            setColumns(newColumns);
          });
        },
      },
    ]);
  };

  const handleExportClick = () => {
    if (columns.length) {
      setAnimating(true);
      const pages = handleRecords(columns, 4);
      const data = {
        projectName: project.name,
        pages,
      };
      const reportName = `${project.name}-${template.name}`;
      genReport(data, reportName).then(() => {
        setAnimating(false);
      });
    } else {
      Toast.fail('没有要导出的记录！', 2);
    }
  };
  return (
    <>
      <List>
        {columns.map((column) => (
          <SwipeAction
            key={column.id}
            autoClose
            right={[
              {
                text: '删除',
                onPress: () => handleDeleteClick(column.id),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
          >
            <Item
              extra={column.date}
              onClick={() => {
                handleEditClick(column.id);
              }}
            >
              {column.position}
            </Item>
          </SwipeAction>
        ))}
      </List>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <Button type="primary" onClick={handleAddClick}>
            添加记录
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button type="default" onClick={handleExportClick}>
            导出
          </Button>
        </Flex.Item>
      </Flex>
      <ActivityIndicator toast text="导出中..." animating={animating} />
    </>
  );
}
