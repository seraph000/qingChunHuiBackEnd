import React from 'react';
import { connect } from 'dva';
import RoleComponent from '../components/Role/Role.js';

function Role() {
  return (
    <RoleComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Role);
