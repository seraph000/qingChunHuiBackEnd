import React from 'react';
import styles from './DailyDetail.css';
import {Table, Card, Row, Col} from 'antd';
import DailyCard from './DailyCard.js';
import {connect} from 'dva';
import {withRouter} from 'react-router';

function DailyDetail({dispatch, router, day, memberFee, memberFeeCount, poundage, poundageCount,
  adminProfitList: dataSource, TotalRecord: total, PageIndex: current, PageSize: pageSize}) {

  function onChange(pagination, filters, sorter) {
    dispatch({
      type: 'dailyDetail/getList',
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      day: day
    });
  }

  const columns = [{
    title: '提现交易号',
    dataIndex: 'orderId',
    key: 'orderId',
  }, {
    title: '代理商名称',
    dataIndex: 'tenantName',
    key: 'tenantName',
  }, {
    title: '昵称',
    dataIndex: 'fromUserNickname',
    key: 'fromUserNickname',
  }, {
    title: '手机号',
    dataIndex: 'fromUserPhoneNumber',
    key: 'fromUserPhoneNumber',
  }, {
    title: '收益类型',
    dataIndex: 'profitTypeText',
    key: 'profitTypeText',
  }, {
    title: '创建时间',
    dataIndex: 'creationTime',
    key: 'creationTime',
  }, {
    title: '收益金额',
    dataIndex: 'systemMoney',
    key: 'systemMoney',
  }, {
    title: '操作',
    dataIndex: 'op',
    key: 'op',
    render: (text, record) => (
      <a onClick={() => {
          router.push({
            pathname: '/award/singledetail',
            state: {
              record: record
            }
          })
        }}>详情</a>
    )
  }];

  const pagination = {
    total: total,
    current: current,
    pageSize: pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
  }

  return (
    <div className={styles.normal}>
      <Row gutter={16} className={styles.row}>
        <Col span={6}><DailyCard title={'手续费交易笔数'} num={poundageCount}/></Col>
        <Col span={6}><DailyCard title={'手续费交易收益金额'} isMoney={true} add={true} num={poundage}/></Col>
        <Col span={6}><DailyCard title={'会员购买人数'} num={memberFeeCount}/></Col>
        <Col span={6}><DailyCard title={'购买会员金额'} isMoney={true} num={memberFee}/></Col>
      </Row>
      <Card title='收益列表' extra={<a href='javascript:void(0)' onClick={() => {window.history.go(-1)}}>返回</a>}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={onChange}
          rowKey={record => record.id}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {memberFee, memberFeeCount, poundage, poundageCount, adminProfitList, TotalRecord, PageIndex, PageSize, day} = state.dailyDetail;
  return {
    memberFee, memberFeeCount, poundage, poundageCount, adminProfitList, TotalRecord, PageIndex, PageSize, day
  }
}

DailyDetail = withRouter(DailyDetail);

export default connect(mapStateToProps)(DailyDetail);
