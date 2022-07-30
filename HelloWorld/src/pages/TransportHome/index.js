import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { SegmentedControl } from '@uiw/react-native'

export default class MyScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <SegmentedControl
            inline
            gutter={10}
            selectedIndex={2}
            value={['下单', '订单进行中', '发货', '确认收货', '订单完成']}
          />
        </View>
      </SafeAreaView>
    );
  }
}
