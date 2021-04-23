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
  Tabs,
} from 'antd-mobile';

import { insertData, selectDataByKey, updateData } from '../utils/indexDB';
import { average } from '../utils/index';

const Item = List.Item;

const tabs = [{ title: '板底' }, { title: '板面' }];

function Floor({ form, history, match }) {
  const project = JSON.parse(sessionStorage.getItem('curProject'));
  const template = JSON.parse(sessionStorage.getItem('curTemplate'));

  const [record, setRecord] = useState(null);

  useEffect(() => {
    const params = match.params;
    if (params.id) {
      //编辑
      const id = params.id;
      //查询记录
      selectDataByKey('floors', parseInt(id)).then((res) => {
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
          updateData('floors', { id: record.id, ...formData }).then(() => {
            history.goBack();
          });
        } else {
          //新增
          insertData('floors', formData).then(() => {
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
          {...getFieldProps('floor', {
            initialValue: record ? record.floor : '',
          })}
        >
          层
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
      <WhiteSpace />
      <Tabs tabs={tabs} initialPage={0} tabBarBackgroundColor="transparent">
        {/* tab0 */}
        <div>
          <div className="sub-title">平行轴</div>
          <Flex>
            <Flex.Item>
              <InputItem
                placeholder="轴"
                {...getFieldProps('parallel_1', {
                  initialValue: record ? record.parallel_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
            <Flex.Item />
          </Flex>
          <div className="sub-title">钢筋间距检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_1_1', {
                  initialValue: record ? record.space_bar_1_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_1_2', {
                  initialValue: record ? record.space_bar_1_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_1_3', {
                  initialValue: record ? record.space_bar_1_3 : '',
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
                {...getFieldProps('space_bar_1_4', {
                  initialValue: record ? record.space_bar_1_4 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_1_5', {
                  initialValue: record ? record.space_bar_1_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_1_6', {
                  initialValue: record ? record.space_bar_1_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <div className="sub-title">保护层检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_1', {
                  initialValue: record ? record.thick_p_1_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_2', {
                  initialValue: record ? record.thick_p_1_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_3', {
                  initialValue: record ? record.thick_p_1_3 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_4', {
                  initialValue: record ? record.thick_p_1_4 : '',
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
                {...getFieldProps('thick_p_1_5', {
                  initialValue: record ? record.thick_p_1_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_6', {
                  initialValue: record ? record.thick_p_1_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_1_7', {
                  initialValue: record ? record.thick_p_1_7 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item></Flex.Item>
          </Flex>
          <div className="sub-title">扣除（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="扣除"
                {...getFieldProps('deduct_1', {
                  initialValue: record ? record.deduct_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
          </Flex>
          <div className="sub-title">平行轴</div>
          <Flex>
            <Flex.Item>
              <InputItem
                placeholder="轴"
                {...getFieldProps('parallel_2', {
                  initialValue: record ? record.parallel_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
            <Flex.Item />
          </Flex>
          <div className="sub-title">钢筋间距检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_1', {
                  initialValue: record ? record.space_bar_2_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_2', {
                  initialValue: record ? record.space_bar_2_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_3', {
                  initialValue: record ? record.space_bar_2_3 : '',
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
                {...getFieldProps('space_bar_2_4', {
                  initialValue: record ? record.space_bar_2_4 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_5', {
                  initialValue: record ? record.space_bar_2_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_6', {
                  initialValue: record ? record.space_bar_2_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <div className="sub-title">保护层检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_1', {
                  initialValue: record ? record.thick_p_2_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_2', {
                  initialValue: record ? record.thick_p_2_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_3', {
                  initialValue: record ? record.thick_p_2_3 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_4', {
                  initialValue: record ? record.thick_p_2_4 : '',
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
                {...getFieldProps('thick_p_2_5', {
                  initialValue: record ? record.thick_p_2_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_6', {
                  initialValue: record ? record.thick_p_2_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_7', {
                  initialValue: record ? record.thick_p_2_7 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item></Flex.Item>
          </Flex>
          <div className="sub-title">扣除（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="扣除"
                {...getFieldProps('deduct_2', {
                  initialValue: record ? record.deduct_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
          </Flex>
          <div className="sub-title">板厚检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_f_1', {
                  initialValue: record ? record.thick_f_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
          </Flex>
        </div>
        {/* tab1 */}
        <div>
          <div className="sub-title">支座</div>
          <Flex>
            <Flex.Item>
              <InputItem
                placeholder="轴"
                {...getFieldProps('support_1', {
                  initialValue: record ? record.support_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
            <Flex.Item />
          </Flex>
          <div className="sub-title">钢筋间距检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_3_1', {
                  initialValue: record ? record.space_bar_3_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_3_2', {
                  initialValue: record ? record.space_bar_3_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_3_3', {
                  initialValue: record ? record.space_bar_3_3 : '',
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
                {...getFieldProps('space_bar_3_4', {
                  initialValue: record ? record.space_bar_3_4 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_3_5', {
                  initialValue: record ? record.space_bar_3_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_3_6', {
                  initialValue: record ? record.space_bar_3_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <div className="sub-title">保护层检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_1', {
                  initialValue: record ? record.thick_p_3_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_2', {
                  initialValue: record ? record.thick_p_3_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_3', {
                  initialValue: record ? record.thick_p_3_3 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_4', {
                  initialValue: record ? record.thick_p_3_4 : '',
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
                {...getFieldProps('thick_p_3_5', {
                  initialValue: record ? record.thick_p_3_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_6', {
                  initialValue: record ? record.thick_p_3_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_3_7', {
                  initialValue: record ? record.thick_p_3_7 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item></Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <div className="sub-title">扣除（mm）</div>
              <InputItem
                type="number"
                placeholder="扣除"
                {...getFieldProps('deduct_1', {
                  initialValue: record ? record.deduct_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <div className="sub-title">板厚检测值（mm）</div>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_f_2', {
                  initialValue: record ? record.thick_f_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <div className="sub-title">支座</div>
          <Flex>
            <Flex.Item>
              <InputItem
                placeholder="轴"
                {...getFieldProps('support_2', {
                  initialValue: record ? record.support_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item />
            <Flex.Item />
          </Flex>
          <div className="sub-title">钢筋间距检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_1', {
                  initialValue: record ? record.space_bar_2_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_2', {
                  initialValue: record ? record.space_bar_2_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_3', {
                  initialValue: record ? record.space_bar_2_3 : '',
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
                {...getFieldProps('space_bar_2_4', {
                  initialValue: record ? record.space_bar_2_4 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_5', {
                  initialValue: record ? record.space_bar_2_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('space_bar_2_6', {
                  initialValue: record ? record.space_bar_2_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
          <div className="sub-title">保护层检测值（mm）</div>
          <Flex>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_1', {
                  initialValue: record ? record.thick_p_2_1 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_2', {
                  initialValue: record ? record.thick_p_2_2 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_3', {
                  initialValue: record ? record.thick_p_2_3 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_4', {
                  initialValue: record ? record.thick_p_2_4 : '',
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
                {...getFieldProps('thick_p_2_5', {
                  initialValue: record ? record.thick_p_2_5 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_6', {
                  initialValue: record ? record.thick_p_2_6 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_p_2_7', {
                  initialValue: record ? record.thick_p_2_7 : '',
                })}
              ></InputItem>
            </Flex.Item>
            <Flex.Item></Flex.Item>
          </Flex>

          <Flex>
            <Flex.Item>
              <div className="sub-title">扣除（mm）</div>
              <InputItem
                type="number"
                placeholder="扣除"
                {...getFieldProps('deduct_2', {
                  initialValue: record ? record.deduct_1 : '',
                })}
              ></InputItem>
            </Flex.Item>

            <Flex.Item>
              <div className="sub-title">板厚检测值（mm）</div>
              <InputItem
                type="number"
                placeholder="实测值"
                {...getFieldProps('thick_f_3', {
                  initialValue: record ? record.thick_f_3 : '',
                })}
              ></InputItem>
            </Flex.Item>
          </Flex>
        </div>
      </Tabs>
      <WhiteSpace />
      <Button type="primary" onClick={handleClick}>
        保存
      </Button>
    </>
  );
}

export default createForm()(Floor);
