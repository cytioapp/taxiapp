import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Item, Input, Container, Header, Content, Footer,
         FooterTab, Button, Text } from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#F5FCFF',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'center'
  },
  button: {
    // marginBottom: 0,
    // marginTop: 0,
    // marginLeft: 'auto',
    // marginRight: 'auto'
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
        <Header />
        <Content style={styles.content} contentContainerStyle= {{flex: 1}}>
          <View>
            <Item rounded>
              <Icon name="ios-search" />
              <Input placeholder='Tape your location...' value = {this.state.address} />
            </Item>
          </View>
          <View style={styles.mapContainer}>
            {latitude && <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            }
          </View>
          <View style={styles.buttonContainer}>
            <Button primary style={styles.button}>
              <Text> Solicitar servicio </Text>
            </Button>
          </View>
        </Content>
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
