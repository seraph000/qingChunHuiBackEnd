import React from 'react';
import styles from './Withdraw.css';
import {Tabs, Table, Input, Card, notification, Form} from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const create = Form.create;
import {connect} from 'dva';
import {enable, disable} from '../../services/withdraw.js';
import Base64 from '../../utils/Base64.js';
import {withRouter} from 'react-router';

function Withdraw({dispatch, form, router, autoAuditing, withdrawalsAdminList: dataSource,
  TotalRecord: total, PageIndex: current, PageSize: pageSize}) {

  function onChange(pagination, filters, sorter) {
    const keyword = form.getFieldValue('keyword');
    dispatch({
      type: 'withdraw/getList',
      withdrawalsType: filters.withdrawalsTypeText[0],
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      keyword: Base64.encode(keyword)
    });
  }

  function search() {
    const keyword = form.getFieldValue('keyword');
    dispatch({
      type: 'withdraw/getList',
      PageIndex: 1,
      PageSize: 10,
      keyword: Base64.encode(keyword)
    });
  }

  function pass(flag, id) {
    const keyword = form.getFieldValue('keyword');
    if(flag == 1) {
      dispatch({
        type: 'withdraw/pass',
        id: id
      });
    }else {
      dispatch({
        type: 'withdraw/notPass',
        id: id
      });
    }
    dispatch({
      type: 'withdraw/getList',
      PageIndex: current,
      PageSize: pageSize,
      keyword: Base64.encode(keyword)
    });
  }

  function reTry(id) {
    const keyword = form.getFieldValue('keyword');
    dispatch({
      type: 'withdraw/reTry',
      id: id
    });
    dispatch({
      type: 'withdraw/getList',
      PageIndex: current,
      PageSize: pageSize,
      keyword: Base64.encode(keyword)
    });
  }

  const columns = [
    {
      title: '提现交易号',
      dataIndex: 'orderId',
      key: 'orderId',
    }, {
      title: '姓名',
      dataIndex: 'userRealName',
      key: 'userRealName',
    }, {
      title: '手机号',
      dataIndex: 'userPhoneNumber',
      key: 'userPhoneNumber',
    }, {
      title: '发起时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
    }, {
      title: '银行',
      dataIndex: 'userBankName',
      key: 'userBankName',
    }, {
      title: '银行卡号',
      dataIndex: 'userBankCardNumber',
      key: 'userBankCardNumber',
    }, {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
    }, {
      title: '状态',
      dataIndex: 'withdrawalsTypeText',
      key: 'withdrawalsTypeText',
      filters: [
        {text: '处理中', value: '0'},
        {text: '提现失败', value: '1'},
        {text: '已完成', value: '2'}
      ],
      filterMultiple: false
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          {
            record.withdrawalsType == 0 ?
            <span>
              <a href='javascript:void(0)' onClick={pass.bind(this, 1, record.id)}>通过</a>
              <a href='javascript:void(0)' className={styles.normal}  onClick={pass.bind(this, 2, record.id)}>不通过</a>
            </span>
            :
            null
          }
          {record.withdrawalsType == 1 ? <a href='javascript:void(0)' onClick={reTry.bind(this, record.id)}>重试</a> : null}
          <a className={styles.normal} onClick={() => {
              router.push({
                pathname: '/withdraw/withdrawdetail',
                state: {
                  record
                }
              })
            }}>详情</a>
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

  const {getFieldDecorator} = form;

  return (
    <Card>
      <div>
        {getFieldDecorator('keyword')(
          <Search
            placeholder="请输入姓名/手机号"
            style={{ width: 200, marginBottom: 8}}
            onSearch={search}
          />
        )}
        {
          autoAuditing ?
          <a style={{float: 'right'}} onClick={() => {
              disable({
                method: 'post'
              }).then(data => {
                if(data.success) {
                  dispatch({
                    type: 'withdraw/getList',
                    withdrawalsType: '',
                    PageIndex: 1,
                    PageSize: 10,
                    keyword: ''
                  });
                  notification.success({
                    message: '操作提示',
                    description: '修改成功',
                  });
                }
              })
            }}>关闭自动审核</a> :
          <a style={{float: 'right'}} onClick={() => {
              enable({
                method: 'post'
              }).then(data => {
                if(data.success) {
                  dispatch({
                    type: 'withdraw/getList',
                    withdrawalsType: '',
                    PageIndex: 1,
                    PageSize: 10,
                    keyword: ''
                  });
                  notification.success({
                    message: '操作提示',
                    description: '修改成功',
                  });
                }
              })
            }}>开启自动审核</a>
        }
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
  const {autoAuditing, withdrawalsAdminList, TotalRecord, PageIndex, PageSize} = state.withdraw;
  return {
    autoAuditing, withdrawalsAdminList, TotalRecord, PageIndex, PageSize
  }
}

Withdraw = create()(Withdraw);
Withdraw = withRouter(Withdraw);

export default connect(mapStateToProps)(Withdraw);
