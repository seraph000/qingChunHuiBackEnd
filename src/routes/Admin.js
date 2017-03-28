import React from 'react';
import { connect } from 'dva';
import AdminComponent from '../components/Admin/Admin.js';

function Admin() {
  return (
    <AdminComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Admin);
