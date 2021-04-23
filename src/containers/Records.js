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
import { selectDataByIndex, deleteData } from '../utils/indexDB';
import { genReport } from '../utils/docx';
import { groupBy, paging } from '../utils/index';

const Item = List.Item;
const alert = Modal.alert;

export default function Records({ history }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const { store, name } = JSON.parse(sessionStorage.getItem('curTemplate'));
  const [records, setRecords] = useState([]);
  const [animating, setAnimating] = useState(false);
  const groupRecords = groupBy(records, 'date');
  useEffect(() => {
    selectDataByIndex(store, 'projectId', project.id).then((res) => {
      const records = res.sort((a, b) => (a.date < b.date ? -1 : 0));
      setRecords(records);
    });
  }, [project.id, store]);

  const handleAddClick = () => {
    history.push(`/${store}`);
  };

  const handleEditClick = (id) => {
    history.push(`/${store}/${id}`);
  };

  const handleDeleteClick = (id) => {
    alert('', '确定删除该记录？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          deleteData('columns', id).then(() => {
            const newRecords = records.filter((record) => record.id !== id);
            setRecords(newRecords);
          });
        },
      },
    ]);
  };

  const handleExportClick = () => {
    if (records.length) {
      setAnimating(true);
      const projectName = project.name;
      const pages = paging(groupRecords, 4);
      const data = {
        projectName,
        pages,
      };
      const reportName = `${projectName}-${name}`;
      genReport(data, reportName, store).then(() => {
        setAnimating(false);
      });
    } else {
      Toast.fail('没有要导出的记录！', 2);
    }
  };
  return (
    <>
      {Object.keys(groupRecords).map((date) => (
        <List key={date} renderHeader={() => date}>
          {groupRecords[date].map((record) => (
            <SwipeAction
              key={record.id}
              autoClose
              right={[
                {
                  text: '删除',
                  onPress: () => handleDeleteClick(record.id),
                  style: { backgroundColor: '#F4333C', color: 'white' },
                },
              ]}
            >
              <Item
                arrow="horizontal"
                onClick={() => {
                  handleEditClick(record.id);
                }}
              >
                {record.position}
              </Item>
            </SwipeAction>
          ))}
        </List>
      ))}

      {/* <List>
        {records.map((record) => (
          <SwipeAction
            key={record.id}
            autoClose
            right={[
              {
                text: '删除',
                onPress: () => handleDeleteClick(record.id),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
          >
            <Item
              extra={record.date}
              onClick={() => {
                handleEditClick(record.id);
              }}
            >
              {record.position}
            </Item>
          </SwipeAction>
        ))}
      </List> */}

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
