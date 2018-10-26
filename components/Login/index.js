import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Item, Input, Button, Text, Icon } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import AuthLayout from '../Layouts/AuthLayout';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorsContainer: {
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
    paddingHorizontal: 30
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
    alignItems: 'center'
  },
  loginButtonWrapper: {
    margin: 40
  },
  loginFbWrapper: {
    marginHorizontal: 40
  },
  fbLoginButton: {
    backgroundColor: '#4267B2',
    borderRadius: 0,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 14
  },
  fbLoginButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13
  },
  loginButton: {
    backgroundColor: '#E3C463',
    borderRadius: 0
  },
  loginButtonText: {
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

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    hidePassword: true
  };

  onFbLoginSuccess = (error, result) => {
    LoginManager.logOut();
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.loginFbuser()
            }
          )
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    )
  }

  loginFbuser = () => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
            'fields': {
                'string' : 'email,name'
            }
        }
      },
      (err, res) => {
        if (!err) {
          this.props.screenProps.session.login(res.email, res.id, res.name, 'facebook') // We use the facebook id of the user as the password.
        }
    });

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    return (
      <Subscribe to={[sessionState]}>
        {session => (
          <AuthLayout>
            {session.state.loginErrors && (
              <View style={styles.errorsContainer}>
                <Icon active name="md-alert" style={styles.errorsIcon} />
                <Text style={styles.errors}>
                  {session.state.loginErrors[0]}
                </Text>
              </View>
            )}
            <View style={styles.form}>
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
                <View style={{ paddingHorizontal: 15 }} />
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
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ hidePassword: !this.state.hidePassword })
                  }
                >
                  <Icon active name="eye" style={{ color: 'white' }} />
                </TouchableOpacity>
              </Item>
            </View>

            <View style={styles.forgotPasswordButtonWrapper}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ChangePassword')}
              >
                <Text
                  style={{ color: '#E3C463', textDecorationLine: 'underline' }}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginButtonWrapper}>
              <Button
                block
                style={styles.loginButton}
                onPress={() =>
                  session.login(this.state.email, this.state.password)
                }
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </Button>
            </View>
            <View style={styles.loginFbWrapper}>
              <Button
                style={styles.fbLoginButton}
                onPress={this.onFbLoginSuccess}
              >
                <EntypoIcon active name="facebook" style={{ color: 'white', fontSize: 20, marginLeft: 10 }} />
                <Text style={styles.fbLoginButtonText}>Continúa con Facebook</Text>
              </Button>
            </View>

            <View style={styles.createAccountWrapper}>
              <Text style={{ color: '#E3C463' }}>¿No tienes cuenta? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                <Text
                  style={{ color: '#E3C463', textDecorationLine: 'underline' }}
                >
                  Regístrate
                </Text>
              </TouchableOpacity>
            </View>
          </AuthLayout>
        )}
      </Subscribe>
    );
  }
}
