import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Input,
  Item,
  Text,
  Title
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  }
});

export default class ChangePassword extends Component {
  state = {
    email: ''
  }

  render(){
    return(
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Container style={styles.container}>
          <Header>
            <Body><Title>Cambiar contraseña</Title></Body>
          </Header>
          <Content contentContainerStyle={{ flex: 1 }}>
            <Form styles={styles.form}>
              <Text>Ingresa tu correo: </Text>
              <Item>
                <Input
                  placeholder="Correo electrónico"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </Item>
            </Form>
            <View style={styles.buttonWrapper} >
              <Button block rounded success>{/*Do something onPress*/}
                <Text>Enviar correo</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}
