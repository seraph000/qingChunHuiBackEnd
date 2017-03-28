import React from 'react';
import styles from './UserDetail.css';
import {Card, Form, Input} from 'antd';
const create  = Form.create;
const FormItem = Form.Item;
import {connect} from 'dva';

function UserDetail({form, record}) {

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Card title='用户信息' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form>
        <FormItem {...formItemLayout} label='微信昵称'>
          <div>{record.nickname}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='姓名'>
          <div>{record.realName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='手机号'>
          <div>{record.phoneNumber}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='身份证号'>
          <div>{record.idCard}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='商户名称'>
          <div>{record.merchantName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='商户地址'>
          <div>{record.merchantDetailAddress}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='银行卡号'>
          <div>{record.bankNo}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='银行名称'>
          <div>{record.bankName}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='是否为会员'>
          <div>{record.isMemberText}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='创建时间'>
          <div>{record.creationTime}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='购买会员时间'>
          <div>{record.bayMemberTime}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='二级会员数量'>
          <div>{record.subMemberCount}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='累计收益'>
          <div>{record.profit}</div>
        </FormItem>
        <FormItem {...formItemLayout} label='会员收款码'>
          <div><img src={record.qrCode} style={{width: 120, height: 120}}/></div>
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {record} = state.userDetail;
  return {
    record
  }
}

UserDetail = create()(UserDetail);

export default connect(mapStateToProps)(UserDetail);
