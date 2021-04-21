import { format } from "date-fns";
import { createForm } from "rc-form";
import {
  Button,
  InputItem,
  List,
  DatePicker,
  WhiteSpace,
  Flex,
  Toast,
} from "antd-mobile";

import Container from "../../components/Container";
import { insertData } from "../../utils/indexDB";

const Item = List.Item;

function Add({ form, history }) {
  const project = JSON.parse(sessionStorage.getItem("curProject"));
  const template = JSON.parse(sessionStorage.getItem("curTemplate"));
  const { getFieldProps, getFieldError } = form;

  const handleClick = () => {
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        const formData = form.getFieldsValue();
        formData.date = format(formData.date, "yyyy-MM-dd");
        formData.projectId = project.id;
        formData.templateId = template.id;
        formData.section_s_a = "";
        //计算平均值
        const reducer = (accumulator, currentValue) =>
          parseInt(accumulator) + parseInt(currentValue);
        const space = [];
        if (formData.space_m_1) space.push(formData.space_m_1);
        if (formData.space_m_2) space.push(formData.space_m_2);
        if (formData.space_m_3) space.push(formData.space_m_3);
        if (formData.space_m_4) space.push(formData.space_m_4);
        if (formData.space_m_5) space.push(formData.space_m_5);
        if (formData.space_m_6) space.push(formData.space_m_6);
        formData.space_m = space.length ? space.join(",") : "";
        formData.space_a = space.length
          ? space.reduce(reducer) / space.length
          : "";

        const space_non = [];
        if (formData.space_non_m_1) space_non.push(formData.space_non_m_1);
        if (formData.space_non_m_2) space_non.push(formData.space_non_m_2);
        if (formData.space_non_m_3) space_non.push(formData.space_non_m_3);
        if (formData.space_non_m_4) space_non.push(formData.space_non_m_4);
        if (formData.space_non_m_5) space_non.push(formData.space_non_m_5);
        if (formData.space_non_m_6) space_non.push(formData.space_non_m_6);
        formData.space_non_m = space_non.length ? space_non.join(",") : "";
        formData.space_non_a = space_non.length
          ? space_non.reduce(reducer) / space_non.length
          : "";

        insertData("columns", formData).then(() => {
          history.replace("/record/list");
        });
      } else {
        Toast.fail("必填项未填写！", 2);
      }
    });
  };

  return (
    <Container navBar={project.name} header={template.name}>
      <List>
        <DatePicker
          mode="date"
          title="选择日期"
          {...getFieldProps("date", {
            initialValue: new Date(),
          })}
        >
          <Item>检测时间</Item>
        </DatePicker>
        <InputItem
          labelNumber={7}
          error={!!getFieldError("equip")}
          {...getFieldProps("equip", {
            rules: [{ required: true, message: "必填" }],
          })}
        >
          检测设备及名称
        </InputItem>
        <InputItem
          error={!!getFieldError("position")}
          {...getFieldProps("position", {
            rules: [{ required: true, message: "必填" }],
          })}
        >
          柱位置
        </InputItem>
      </List>
      <div className="sub-title">截面尺寸（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps("section_s_m_1")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps("section_s_m_2")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps("section_s_m_3")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">柱纵筋实测分布（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            placeholder="柱纵筋实测分布"
            {...getFieldProps("bar")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item />
      </Flex>
      <div className="sub-title">加密区箍筋间距（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_1")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_2")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_3")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_4")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_5")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_m_6")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">非加密区实测箍筋间距（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_1")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_2")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_3")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_4")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_5")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps("space_non_m_6")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item>
          <div className="sub-title">设计箍筋间距（mm）</div>
          <InputItem
            type="number"
            placeholder="设计箍筋间距"
            {...getFieldProps("space_d")}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <div className="sub-title">加密区长度（mm）</div>
          <InputItem
            type="number"
            placeholder="加密区长度"
            {...getFieldProps("length")}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      {/* <Button type="primary" onClick={handleClick}>
        导出
      </Button> */}
      <Button type="primary" onClick={handleClick}>
        保存
      </Button>
    </Container>
  );
}

export default createForm()(Add);
