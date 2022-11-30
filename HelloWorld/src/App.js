import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './models';
import AuthLoadingScreen from './pages/AuthLoading';
import { stackPageData } from './routes';
import { QueryClient, QueryClientProvider } from 'react-query'

const Stack = createStackNavigator();
const queryClient = new QueryClient()

export default () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="light-content" />
        <AuthLoadingScreen>
          {token => (
            <NavigationContainer>
              <Stack.Navigator initialRouteName={token ? 'Home' : 'SignIn'}>
                {stackPageData.map((props, index) => {
                  return (
                    <Stack.Screen
                      key={index}
                      {...props}
                    // name="Home"
                    // options={{
                    //   header: () => null
                    // }}
                    // component={Home}
                    />
                  );
                })}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </AuthLoadingScreen>
      </QueryClientProvider>
    </Provider>
  );
};
