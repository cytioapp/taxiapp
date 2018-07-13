import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});



class Home extends Component {

  state = {
    latitude: null,
    longitude: null,
    error: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    let {latitude, longitude} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {latitude && <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />}
        </View>
      </View>
    );
  }
}

export default Home;
