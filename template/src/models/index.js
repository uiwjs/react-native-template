import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import * as global from './global';
import * as users from './users';

const loadingPlugin = createLoadingPlugin({});

export const store = init({
  models: {
    global: global.default,
    users: users.default,
  },
  plugins: [
    loadingPlugin,
    // {
    //   middleware: () => next => async (action) => {
    //     // if (typeof window !== 'undefined') {
    //     //   const token = cookie.get('token');
    //     //   if (token) {
    //     //     await cookie.set('token', token, 1);
    //     //   }
    //     // }
    //     // do something here
    //     return next(action);
    //   },
    // },
  ],
});
