import { register, getCaptcha } from '../services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        // yield put(routerRedux.push('/'));
        window.location.reload();
      }
    },
    *getCaptcha({ payload }, { call, put }) {
      const res = yield call(getCaptcha, payload);
      return res;
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
