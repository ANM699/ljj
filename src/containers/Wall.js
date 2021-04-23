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

function Wall({ form, history, match }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));

  const [record, setRecord] = useState(null);

  useEffect(() => {
    const params = match.params;
    if (params.id) {
      //编辑
      const id = params.id;
      //查询记录
      selectDataByKey('walls', parseInt(id)).then((res) => {
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

        //计算平均值
        const thick_w = [];
        if (formData.thick_w_1) thick_w.push(formData.thick_w_1);
        if (formData.thick_w_2) thick_w.push(formData.thick_w_2);
        if (formData.thick_w_3) thick_w.push(formData.thick_w_3);
        formData.thick_w_a = average(thick_w);

        if (record) {
          //编辑
          updateData('walls', { id: record.id, ...formData }).then(() => {
            // history.replace('/record');
            history.goBack();
          });
        } else {
          //新增
          insertData('walls', formData).then(() => {
            // history.replace('/record');
            history.goBack();
          });
        }
      } else {
        Toast.fail('检测部位未填写！', 2);
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
          检测部位
        </InputItem>
      </List>
      <div className="sub-title">实测钢筋间距（水平）（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_1', {
              initialValue: record ? record.space_bar_h_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_2', {
              initialValue: record ? record.space_bar_h_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_3', {
              initialValue: record ? record.space_bar_h_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_4', {
              initialValue: record ? record.space_bar_h_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_5', {
              initialValue: record ? record.space_bar_h_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('space_bar_h_6', {
              initialValue: record ? record.space_bar_h_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">保护层厚度检测值（水平）（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_1', {
              initialValue: record ? record.thick_p_h_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_2', {
              initialValue: record ? record.thick_p_h_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_3', {
              initialValue: record ? record.thick_p_h_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_4', {
              initialValue: record ? record.thick_p_h_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_5', {
              initialValue: record ? record.thick_p_h_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_6', {
              initialValue: record ? record.thick_p_h_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="水平"
            {...getFieldProps('thick_p_h_7', {
              initialValue: record ? record.thick_p_h_7 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item></Flex.Item>
      </Flex>
      <div className="sub-title">实测钢筋间距（竖向）（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_1', {
              initialValue: record ? record.space_bar_v_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_2', {
              initialValue: record ? record.space_bar_v_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_3', {
              initialValue: record ? record.space_bar_v_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_4', {
              initialValue: record ? record.space_bar_v_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_5', {
              initialValue: record ? record.space_bar_v_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('space_bar_v_6', {
              initialValue: record ? record.space_bar_v_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <div className="sub-title">保护层厚度检测值（竖向）（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_1', {
              initialValue: record ? record.thick_p_v_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_2', {
              initialValue: record ? record.thick_p_v_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_3', {
              initialValue: record ? record.thick_p_v_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_4', {
              initialValue: record ? record.thick_p_v_4 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_5', {
              initialValue: record ? record.thick_p_v_5 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_6', {
              initialValue: record ? record.thick_p_v_6 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="竖向"
            {...getFieldProps('thick_p_v_7', {
              initialValue: record ? record.thick_p_v_7 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item></Flex.Item>
      </Flex>
      <div className="sub-title">墙厚检测值（mm）</div>
      <Flex>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('thick_w_1', {
              initialValue: record ? record.thick_w_1 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('thick_w_2', {
              initialValue: record ? record.thick_w_2 : '',
            })}
          ></InputItem>
        </Flex.Item>
        <Flex.Item>
          <InputItem
            type="number"
            placeholder="实测值"
            {...getFieldProps('thick_w_3', {
              initialValue: record ? record.thick_w_3 : '',
            })}
          ></InputItem>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Button type="primary" onClick={handleClick}>
        保存
      </Button>
    </>
  );
}

export default createForm()(Wall);
