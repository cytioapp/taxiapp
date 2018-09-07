import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  backgroundView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }
});

const SimpleLoading = () => {
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={() => {}}>
      <View style={styles.backgroundView}>
        <Spinner color="#1F120D" />
      </View>
    </Modal>
  );
};

export default SimpleLoading;
