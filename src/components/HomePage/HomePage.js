import React from 'react';
import styles from './HomePage.css';
import HomeCard from './HomeCard.js';
import {Row, Col} from 'antd';
import {connect} from 'dva';

function HomePage({dispatch, result}) {

  return (
    <div className={styles.normal}>
      <Row gutter={16} className={styles.row}>
        <Col span={6}><HomeCard title={'今日新增用户'} add={true} num={result.newUserCount}/></Col>
        <Col span={6}><HomeCard title={'今日新增会员'} add={true} num={result.newMemberCount}/></Col>
      </Row>
      <Row gutter={16} className={styles.row}>
        <Col span={6}><HomeCard title={'累计代理商'} num={result.tenantCount}/></Col>
        <Col span={6}><HomeCard title={'累计用户'} num={result.userCount}/></Col>
        <Col span={6}><HomeCard title={'累计会员'} num={result.memberCount}/></Col>
        <Col span={6}><HomeCard title={'累计会员收益'} num={result.profits}/></Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  const {result} = state.homePage;
  return {
    result
  }
}

export default connect(mapStateToProps)(HomePage);
