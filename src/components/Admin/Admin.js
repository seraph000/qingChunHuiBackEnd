import React from 'react';
import styles from './Admin.css';
import {Button, Table, Card, Input, Popconfirm, notification} from 'antd';
const Search = Input.Search;
import {withRouter} from 'react-router';
import {connect} from 'dva';
import {deleteAdmin} from '../../services/admin';

function Admin({dispatch, router, result: dataSource, TotalRecord: total, PageIndex: current, PageSize: pageSize}) {
  function onChange(pagination, filters, sorter) {
    dispatch({
      type: 'admin/getList',
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
    });
  }

  function onConfirm(record) {
    deleteAdmin(record.id, {
      method: 'post'
    }).then(data => {
      if(data.success) {
        notification.success({
          message: '操作提示',
          description: '删除成功',
        });
        dispatch({
          type: 'admin/getList',
          PageIndex: current,
          PageSize: pageSize,
        });
      }
    });
  }

  const columns = [
    {
      title: '管理员登陆账号',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '邮箱',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    }, {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <Popconfirm placement="rightTop" title={'确定删除？'} onConfirm={onConfirm.bind(this, record)} okText="是" cancelText="否">
            <a>删除</a>
          </Popconfirm>
        </div>
      )
    }
  ];

  const pagination = {
    total: total,
    current: current,
    pageSize: pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
  }

  return (
    <Card title='管理员列表'>
      <Button type='primary' style={{marginBottom: 8}} onClick={() => {
          router.push('/config/admin/adminadd');
        }}>新建</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={onChange}
        rowKey={record => record.id}
      />
    </Card>
  );
}

function mapStateToProps(state) {
  const {result, TotalRecord, PageIndex, PageSize} = state.admin;
  return {
    result, TotalRecord, PageIndex, PageSize
  }
}

Admin = withRouter(Admin);

export default connect(mapStateToProps)(Admin);
