import React, { useEffect } from 'react';
import { Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Flex, Loader, H3, Icon } from '@uiw/react-native';
import Global from '../../global';
import { logoLight } from '../../components/icons/signin';
import Footer from '../../components/Footer';
import { authToken } from '../../hooks/users'

const AuthLoadingScreen = ({
  navigation,
  update,
  token,
  authState,
  children
}) => {
  const { mutate, isLoading } = authToken({ update, token })
  useEffect(() => {
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    mutate();
  }, [])

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
          <Loader loading={isLoading} maskColor="transtion" vertical rounded={5} tip={<Text style={{ color: '#fff', marginTop: 15 }}>Verify login...</Text>} />
        </Flex>
        <Footer style={{ marginBottom: 20 }} />
      </Flex>
    </SafeAreaView>
  );
}

export default connect(
  ({ global }) => ({
    token: global.token,
    authState: global.authState,
  }),
  ({ global }) => ({
    update: global.update,
  })
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
