import React, {Component} from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import {withRouter} from 'react-router';


import styles from "./css/ChangeSuccess.less";

const img = require('../assets/img.png');
const success_img = require('../assets/success_img.png');

/**
 * 设置成功
 */
class ChangeSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.success}>
              <div className={styles.content}>
                <div className={styles.left}>
                  <img src={img} />
                </div>
                <div className={styles.right}>
                  <div className={styles.header}>
                    <p>修改成功</p>
                    <p>请妥善保管您的密码！</p>
                  </div>
                  <div className={styles.body}>
                    <img src={success_img} />
                    <p>密码修改成功！</p>
                      <Button type="primary" htmlType="submit" className={styles.login_button} onClick={()=>{
                          this.props.router.push('/');
                      }}>
                        去登录
                      </Button>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}


export default withRouter(ChangeSuccess);