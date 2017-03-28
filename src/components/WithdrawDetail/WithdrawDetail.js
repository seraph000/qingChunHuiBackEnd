import React from 'react';
import styles from './WithdrawDetail.css';
import {Card, Form, Input, Button} from 'antd';
const create  = Form.create;
const FormItem = Form.Item;
import {connect} from 'dva';

function WithdrawDetail({dispatch, form, record}) {

  function getButton() {
    if(record.withdrawalsType == 0) {
      return (
        <div>
          <Button type='primary' onClick={() => {
            dispatch({
              type: 'withdraw/pass',
              id: record.id
            });
            }}>通过</Button>
          <Button type='ghost' style={{marginLeft: 8}} onClick={() => {
            dispatch({
              type: 'withdraw/notPass',
              id: record.id
            });
            }}>不通过</Button>
        </div>
      )
    }else if(record.withdrawalsType == 1) {
      return (
        <div>
          <Button type='primary' onClick={() => {
            dispatch({
              type: 'withdraw/reTry',
              id: record.id
            });
            }}>重试</Button>
          <Button type='ghost' style={{marginLeft: 8}} onClick={() => {
            dispatch({
              type: 'withdraw/done',
              id: record.id
            });
            }}>变更状态为成功</Button>
        </div>
      )
    }else {
      return null
    }
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Card title='提现详情' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form>
        <FormItem {...formItemLayout} label='提现交易号'>
          <div>{record.orderId}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='创建时间'>
          <div>{record.creationTime}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='姓名'>
          <div>{record.userRealName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='手机号'>
          <div>{record.userPhoneNumber}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='身份证号'>
          <div>{record.userIDCard}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='商户名称'>
          <div>{record.userMerchantName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='商户地址'>
          <div>{record.userMerchantDetailAddress}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='银行卡号'>
          <div>{record.userBankCardNumber}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='银行名称'>
          <div>{record.userBankName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='提现金额'>
          <div>{record.money}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='提现状态'>
          <div>{record.withdrawalsTypeText}</div>
        </FormItem>
        <FormItem wrapperCol={{offset: 4, span: 12}}>
          {getButton()}
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {record} = state.withdrawDetail;
  return {
    record
  }
}

WithdrawDetail = create()(WithdrawDetail);

export default connect(mapStateToProps)(WithdrawDetail);
