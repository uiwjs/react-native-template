import React from 'react';
import { Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Flex, Loader, H3, Icon } from '@uiw/react-native';
import Global from '../../global';
import { logoLight } from '../../components/icons/signin';
import Footer from '../../components/Footer';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const { navigation, authToken } = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    authToken();
  }
  render() {
    const { token, loading, authState, children } = this.props;
    if (children && typeof children === 'function' && authState) {
      return children(token);
    }
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
              loading={loading}
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
  ({ global, loading }) => ({
    token: global.token,
    authState: global.authState,
    loading: loading.effects.global.authToken,
  }),
  ({ global }) => ({
    updateState: global.update,
    authToken: global.authToken,
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
