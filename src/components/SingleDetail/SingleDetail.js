import React from 'react';
import styles from './SingleDetail.css';
import {Card, Form, Input} from 'antd';
const create  = Form.create;
const FormItem = Form.Item;
import {connect} from 'dva';

function SingleDetail({form, record}) {
  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Card title='交易详情' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form>
        <FormItem {...formItemLayout} label='代理商名称'>
          <div>{record.tenantName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='收益类型'>
          <div>{record.profitTypeText}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='昵称'>
          <div>{record.fromUserNickname}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='手机号'>
          <div>{record.fromUserPhoneNumber}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='创建时间'>
          <div>{record.creationTime}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='收款金额'>
          <div>{record.dealMoney}</div>
        </FormItem>
        {/*<FormItem {...formItemLayout} label='手续费提成比例'>
          <div>{123}</div>
        </FormItem>*/}
        <FormItem {...formItemLayout} label='手续费提成金额'>
          <div>{record.systemMoney}</div>
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {record} = state.singleDetail;
  return {
    record
  }
}

SingleDetail = create()(SingleDetail);

export default connect(mapStateToProps)(SingleDetail);
