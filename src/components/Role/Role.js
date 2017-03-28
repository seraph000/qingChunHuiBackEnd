import React from 'react';
import styles from './Role.css';
import {Button, Table, Card, Input, Popconfirm} from 'antd';
const Search = Input.Search;
import {withRouter} from 'react-router';
import {connect} from 'dva';

function Role({router, result: dataSource}) {

  function onChange(pagination, filters, sorter) {

  }

  function onConfirm(e) {
    console.log(e)
  }

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '菜单权限',
      dataIndex: 'permissionNames',
      key: 'permissionNames',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <a onClick={() => {
            router.push({
              pathname: '/config/role/roleadd',
              state: {
                record
              }
            });
          }}>编辑</a>
      )
    }
  ];

  const pagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  }

  return (
    <Card title='角色列表'>
      <Button type='primary' style={{marginBottom: 8}} onClick={() => {
          router.push({
            pathname: '/config/role/roleadd',
            state: {
              record: {
                name: '',
                grantedPermissionNames: []
              }
            }
          });
        }}>新建</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={onChange}
        pagination={false}
        rowKey={record => record.id}
      />
    </Card>
  );
}

function mapStateToProps(state) {
  const {result} = state.role;
  return {
    result
  }
}

Role = withRouter(Role);

export default connect(mapStateToProps)(Role);
