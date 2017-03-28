import React from 'react';
import styles from './Member.css';
import {Card, Form, Input, Button, Select, notification } from 'antd';
const create = Form.create;
const FormItem = Form.Item;
import {connect} from 'dva';
import {setMemberSetting} from '../../services/member.js';

function Member({dispatch, form, memberOriginalPrice, memberPrice, t0Fee, t1Fee, shareFee, parentFee}) {

  function submit(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if(errors) {
        return;
      }else {
        setMemberSetting({
          method: 'post',
          body: values
        }).then(data => {
          if(data.success) {
            notification.success({
              message: '操作提示',
              description: '修改成功',
            });
            form.resetFields();
            dispatch({
              type: 'member/getSetting'
            });
          }
        });
      }
    });
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
  };

  return (
    <Card title='会员设置'>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label='会员原价'>
          {getFieldDecorator('memberOriginalPrice', {
            initialValue: memberOriginalPrice,
            rules: [{required: true, message: '请输入价格' }]
          })(
            <Input className={styles.normal}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='会员促销价'>
          {getFieldDecorator('memberPrice', {
            initialValue: memberPrice,
            rules: [{required: true, message: '请输入促销价格' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='会员收款T+0手续费'>
          {getFieldDecorator('t0Fee', {
            initialValue: t0Fee,
            rules: [{required: true, message: '请输入会员收款T+0手续费' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='会员收款T+1手续费'>
          {getFieldDecorator('t1Fee', {
            initialValue: t1Fee,
            rules: [{required: true, message: '会员收款T+1手续费' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='会员推荐提奖'>
          {getFieldDecorator('shareFee', {
            initialValue: shareFee,
            rules: [{required: true, message: '请输入会员推荐提奖' }]
          })(
              <Input className={styles.normal} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label='会员上级手续费提奖'>
          {getFieldDecorator('parentFee', {
            initialValue: parentFee,
            rules: [{required: true, message: '请输入会员上级手续费提奖' }]
          })(
            <Input className={styles.normal} />
          )}
        </FormItem>
        <FormItem wrapperCol={{offset: 4, span: 8}}>
          <Button type='primary' htmlType='submit'>保存</Button>
          <Button type='ghost' style={{marginLeft: 16}}>取消</Button>
        </FormItem>
      </Form>
    </Card>
  );
}

function mapStateToProps(state) {
  const {memberOriginalPrice, memberPrice, t0Fee, t1Fee, shareFee, parentFee} = state.member;
  return {
    memberOriginalPrice, memberPrice, t0Fee, t1Fee, shareFee, parentFee
  }
}

Member = create()(Member);

export default connect(mapStateToProps)(Member);
