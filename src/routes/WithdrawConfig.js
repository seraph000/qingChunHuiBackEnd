import React from 'react';
import { connect } from 'dva';
import WithdrawConfigComponent from '../components/WithdrawConfig/WithdrawConfig.js';

function WithdrawConfig() {
  return (
    <WithdrawConfigComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(WithdrawConfig);
