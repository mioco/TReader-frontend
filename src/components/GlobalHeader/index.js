import React, { PureComponent } from 'react';
import { Menu, Layout, Input, Avatar, Dropdown, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';
import logo from '../../assets/yay.jpg';

export default class GlobalHeader extends PureComponent {
  render() {
    const { isMobile } = this.props;
    const currentUser = {
      avatar: '',
      name: 'username'
    }
    const menu = (
      <Menu className={styles.menu}>
        <Menu.Item><Icon type="user" />我的主页</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出</Menu.Item>
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
            <Menu.Item key="2"><Link to="/explore">发现</Link></Menu.Item>
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
