import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { createForm } from 'rc-form';
import {
  Button,
  InputItem,
  List,
  DatePicker,
  WhiteSpace,
  Flex,
  Toast,
} from 'antd-mobile';

import { insertData, selectDataByKey, updateData } from '../utils/indexDB';
import { average } from '../utils/index';

const Item = List.Item;

function Beam({ form, history, match }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));

  const [record, setRecord] = useState(null);

  useEffect(() => {
    const params = match.params;
    if (params.id) {
      //编辑
      const id = params.id;
      //查询记录
      selectDataByKey('beams', parseInt(id)).then((res) => {
        setRecord(res);
      });
    }
  }, [match.params]);

  const { getFieldProps, getFieldError } = form;

  const handleClick = () => {
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        const formData = form.getFieldsValue();
        formData.date = format(formData.date, 'yyyy-MM-dd');
        formData.projectId = project.id;
        formData.templateId = template.id;
        formData.section_s_a = '';

        //计算平均值
        const thick_p = [];
        if (formData.thick_p_1) thick_p.push(formData.thick_p_1);
        if (formData.thick_p_2) thick_p.push(formData.thick_p_2);
        if (formData.thick_p_3) thick_p.push(formData.thick_p_3);
        formData.thick_p_a = average(thick_p);

        const space = [];
        if (formData.space_m_1) space.push(formData.space_m_1);
        if (formData.space_m_2) space.push(formData.space_m_2);
        if (formData.space_m_3) space.push(formData.space_m_3);
        if (formData.space_m_4) space.push(formData.space_m_4);
        if (formData.space_m_5) space.push(formData.space_m_5);
        if (formData.space_m_6) space.push(formData.space_m_6);
        formData.space_m = space.length ? space.join(',') : '';
        formData.space_a = average(space);

        const space_non = [];
        if (formData.space_non_m_1) space_non.push(formData.space_non_m_1);
        if (formData.space_non_m_2) space_non.push(formData.space_non_m_2);
        if (formData.space_non_m_3) space_non.push(formData.space_non_m_3);
        if (formData.space_non_m_4) space_non.push(formData.space_non_m_4);
        if (formData.space_non_m_5) space_non.push(formData.space_non_m_5);
        if (formData.space_non_m_6) space_non.push(formData.space_non_m_6);
        formData.space_non_m = space_non.length ? space_non.join(',') : '';
        formData.space_non_a = average(space_non);
        if (record) {
          //编辑
          updateData('beams', { id: record.id, ...formData }).then(() => {
            // history.replace('/record');
            history.goBack();
          });
        } else {
          //新增
          insertData('beams', formData).then(() => {
            // history.replace('/record');
            history.goBack();
          });
        }
      } else {
        Toast.fail('梁位置未填写！', 2);
      }
    });
  };

  return (
    <>
      <List>
        <DatePicker
          mode="date"
          title="选择日期"
          {...getFieldProps('date', {
            initialValue: record ? new Date(record.date) : new Date(),
          })}
        >
          <Item>检测时间</Item>
        </DatePicker>
        <InputItem
          labelNumber={7}
          error={!!getFieldError('equip')}
          {...getFieldProps('equip', {
            initialValue: record ? record.equip : '',
          })}
        >
          检测设备及名称
        </InputItem>
        <InputItem
          extra="*"
          error={!!getFieldError('position')}
          {...getFieldProps('position', {
            initialValue: record ? record.position : '',
            rules: [{ required: true, message: '必填' }],
          })}
        >
          梁位置
        </InputItem>
      </List>
      <div className="sub-title">截面尺寸（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps('section_s_m_1', {
              initialValue: record ? record.section_s_m_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps('section_s_m_2', {
              initialValue: record ? record.section_s_m_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            placeholder="实测值"
            {...getFieldProps('section_s_m_3', {
              initialValue: record ? record.section_s_m_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">梁底底排纵筋实测根数</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测根数"
            {...getFieldProps('bar_num', {
              initialValue: record ? record.bar_num : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item />
      </Flex>
      <div className="sub-title">梁底底排钢筋砼保护层厚度实测值（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="测点1"
            {...getFieldProps('thick_p_1', {
              initialValue: record ? record.thick_p_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="测点2"
            {...getFieldProps('thick_p_2', {
              initialValue: record ? record.thick_p_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="测点3"
            {...getFieldProps('thick_p_3', {
              initialValue: record ? record.thick_p_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">加密区箍筋间距（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_1', {
              initialValue: record ? record.space_m_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_2', {
              initialValue: record ? record.space_m_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_3', {
              initialValue: record ? record.space_m_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_4', {
              initialValue: record ? record.space_m_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_5', {
              initialValue: record ? record.space_m_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_m_6', {
              initialValue: record ? record.space_m_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">非加密区箍筋间距（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_1', {
              initialValue: record ? record.space_non_m_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_2', {
              initialValue: record ? record.space_non_m_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_3', {
              initialValue: record ? record.space_non_m_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_4', {
              initialValue: record ? record.space_non_m_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_5', {
              initialValue: record ? record.space_non_m_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('space_non_m_6', {
              initialValue: record ? record.space_non_m_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item>
          <div className="sub-title">设计箍筋间距（mm）</div>
          <InputItem
            type="number"
            placeholder="设计箍筋间距"
            {...getFieldProps('space_d', {
              initialValue: record ? record.space_d : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item></Flex.Item>
      </Flex>
      <WhiteSpace />
      <Button type="primary" onClick={handleClick}>
        保存
      </Button>
    </>
  );
}

export default createForm()(Beam);
