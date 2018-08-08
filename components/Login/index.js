import React, { Component } from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Form, Item, Input, Button, Text } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import logoImage from '../../assets/taxi1.png';
import AuthLayout from '../Layouts/AuthLayout';

const styles = StyleSheet.create({
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

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  render(){
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <AuthLayout style={{flex: 1}}>
            <Form style={styles.form}>
              <Item>
                <Input
                  placeholder="Usuario"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </Item>
              <Item last>
                <Input
                  autoCapitalize="none"
                  placeholder="Contraseña"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </Item>
              <View style={styles.buttonWrapper} >
                <Button block rounded success onPress={() => session.login(this.state.email, this.state.password)}>
                  <Text>Iniciar Sesión</Text>
                </Button>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                  <Text>Crear cuenta</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                  <Text>Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </AuthLayout>
        )}
      </Subscribe>
    )
  }
}

