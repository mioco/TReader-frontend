import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import { Icon, Card } from 'antd';
import { connect } from 'dva';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/yay.jpg';
import { getRoutes } from '../utils/utils';

const links = [{
  key: 'help',
  title: '帮助',
  href: '',
}, {
  key: 'privacy',
  title: '隐私',
  href: '',
}, {
  key: 'terms',
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> Osyo</div>;

@connect(({ login }) => ({
  login,
}))
class UserLayout extends React.Component {
  componentWillMount() {
    this.props.login.status && this.props.history.push('/');
  }
  render() {
    const { routerData, match, login } = this.props;
    return (
      <div className={styles.container}>
        <Card className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>TReader</span>
              </Link>
            </div>
            <div className={styles.desc}>订阅信息</div>
          </div>
          <Switch>
            {getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )}
            <Redirect exact from="/user" to={login.status ? "/" : "/user/login"} />
          </Switch>
        </Card>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
