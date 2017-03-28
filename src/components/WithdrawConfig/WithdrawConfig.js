import React from 'react';
import styles from './WithdrawConfig.css';
import {Card, Form, Input, Button, DatePicker, notification} from 'antd';
const create = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
import {connect} from 'dva';
import {setWithdrawalsSetting} from '../../services/withdrawConfig.js';

function WithdrawConfig({dispatch, form, originalPoundage, poundage, withdrawalsStartDay, withdrawalsEndDay,
  withdrawalsLower, withdrawalsUpper, withdrawalsTotal, withdrawalsDaily}) {

  function submit(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if(errors) {
        return;
      }else {
        setWithdrawalsSetting({
          method: 'post',
          body: values
        }).then(data => {
          if(data.success) {
            notification.success({
              message: '操作提示',
              description: '修改成功',
            });
          }
          form.resetFields();
          dispatch({
            type: 'withdrawConfig/getSetting'
          });
        });
      }
    });
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Card title='提现设置'>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label='提现手续费原价'>
          {getFieldDecorator('originalPoundage', {
            initialValue: originalPoundage,
            rules: [{required: true, message: '请输入提现手续费原价' }]
          })(
            <Input className={styles.normal}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='提现手续费促销价'>
          {getFieldDecorator('poundage', {
            initialValue: poundage,
            rules: [{required: true, message: '请输入提现手续费促销价' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='提现窗口开始日期'>
          {getFieldDecorator('withdrawalsStartDay', {
            initialValue: withdrawalsStartDay,
            rules: [{required: true, message: '请输入提现窗口开始日期' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='提现窗口结束日期'>
          {getFieldDecorator('withdrawalsEndDay', {
            initialValue: withdrawalsEndDay,
            rules: [{required: true, message: '请输入提现窗口结束日期' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='单笔提现下限金额'>
          {getFieldDecorator('withdrawalsLower', {
            initialValue: withdrawalsLower,
            rules: [{required: true, message: '请输入单笔提现下限金额' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='单笔提现上限金额'>
          {getFieldDecorator('withdrawalsUpper', {
            initialValue: withdrawalsUpper,
            rules: [{required: true, message: '请输入单笔提现上限金额' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='窗口期提现总额'>
          {getFieldDecorator('withdrawalsTotal', {
            initialValue: withdrawalsTotal,
            rules: [{required: true, message: '请输入窗口期提现总额' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='每日提现次数'>
          {getFieldDecorator('withdrawalsDaily', {
            initialValue: withdrawalsDaily,
            rules: [{required: true, message: '请输入每日提现次数' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem wrapperCol={{offset: 4, span: 8}}>
          <Button type='primary' htmlType='submit'>保存</Button>
          <Button type='ghost' style={{marginLeft: 16}}>取消</Button>
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {originalPoundage, poundage, withdrawalsStartDay, withdrawalsEndDay,
    withdrawalsLower, withdrawalsUpper, withdrawalsTotal, withdrawalsDaily} = state.withdrawConfig;
  return {
    originalPoundage, poundage, withdrawalsStartDay, withdrawalsEndDay,
      withdrawalsLower, withdrawalsUpper, withdrawalsTotal, withdrawalsDaily
  }
}

WithdrawConfig = create()(WithdrawConfig);

export default connect(mapStateToProps)(WithdrawConfig);
