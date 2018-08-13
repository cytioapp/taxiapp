import React from 'react';
import {
  Dimensions,
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
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    height: window.height,
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoImage: {
    height: 159,
    width: 190
  },
  container: {
    justifyContent: 'space-between',
    flex: 1
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
        <View></View>
      </View>
    </ImageBackground>
  );
}

export default Loading;
