import React, { Component } from 'react';
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Icon, Textarea } from 'native-base';

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
  render(){
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Header />
          <Content contentContainerStyle={{justifyContent: 'space-between', flex: 1}}>
            <Form style={styles.form}>
              <Item>
                <Icon active name='home' />
                <Label>Dirección</Label>
              </Item>
              <Textarea style={{flex: 1}} rowSpan={3} placeholder='Av. de los Maestros #500'/>
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

