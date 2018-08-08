import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
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
    justifyContent: 'center'
  },
  logoImage: {
    height: 135,
    width: 161
  },
  contentContainer: {
    flex: 2
  }
});

export default class LandingPage extends Component {
  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#000000'}}>
        <Container style={styles.container}>
          <ImageBackground source={fondo2} style={styles.backgroundImage}>
            <View style={styles.logoContainer}>
              <Image source={logo2} style={styles.logoImage}/>
            </View>
            <View style={styles.contentContainer}>
              {children}
            </View>
          </ImageBackground>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}
