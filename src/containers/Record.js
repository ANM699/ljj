// import logo from "./logo.svg";
import { format } from 'date-fns';
import { createForm } from 'rc-form';
import {
  Button,
  InputItem,
  List,
  DatePicker,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import { genReport } from '../utils/index';

const Item = List.Item;

function Record({ form }) {
  //上传模版
  // const fileInput = useRef(null);
  // const handleClick = () => {
  //   const file = fileInput.current.inputRef.inputRef.files[0];
  //   genReport(file);
  // };
  const handleClick = () => {
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        // console.log(form.getFieldsValue());
        const formData = form.getFieldsValue();
        formData.detectDate = format(formData.detectDate, 'yyyy-MM-dd');
        const c = {
          position: formData.position,
          section: [formData.mValue1, formData.mValue2, formData.mValue3],
        };
        const data = { ...formData, c };
        console.log(data);
        genReport(data);
      } else {
        // alert('验证失败');
      }
    });
  };
  const { getFieldProps, getFieldError } = form;
  return (
    <WingBlank>
      <WhiteSpace />
      <List style={{ backgroundColor: 'red' }}>
        <InputItem
          error={!!getFieldError('projectName')}
          {...getFieldProps('projectName', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          项目名称
        </InputItem>
        <InputItem
          error={!!getFieldError('equipmentName')}
          labelNumber={7}
          {...getFieldProps('equipmentName', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          检测设备及名称
        </InputItem>
        <DatePicker
          mode="date"
          title="选择日期"
          {...getFieldProps('detectDate', {
            initialValue: new Date(),
            rules: [{ required: true, message: '必填' }],
          })}
        >
          <Item error={!!getFieldError('detectDate')}>检测时间</Item>
        </DatePicker>
        <InputItem
          error={!!getFieldError('reportNo')}
          type="number"
          {...getFieldProps('reportNo', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          报告编号
        </InputItem>
        <InputItem
          error={!!getFieldError('position')}
          {...getFieldProps('position', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          柱位置
        </InputItem>
        <InputItem
          error={!!getFieldError('mValue1')}
          type="number"
          {...getFieldProps('mValue1', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          实测值1
        </InputItem>
        <InputItem
          error={!!getFieldError('mValue2')}
          type="number"
          {...getFieldProps('mValue2', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
          实测值2
        </InputItem>
        <InputItem
          error={!!getFieldError('mValue3')}
          type="number"
          {...getFieldProps('mValue3', {
            rules: [{ required: true, message: '必填' }],
          })}
        >
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

export default createForm()(Record);
