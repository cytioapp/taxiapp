import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Icon,
  Item,
  Input,
  Container,
  Footer,
  FooterTab,
  Button,
  Text,
  Form
} from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';

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
    Geolocation.getCurrentPosition(
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
    let {latitude, longitude, address, error} = this.state

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
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
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
