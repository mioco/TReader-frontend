import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';
import { enquireScreen } from 'enquire-js';
import { getRoutes } from '../utils/utils';
import GlobalHeader from '../components/GlobalHeader';
import HomePage from '../routes/HomePage';
import styles from './BasicLayout.less';

const { Content, Footer } = Layout;
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
@connect(({ user }) => ({
  user,
}))
export default class BasicLayout extends PureComponent {
  state = {
    isMobile: false,
  };
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
  }
  render() {
    const { routerData, match, user } = this.props;
    return (
      <Layout className={styles.layout}>
        <GlobalHeader isMobile={isMobile}/>
        <Content className={styles.basicContent}>
          {match.isExact && <HomePage />}
          <Switch>
            {
              getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    redirectPath="/exception/403"
                  />
                )
              )
            }
            {!user.status && <Redirect from="/" to="/user/login" />}
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          TReader ©2016 Created by Osyo
        </Footer>
      </Layout>
    );
  }
}
