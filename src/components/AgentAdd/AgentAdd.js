import React from 'react';
import styles from './AgentAdd.css';
import {Card, Form, Input, Button, Select, DatePicker, notification} from 'antd';
const create  = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
import {createTenant} from '../../services/agent.js';
import moment from 'moment';
import {withRouter} from 'react-router';
moment.locale('zh-cn');
const banks = [
  {label: "中国工商银行", value: "102100099996"},
  {label: "中国农业银行", value: "103100000026"},
  {label: "中国银行", value: "104100000004"},
  {label: "中国建设银行", value: "105100000017"},
  {label: "招商银行", value: "308584000013"},
  {label: "浦发银行", value: "310290000013"},
  {label: "广东发展银行", value: "306581000003"},
  {label: "平安银行", value: "307584007998"},
  {label: "兴业银行", value: "309391000011"},
  {label: "中国民生银行", value: "305100000013"},
  {label: "华夏银行", value: "304100040000"},
  {label: "中信银行", value: "302100011000"},
  {label: "中国光大银行", value: "303100000006"},
  {label: "中国邮政储蓄", value: "403100000004"},
  {label: "深圳发展银行", value: "307584007998"},
  {label: "北京银行", value: "313100000013"},
  {label: "上海银行", value: "325290000012"}
]

function AgentAdd({form}) {

  function getBanks() {
    return banks.map((ele, index) => (
      <Option value={ele.value+','+ele.label} key={index}>{ele.label}</Option>
    ));
  }

  function submit(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if(errors) {
        return;
      }else {
        if(values.bank) {
          values.bankNo = values.bank.split(',')[0];
          values.bankName = values.bank.split(',')[1];
        }
        values.termOfValidity = values.termOfValidity.format('YYYY-MM-DD');
        createTenant({
          method: 'post',
          body: values
        }).then(data => {
          if(data.success) {
            notification.success({
              message: '操作提示',
              description: '添加成功',
            });
            window.history.go(-1);
          }
        })
      }
    });
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
  };

  return (
    <Card title='代理商详情' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label='代理商名称'>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请填写代理商名称'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商编号'>
          {getFieldDecorator('tenancyName', {
            rules: [{required: true, message: '请填写代理商编号'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商分成'>
          {getFieldDecorator('divided', {
            rules: [{required: true, message: '请填写代理商分成'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商交易结算手续费'>
          {getFieldDecorator('poundage', {
            rules: [{required: true, message: '请填写代理商手续费'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='收款二维码数量'>
          {getFieldDecorator('qrCodeCount', {
            rules: [{required: true, message: '请填写二维码数量'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='手机号'>
          {getFieldDecorator('phoneNumber', {
            rules: [{required: true, message: '请填写手机号'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商初始密码'>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请填写代理商初始密码'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商有效期'>
          {getFieldDecorator('termOfValidity', {
            rules: [{required: true, message: '请填写代理商有效期', type: 'object'}]
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='开户姓名'>
          {getFieldDecorator('realName')(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='代理商银行账户'>
          {getFieldDecorator('bankCardNumber')(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='银行开户行'>
          {getFieldDecorator('bank')(
            <Select>
              {getBanks()}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} wrapperCol={{span: 12}} label='支付通道费'>
          {getFieldDecorator('slottingFee')(
            <div>
              <Input style={{width: '50%'}}/>元
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout} wrapperCol={{span: 12}} label='平台维护费'>
          {getFieldDecorator('maintenanceFee')(
            <div>
              <Input style={{width: '50%'}}/>元/月
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout} wrapperCol={{span: 12}} label='收款二维码费'>
          {getFieldDecorator('onceQRCodeFee')(
            <div>
              <Input style={{width: '50%'}}/>元/个
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout} wrapperCol={{span: 12}} label='押金'>
          {getFieldDecorator('deposit')(
            <div>
              <Input style={{width: '50%'}}/>元
            </div>
          )}
        </FormItem>
        <FormItem wrapperCol={{offset: 4, span: 8}}>
          <Button type='primary' htmlType='submit'>保存</Button>
          <Button type='ghost' style={{marginLeft: 8}}>取消</Button>
        </FormItem>
      </Form>
    </Card>
  );
}

AgentAdd = create()(AgentAdd);
AgentAdd = withRouter(AgentAdd);

export default AgentAdd;
