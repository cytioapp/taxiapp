import React, { Component } from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Image} from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import logoImage from '../../assets/taxi1.png';
import Api from '../../utils/api';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center'
 },
  form: {
    flex: 1,
  },
  buttonWrapper: {
    padding: 10,
  },
  imageWrapper: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class Login extends Component{

  login = () => {
    Api.post('/login', {email: 'user1@user.com', password: '123456'})
      .then(res => {
        console.log(res.data);
      })
  }

  render(){
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.imageWrapper}>
              <Image source={logoImage} style={{height: 100, width: 100}}/>
            </View>
            <Form styles={styles.form}>
              <Item>
                <Input placeholder="Usuario" />
              </Item>
              <Item last>
                <Input placeholder="Contraseña" />
              </Item>
            </Form>
            <View style={styles.buttonWrapper} >
              <Button block rounded success onPress={ this.login }>
                <Text>Iniciar Sesión</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}

