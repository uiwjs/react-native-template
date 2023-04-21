import React from 'react';
import {Icon} from '@uiw/react-native';
import MyHome from '../pages/MyHome';
import OrderHome from '../pages/OrderHome';
import TransportHome from '../pages/TransportHome';
const demo = ({iconColor}) => {
  return [
    {
      name: 'TransportHome',
      component: TransportHome,
      options: {
        title: '发货',
        tabBarIcon: () => {
          return <Icon name="inbox" size={22} color={iconColor} />;
        },
      },
    },
    {
      name: 'OrderHome',
      component: OrderHome,
      options: {
        title: '订单',
        tabBarIcon: () => {
          return <Icon name="file-text" size={22} color={iconColor} />;
        },
      },
    },
    {
      name: 'MyHome',
      component: MyHome,
      options: {
        title: '我的',
        tabBarIcon: () => {
          return <Icon name="user" size={22} color={iconColor} />;
        },
      },
    },
  ];
};

export default demo;