import React, { useState, useEffect } from "react";
import { List, WhiteSpace, Modal, Button, NavBar } from "antd-mobile";
import Container from "../component/Container";
// import DBContext from "../context";
import { insertData, selectAllData } from "../utils/indexDB";

const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

export default function Main({ history }) {
  // const db = useContext(DBContext);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // console.log("1123");
    selectAllData("projects").then((res) => {
      setProjects(res);
    });
  }, []);
  const handleButtonClick = () => {
    prompt(
      "项目名称",
      null,
      [
        {
          text: "取消",
        },
        {
          text: "确定",
          onPress: (value) => {
            if (value) {
              return insertData("projects", { projectName: value }).then(
                (id) => {
                  const newProjects = [...projects, { id, projectName: value }];
                  setProjects(newProjects);
                }
              );
            } else {
              return Promise.reject();
            }
          },
        },
      ],
      "default",
      null,
      ["请输入项目名称"]
    );
  };

  const handleItemClick = (projectName) => {
    localStorage.setItem("curProject", projectName);
    history.push("/template");
  };

  return (
    <>
      <NavBar mode="dark">项目列表</NavBar>
      <WhiteSpace />
      <List>
        {projects.map((project) => (
          <Item
            arrow="horizontal"
            key={project.id}
            onClick={() => {
              handleItemClick(project.projectName);
            }}
          >
            {project.projectName}
          </Item>
        ))}
      </List>
      <Container>
        <Button type="primary" onClick={handleButtonClick}>
          创建新项目
        </Button>
      </Container>
    </>
  );
}
