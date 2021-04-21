import React, { useState, useEffect } from "react";
import { List, Button, WhiteSpace, Flex, Toast } from "antd-mobile";
import Container from "../../components/Container";
import { selectDataByIndex } from "../../utils/indexDB";
import { genReport } from "../../utils/index";

const Item = List.Item;

export default function Rlist({ history }) {
  const project = JSON.parse(sessionStorage.getItem("curProject"));
  const template = JSON.parse(sessionStorage.getItem("curTemplate"));
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    selectDataByIndex("columns", "projectId", project.id).then((res) => {
      setColumns(res);
    });
  }, [project.id]);

  const handleAddClick = () => {
    history.push("/record/add");
  };

  const handleExportClick = () => {
    if (columns.length) {
      const fullColumns = columns.concat(
        new Array(4 - columns.length).fill({})
      );
      console.log(fullColumns);
      genReport({ columns: fullColumns });
    } else {
      Toast.fail("没有要导出的记录！", 2);
    }
  };
  return (
    <Container navBar={project.name} header={template.name}>
      <List>
        {columns.map((column) => (
          <Item key={column.id} extra={column.date}>
            {column.position}
          </Item>
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
    </Container>
  );
}
