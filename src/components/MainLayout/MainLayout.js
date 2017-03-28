import React from 'react';
import styles from './MainLayout.css';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import MyModal from './MyModal.js';
import MyBread from './MyBread.js';
import {Link} from 'react-router';
import reactCookie from 'react-cookie';
import {connect} from 'dva';
import {getMenu} from '../../services/menu.js';

const drop =
  <Menu>
    <Menu.Item key="1">
      <MyModal record={{}}>
        修改密码
      </MyModal>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to='/'>
        退出登录
      </Link>
    </Menu.Item>
  </Menu>;

class MainLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
  }

  componentWillMount() {
    getMenu({
      method: 'get'
    }).then(data => {
      if(data.success) {
        const ls = [];
        data.result.forEach((ele, index) => {
          if(ele.items.length) {
            ls.push(
              <SubMenu key={ele.url} title={<span><span>{ele.displayName}</span></span>}>
                {ele.items.map((e) => (
                  <Menu.Item key={e.url}><Link to={e.url}>{e.displayName}</Link></Menu.Item>
                ))}
              </SubMenu>
            )
          }else {
            ls.push (
              <Menu.Item key={ele.url}>
                <Link to={ele.url}>
                  <span>
                    <span>{ele.displayName}</span>
                  </span>
                </Link>
              </Menu.Item>
          )
          }
        });
        this.setState({
          menus: ls
        })
      }
    });
  }

  render() {
    const {pathname} = this.props.location;
    const {children} = this.props;
    let path = pathname.toLowerCase();
    if(path.substr(0, 5) == '/user') {
      path = '/user';
    }else if(path.substr(0, 6) == '/award') {
      path = '/award';
    }else if(path.substr(0, 9) == '/withdraw') {
      path = '/withdraw';
    }else if(path.substr(0, 6) == '/agent') {
      path = '/agent';
    }else if(path == '/config/admin/adminadd') {
      path = '/config/admin';
    }else if(path == '/config/role/roleadd') {
      path = '/config/role';
    }
    return (
      <Layout className={styles.normal}>
        <Sider>
          <div className={styles.logo}>青春惠管理后台</div>
          <Menu theme="dark" selectedKeys={[path]} mode="inline" defaultOpenKeys={['/config']}>
            {this.state.menus}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Dropdown overlay={drop}>
              <a className="ant-dropdown-link">
                {reactCookie.load('username')} <Icon type="down" />
              </a>
            </Dropdown>
          </Header>
          <MyBread className={styles.bread}/>
          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapSateToProps(state) {
  return {

  }
}

export default MainLayout;
