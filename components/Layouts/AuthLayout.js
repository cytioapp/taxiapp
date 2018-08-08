import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Container} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo2 from '../../assets/logo2.png';
import fondo2 from '../../assets/fondo2.jpg';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoImage: {
    height: 135,
    width: 161
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
    textAlign: 'center'
  }
});

export default class LandingPage extends Component {
  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView>
        <Container style={styles.container}>
          <ImageBackground source={fondo2} style={styles.backgroundImage}>
            <View style={styles.logoContainer}>
              <Image source={logo2} style={styles.logoImage}/>
            </View>
            <View style={styles.contentContainer}>
              {children}
            </View>
            <View style={styles.termsButtonsWrapper}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.termsTextButton} >Términos y condiciones</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.termsTextButton} >Aviso de privacidad</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}
