import React from 'react';
import { connect } from 'dva';
import SingleDetailComponent from '../components/SingleDetail/SingleDetail.js';

function SingleDetail() {
  return (
    <SingleDetailComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SingleDetail);
