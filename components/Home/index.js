import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Form,
  Icon,
  Input,
  Item,
  Text
} from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  },
  searchWrapper: {
    alignSelf: 'center',
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    width: '90%'
  },
  button: {
    borderRadius: 30,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});

class Home extends Component {

  state = {
    latitude: null,
    longitude: null,
    address: null,
    error: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.formattedAddress(position.coords.latitude,
                              position.coords.longitude)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  formattedAddress = async (lat, lng) => {
    const res = await Geocoder.geocodePosition({lat, lng})
    const { formattedAddress } = res[0]
    this.setState({
      address: formattedAddress
    });
  };

  render() {
    let {latitude, longitude, address} = this.state

    return (
      <Container contentContainerStyle= {{flex: 1}}>
        <View style={{flex: 1}}>
          {latitude &&
          <View style={{flex: 1}}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <View style={styles.searchWrapper}>
              <Form>
                <Item rounded style={styles.searchContainer}>
                  <Icon name="ios-search" />
                  <Input placeholder='Tape your location...' value = {this.state.address} />
                </Item>
              </Form>
            </View>
            <View style={styles.buttonContainer}>
              <Button dark style={styles.button}>
                <Text> Solicitar servicio </Text>
              </Button>
            </View>
          </View>
          }
        </View>

        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="person" />
              <Text>Perfil</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('AddressInfo')}>
              <Icon name="paper" />
              <Text>Info</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('Home')}>
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
