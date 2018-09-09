import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
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
  }
});

export default class AuthLayout extends Component {
  openTermsAndConditions = () => {
    var url = 'http://www.cytio.com.mx/terminos_y_condiciones';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('No se pudo abrir la uri' + url);
      }
    });
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
              <View style={styles.logoContainer}>
                <Image source={logo2} style={styles.logoImage}/>
              </View>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={this.openTermsAndConditions}>
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
