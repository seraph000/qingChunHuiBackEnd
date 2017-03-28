import React from 'react';
import styles from './Award.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {Select, Table, Card} from 'antd';
const Option = Select.Option;
import {connect} from 'dva';
import {withRouter} from 'react-router';

function Award({dispatch, router, result: dataSource, TotalRecord: total, PageIndex: current, PageSize: pageSize}) {

  const arr = [];
  for(let i = dataSource.length-1;i >= 0;i--) {
    arr.push(dataSource[i]);
  }

  function onChange(pagination, filters, sorter) {
    dispatch({
      type: 'award/getList',
      PageIndex: pagination.current,
      PageSize: pagination.pageSize
    });
  }

  const columns = [{
    title: '日期',
    dataIndex: 'dateText',
    key: 'dateText',
  }, {
    title: '收款交易笔数',
    dataIndex: 'poundageCount',
    key: 'poundageCount',
  }, {
    title: '平台手续费收益',
    dataIndex: 'poundage',
    key: 'poundage',
  }, {
    title: '购买会员人数',
    dataIndex: 'memberFeeCount',
    key: 'memberFeeCount',
  }, {
    title: '平台会员收益',
    dataIndex: 'memberFee',
    key: 'memberFee',
  }, {
    title: '平台总收益',
    dataIndex: 'profit',
    key: 'profit',
  }, {
    title: '操作',
    dataIndex: 'op',
    key: 'op',
    render: (text, record) => (
      <a onClick={() => {
          router.push({
            pathname :'/award/dailydetail',
            state: {
              day: record.dateText
            }
          });
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
      <div className={styles.chartBox}>
        <LineChart width={1000} height={300} data={arr} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="dateText"/>
         <YAxis dataKey='profit'/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Line type="monotone" dataKey="pv" stroke="#1998fc" />
        </LineChart>
      </div>
      <Card className={styles.tableBox} title='推广收益列表'>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={onChange}
          rowKey={record => record.dateText}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {result, TotalRecord, PageIndex, PageSize} = state.award;
  return {
    result, TotalRecord, PageIndex, PageSize
  }
}

Award = withRouter(Award);

export default connect(mapStateToProps)(Award);
