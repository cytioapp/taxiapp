import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  WebView
} from 'react-native';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo2 from '../../assets/logo2.png';
import fondo2 from '../../assets/fondo2.jpg';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  backgroundImage: {
    minHeight: window.height,
    width: '100%'
  },
  completeContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  logoImage: {
    height: 125,
    width: 150
  },
  contentContainer: {
    flex: 2
  },
  termsButtonsWrapper: {
    paddingVertical: 10
  },
  termsTextButton: {
    color: '#D5D5D5',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  footer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginVertical: 15
  },
  termsModal: {
    flex: 1,
    alignItems: 'center'
  },
  termsModalText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10
  },
  termsModalCloseBtn: {
    alignItems: 'flex-start',
    backgroundColor: '#E3C463',
    paddingTop: 10,
    paddingBottom: 5
  },
  termsModalWebView: {
    marginTop: 5,
    width: 400,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default class AuthLayout extends Component {

  state = {
    modalVisible: false,
  };

  toggleTermsAndConditions = () => {
    this.setState((oldState) => {
      return {
        modalVisible: !oldState.modalVisible
      }
    })
  };

  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView style={styles.container}>
         <StatusBar
            backgroundColor="#262626"
            barStyle="light-content"
          />
        <ImageBackground source={fondo2} style={styles.backgroundImage}>
          <View style={styles.completeContainer}>
            <View style={styles.content}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View style={styles.termsModalCloseBtn}>
                  <TouchableOpacity onPress={this.toggleTermsAndConditions}>
                    <Text style={styles.termsModalText}>
                      <Icon ios='ios-arrow-round-back' android="md-arrow-round-back" style={{ color: '#fff', fontSize: 20 }} />
                      &nbsp;
                      Regresar
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.termsModal}>
                  <WebView
                    source={{uri: 'https://www.cytio.com.mx/terminos_y_condiciones'}} 
                    style={styles.termsModalWebView}
                  />
                </View>
              </Modal>  
              <View style={styles.logoContainer}>
                <Image source={logo2} style={styles.logoImage}/>
              </View>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={this.toggleTermsAndConditions}>
                <Text style={styles.termsTextButton}>
                  Términos, condiciones y aviso de privacidad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    )
  }
}
