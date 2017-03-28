import React from 'react';
import { connect } from 'dva';
import AgentAddComponent from '../components/AgentAdd/AgentAdd.js';

function AgentAdd() {
  return (
    <AgentAddComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AgentAdd);
