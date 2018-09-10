import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';
import logoImage from '../../assets/logo2.png';

const underlayColor = '#989898';
const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingTop: 22,
    paddingBottom: 35
  },
  logo: {
    width: 80,
    height: 67
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#262626'
  },
  itemText: {
    color: 'white',
    fontFamily: 'Nunito-Regular',
    fontSize: 18
  },
  menu: {
    backgroundColor: '#262626'
  }
})

export default class DrawerMenu extends React.Component {
  render() {
    return (
      <Subscribe to={[sessionState]}>
        {(session) => (
          <ScrollView style={styles.menu}>
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.logoWrapper}>
                <Image source={logoImage} style={styles.logo}/>
              </View>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    Inicio
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    Perfil
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('Directory')} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    Directorio Telefónico
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={session.logout} underlayColor={underlayColor}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    Cerrar sesión
                  </Text>
                </View>
              </TouchableHighlight>
            </SafeAreaView>
          </ScrollView>
        )}
      </Subscribe>
    )
  }
}
