import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Spinner } from 'native-base';
import logo1 from '../../assets/logo1.png';
import fondo1 from '../../assets/fondo1.jpg';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoImage: {
    height: 158,
    width: 190
  },
  container: {
    justifyContent: 'space-between',
    flex: 1
  },
  buttonsWrapper: {
    marginBottom: 15
  },
  textButton: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center'
  }
});

const Loading = () => {
  return (
    <ImageBackground source={fondo1} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Image source={logo1} style={styles.logoImage}/>
      </View>
      <View style={styles.container}>
        <View></View>
        <Spinner color="#000000"/>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textButton} >Términos y condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textButton} >Aviso de privacidad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Loading;
