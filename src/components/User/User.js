import React from 'react';
import styles from './User.css';
import {connect} from 'dva';
import {Tabs, Table, Input, Form} from 'antd';
const create = Form.create;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import {withRouter} from 'react-router';
import Base64 from '../../utils/Base64.js';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMember: ''
    };
  }

  change(key) {
    this.props.form.resetFields();
    const {dispatch} = this.props;
    if(key == 1) {
      this.setState({
        isMember: ''
      });
      dispatch({
        type: 'user/getList',
        isMember: '',
        PageIndex: 1,
        PageSize: 10,
      });
    }else if(key == 2) {
      this.setState({
        isMember: true
      });
      dispatch({
        type: 'user/getList',
        isMember: true,
        PageIndex: 1,
        PageSize: 10,
      });
    }else {
      this.setState({
        isMember: false
      });
      dispatch({
        type: 'user/getList',
        isMember: false,
        PageIndex: 1,
        PageSize: 10,
      });
    }
  }

  onChange(pagination, filters, sorter) {
    const keyword = this.props.form.getFieldValue('keyword');
    this.props.dispatch({
      type: 'user/getList',
      isMember: this.state.isMember,
      PageIndex: pagination.current,
      PageSize: pagination.pageSize,
      keyword: Base64.encode(keyword)
    });
  }

  search() {
    const keyword = this.props.form.getFieldValue('keyword');
    this.props.dispatch({
      type: 'user/getList',
      isMember: this.state.isMember,
      PageIndex: 1,
      PageSize: 10,
      keyword: Base64.encode(keyword)
    })
  }

  render() {
    const {memberCount, unMemberCount, userCount, userList: dataSource, TotalRecord: total, PageIndex: current, PageSize: pageSize} = this.props;
    const {getFieldDecorator} = this.props.form;

    const columns = [
      {
        title: '商户名称',
        dataIndex: 'merchantName',
        key: 'merchantName',
      }, {
        title: '姓名',
        dataIndex: 'realName',
        key: 'realName',
      }, {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      }, {
        title: '身份证号',
        dataIndex: 'idCard',
        key: 'idCard',
      }, {
        title: '是否为会员',
        dataIndex: 'isMemberText',
        key: 'isMemberText',
      }, {
        title: '创建时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
      }, {
        title: '购买会员时间',
        dataIndex: 'bayMemberTime',
        key: 'bayMemberTime',
      }, {
        title: '累计收益',
        dataIndex: 'profit',
        key: 'profit',
      }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <a onClick={() => {
              this.props.router.push({
                pathname: '/user/userdetail',
                state: {
                  record: record
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

    return (
      <div className={styles.normal}>
        <Tabs onChange={this.change.bind(this)}>
          <TabPane tab={`总用户数：${userCount}`} key="1"></TabPane>
          <TabPane tab={`会员数：${memberCount}`} key="2"></TabPane>
          <TabPane tab={`非会员数：${unMemberCount}`} key="3"></TabPane>
        </Tabs>
        <div className={styles.tableBox}>
          {
            getFieldDecorator('keyword')(<Search
              placeholder="请输入姓名/手机号"
              style={{ width: 200, marginBottom: 8}}
              onSearch={this.search.bind(this)}
            />)
          }
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            onChange={this.onChange.bind(this)}
            rowKey={record => record.id}
            bordered
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {memberCount, unMemberCount, userCount, userList, TotalRecord, PageIndex, PageSize} = state.user;
  return {
    memberCount, unMemberCount, userCount, userList, TotalRecord, PageIndex, PageSize
  }
}

User = create()(User);
User = withRouter(User);

export default connect(mapStateToProps)(User);
