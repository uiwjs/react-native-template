import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeTabData from '../../routes/homeTab';

const BottomTabs = createBottomTabNavigator();

class DashboardScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <BottomTabs.Navigator>
          {homeTabData.map((props, idx) => {
            return (
              <BottomTabs.Screen key={idx} {...props} />
            )
          })}
        </BottomTabs.Navigator>
      </React.Fragment>
    );
  }
}

export default DashboardScreen;
