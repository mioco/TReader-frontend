import * as API from '../services/api';
import { setAuthority, getAuthority } from '../utils/authority';
import { routerRedux } from 'dva/router';

export default {
  
  namespace: 'user',
  
  state: {
    status: false,
    currentUser: {},
  },
  
  subscriptions: {
    async setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'authority' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *login({ payload }, { call, put }) {
      const response = yield call(API.login, payload);
      // Login successfully
      if (response.ok !== false) {
        yield put({
          type: 'save',
          payload: {
            status: true,
            currentUser: response,
          },
        });

        localStorage.setItem('uid', response.uid);
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        yield put(routerRedux.push('/'));
        // window.location.reload();
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        // yield put(routerRedux.push('/user/login'));
        // Login out after permission changes to admin or user
        // The refresh will automatically redirect to the login page
        yield put({
          type: 'save',
          payload: {
            status: false,
            currentAuthority: undefined,
          },
        });
        window.location.reload();
      }
    },
    *register({ payload }, { call, put }) {
      const response = yield call(API.register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        yield put(routerRedux.push('/'));
        // window.location.reload();
      }
    },
    *sendCaptchaCode({ payload }, { call }) {
      console.log(payload)
      const res = yield call(API.getCaptchaCode, payload);
      return res;
    },
    *sendResetUrl({ payload }, { call }) {
      const res = yield call(API.getResetUrl, payload);
      return res;
    },
    *authority({ payload }, { call, put }) {
      const res = yield call(API.authority, payload);
      console.log(res)
      if (res.uid) {
        yield put({
          type: 'save',
          payload: {
            status: true,
            currentUser: res,
          },
        });
      }
    },
    *addSubscriptionUrl({ payload }, { call, put, select }) {
      const email = yield select(state => state.user.currentUser.email);
      const res = yield call(API.addSubscriptionUrl, { ...payload, email });
      return res;
    },
    *getSubscriptionUrl({ uid }, { call, put }) {
      const subscriptionUrls = yield call(API.getSubscriptionUrl, uid);
      put({ type: 'save', payload: { subscriptionUrls }})
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(JSON.stringify(payload));
      return {
        ...state,
        status: payload.status,
      };
    },
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
  
};
  