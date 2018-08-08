import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Body,
  Container,
  Content,
  Form,
  Header,
  Item,
  Input,
  Button,
  Text,
  Title
} from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 15
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

export default class Signup extends Component {
  state = {
    full_name: '',
    email: '',
    password: ''
  }

  render(){
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <KeyboardAwareScrollView style={{flex: 1}}>
            <Container style={styles.container}>
              <Header>
                <Body><Title>Signup</Title></Body>
              </Header>

              <Content contentContainerStyle={{ flex: 1 }}>
                <Form styles={styles.form}>
                  <View style={styles.label}>
                    <Text> Nombre completo </Text>
                  </View>
                  <Item>
                    <Input
                      placeholder="Nombre completo"
                      autoCapitalize="none"
                      onChangeText={full_name => this.setState({ full_name })}
                      value={this.state.full_name}
                    />
                  </Item>

                  <View style={styles.label}>
                    <Text> Email </Text>
                  </View>
                  <Item>
                    <Input
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={email => this.setState({ email })}
                      placeholder="example@something.com"
                      value={this.state.email}
                    />
                  </Item>

                  <View style={styles.label}>
                    <Text> Contraseña </Text>
                  </View>
                  <Item>
                    <Input
                      placeholder="Contraseña"
                      autoCapitalize="none"
                      onChangeText={password => this.setState({ password })}
                      secureTextEntry={true}
                      value={this.state.password}
                    />
                  </Item>

                </Form>
                <View style={styles.buttonWrapper} >
                  <Button block rounded success onPress={() => session.signup(this.state)}>
                    <Text>Registrarse</Text>
                  </Button>
                </View>
              </Content>
            </Container>
          </KeyboardAwareScrollView>
        )}
      </Subscribe>
    )
  }
}
