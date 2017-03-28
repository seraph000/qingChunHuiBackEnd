import React, {Component} from "react";
import {Form, Icon, Input, Button, Checkbox, message, notification} from "antd";
import styles from "./css/PasswordChange.less";
const FormItem = Form.Item;
import {withRouter} from 'react-router';


const img = require('../assets/img.png');

import {sendVerificationCode, updatePasswordByPhone} from '../services/user';

/**
 * 修改密码
 */
class PasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            second: 60, //倒计时
            btn1: false,
            btn11: 0,
            btn2: false,
        };
        this.renderSMS = this.renderSMS.bind(this);
        this.sendVerificationCode = this.sendVerificationCode.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //离开界面执行
        this.timer1 && clearTimeout(this.timer1);
    }

    validatemobile(mobile) {
        if(!mobile){
            return false;
        }
        if (mobile.length == 0) {
            return false;
        }
        if (mobile.length != 11) {
            return false;
        }
        let myreg = new RegExp(/^\d{11}$/);
        if (!myreg.test(mobile)) {
            return false;
        }
        return true;
    }

    //发送短信验证码
    sendVerificationCode(phoneNumber) {
        if (!this.validatemobile(phoneNumber)) {
            message.warning('请输入正确的手机号码!');
            return;
        }
        this.setState({
            btn1: true,
            btn11: 1,
        });
        sendVerificationCode({
            method: 'post',
            body: {
                phoneNumber: phoneNumber,
            }
        }).then((data) => {
            if (data.success) {
                message.success('验证码发送成功!');
                this.setState({
                    second: 60,
                    btn11: 2,
                });
                this.timer1 = setInterval(()=> {
                    if (this.state.second == 1) {
                        this.setState({
                            second: 60,
                            btn1: false,
                            btn11: 0,
                        });
                        this.timer1 && clearInterval(this.timer1);
                    } else {
                        this.setState({
                            second: this.state.second - 1,
                        });
                    }
                }, 1000);
            } else {
                message.warning('验证码发送失败，请重试!');
                this.setState({
                    second: 60,
                    btn1: false,
                    btn11: 0,
                });
            }
        }).catch(()=> {
            message.warning('验证码发送失败，请重试!');
            this.setState({
                second: 60,
                btn1: false,
                btn11: 0,
            });
        });
    }

    renderSMS() {
        let btnStr = '';
        if (this.state.btn11 == 0) {
            //没发或失败
            btnStr = '获取验证码';
        } else if (this.state.btn11 == 1) {
            //网络请求
            btnStr = '验证码发送中...';
        } else if (this.state.btn11 == 2) {
            //网络请求结束，成功
            btnStr = this.state.second + '秒';
        }
        return btnStr;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updatePasswordByPhone({
                    method: 'post',
                    body: values
                }).then(data => {
                    // console.log(data);
                    if(data.success) {
                        notification.success({
                            message: '提示',
                            description: '密码修改成功！',
                        });
                        this.props.router.push('/changeSuccess');
                    } else {
                        notification.error({
                            message: '错误提示',
                            description: data.error.message,
                        });
                    }
                }, error => {
                    // console.log(error);
                    notification.error({
                        message: '错误提示',
                        description: error.message,
                    });
                });
            }
        });
    };

    render() {
        const {location} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={styles.password_change}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <img src={img}/>
                    </div>
                    <div className={styles.right}>
                        <a href="#">
                            <span className={styles.close}></span>
                        </a>
                        <div className={styles.header}>
                            <p>找回密码</p>
                        </div>
                        <div className={styles.body}>
                            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                                <FormItem>
                                    {getFieldDecorator('phoneNumber', {
                                        rules: [{required: true, message: '请输入手机号!'}],
                                    })(
                                        <Input placeholder="请输入手机号"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('verificationCode', {
                                        rules: [{required: true, message: '请输入验证码!'}],
                                    })(
                                        <Input placeholder="请输入验证码"/>
                                    )}
                                    <button
                                        className={this.state.btn1 ? styles.get_code + ' ' + styles.get_code_off : styles.get_code}
                                        disabled={this.state.btn1} onClick={()=> {
                                        const form = this.props.form;
                                        let tel = form.getFieldValue('phoneNumber');
                                        console.log('tel...' + tel);
                                        this.sendVerificationCode(tel);
                                    }}>{this.renderSMS()}</button>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入新密码!'}],
                                    })(
                                        <Input type="password" placeholder="请输入新密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('resPassword', {
                                        rules: [{required: true, message: '请重复输入新密码!'},
                                            {
                                                validator: (rule, value, callback) => {
                                                    const form = this.props.form;
                                                    if (value && value !== form.getFieldValue('password')) {
                                                        callback('两次密码填写不一致');
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }],
                                    })(
                                        <Input type="password" placeholder="请重复输入新密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className={styles.login_button}>
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

PasswordChange = withRouter(PasswordChange);

export default PasswordChange = Form.create()(PasswordChange);
