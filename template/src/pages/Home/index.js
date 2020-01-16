import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from '@uiw/react-native';

class DashboardScreen extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <View>
        <Text>This Home Page.</Text>
        <Button loading={loading.logout} disabled={loading.logout} type="danger" onPress={this.props.logout}>
          Logout
        </Button>
      </View>
    );
  }
}

export default connect(
  ({ loading, users }) => ({
    loading: loading.effects.users,
  }),
  ({ users }) => ({
    update: users.update,
    logout: users.logout,
  }),
)(DashboardScreen);
