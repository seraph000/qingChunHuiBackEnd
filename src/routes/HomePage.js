import React from 'react';
import { connect } from 'dva';
import HomePageComponent from '../components/HomePage/HomePage.js';

function HomePage() {
  return (
    <HomePageComponent />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
