import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Espere un momento</Text>
      <Spinner />
    </View>
  );
}

export default Loading;
