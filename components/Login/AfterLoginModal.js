import React, { Component } from 'react'
import { Modal, View } from 'react-native';
import { Body, Button, Header, Text, Title, Input, Item, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = {
  header: {
    backgroundColor: '#262626'
  },
  fontText: {
    color: '#E3C463',
    fontFamily: 'Nunito-Bold'
  },
  confirmContainer: {
    flex: 1,
    padding: 15
  },
  buttonText: {
    color: '#1F120D',
    fontFamily: 'Nunito-Bold',
  },
  button: {
    backgroundColor: '#E3C463',
    borderRadius: 0,
    shadowColor: '#1F120D',
    width: '90%',
    justifyContent: 'center',
    shadowOffset: {
      width: -1,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  buttonContinue: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}
export default class AfterLoginModal extends Component {
  render() {
    return (
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
        <KeyboardAwareScrollView style={styles.keyboard}>
          <Header
            style={styles.header}
            iosBarStyle="light-content"
            androidStatusBarColor="#262626"
          >
            <Body style={styles.bodyHeader}>
              <Title style={styles.fontText}>Completa tus datos</Title>
            </Body>
          </Header>

          <View style={styles.confirmContainer}>
            <View style={{ paddingBottom: 20 }}>
              <Item floatingLabel>
                <Label>Telefono celular</Label>
                <Input 
                  value={this.props.phone}
                  onChangeText={this.props.onSetPhoneNumber}
                />
              </Item>
            </View>
            <View style={styles.buttonContinue}>
              <Button
                dark
                style={styles.button}
                onPress={this.props.onComplete}
              >
                <Text style={styles.buttonText}>Completar Registro</Text>
              </Button>
            </View>
          
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    )
  }
}
