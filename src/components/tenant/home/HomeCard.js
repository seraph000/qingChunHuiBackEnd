import React from 'react';
import {Card} from 'antd';
import styles from './../../HomePage/HomePage.css';

function HomeCard({title, add, num}) {

  return (
    <Card title='' bodyStyle={{padding: 0}}>
      <div className={styles.cardBody}>
        <p className={styles.title}>{title}</p>
        <p className={add ? styles.content1 : styles.content2}>{add ? '+' : null}{num}</p>
      </div>
    </Card>
  )
}

export default HomeCard;
