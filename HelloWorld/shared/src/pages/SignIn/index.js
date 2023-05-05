import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import {
  Button,
  H4,
  Flex,
  Spacing,
  P,
  Icon,
  CheckBox,
  Badge,
} from '@uiw/react-native';
import Global from '../../global';
import Footer from '../../components/Footer';
import { logoLight } from '../../components/icons/signin';
import conf from '../../config';
import { login } from '../../hooks/users';

const SigninScreen = ({ navigation }) => {
  const [store, setStore] = useState({
    hostType: '',
    formData: {
      username: 'admin',
      password: 'admin!',
    },
  });
  const { hostType, formData } = store;

  const { mutate, isLoading } = login({ mutationKey: ['userLogin', formData] });

  useEffect(() => {
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    _getHostType();
  }, []);

  const _getHostType = async () => {
    if (conf.production) {
      const productionOptions = conf.hosts.find(
        (itm) => itm.type === 'production',
      );
      await AsyncStorage.setItem('apihost', JSON.stringify(productionOptions));
    } else {
      const host = await AsyncStorage.getItem('apihost');
      setStore({ ...store, hostType: JSON.parse(host).type });
    }
  };

  const loginIn = () => mutate?.(formData);

  return (
    <SafeAreaView style={styles.block}>
      <StatusBar barStyle="light-content" />
      {!conf.production && (
        <Flex justify="end">
          <Button
            bordered={false}
            style={styles.setting}
            onPress={() => navigation.navigate('DevOptions')}
          >
            <Icon bordered={false} name="setting" fill="#FFCB00" />
          </Button>
        </Flex>
      )}

      <Flex align="center" direction="column" style={{ flex: 1 }}>
        <Flex
          justify="center"
          align="center"
          direction="column"
          style={styles.header}
        >
          <Icon xml={logoLight} size={75} />
          <H4 style={styles.titie}>Sign In</H4>
          {!conf.production && (
            <Text style={styles.hostNotice}>{hostType}</Text>
          )}
          <P style={styles.description}>Enter username and password.</P>
        </Flex>
        <Flex align="center" direction="column" style={{ flex: 1 }}>
          <Flex
            style={styles.content}
            direction="column"
            justify="center"
            align="center"
          >
            <TextInput
              value={formData.username}
              autoCorrect={false}
              placeholderTextColor="#fff"
              placeholder="请输入用户名"
              style={styles.input}
              onChangeText={(text) =>
                setStore({
                  ...store,
                  formData: { ...formData, username: text },
                })
              }
            />
            <Spacing size={12} />
            <TextInput
              value={formData.password}
              placeholder="请输入密码"
              autoCompleteType="password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) =>
                setStore({
                  ...store,
                  formData: { ...formData, password: text },
                })
              }
            />
            <Spacing size={23} />
            <Button
              style={styles.button}
              textStyle={{ fontSize: 16, fontWeight: '200' }}
              bordered={false}
              color="#BFBFBF"
              loading={isLoading}
              disabled={isLoading}
              onPress={loginIn}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  setting: {
    marginRight: 16,
  },
  header: {
    paddingTop: 43,
    paddingBottom: 20,
  },
  titie: {
    color: '#fff',
    marginTop: 26,
    marginBottom: 0,
  },
  description: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 0,
    fontWeight: '200',
  },
  input: {
    width: 243,
    backgroundColor: '#636363',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    color: '#fff',
    fontWeight: '200',
    fontSize: 16,
  },
  button: {
    // marginTop: 10,
    paddingHorizontal: 35,
    paddingVertical: 4,
  },
  hostNotice: {
    right: -60,
    top: -30,
    width: 40,
    height: 20,
    borderRadius: 3,
    overflow: 'hidden',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FFCB00',
  },
});
