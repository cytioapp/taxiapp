import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Footer, Item, Input, Button, Text, Icon } from 'native-base';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import logoImage from '../../assets/taxi1.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1C1C1C'
 },
  form: {
    flex: 1
  },
  buttonWrapper: {
    padding: 10,
  },
  imageWrapper: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    textAlign: 'center',
    color: 'white'
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  }
});

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    hidePassword: true
  }

  render(){
    return(
      <Subscribe to={[sessionState]}>
        {(session) => (
          <KeyboardAwareScrollView style={{flex: 1}} behavior="padding">
            <Container style={styles.container}>
              <Content contentContainerStyle={{ flex: 1, padding: 20 }}>
                <View style={styles.imageWrapper}>
                  <Image source={logoImage} style={{height: 100, width: 100}}/>
                </View>
                <View styles={styles.form}>
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
                </View>
                <View style={{ paddingTop: 38, paddingBottom: 50, alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
                    <Text style={{ color: '#ECC766', textDecorationLine: 'underline' }}>
                      ¿olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper} >
                  <Button
                    block
                    style={{ backgroundColor: '#ECC766', borderRadius: 0 }}
                    onPress={() => session.login(this.state.email, this.state.password)}
                  >
                    <Text style={{ color: 'black', fontWeight: '500' }}>Iniciar Sesión</Text>
                  </Button>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={{ color: '#ECC766', textDecorationLine: 'underline' }}>
                      Crear cuenta
                    </Text>
                  </TouchableOpacity>
                </View>
              </Content>
              <Footer style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                <TouchableOpacity>
                  <Text style={{ color: 'gray', textDecorationLine: 'underline' }}>
                    Terminos y condiciones y aviso de privacidad
                  </Text>
                </TouchableOpacity>
              </Footer>
            </Container>
          </KeyboardAwareScrollView>
        )}
      </Subscribe>
    )
  }
}

