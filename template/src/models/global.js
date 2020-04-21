import AsyncStorage from '@react-native-community/async-storage';
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
  },
  reducers: {
    update: (state, payload) => ({ ...state, ...payload }),
  },
  effects: dispatch => ({
    async authToken(_, { global }) {

      let host = await AsyncStorage.getItem('apihost');
      if (!host && conf.hosts[0]) {
        await AsyncStorage.setItem('apihost', JSON.stringify(conf.hosts[0]));
        await this.update({ apihost: conf.hosts[0] });
      }

      if (!global.token) {
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('token');
      }

      const data = await userAuth();
      if (data && data.token) {
        await this.update({ authState: true, token: data.token });
      } else {
        await this.update({ authState: true, token: null });
      }
    }
  }),
};
