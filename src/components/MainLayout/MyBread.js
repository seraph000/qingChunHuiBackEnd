import { Breadcrumb } from 'antd';
import {connect} from 'dva';
import styles from './MainLayout.css';

function MyBread({breads}) {

  function getBreads(ls) {
      let arr = ls.map((ele, index) => {
        return (
          <Breadcrumb.Item key={index}>{ele}</Breadcrumb.Item>
        );
      });
      return arr;
  }

  return (
    <Breadcrumb separator=">" className={styles.bread}>
      {getBreads(breads)}
    </Breadcrumb>
  );
}

function mapStateToProps(state) {
  const {breads} = state.myBread;
  return {
    breads
  }
}

export default connect(mapStateToProps)(MyBread);
