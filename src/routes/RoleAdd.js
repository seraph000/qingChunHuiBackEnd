import React from 'react';
import { connect } from 'dva';
import RoleAddComponent from '../components/RoleAdd/RoleAdd.js';

function RoleAdd() {
  return (
    <RoleAddComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RoleAdd);
