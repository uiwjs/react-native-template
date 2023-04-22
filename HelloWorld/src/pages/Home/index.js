import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabsScreen from '../../routes/tabs';

const BottomTabs = createBottomTabNavigator();

const DashboardScreen = props => {
  const colorScheme = useColorScheme();
  const iconColor = (colorScheme && colorScheme) === 'light' ? '#000' : '#fff';
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#035bb6',
          tabBarInactiveTintColor: 'gray',
        }}>
        {TabsScreen({iconColor}).map((props, idx) => {
          return <BottomTabs.Screen key={idx} {...props} />;
        })}
      </BottomTabs.Navigator>
    </React.Fragment>
  );
};

export default DashboardScreen;
