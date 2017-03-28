import React from 'react';
import styles from './Agent.css';
import {Button, Table, Card, Input, Form} from 'antd';
const Search = Input.Search;
const create = Form.create;
import {withRouter} from 'react-router';
import {connect} from 'dva';
import Base64 from '../../utils/Base64.js';

function Agent({dispatch, form, router, result: dataSource, TotalRecord: total, PageIndex: current, PageSize: pageSize}) {

  function onChange(pagination, filters, sorter) {
    const keyword = form.getFieldValue('keyword');
    dispatch({
      type: 'agent/getList',
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      keyword: Base64.encode(keyword)
    });
  }

  function search() {
    const keyword = form.getFieldValue('keyword');
    dispatch({
      type: 'agent/getList',
      PageIndex: 1,
      PageSize: 10,
      keyword: Base64.encode(keyword)
    });
  }

  const columns = [
    {
      title: '代理商名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '代理商编号',
      dataIndex: 'tenancyName',
      key: 'tenancyName',
    }, {
      title: '代理商用户数',
      dataIndex: 'userCount',
      key: 'userCoun',
    }, {
      title: '代理商会员数',
      dataIndex: 'memberCount',
      key: 'memberCount',
    }, {
      title: '分成比例',
      dataIndex: 'divided',
      key: 'divided',
    }, {
      title: '累计收益',
      dataIndex: 'profit',
      key: 'profit',
    }, {
      title: '收款二维码数',
      dataIndex: 'qrCodeCount',
      key: 'qrCodeCount',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <a onClick={() => {
            router.push({
              pathname: '/agent/agentdetail',
              state: {
                record
              }
            })
          }}>详情</a>
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

  const {getFieldDecorator} = form;

  return (
    <Card>
      <div className={styles.normal}>
        <Button type='primary' onClick={() => {
            router.push('/agent/agentadd')
          }}>新建</Button>
        <div className={styles.search}>
          {getFieldDecorator('keyword')(
            <Search
              placeholder="请输入姓名/手机号"
              style={{ width: 200, marginBottom: 8}}
              onSearch={search}
            />
          )}
        </div>
      </div>

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
  const {result, TotalRecord, PageIndex, PageSize} = state.agent;
  return {
    result, TotalRecord, PageIndex, PageSize
  }
}

Agent = create()(Agent);
Agent = withRouter(Agent);

export default connect(mapStateToProps)(Agent);
