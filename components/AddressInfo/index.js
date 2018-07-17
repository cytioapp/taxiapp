import React, { Component } from 'react';
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Icon, Textarea } from 'native-base';
import Geocoder from 'react-native-geocoder';

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  form: {
    flex: 1,
  },
  buttonWrapper: {
    padding: 10
  }
});

export default class AddressInfo extends Component{
  constructor(){
    super()

    this.state = {
      latitude: 19.266836,
      longitude: -103.717531,
      error: null,
      address: ''
    }

    if (!this.state.address) {
      Geocoder.geocodePosition({lat: this.state.latitude, lng: this.state.longitude}).then(res => {
        let { formattedAddress } = res[0]
        this.setState({
          address: formattedAddress
        }, () => console.log(this.state.address));
      }).catch(err => console.log(err))
    }
  }

  changeAddress = (address) => {
    this.setState({address})
  }

  render(){
    let {address} = this.state;
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Header />
          <Content contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
            <Form style={styles.form}>
              <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Icon active name='home' />
                <Label>Origen</Label>
              </Item>
              <Textarea style={{flex: 1}} onChangeText={this.changeAddress} value={address} rowSpan={3} placeholder='¿A donde pasamos por ti?'/>
            </Form>
            <View style={styles.buttonWrapper}>
              <Button onPress={() => {}} block rounded style={styles.button}>
                <Text>Enviar dirección</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}

