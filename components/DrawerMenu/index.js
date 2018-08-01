import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';

const styles = StyleSheet.create({
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FAFAFA'
  }
})

export default class DrawerMenu extends React.Component {
  render() {
    return (
      <Subscribe to={[sessionState]}>
        {(session) => (
          <ScrollView>
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <View style={styles.item}>
                  <Text>Inicio</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={session.logout}>
                <View style={styles.item}>
                  <Text>Cerrar sessión</Text>
                </View>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        )}
      </Subscribe>
    )
  }
}