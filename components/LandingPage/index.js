import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import logo2 from '../../assets/logo2.png';
import fondo2 from '../../assets/fondo2.jpg';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  logoImage: {
    height: 135,
    width: 161
  },
  container: {
    alignContent: 'center',
    flex: 1
  },
  buttonsWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  buttonSignup: {
    backgroundColor: '#F4C975',
    marginHorizontal: 35,
    paddingVertical: 15,
  },
  textButtonSignup: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center'
  },
  textButtonTerms: {
    color: '#D5D5D5',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center'
  }
});

export default class LandingPage extends Component {

  render(){
    return(
      <ImageBackground source={fondo2} style={styles.backgroundImage}>
          <View style={styles.logoContainer}>
            <Image source={logo2} style={styles.logoImage}/>
          </View>
          <View style={styles.container}>
            <View>
              <TouchableOpacity style={styles.buttonSignup} onPress={() => {}}>
                <Text style={styles.textButtonSignup}> Regístrate a CYTIO </Text>
              </TouchableOpacity>

              <Text>¿Ya tienes cuenta?</Text>
              <TouchableOpacity style={styles.buttonLogin} onPress={() => {}}>
                <Text style={styles.textButtonLogin}> Regístrate a CYTIO </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.textButtonTerms} >Términos y condiciones</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.textButtonTerms} >Aviso de privacidad</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
    )
  }
}

