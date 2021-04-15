// import logo from "./logo.svg";
import { createForm } from "rc-form";
import {
  Button,
  InputItem,
  List,
  DatePicker,
  Stepper,
  WingBlank,
  WhiteSpace,
} from "antd-mobile";
import { genReport } from "./utils/index";
// import "./App.css";

const Item = List.Item;

function App({ form }) {
  //上传模版
  // const fileInput = useRef(null);
  // const handleClick = () => {
  //   const file = fileInput.current.inputRef.inputRef.files[0];
  //   genReport(file);
  // };
  const handleClick = () => {
    console.log(form.getFieldsValue());
    const formData = form.getFieldsValue();
    const c = {
      position: formData.position,
      section: [formData.mValue1, formData.mValue2, formData.mValue3],
    };
    const data = { ...formData, c };
    genReport(data);
  };
  const { getFieldProps } = form;
  return (
    <WingBlank>
      <WhiteSpace />
      <List style={{ backgroundColor: "red" }}>
        <InputItem {...getFieldProps("projectName")}>项目名称</InputItem>
        <InputItem labelNumber={7} {...getFieldProps("equipmentName")}>
          检测设备及名称
        </InputItem>
        <DatePicker
          mode="date"
          title="Select Date"
          {...getFieldProps("detectDate")}
        >
          <Item>检测时间</Item>
        </DatePicker>
        <InputItem type="number" {...getFieldProps("reportNo")}>
          报告编号
        </InputItem>
        <InputItem {...getFieldProps("position")}>柱位置</InputItem>
        <InputItem type="number" {...getFieldProps("mValue1")}>
          实测值1
        </InputItem>
        <InputItem type="number" {...getFieldProps("mValue2")}>
          实测值2
        </InputItem>
        <InputItem type="number" {...getFieldProps("mValue3")}>
          实测值3
        </InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={handleClick}>
        导出
      </Button>
    </WingBlank>
  );
}

export default createForm()(App);
