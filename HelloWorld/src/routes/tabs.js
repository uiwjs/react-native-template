import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme, Text, Icon} from '@uiw/react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyHome from '../pages/MyHome';
import OrderHome from '../pages/OrderHome';
import TransportHome from '../pages/TransportHome';

const BottomTabs = createBottomTabNavigator();
const tabs = [
  {
    name: 'TransportHome',
    component: TransportHome,
    label: '发货',
    icon: 'inbox',
  },
  {
    name: 'OrderHome',
    component: OrderHome,
    label: '订单',
    icon: 'file-text',
  },
  {
    name: 'MyHome',
    component: MyHome,
    label: '我的',
    icon: 'user',
  },
];
const TabsScreen = props => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <BottomTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#035bb6',
          tabBarInactiveTintColor: 'gray',
        }}>
        {tabs.map((item, idx) => {
          return (
            <BottomTabs.Screen
              key={idx}
              name={item.name}
              component={item.component}
              options={{
                title: item.label,
                headerStyle: {backgroundColor: theme.colors.primary_background},
                headerTintColor: '#fff',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarLabel: ({focused}) => (
                  <Text
                    style={{
                      color: focused ? theme.colors.primary_background : theme.colors.gray300,
                      fontSize: 12,
                    }}>
                    {item?.label}
                  </Text>
                ),
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({focused}) => <Icon name={item.icon} size={20} color={focused ? theme.colors.primary_background : theme.colors.gray300} />,
              }}
            />
          );
        })}
      </BottomTabs.Navigator>
    </React.Fragment>
  );
};

export default TabsScreen;
