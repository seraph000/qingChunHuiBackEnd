import React from 'react';
import { connect } from 'dva';
import WithdrawDetailComponent from '../components/WithdrawDetail/WithdrawDetail.js';

function WithdrawDetail() {
  return (
    <WithdrawDetailComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(WithdrawDetail);
