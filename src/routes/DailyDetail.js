import React from 'react';
import { connect } from 'dva';
import DailyDetailComponent from '../components/DailyDetail/DailyDetail.js';

function DailyDetail() {
  return (
    <DailyDetailComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(DailyDetail);
