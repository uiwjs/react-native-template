import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Flex, Icon } from '@uiw/react-native';

export default class Footer extends Component {
  render() {
    const { style } = this.props;
    return (
      <Flex direction="column" align="center" style={[styles.footer, style]}>
        <Text style={styles.company}>Shanghai xxx xxx xxx Co., Ltd.</Text>
        <Text style={styles.copyright}>Copyright © 2020-2025</Text>
      </Flex>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    fontSize: 12,
    paddingVertical: 10,
  },
  copyright: {
    color: '#C2C2C2',
    fontSize: 12,
  },
  company: {
    paddingTop: 10,
    paddingBottom: 3,
    color: '#C2C2C2',
    fontSize: 12,
  },
});
