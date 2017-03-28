import React from 'react';
import { connect } from 'dva';
import AwardComponent from '../components/Award/Award.js';

function Award() {
  return (
    <AwardComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Award);
