import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout.js';

function IndexPage({children, location}) {
  return (
    <MainLayout location={location}>
      {children}
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
