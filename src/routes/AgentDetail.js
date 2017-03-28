import React from 'react';
import { connect } from 'dva';
import AgentDetailComponent from '../components/AgentDetail/AgentDetail.js';

function AgentDetail() {
  return (
    <AgentDetailComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(AgentDetail);
