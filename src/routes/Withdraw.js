import React from 'react';
import { connect } from 'dva';
import WithdrawComponent from '../components/Withdraw/Withdraw.js';

function Withdraw() {
  return (
    <WithdrawComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Withdraw);
