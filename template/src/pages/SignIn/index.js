import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native';
import { Button, H4, Flex, Spacing, P, Icon, CheckBox, Badge } from '@uiw/react-native';

import Global from '../../global';
import Footer from '../../components/Footer';
import { logoLight } from '../../components/icons/signin';
import conf from '../../config'

class SigninScreen extends Component {
  state = {
    hostType: ''
  }

  async componentDidMount() {
    const { navigation } = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    this._getHostType()
  }
  goToOptions = () => {
    this.props.navigation.navigate('DevOptions');
  };
  onChangeUserName = text => this.props.updateForm({ username: text });
  onChangePassWord = text => this.props.updateForm({ password: text });
  onSubmit = () => this.props.login();


  _getHostType = async () => {
    if (conf.production) {
      const productionOptions = conf.hosts.find(itm => itm.type === 'production')
      await AsyncStorage.setItem('apihost', JSON.stringify(productionOptions));
    } else {
      const host = await AsyncStorage.getItem('apihost');
      this.setState({
        hostType: JSON.parse(host).type
      })
    }
  }

  render() {
    const { formData, loading } = this.props;
    const { hostType } = this.state;
    return (
      <SafeAreaView style={styles.block}>
        <StatusBar barStyle="light-content" />
        {
          !conf.production && <Flex justify="end">
            <Button bordered={false} style={styles.setting} onPress={this.goToOptions}>
              <Icon bordered={false} name="setting" fill="#FFCB00" />
            </Button>
          </Flex>
        }

        <Flex align="center" direction="column" style={{ flex: 1 }}>
          <Flex justify="center" align="center" direction="column" style={styles.header}>
            <Icon xml={logoLight} size={75} />
            <H4 style={styles.titie}>Sign In</H4>
            {
              !conf.production && <Text style={styles.hostNotice}>{hostType}</Text>
            }
            <P style={styles.description}>Enter username and password.</P>
          </Flex>
          <Flex align="center" direction="column" style={{ flex: 1 }}>
            <Flex style={styles.content} direction="column" justify="center" align="center">
              <TextInput
                value={formData.username}
                autoCorrect={false}
                placeholderTextColor="#fff"
                placeholder="请输入用户名"
                style={styles.input}
                onChangeText={this.onChangeUserName}
              />
              <Spacing size={12} />
              <TextInput
                value={formData.password}
                placeholder="请输入密码"
                autoCompleteType="password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={this.onChangePassWord}
              />
              <Spacing size={23} />
              <Button
                style={styles.button}
                textStyle={{ fontSize: 16, fontWeight: '200' }}
                bordered={false}
                color="#BFBFBF"
                loading={loading.login}
                disabled={loading.login}
                onPress={this.onSubmit}
              >
                Sign In
              </Button>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </SafeAreaView>
    )
  }
}

export default connect(
  ({ loading, global, users }) => ({
    loading: loading.effects.users,
    token: global.token,
    formData: users.formData,
  }),
  ({ users }) => ({
    login: users.login,
    update: users.update,
    updateForm: users.updateForm,
  }),
)(SigninScreen);


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
  }
});
