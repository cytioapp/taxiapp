import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import AuthLayout from '../Layouts/AuthLayout';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C1C1C'
  },
  errorsContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  errorsIcon: {
    color: '#B72A2A',
    marginRight: 15
  },
  errors: {
    color: '#B72A2A',
    fontSize: 15
  },
  form: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  input: {
    textAlign: 'center',
    color: 'white'
  },
  forgotPasswordButtonWrapper: {
    alignItems: 'center',
  },
  signupButtonWrapper: {
    margin: 40
  },
  signupButton: {
    backgroundColor: '#E3C463',
    borderRadius: 0
  },
  signupButtonText: {
    color: 'black',
    fontWeight: '500'
  },
  createAccountWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default class Signup extends Component {
  state = {
    full_name: '',
    email: '',
    password: '',
    repeated_password: '',
    hidePassword: true
  }

  renderErrors = (errors) => {
    return errors.map((error, i) => {
      return <Text key={i} style={styles.errors}>{error.message}</Text>
    });
  }


  render(){
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <AuthLayout>
            {session.state.signupErrors &&
              <View style={styles.errorsContainer}>
                <Icon active name="md-alert" style={styles.errorsIcon} />
                {this.renderErrors(session.state.signupErrors)}
              </View>
            }
            <View style={styles.form}>
              <Item style={styles.item}>
                <Icon active name="person" style={{ color: 'white' }} />
                <Input
                  placeholder="Nombre completo"
                  autoCapitalize="none"
                  onChangeText={full_name => this.setState({ full_name })}
                  value={this.state.full_name}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>
              <Item style={styles.item}>
                <Icon active name="mail" style={{ color: 'white' }} />
                <Input
                  placeholder="Correo electrónico"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <View style={{paddingHorizontal: 15}}></View>
              </Item>
              <Item style={styles.item}>
                <Icon active name="lock" style={{ color: 'white' }} />
                <Input
                  placeholder="Contraseña"
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
                  <Icon active name="eye" style={{ color: 'white' }} />
                </TouchableOpacity>
              </Item>

              <Item style={styles.item}>
                <Icon active name="lock" style={{ color: 'white' }} />
                <Input
                  placeholder="Repite la contraseña"
                  secureTextEntry={this.state.hidePassword}
                  onChangeText={repeated_password => this.setState({ repeated_password })}
                  value={this.state.repeated_password}
                  placeholderTextColor="white"
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
                  <Icon active name="eye" style={{ color: 'white' }} />
                </TouchableOpacity>
              </Item>
            </View>

            <View style={styles.forgotPasswordButtonWrapper}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                <Text style={{ color: '#E3C463', textDecorationLine: 'underline' }}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupButtonWrapper} >
              <Button
                block
                style={styles.signupButton}
                onPress={() => session.signup(this.state)}
              >
                <Text style={styles.signupButtonText}>Regístrate</Text>
              </Button>
            </View>

            <View style={styles.createAccountWrapper}>
              <Text style={{ color: '#E3C463'}}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{ color: '#E3C463', textDecorationLine: 'underline' }}>
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </View>
          </AuthLayout>
        )}
      </Subscribe>
    )
  }
}
