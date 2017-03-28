import React, {Component} from "react";
import { Form, Icon, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import styles from './css/Login.less';
const img = require('../assets/img.png');
import {login} from '../services/login.js';
import {withRouter} from 'react-router';
import ReactCookie from 'react-cookie';
import {connect} from 'dva';
import {getMenu} from '../services/menu.js';
/**
 * 青春惠后台管理登陆界面
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          login({
            method: 'post',
            body: values
          }).then(data => {
            if(data.success) {
                window.sessionStorage.setItem('pass', data.result.token);
                ReactCookie.save('username', values.username);
                getMenu({
                  method: 'get'
                }).then(data => {
                  if(data.success) {
                    this.props.router.push(data.result[0].url)
                  }
                })
            }
          })
        }
      });
    };

    render() {
        const {location} = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.login}>
              <div className={styles.content}>
                <div className={styles.left}>
                  <img src={img} />
                </div>
                <div className={styles.right}>
                  <div className={styles.header}>
                    <p>登录</p>
                    <p>欢迎使用青春惠后台管理系统！</p>
                  </div>
                  <div className={styles.body}>
                    <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                      <FormItem>
                        {getFieldDecorator('username', {
                          rules: [{ required: true, message: '账号不能为空' }],
                        })(
                          <input  placeholder="请输入账号" />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: '密码不能为空' }],
                        })(
                          <input  type="password" placeholder="请输入密码" />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('rememberPassword', {
                          valuePropName: 'checked',
                          initialValue: true,
                        })(
                          <Checkbox>记住密码</Checkbox>
                        )}
                        <a className={styles.login_form_forgot} href="#/passwordChange">忘记密码？</a>
                        <Button type="primary" htmlType="submit" className='login_button'>
                          登录
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

Login = withRouter(Login);
Login = connect()(Login);

export default Login = Form.create()(Login);
