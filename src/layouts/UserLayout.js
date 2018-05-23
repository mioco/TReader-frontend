import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import { Icon } from 'antd';
import { connect } from 'dva';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';

const copyright = <div>Copyright <Icon type="copyright" /> Osyo</div>;

@connect(({ user }) => ({
  user,
}))
class UserLayout extends React.Component {
  componentWillMount() {
    const { user, history, dispatch } = this.props;
    user.status && history.push('/');
  }
  render() {
    const { routerData, match, user } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
            </Link>
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
            <Redirect exact from="/user" to={user.status ? "/" : "/user/login"} />
          </Switch>
        </div>
        <GlobalFooter className={styles.footer} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
