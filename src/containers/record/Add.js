// import logo from "./logo.svg";
import { format } from 'date-fns';
import { createForm } from 'rc-form';
import {
  Button,
  InputItem,
  List,
  DatePicker,
  WhiteSpace,
  NavBar,
  Flex,
  Toast,
} from 'antd-mobile';

import Container from '../../components/Container';
import { insertData } from '../../utils/indexDB';
import { genReport } from '../../utils/index';

const Item = List.Item;

function Add({ form, history }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));
  const { getFieldProps, getFieldError } = form;

  const handleClick = () => {
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        const formData = form.getFieldsValue();
        formData.date = format(formData.date, 'yyyy-MM-dd');
        formData.projectId = project.id;
        formData.templateId = template.id;
        insertData('columns', formData).then(() => {
          history.replace('/record/list');
        });
        // const c = {
        //   position: formData.position,
        //   section: [formData.mValue1, formData.mValue2, formData.mValue3],
        // };
        // const data = { ...formData, c };
        // console.log(data);
        // genReport(data);
      } else {
        Toast.fail('必填项未填写！', 2);
      }
    });
  };

  return (
    <>
      <NavBar mode="dark">{project.name}</NavBar>
      <div className="title">{template.name}</div>
      <Container>
        <List>
          <DatePicker
            mode="date"
            title="选择日期"
            {...getFieldProps('date', {
              initialValue: new Date(),
            })}
          >
            <Item>检测时间</Item>
          </DatePicker>
          <InputItem
            labelNumber={7}
            error={!!getFieldError('equip')}
            {...getFieldProps('equip', {
              rules: [{ required: true, message: '必填' }],
            })}
          >
            检测设备及名称
          </InputItem>
          <InputItem
            error={!!getFieldError('location')}
            {...getFieldProps('location', {
              rules: [{ required: true, message: '必填' }],
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
              {...getFieldProps('section_s_m_1')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              placeholder="实测值"
              {...getFieldProps('section_s_m_2')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              placeholder="实测值"
              {...getFieldProps('section_s_m_3')}
            ></InputItem>
          </Flex.Item>
          {/* <Flex.Item>
            <InputItem
              placeholder="平均值"
              {...getFieldProps('section_s_a')}
            ></InputItem>
          </Flex.Item> */}
        </Flex>
        <div className="sub-title">柱纵筋实测分布（mm）</div>
        <Flex>
          <Flex.Item>
            <InputItem
              placeholder="柱纵筋实测分布"
              {...getFieldProps('bar')}
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
              {...getFieldProps('space_m_1')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_m_2')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_m_3')}
            ></InputItem>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_m_4')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_m_5')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_m_6')}
            ></InputItem>
          </Flex.Item>
        </Flex>
        <div className="sub-title">非加密区实测箍筋间距（mm）</div>
        <Flex>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_1')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_2')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_3')}
            ></InputItem>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_4')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_5')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <InputItem
              type="number"
              placeholder="实测值"
              {...getFieldProps('space_non_m_6')}
            ></InputItem>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item>
            <div className="sub-title">设计箍筋间距（mm）</div>
            <InputItem
              type="number"
              placeholder="设计箍筋间距"
              {...getFieldProps('space_d')}
            ></InputItem>
          </Flex.Item>
          <Flex.Item>
            <div className="sub-title">加密区长度（mm）</div>
            <InputItem
              type="number"
              placeholder="加密区长度"
              {...getFieldProps('length')}
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
    </>
  );
}

export default createForm()(Add);
