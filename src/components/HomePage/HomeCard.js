import React from 'react';
import {Card} from 'antd';
import styles from './HomePage.css';

function HomeCard({title, add, blue, num}) {

  return (
    <Card title='' bodyStyle={{padding: 0}}>
      <div className={styles.cardBody}>
        <p className={styles.title}>{title}</p>
        <p className={add ? styles.content1 : styles.content2} style={blue?{color: '#1998FC'}:{}}>{add ? '+' : null}{num}</p>
      </div>
    </Card>
  )
}

export default HomeCard;
