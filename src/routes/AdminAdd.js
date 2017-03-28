import React from 'react';
import { connect } from 'dva';
import AdminAddComponent from '../components/AdminAdd/AdminAdd.js';

function AdminAdd() {
  return (
    <AdminAddComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AdminAdd);
