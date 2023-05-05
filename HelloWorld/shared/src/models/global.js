import AsyncStorage from '@react-native-async-storage/async-storage';
import { userAuth } from '../services/users';
import conf from '../config';

export default {
  state: {
    /**
     * 验证是否登录
     */
    authState: false,
    token: null,
    apihost: null,
    userData: null,
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
  },
  effects: dispatch => ({}),
};
