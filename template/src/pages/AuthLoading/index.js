import React from 'react';
import { Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Flex, Loader, H3, Icon } from '@uiw/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { sleep } from '../../utils';
import Global from '../../global';
import { logoLight } from '../../components/icons/signin';
import Footer from '../../components/Footer';
import conf from '../../config';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const { navigation, updateState } = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }

    let host = await AsyncStorage.getItem('apihost');
    if (!host && conf.hosts[0]) {
      await AsyncStorage.setItem('apihost', JSON.stringify(conf.hosts[0]));
      await updateState({ apihost: conf.hosts[0] });
    }

    let token = await AsyncStorage.getItem('token');
    
    // Improve the user experience, not to flash, it looks like a splash screen
    await sleep(600);
    if (!token) {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(token ? 'App' : 'SignIn');
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Flex direction="column" justify="center" align="center" style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Flex justify="center" align="center" direction="column" style={styles.header}>
            <Icon xml={logoLight} size={75} />
            <H3 style={styles.title}>My APP</H3>
          </Flex>
          <Flex style={{ height: 32, flex: 1, width: '100%' }}>
            <Loader
              maskColor="transtion"
              vertical
              rounded={5}
              tip={
                <Text style={{ color: '#fff', marginTop: 15 }}>Verify login...</Text>
              }
            />
          </Flex>
          <Footer style={{ marginBottom: 20 }} />
        </Flex>
      </SafeAreaView>
    )
  }
}

export default connect(
  () => ({}),
  ({ global }) => ({
    updateState: global.update,
  }),
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  header: {
    marginTop: 110,
  },
  title: {
    marginTop: 30,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
