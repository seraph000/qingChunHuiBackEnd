import React from 'react';
import styles from './AgentDetail.css';
import {Row, Col, Card, Form, Button, notification} from 'antd';
const FormItem = Form.Item;
import DetailItem from './DetailItem.js';
import {connect} from 'dva';
import {disable, enable} from '../../services/agent.js';

function AgentDetail({dispatch, record}) {

  function able(flag, id) {
    if(flag == 0) {
      disable(id, {
        method: 'post'
      }).then(data => {
        if(data.success) {
          notification.success({
            message: '操作提示',
            description: '修改成功',
          });
          dispatch({
            type: 'agentDetail/save',
            record: data.result
          });
        }
      })
    }else {
      enable(id, {
        method: 'post'
      }).then(data => {
        if(data.success) {
          notification.success({
            message: '操作提示',
            description: '修改成功',
          });
          dispatch({
            type: 'agentDetail/save',
            record: data.result
          });
        }
      })
    }
  }

  function print() {
    window.print();
  }

  const formItemLayout1 = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
  };
  const formItemLayout2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Card title='代理商信息' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
          <Form>
            <FormItem {...formItemLayout1} label='代理商名称'>
              <div>{record.name}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='代理商编号'>
              <div>{record.tenancyName}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='代理商分成'>
              <div>{record.divided}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='代理商交易结算手续费'>
              <div>{record.poundage}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='已用二维码数'>
              <div>{record.usedQRCodeCount}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='剩余二维码数量'>
              <div>{record.surplusQRCodeCount}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='手机号'>
              <div>{record.phoneNumber}</div>
            </FormItem>
            {/*<FormItem {...formItemLayout1} label='代理商有效期'>
              <div>{record.termOfValidity}</div>
            </FormItem>*/}
            <FormItem {...formItemLayout1} label='代理商到期时间'>
              <div>{record.termOfValidityText}</div>
            </FormItem>
            <FormItem {...formItemLayout1} label='代理商二维码'>
              <img src={record.qrCode} style={{width: 120, height: 120}}/>
              <div className={styles.section_to_print}>
                <img src={record.qrCode} style={{width: 300, height: 300}}/>
              </div>
            </FormItem>
          </Form>
          <div className={styles.btnBox}>
            <Button type='primary' size='small' onClick={print}>打印二维码</Button>
            {
              record.isActive ?
              <Button type='danger' size='large' style={{marginTop: 36}} onClick={able.bind(this, 0, record.id)}>禁用代理商</Button> :
              <Button type='danger' size='large' style={{marginTop: 36}} onClick={able.bind(this, 1, record.id)}>启用代理商</Button>
            }
          </div>
        </Card>
      </Col>
      <Col span={14}>
        <Card className={styles.card} title='开户人信息'>
          <Form>
            <FormItem {...formItemLayout2} label='开户姓名'>
              <div>{record.realName}</div>
            </FormItem>
            <FormItem {...formItemLayout2} label='代理商银行账户'>
              <div>{record.bankCardNumber}</div>
            </FormItem>
            <FormItem {...formItemLayout2} label='银行开户行'>
              <div>{record.bankName}</div>
            </FormItem>
          </Form>
        </Card>
        <Card className={styles.card} title='代理商收益'>
          <Row>
            <DetailItem color='#60BE29' title='代理商用户数（人）' num={record.userCount}/>
            <DetailItem color='#60BE29' title='代理商用会员（人）' num={record.memberCount}/>
            <DetailItem color='#60BE29' title='代理商累计收益（元）' num={record.profit}/>
            <DetailItem color='#60BE29' title='钱包余额（元）' num={record.money}/>
          </Row>
        </Card>
        <Card className={styles.card} title='代理商支出费用'>
          <Row>
            <DetailItem color='#FF7C18' title='支付通道费（元）' num={record.slottingFee}/>
            <DetailItem color='#FF7C18' title='平台维护费（元）' num={record.maintenanceFee}/>
            <DetailItem color='#FF7C18' title='收款二维码费（元）' num={record.onceQRCodeFee}/>
            <DetailItem color='#FF7C18' title='押金（元）' num={record.deposit}/>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  const {record} = state.agentDetail;
  return {
    record
  }
}

export default connect(mapStateToProps)(AgentDetail);
