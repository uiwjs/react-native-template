import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './models';
import AuthLoadingScreen from './pages/AuthLoading';
import { stackPageData } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, theme } from '@uiw/react-native';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default () => {
  const navigationRef = useNavigationContainerRef();
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" />
        <ThemeProvider
          theme={
            colorScheme === 'light'
              ? { ...theme.lightTheme }
              : { ...theme.darkTheme }
          }
        >
          <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <AuthLoadingScreen>
              {(token) => (
                <Stack.Navigator initialRouteName={token ? 'Home' : 'SignIn'}>
                  {stackPageData.map((props, index) => {
                    return <Stack.Screen key={index} {...props} />;
                  })}
                </Stack.Navigator>
              )}
            </AuthLoadingScreen>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};
