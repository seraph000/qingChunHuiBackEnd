import React from 'react';
import styles from './DailyDetail.css';
import {Card} from 'antd';

function DailyCard({title, data, add, isMoney, num}) {

  return (
    <Card title='' bodyStyle={{padding: 0}}>
      <div className={styles.cardBody}>
        <p className={styles.title}>{title}</p>
        <p className={add ? styles.content1 : styles.content2}>{isMoney ? '￥' : null}{num}</p>
      </div>
    </Card>
  )
}

export default DailyCard;
