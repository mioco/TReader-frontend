import React from 'react';
import { routerRedux, Switch, Route } from 'dva/router';
import { getRouterData } from './common/router';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          path="/user"
          render={props => <UserLayout {...props} />}
        />
        <Route
          path="/"
          render={props => <BasicLayout {...props} />}
        />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
