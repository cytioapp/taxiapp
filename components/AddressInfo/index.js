import React, { Component } from 'react';
import {Image, ScrollView, View} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import Spinner from 'react-native-spinkit';
import Api from '../../utils/api';
import driversFace from '../../assets/face1.jpg';
import taxiIcon1 from '../../assets/taxiIcon.png';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
window.navigator.userAgent = "react-native";
import io from 'socket.io-client/dist/socket.io';
import styles from './styles';
import { colors, spinnerColor, spinnerMessage } from './variables';
import { getActiveTrip } from '../../services/information';
import Loading from '../Loading';
import Modal from '../Modal';

export default class AddressInfo extends Component {

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
      show_menu: true,
      isWaiting: false,
      errors: [],
      modalVisible: false
    }

    this.socket = io('https://cytio.com.mx');

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
    }).catch(err => {
      this.props.navigation.navigate('Login');
    });
  }

  onSlideRight = () => {
    this.setState({
      isWaiting: true
    }, () => {
      Api.put(`/users/cancel_trip`)
        .then(res => {
          this.setState({
            status: 'canceled',
            isWaiting: false
          });
          this.props.navigation.navigate('Map');
        }).catch(err => {
          this.setState({
            isWaiting: false,
            errors: err.response.data.errors,
            modalVisible: true
          });
        });
    });
  };

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  }

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
      <Container style={styles.container}>
        {this.state.isWaiting && <Loading />}
        <Header>
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={styles.body}>
              <Title style={styles.title}>Información del viaje</Title>
          </Body>
          <Right></Right>
        </Header>

        <Content contentContainerStyle={{flex: 1}}>
          <Modal
            errors={this.state.errors}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
          />
          <ScrollView>
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
                <View style={styles.driverImageWrapper}>
                  <Image style={styles.driverImage} source={driversFace}/>
                </View>
                <Card style={styles.driverCard}>
                  <CardItem styles={styles.driverCardHeader} header bordered>
                    <Text style={styles.driverName}>{driver_name}</Text>
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
              <Text numberOfLines={1} style={styles.cancelText}>
                Desliza para cancelar el viaje
              </Text>
              <RNSlidingButton
                style={styles.cancelButton}
                height={50}
                onSlidingSuccess={this.onSlideRight}
                slideDirection={SlideDirection.RIGHT}>
                <View style={styles.cancelIconWrapper}>
                  <Icon style={styles.cancelIcon} name="ios-close-circle"/>
                </View>
              </RNSlidingButton>
            </View>

          </ScrollView>
        </Content>
      </Container>
    )

  }
}
