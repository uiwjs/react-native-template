import React from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, SafeAreaView, View, Text, StatusBar, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Button, WingBlank, Icon, Flex, Spacing, H4, List } from '@uiw/react-native';
import conf from '../../config';

class DevOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [...conf.hosts],
      selectUrl: {},
      height: 0,
    };
  }
  async componentDidMount() {
    // 选择的 API URL
    let apihost = await AsyncStorage.getItem('apihost');
    const cacheData = await AsyncStorage.getItem('cacheURLData');
    const state = {};
    if (cacheData) {
      state.dataList = JSON.parse(cacheData);
    } else {
      state.dataList = this.state.dataList;
    }
    if (apihost) {
      apihost = JSON.parse(apihost);
      const selectUrl = state.dataList.find(item => item.url === apihost.url);
      state.selectUrl = selectUrl || {};
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ ...state });
  }
  async handleSelect(data) {
    await this.setState({ selectUrl: data });
    await AsyncStorage.setItem('apihost', JSON.stringify(data));
    this.props.update({ apihost: data });
  }
  async handleEndEditing(e) {
    const { dataList } = this.state;
    const text = e.nativeEvent.text;
    const isInclude = dataList.find(item => item.url === text);
    if (!isInclude && text) {
      const customUrl = { url: text, label: 'Custom URL', type: 'custom' };
      dataList.unshift(customUrl);
      await AsyncStorage.setItem('cacheURLData', JSON.stringify(dataList));
      this.setState({ dataList, selectUrl: customUrl, customUrl: '' });
    }
  }
  deleteCustomUrl = async () => {
    const { dataList, selectUrl } = this.state;
    const data = dataList.filter(item => item.url !== selectUrl.url);
    this.setState({ dataList: data, selectUrl: {} });
    await AsyncStorage.setItem('cacheURLData', JSON.stringify(data));
  };
  handleCustomUrl = async customUrl => {
    await this.setState({ customUrl });
  };
  measureContainer = event => {
    const { height } = event.nativeEvent.layout;
    this.setState({ height });
  };
  render() {
    const { navigation } = this.props;
    const DataSourceView = (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ margin: 10 }}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            value={this.state.customUrl}
            onChangeText={this.handleCustomUrl}
            placeholderTextColor="#fff"
            placeholder="Add custom host"
            keyboardType="url"
            blurOnSubmit={true}
            // enablesReturnKeyAutomatically={true}
            onEndEditing={this.handleEndEditing.bind(this)}
          />
        </View>
        <List flat={false} paddingLeft={10}>
          {this.state.dataList.map((item, idx) => (
            <List.Item
              key={idx}
              extra={item.url || ' '}
              touchableStyle={{ backgroundColor: '#fff' }}
              style={{ backgroundColor: 'transparent' }}
              onPress={this.handleSelect.bind(this, item)}
            >
              {item.url === this.state.selectUrl.url && <Icon size={14} name="check" fill="#008EF0" style={styles.urlListIcon} />}
              <Text>{item.label}</Text>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    );
    return (
      <SafeAreaView style={styles.block}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <Flex justify="start" align="start">
            <Button
              bordered={false}
              style={{ marginLeft: 15, marginBottom: 20 }}
              onPress={() => navigation.goBack()}>
              <Icon fill="#fff" size={23} name="arrow-left" />
            </Button>
          </Flex>
          <WingBlank size={21} style={[styles.block]}>
            <Flex>
              <H4 style={styles.title}>Select Host</H4>
            </Flex>
            <Spacing />
            {Platform.OS === 'ios' ? (
              <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={120}>
                {DataSourceView}
              </KeyboardAvoidingView>
            ) : (
              DataSourceView
            )}
            {this.state.selectUrl.type === 'custom' && (
              <View>
                <Button style={{ marginVertical: 10 }} bordered={false} type="danger" onPress={this.deleteCustomUrl}>
                  Delete Custom Host
                </Button>
              </View>
            )}
          </WingBlank>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  ({ loading }) => ({
    loading: loading.effects.users,
  }),
  ({ global }) => ({
    update: global.update,
  }),
)(DevOptions);

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  title: {
    color: '#fff',
  },
  urlListIcon: {
    marginRight: 5,
  },
  input: {
    backgroundColor: '#636363',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: '200',
    fontSize: 16,
  },
  header: {
    paddingTop: 53,
    paddingBottom: 30,
  },
  content: {
    backgroundColor: '#efefef',
    borderRadius: 8,
  },
  btn: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 20,
  },
  footer: {
    borderWidth: 1,
  },
});
