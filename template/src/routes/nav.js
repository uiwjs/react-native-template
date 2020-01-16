import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { routes } from './routes';
import AuthLoading from '../pages/AuthLoading';
import SignIn from '../pages/SignIn';
import DevOptions from '../pages/DevOptions';

const AppStack = createStackNavigator(
  {
    ...routes,
  },
  {
    headerStyle: {
      // borderBottomWidth: 0,
      // shadowOpacity: 0,
    },
    // headerBackTitle: null,
    // navigationOptions: {
    //   headerBackTitleVisible: true,
    // },
  },
);
const SignInStack = createStackNavigator(
  {
    SignIn,
    DevOptions,
  },
  {
    headerMode: 'none',
  },
);

export const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      App: AppStack,
      SignInStack,
    },
    {
      headerMode: 'none',
      initialRouteName: 'AuthLoading',
      /*
       * Use modal on iOS because the card mode comes from the right,
       * which conflicts with the drawer example gesture
       */
      mode: Platform.OS === 'ios' ? 'card' : 'modal',
    },
  ),
);
