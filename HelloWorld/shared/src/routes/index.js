import SignIn from '../pages/SignIn';
import DevOptions from '../pages/DevOptions';
import TabsScreen from './tabs';

export const stackPageData = [
  {
    name: 'Tab',
    component: TabsScreen,
    options: {
      headerShown: false,
      title: '首页',
    },
  },
  {
    name: 'SignIn',
    component: SignIn,
    options: {
      headerShown: false,
      header: () => null,
    },
  },
  {
    name: 'DevOptions',
    component: DevOptions,
    options: {
      headerShown: false,
      header: () => null,
    },
  },
];
