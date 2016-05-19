import React from 'react';

import {
  StyleSheet,
  View,
  Component,
} from 'react-native';

export class Foo extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});