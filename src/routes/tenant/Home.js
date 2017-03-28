import React from 'react';
import { connect } from 'dva';
import HomePage from '../../components/tenant/home/HomePage';

function Home() {
    return (
        <HomePage />
    );
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Home);
