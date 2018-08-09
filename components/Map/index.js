import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, PermissionsAndroid, Platform } from 'react-native';
import {
  Button,
  Container,
  Form,
  Icon,
  Item,
  Text
} from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import Api from '../../utils/api';

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
  searchWrapper: {
    alignSelf: 'center',
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    width: '90%'
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    height: 40,
    paddingRight: 10
  },
  searchText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    marginBottom: 20,
    position: 'absolute',
    right: 0
  },
  button: {
    backgroundColor: '#F3C467',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#1F120D',
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  buttonText: {
    color: '#1F120D',
    fontFamily: 'Nunito-Bold',
  },
  marker: {
    color: '#1F120D',
    fontSize: 50
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
      address: '',
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      error: null,
      isServiceButtonDisabled: false
    }
  }

  componentDidMount() {
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
    try {
      const res = await Geocoder.geocodePosition({lat, lng});
      const { streetName, streetNumber, subLocality, locality } = res[0];
      this.setState({
        address: `${streetName} ${streetNumber}, ${subLocality}, ${locality}`
      });
    } catch(err) {
      console.log(err);
    }
  };

  onRegionChange = region => {
    this.formattedAddress(region.latitude, region.longitude)
    this.setState({
      region
    });
  }

  makeRequest = () => {
    Api.get('/service_types')
      .then(res => {
        console.log(res.data);
      });
  }

  handleOrder = () => {
    this.setState({
      isServiceButtonDisabled: true
    }, () => {
      let { address, region: { latitude, longitude } } = this.state;
      Api.post('/trips', {
        address_origin: address,
        lat_origin: latitude,
        lng_origin: longitude,
      }).then(res => {
        if (res.status == 201){
          alert("Se ha solicitado tu taxi con éxito");
          this.props.navigation.navigate('AddressInfo');
        }
      }).catch(err => {
        if (err.response.status == 422) {
          alert('Ya tiene un viaje activo');
        } else {
          alert("Ha ocurrido un error, vuelve a intentarlo.");
          this.setState({
            isServiceButtonDisabled: false
          });
        }
      })
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
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={region}
                onRegionChangeComplete={this.onRegionChange}
              />
              <View pointerEvents="none" style={styles.markerFixed}>
                <Icon style={styles.marker} name='ios-pin' />
              </View>
              <View style={styles.searchWrapper}>
                <Form>
                  <Item rounded style={styles.searchContainer}>
                    <Icon name="ios-search" />
                    <TextInput
                      placeholder="Selecciona tu ubicación..."
                      value={this.state.address}
                      onChangeText={address => this.setState({ address })}
                      style={styles.searchText}
                    />
                  </Item>
                </Form>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  dark
                  style={styles.button}
                  onPress={this.handleOrder}
                  disabled={this.state.isServiceButtonDisabled}
                >
                  <Text style={styles.buttonText}> Solicitar servicio </Text>
                </Button>
              </View>
            </View>
          }
          {error && <Text>{error}</Text>}
        </View>

      </Container>
    );
  }
}

export default Home;
