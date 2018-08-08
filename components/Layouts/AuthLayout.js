import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Container, Content, Footer} from 'native-base';
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
    borderColor: 'transparent'
  }
});

export default class LandingPage extends Component {
  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView>
        <Container contentContainerStyle={styles.container}>
          <ImageBackground source={fondo2} style={styles.backgroundImage}>
            <Content contentContainerStyle={styles.container}>
              <View style={styles.logoContainer}>
                <Image source={logo2} style={styles.logoImage}/>
              </View>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </Content>
            <Footer style={styles.footer}>
              <TouchableOpacity>
                <Text style={styles.termsTextButton}>
                  Terminos y condiciones y aviso de privacidad
                </Text>
              </TouchableOpacity>
            </Footer>
          </ImageBackground>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}
