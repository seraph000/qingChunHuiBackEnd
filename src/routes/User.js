import React from 'react';
import { connect } from 'dva';
import UserComponent from '../components/User/User.js';

function User() {
  return (
    <UserComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(User);
