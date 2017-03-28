import React, {Component} from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


import '../css/PasswordNew.less';

let img = require('../images/img.png');

/**
 * 设置新密码
 */
class PasswordNew extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    render() {
        const {location} = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='password_new'>
              <div className='content'>
                <div className='left'>
                  <img src={img} />
                </div>
                <div className='right'>
                  <a href="#">
                    <span className='close'></span>
                  </a>
                  <div className='header'>
                    <p>设置新密码</p>
                    <p>设置您的新密码！</p>
                  </div>
                  <div className='body'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                      <FormItem>
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <input  placeholder="请输入新密码" />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                          <input  type="password" placeholder="请再次输入密码" />
                        )}
                      </FormItem>
                      <FormItem>
                        <Button type="primary" htmlType="submit" className='login_button'>
                          提交
                        </Button>
                      </FormItem>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}




export default PasswordNew = Form.create()(PasswordNew);
