import React from 'react';
import {Col} from 'antd';
import styles from './AgentDetail.css';

function DetailItem({color, title, num}) {

  return (
    <Col span={6} className={styles.btnBox}>
      <div className={styles.num} style={{color: color}}>{num}</div>
      <div className={styles.label}>{title}</div>
    </Col>
  );
}

export default DetailItem;
