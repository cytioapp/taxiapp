import React, { Component } from 'react';
import {Image, KeyboardAvoidingView, View} from 'react-native';
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
import Spinner from 'react-native-spinkit';
import driversFace from '../../assets/face1.jpg';
import taxiIcon1 from '../../assets/taxiIcon.png';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';
import styles from './styles';
import { colors, spinnerColor, spinnerMessage } from './variables';
import { getActiveTrip } from '../../services/information';

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

    this.socket = io('https://murmuring-thicket-35416.herokuapp.com');

  }

  componentDidMount(){
    getActiveTrip().then(res => {
      if(res.user){
        this.setState(res.user);
      }
      if(res.driver){
        this.setState(res.driver);
      }

      //Se une al room cuando se aceptó el trip por un driver
      this.socket.emit('joinToUsers', res.user.user_id);
      this.socket.on('tripCanceled', () => {
        this.setState({
          status: 'holding',
          driver_id: false
        });
        /* PUSH NOTIFICATION CODE */
      });
      this.socket.on('tripAccepted', () => {
        getActiveTrip().then(res => {
          if(res.user){
            this.setState(res.user);
          }
          if(res.driver){
            this.setState(res.driver);
          }
        });
      });
    });
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
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name='menu' />
            </Button>
            <Body style={styles.body}>
               <Title>Información del viaje</Title>
            </Body>
            <Button transparent>
              <Icon name='person' />
            </Button>
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


          </Content>

          <Footer>
            <FooterTab>
              <Button vertical onPress={this.props.navigation.openDrawer}>
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
