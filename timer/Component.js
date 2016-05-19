const React = require('react-native');

const {
  StyleSheet,
  View,
} = React;

const FooComponent = React.createClass({
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default FooComponent;

