import React from 'react';
import { connect } from 'dva';
import AgentComponent from '../components/Agent/Agent.js';

function Agent() {
  return (
    <AgentComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Agent);
