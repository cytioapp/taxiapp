import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Container,
  Spinner,
  Icon,
  Item,
  Text,
} from 'native-base';
import { Header } from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import Api from '../../utils/api';
import Loading from '../Loading';
import Modal from '../Modal';

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
    width: '98%'
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  searchText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    textAlign: 'left',
    color: '#989898'
  },
  buttonMenuWrapper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 0,
    backgroundColor: '#1F120D',
    height: 100,
    position: 'absolute',
    top: '35%',
    width: 26,
    zIndex: 1,
    justifyContent: 'center'
  },
  buttonMenuIcon: {
    alignSelf: 'center',
    color: '#E3C463',
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
    backgroundColor: '#E3C463',
    borderRadius: 0,
    shadowColor: '#1F120D',
    width: '90%',
    justifyContent: 'center',
    shadowOffset: {
      width: -1,
      height: 3
    },
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
  },
  header: {
    backgroundColor: '#262626'
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
      errors: [],
      isServiceButtonDisabled: false,
      isWaiting: false,
      modalVisible: false,
      drawerVisible: false
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
      console.log(`Formatted address error: ${err}`);
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
      isWaiting: true,
      isServiceButtonDisabled: true
    }, () => {
      let { address, region: { latitude, longitude } } = this.state;
      Api.post('/trips', {
        address_origin: address,
        lat_origin: latitude,
        lng_origin: longitude,
      }).then(res => {
        this.setState({
          isWaiting: false
        }, () => {
          if (res.status == 201){
            this.props.navigation.navigate('AddressInfo');
          }
        });
      }).catch(err => {
        this.setState({
          isWaiting: false,
          errors: err.response.data.errors,
          modalVisible: true,
          isServiceButtonDisabled: false
        })
      })
    });
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  }

  render() {
    let { region, error } = this.state;
    return (
      <Container contentContainerStyle={{ flex: 1, width: '100%' }}>
        <Header style={styles.header} iosBarStyle="light-content" iosBarStyle="light-content">
          <View style={styles.searchWrapper}>
            <Item style={styles.searchContainer}>
              <Icon name="ios-search" style={{ color: '#989898' }}/>
              <TextInput
                placeholder="Selecciona tu ubicación..."
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
                style={styles.searchText}
              />
            </Item>
          </View>
        </Header>

        <View style={{ flex: 1, width: '100%' }}>
          <TouchableOpacity style={styles.buttonMenuWrapper} onPress={this.props.navigation.openDrawer}>
            <Icon style={styles.buttonMenuIcon} name="ios-arrow-forward" />
          </TouchableOpacity>
          <Modal
            errors={this.state.errors}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
          />
          {/* this.state.isWaiting && <Loading />*/}
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
              
              <View style={styles.buttonContainer}>
                <Button
                  dark
                  style={styles.button}
                  onPress={this.handleOrder}
                  disabled={this.state.isServiceButtonDisabled}
                >
                  <Text style={styles.buttonText}> Solicitar servicio </Text>
                  {this.state.isWaiting && <Spinner color="black" />}
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
