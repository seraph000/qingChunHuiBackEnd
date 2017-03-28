import React, { Component } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import reactCookie from 'react-cookie';
import {updatePassword} from '../../services/user.js';

const FormItem = Form.Item;

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        console.log(JSON.stringify(values));
        // values.userName = reactCookie.load('username');
          updatePassword({
              method: 'post',
              body: values
          }).then(data => {
              if(data.success) {
                notification.success({
                  message: '提示',
                  description: '密码修改成功！',
                });
                this.setState({
                  visible: false,
                });
              } else {
                notification.error({
                  message: '错误提示',
                  description: data.error.message,
                });
              }
          }, error => {
              notification.error({
                message: '错误提示',
                description: error.message,
              });
          });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
          footer={null}
        >
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="旧密码"
            >
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '请填写旧密码', type: 'string'},
                  ],
                })(<Input type="password" placeholder="请填写旧密码" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              {
                getFieldDecorator('newPassword', {
                  rules: [
                    { required: true, message: '请填写新密码', type: 'string'},
                  ],
                })(<Input type="password" placeholder="请填写新密码" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
            >
              {
                getFieldDecorator('repeat', {
                  rules: [
                    { required: true, message: '请重复新密码', type: 'string'},
                    { validator: (rule, value, callback) => {
                      const form = this.props.form;
                        if (value && value !== form.getFieldValue('newPassword')) {
                          callback('两次密码填写不一致');
                        } else {
                          callback();
                        }
                    } }
                  ],
                })(<Input type="password" placeholder="请重复新密码"/>)
              }
            </FormItem>
            <FormItem wrapperCol={{offset: 6, span: 14}}>
              <Button type="primary" style={{marginRight: 16}} htmlType="submit">保存</Button>
              <Button type="ghost" onClick={this.hideModelHandler.bind(this)}>取消</Button>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(MyModal);
