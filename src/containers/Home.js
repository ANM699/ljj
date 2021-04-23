import React, { useState, useEffect } from 'react';
import { WhiteSpace, Modal, Button, Accordion } from 'antd-mobile';
import Container from '../components/Container';
import TemplateList from '../components/TemplateList';
import { insertData, selectAllData } from '../utils/indexDB';

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
      '项目名称',
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

  return (
    <Container navBar="项目列表">
      <Accordion accordion openAnimation={{}}>
        {projects.map((project) => (
          <Accordion.Panel
            // style={{ marginBottom: 15 }}
            key={project.id}
            header={project.name}
          >
            <TemplateList project={project} />
          </Accordion.Panel>
        ))}
      </Accordion>
      <WhiteSpace />
      <Button type="primary" onClick={handleButtonClick}>
        创建新项目
      </Button>
    </Container>
  );
}
