import React from 'react';
import styles from './AdminAdd.css';
import {Card, Form, Input, Button, Select, notification} from 'antd';
const create = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
import {connect} from 'dva';
import {createAdmin} from '../../services/admin.js';

function AdminAdd({dispatch, form, result: ls}) {

  function submit(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if(errors) {
        return
      }else {
        createAdmin({
          method: 'post',
          body: values
        }).then(data => {
          if(data.success) {
            notification.success({
              message: '操作提示',
              description: '编辑成功',
            });
            window.history.go(-1);
          }
        });
      }
    });
  }

  function getRoles() {
    return ls.map((ele) => (
      <Option value={ele.value.toString()} key={ele.value}>{ele.name}</Option>
    ));
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
  };

  return (
    <Card title='编辑管理员' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label='管理员登陆账号'>
          {getFieldDecorator('userName', {
            rules: [{required: true, message: '请输入管理员登陆账号'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='姓名'>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入姓名'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='邮箱'>
          {getFieldDecorator('emailAddress', {
            rules: [{required: true, message: '请输入邮箱'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='初始密码'>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入初始密码'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='角色'>
          {getFieldDecorator('roleId', {
            rules: [{required: true, message: '请选择角色'}]
          })(
            <Select>
              {getRoles()}
            </Select>
          )}
        </FormItem>
        <FormItem wrapperCol={{offset: 4, span: 8}}>
          <Button type='primary' htmlType='submit'>保存</Button>
          <Button type='ghost' style={{marginLeft: 8}} onClick={() => {window.history.go(-1)}}>取消</Button>
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {result} = state.adminAdd;
  return {
    result
  }
}

AdminAdd = create()(AdminAdd);

export default connect(mapStateToProps)(AdminAdd);
