import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import marker from '../../assets/map-marker.png';

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
  marker: {
    height: 48,
    width: 48
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      error: null
    }

    let { region } = this.state;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onRegionChange = region => {
    console.log(region);
    this.setState({
      region
    });
  }

  render() {
    let { region } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {region.latitude && <MapView
            style={styles.map}
            region={region}
            initialRegion={region}
            onRegionChangeComplete={this.onRegionChange}
          />}
          <View pointerEvents="none" style={styles.markerFixed}>
            <Image style={styles.marker} source={marker} />
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
