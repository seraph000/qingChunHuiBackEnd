import React from 'react';
import { connect } from 'dva';
import DetailComponent from '../components/UserDetail/UserDetail.js';

function UserDetail() {
  return (
    <DetailComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserDetail);
