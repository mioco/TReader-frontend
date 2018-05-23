import React, { Component } from 'react';
import { Menu, Layout, Input, Avatar, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';
import logo from '../../assets/logo.svg';

@connect(({ user }) => ({
  user,
}))
export default class GlobalHeader extends Component {
  logout = async () => {
    const { dispatch } = this.props;
    await dispatch({ type: 'user/logout' });
  }
  render() {
    console.log(this.props)
    const { isMobile } = this.props;
    const currentUser = {
      avatar: '',
      name: 'username'
    }
    const menu = (
      <Menu className={styles.menu}>
        <Menu.Item><Link to="/profile"><Icon type="user" />控制台</Link></Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><a onClick={this.logout}><Icon type="logout" />退出</a></Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header className={styles['ant-layout-header']}>
        <div className={styles['ant-layout-header__left']}>
          <div className={styles.logo}>
            <img src={logo} />
            <span>POST</span>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            className={styles.header}
          >
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/topic">话题</Link></Menu.Item>
          </Menu>
          <div className={styles.search}>
            {!isMobile ? (
              <Input.Search
                placeholder="搜索内容"
                onSearch={value => console.log(value)}
                enterButton
              />
            ) : <Icon type="search"/>
            }
          </div>
        </div>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar className={styles.avatar} src={currentUser.avatar} />
          </span>
        </Dropdown>
      </Layout.Header>
    );
  }
}
