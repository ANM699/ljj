import React, { useState, useEffect } from 'react';
import { WhiteSpace, Modal, Button, Accordion, Flex } from 'antd-mobile';
import Container from '../components/Container';
import TemplateList from '../components/TemplateList';
import { insertData, selectAllData, deleteDB } from '../utils/indexDB';

const prompt = Modal.prompt;

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    selectAllData('projects').then((res) => {
      setProjects(res);
    });
  }, []);

  const handleButtonClick = () => {
    prompt(
      null,
      null,
      [
        {
          text: '取消',
        },
        {
          text: '确定',
          onPress: (value) => {
            if (value) {
              return insertData('projects', { name: value }).then((id) => {
                const newProjects = [...projects, { id, name: value }];
                setProjects(newProjects);
              });
            } else {
              return Promise.reject();
            }
          },
        },
      ],
      'default',
      null,
      ['请输入项目名称']
    );
  };

  const handleDelClick = () => {
    // alert("", "确定删除所有数据？", [
    //   { text: "取消" },
    //   {
    //     text: "确定",
    //     onPress: () => {
    //       deleteDB().then(() => {
    //         selectAllData("projects").then((res) => {
    //           setProjects(res);
    //         });
    //       });
    //     },
    //   },
    // ]);
    prompt(
      null,
      null,
      [
        {
          text: '取消',
        },
        {
          text: '确定',
          onPress: (value) => {
            if (value === '删除') {
              return deleteDB().then(() => {
                sessionStorage.clear();
                selectAllData('projects').then((res) => {
                  setProjects(res);
                });
              });
            } else {
              return Promise.reject();
            }
          },
        },
      ],
      'default',
      null,
      ['输入“删除”确认操作']
    );
  };

  return (
    <Container navBar="项目列表">
      <Accordion accordion>
        {projects.map((project) => (
          <Accordion.Panel key={project.id} header={project.name}>
            <TemplateList project={project} />
          </Accordion.Panel>
        ))}
      </Accordion>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <Button type="primary" onClick={handleButtonClick}>
            创建新项目
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button type="warning" onClick={handleDelClick}>
            删除所有数据
          </Button>
        </Flex.Item>
      </Flex>
    </Container>
  );
}
