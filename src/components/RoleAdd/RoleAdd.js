import React from 'react';
import styles from './RoleAdd.css';
import {Card, Form, Input, Button, Select, Tree, notification} from 'antd';
const create = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
import {connect} from 'dva';
import {createRole, updateRole} from '../../services/role.js';

function RoleAdd({dispatch, form, result: list, record}) {

  const mapArr = [];
  record.grantedPermissionNames.map((ele) => {
    if(ele != 'Pages.Setting') {
      mapArr.push(ele)
    }
  });

  function submit(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if(errors) {
        return;
      }else {
        if(record.id) {
          values.id = record.id;
          if(!values.grantedPermissionNames) {
            values.grantedPermissionNames = record.grantedPermissionNames
          }
          updateRole({
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
        }else {
          createRole({
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
      }
    });
  }

  function getTree() {
    let arr = [];
    list.map((ele, index) => {
      if(ele.children.length > 0){
        arr.push(
          <TreeNode title={ele.displayName} key={ele.name}>
            {ele.children.map((e) => (
              <TreeNode title={e.displayName} key={e.name} />
            ))}
          </TreeNode>
        )
      }else {
        arr.push(<TreeNode title={ele.displayName} key={ele.name} />);
      }
    });
    return arr
  }

  function check(checkedKeys, info) {
    let arr = checkedKeys.map((ele) => (ele));
    if(info.halfCheckedKeys.length > 0) {
      arr.push(...info.halfCheckedKeys);
    }
    form.setFieldsValue({
      grantedPermissionNames: arr
    });
  }

  const {getFieldDecorator} = form;
  const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
  };

  return (
    <Card title='编辑角色' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label='角色名称'>
          {getFieldDecorator('name', {
            initialValue: record.name,
            rules: [{required: true, message: '请填写角色名称'}]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='菜单权限'>
          {getFieldDecorator('grantedPermissionNames')(
            <Tree checkable onCheck={check} defaultCheckedKeys={mapArr}>
              {getTree()}
            </Tree>
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

function mapStateToProps(state) {
  const {result, record} = state.roleAdd;
  return {
    result, record
  }
}

RoleAdd = create()(RoleAdd);

export default connect(mapStateToProps)(RoleAdd);
