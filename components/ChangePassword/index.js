import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Item, Spinner, Text } from 'native-base';
import AuthLayout from '../Layouts/AuthLayout';
import Modal from '../Modal';
import Api from '../../utils/api';

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    marginTop: 40,
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
  sendEmailButtonWrapper: {
    margin: 40
  },
  sendEmailButton: {
    backgroundColor: '#E3C463',
    borderRadius: 0
  },
  sendEmailButtonText: {
    color: 'black',
    fontWeight: '500'
  },
  spinnerWrapper: {
    alignItems: 'center'
  },
  createAccountWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginText: {
    color: '#1F120D'
  },
  loginLink: {
    color: '#1F120D',
    textDecorationLine: 'underline'
  }
});

export default class ChangePassword extends Component {
  state = {
    email: '',
    modalVisible: false,
    alerts: [],
    isWaiting: false
  };

  handleEmail = () => {
    this.setState({ isWaiting: true });
    Api.post('/password_reset', { email: this.state.email })
      .then(() => {
        this.setState({
          isWaiting: false,
          alerts: [
            'Se envió un correo a tu email que te dirá cómo cambiar tu contraseña, sigue las instrucciones y regresa de nuevo a la aplicación para loguearte.'
          ],
          modalVisible: true
        });
      })
      .catch(() => {
        this.setState({
          isWaiting: false,
          alerts: ['Ha ocurrido un error, vuelve a intentarlo'],
          modalVisible: true
        });
      });
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      alerts: visible ? this.state.alerts : []
    });
  };

  redirectToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <AuthLayout>
        <Modal
          errors={this.state.alerts}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          onDismiss={this.redirectToLogin}
        />
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
        </View>

        <View style={styles.sendEmailButtonWrapper}>
          <Button
            block
            style={styles.sendEmailButton}
            onPress={() => this.handleEmail()}
          >
            <Text style={styles.sendEmailButtonText}>Enviar correo</Text>
            {this.state.isWaiting && <Spinner color="#1F120D" />}
          </Button>
        </View>

        <View style={styles.createAccountWrapper}>
          <Text style={{ color: '#E3C463' }}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{ color: '#E3C463', textDecorationLine: 'underline' }}>
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </AuthLayout>
    );
  }
}
