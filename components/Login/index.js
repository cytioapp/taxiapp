import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import AuthLayout from '../Layouts/AuthLayout';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50
  },
  buttonWrapper: {
    padding: 10,
  },
  imageWrapper: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputTextItem: {
    paddingRight: 50
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
          <AuthLayout>
            <Form style={styles.form}>
              <Item style={styles.inputTextItem} floatingLabel>
                <Label>Usuario</Label>
                <Input
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </Item>
              <Item style={styles.inputTextItem} floatingLabel>
                <Label>Contraseña</Label>
                <Input
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
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

