import React, { Component } from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Header,
  Icon,
  Item,
  Label,
  Left,
  Right,
  Text,
  Textarea,
  Title
} from 'native-base';
import Api from '../../utils/api';
import Spinner from 'react-native-spinkit';
import driversFace from '../../assets/face1.jpg';
import taxiIcon1 from '../../assets/taxiIcon.png';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';

const primaryColor = '#F8E026';
const secondaryColor = '#413500';
const terniaryColor = '#006B5E';
const fourthColor = '#FDF9EE';

const styles = StyleSheet.create({
  container:{
    backgroundColor: fourthColor,
    flex: 1,
  },
  cancelButtonWrapper: {
    paddingHorizontal: 20,
  },
  cancelButton:{
    backgroundColor: terniaryColor,
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  cancelIconWrapper: {

  },
  cancelIcon: {
    color: '#FFFFFF',
    marginRight: 10,
    marginTop: 2,
    width: 25,
  },
  cancelText: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Bold',
    left: 73,
    top: 12,
    position: 'absolute'
  },
  statusWrapper: {
    borderColor: terniaryColor,
    borderRadius: 30,
    borderWidth: 0.5,
    marginHorizontal: 110,
    marginVertical: 10
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  circleStatus: {
    borderRadius: 50,
    height: 20,
    width: 20
  },
  statusText: {
    color: secondaryColor,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 10
  },
  origin: {
    flexDirection: 'row',
    padding: 10
  },
  pinIcon: {
    color: secondaryColor,
    fontSize: 40
  },
  originText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 15,
    paddingRight: 20
  },
  driverCardWrapper: {
    marginTop: 10,
    padding: 10
  },
  driverCard: {
  },
  driverCardHeader: {
    flexDirection: 'row'
  },
  driverName: {
    color: secondaryColor,
    fontFamily: 'Nunito-Bold'
  },
  driverImageWrapper: {
    backgroundColor: terniaryColor,
    borderRadius: 50,
    top: -24,
    height: 70,
    position: 'absolute',
    right: 20,
    width: 70
  },
  driverImage: {
    borderRadius: 30,
    height: 60,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 60
  },
  driverInfoBody: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  driverInfoWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  label: {
    fontFamily: 'Nunito-Italic'
  },
  driverInfo: {
    fontFamily: 'Nunito-Italic'
  },
  taxiIcon: {
    height: 25,
    width: 25
  },
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: terniaryColor,
    fontFamily: 'Nunito-Bold'
  },
  messageWrapper: {
    paddingBottom: 15
  },
  message: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  messageText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 15,
    textAlign: 'right'
  },
  spinner: {
    marginRight: 15
  }
});

const colors = {
  'holding': '#FDE74C',
  'taken': '#5BC0EB',
  'active': '#9BC53D',
  'finished': '#211A1E',
  'canceled': '#C3423F'
}

const spinnerColor = {
  'holding': '#FDE74C',
  'taken': '#5BC0EB',
  'active': '#9BC53D',
  'finished': null,
  'canceled': null
}

const spinnerMessage = {
  'holding': 'Esperando que algún taxista acepte el viaje',
  'taken': 'Tú viaje ha sido tomado, el taxista va en camino',
  'active': 'Estás llendo a tu destino, disfruta el viaje',
  'finished': 'Ha terminado tu viaje, gracias por usar NOMBRE',
  'canceled': 'Se ha cancelado tú viaje'
}

export default class AddressInfo extends Component{
  constructor() {
    super()

    this.state = {
      user_id: '',
      trip_id: null,
      origin: '',
      status: '',
      created_at: null,
      driver_name: '',
      driver_id: null,
      organization: '',
      license_plate: '',
      model: '',
      year: '',
      show_menu: true
    }

    this.socket = io('https://f55b6545.ngrok.io');

  }

  componentDidMount() {
    this.getActiveTrip();
  }

  getActiveTrip = async () => {
    let active_trip = await Api.get('/users/active_trip');

    if (active_trip.data && active_trip.data.active) {
      let { id } = active_trip.data.trip;
      let trip = await Api.get(`/trips/${id}`);
      let { address_origin, status, created_at } = trip.data;
      if (address_origin) {
        this.setState({
          trip_id: id,
          origin: address_origin,
          status,
          created_at
        });
      }
      if (trip.data.driver) {
        const { id } = trip.data.driver;
        const { license_plate, model, year, organization } = trip.data.vehicle;
        this.setState({
          user_id: trip.data.user_id,
          driver_name: trip.data.driver.user.full_name,
          driver_id: id,
          organization,
          license_plate,
          model,
          year,
        })
        //Se une al room cuando se aceptó el trip por un driver
        this.socket.emit('joinToUsers', trip.data.user_id);
        this.socket.on('tripCanceled', () => {
          this.setState({
            status: 'holding',
            driver_id: false
          });
          //Hacer lo de la push notification para avisar al usuario
        });
      }
    }
  }

  onSlideRight = () => {
    Api.put(`/trips/${this.state.trip_id}/cancel_trip`)
      .then(res => {
        alert("Se ha cancelado tu taxi con éxito");
        this.setState({
          status: 'canceled'
        });
        this.props.navigation.navigate('Map');
      }).catch(err => {
        console.log(err.response);
      });
  };

  render(){
    const {
      origin,
      status,
      created_at,
      driver_name,
      organization,
      license_plate,
      model,
      year,
      driver_id
    } = this.state;

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Header>
            <Body style={styles.body}>
               <Title>Información del viaje</Title>
            </Body>
          </Header>

          <Content contentContainerStyle={{flex: 1}}>
            <View style={styles.statusWrapper}>
              <View style={styles.status}>
                <View style={[styles.circleStatus, {backgroundColor: colors[status]}]}>
                </View>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            </View>

            <View style={styles.origin}>
              <Icon style={styles.pinIcon} name="ios-pin" />
              <View>
                <Text style={styles.originText}>{origin}</Text>
              </View>
            </View>

            {driver_id &&
              <View style={styles.driverCardWrapper}>
                <Card style={styles.driverCard}>
                  <CardItem styles={styles.driverCardHeader} header bordered>
                    <Text style={styles.driverName}>{driver_name}</Text>
                    <View style={styles.driverImageWrapper}>
                      <Image style={styles.driverImage} source={driversFace}/>
                    </View>
                  </CardItem>
                  <CardItem bordered>
                    <Body style={styles.driverInfoBody}>
                      <View style={styles.driverInfoWrapper}>
                        <Text style={styles.label}>Sitio </Text>
                        <Text style={styles.driverInfo}>"{organization}"</Text>
                      </View>
                      <View style={styles.driverInfoWrapper}>
                        <Text style={styles.label}>Placas: </Text>
                        <Text style={styles.driverInfo}>{license_plate}</Text>
                      </View>
                      <View style={styles.driverInfoWrapper}>
                        <Text style={styles.label}>Taxi: </Text>
                        <Text style={styles.driverInfo}>{model} {year}</Text>
                      </View>
                      <View style={styles.driverInfoWrapper}>
                        <Image style={styles.taxiIcon} source={taxiIcon1}/>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered style={styles.actionButtonsWrapper}>
                    <View style={styles.button}>
                      <Icon name="ios-call-outline" />
                      <Text style={styles.buttonText}>Llamar al conductor</Text>
                    </View>
                  </CardItem>
                </Card>
              </View>
            }

            <View style={styles.messageWrapper}>
              <View style={styles.message}>
                <Text style={styles.messageText}>{spinnerMessage[status]}</Text>
                {spinnerColor[status] && <Spinner style={styles.spinner} isVisible={true} size={50} type='Pulse' color={spinnerColor[status]}/>}
              </View>
            </View>

            {driver_id &&
              <View style={styles.cancelButtonWrapper} >
                <RNSlidingButton
                  style={styles.cancelButton}
                  height={50}
                  onSlidingSuccess={this.onSlideRight}
                  slideDirection={SlideDirection.RIGHT}>
                  <View style={styles.cancelIconWrapper}>
                    <Icon style={styles.cancelIcon} name="ios-close-circle"/>
                  </View>
                </RNSlidingButton>
                <Text numberOfLines={1} style={styles.cancelText}>
                  >> Desliza para cancelar el viaje >>
                </Text>
              </View>
            }

          </Content>

          <Footer>
            <FooterTab>
              <Button vertical>
                <Icon name="person" />
                <Text>Perfil</Text>
              </Button>
              <Button vertical active onPress={() => this.props.navigation.navigate('AddressInfo')}>
                <Icon active name="paper" />
                <Text>Info</Text>
              </Button>
              <Button vertical>
                <Icon name="navigate" onPress={() => this.props.navigation.navigate('Home')}/>
                <Text>Viaje</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
