import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, PermissionsAndroid, Platform } from 'react-native';
import {
  Icon,
  Item,
  Input,
  Container,
  Footer,
  FooterTab,
  Button,
  Text,
  Form,
} from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import marker from '../../assets/map-marker.png';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingRight: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 18
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
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      error: null
    }

    Platform.select({
      ios: () => this.getCurrentPosition(),
      android: () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              this.getCurrentPosition()
            } else {
              this.setState({ error: 'Se requieren permisos de ubicación' })
            }
          });
      }
    })();
    
  }
  
  getCurrentPosition = () => {
    let { region } = this.state;
    Geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        this.formattedAddress(latitude, longitude)
        this.setState({
          region: {
            ...region,
            latitude,
            longitude,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  formattedAddress = async (lat, lng) => {
    const res = await Geocoder.geocodePosition({lat, lng});
    const { streetName, streetNumber, subLocality, locality } = res[0];
    this.setState({
      address: `${streetName} ${streetNumber}, ${subLocality}, ${locality}`
    });
  };

  onRegionChange = region => {
    this.formattedAddress(region.latitude, region.longitude)
    this.setState({
      region
    });
  }

  render() {
    let { region, error} = this.state;

    return (
      <Container contentContainerStyle={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, width: '100%'}}>
          {region.latitude &&
            <View style={{flex: 1}}>
              <MapView
                style={styles.map}
                region={region}
                initialRegion={region}
                onRegionChangeComplete={this.onRegionChange}
              />
              <View pointerEvents="none" style={styles.markerFixed}>
                <Image style={styles.marker} source={marker} />
              </View>
              <View style={styles.searchWrapper}>
                <Form>
                  <Item rounded style={styles.searchContainer}>
                    <Icon name="ios-search" />
                    <TextInput placeholder="Selecciona tu ubicación..." value={this.state.address} style={{ textAlign: 'left', flex: 1 }}/>
                  </Item>
                </Form>
              </View>
              <View style={styles.buttonContainer}>
                <Button primary>
                  <Text> Solicitar servicio </Text>
                </Button>
              </View>
            </View>
          }
          {error && <Text>{error}</Text>}
        </View>

        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="person" />
              <Text>Perfil</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Info</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Viaje</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Home;
