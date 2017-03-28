import React from 'react';
import { connect } from 'dva';
import MemberComponent from '../components/Member/Member.js';

function Member() {
  return (
    <MemberComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Member);
