import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View, Alert, Image, Share } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-spinkit';
import Api from '../../utils/api';
import styles from './style';
import { colors, spinnerColor, spinnerMessage, traductions } from './variables';
import { getActiveTrip, parseTrip } from '../../services/information';
import Loading from '../Loading';
import Modal from '../Modal';
import Driver from './Driver';
import firebase from 'react-native-firebase';
import TimerMixin from 'react-timer-mixin';
import waitingTaxi from '../../assets/waitingtaxi.png';

export default class AddressInfo extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      trip_id: null,
      origin: '',
      guid: null,
      status: '',
      created_at: null,
      driver_name: '',
      rate: 0,
      driver_id: null,
      organization: null,
      license_plate: '',
      model: '',
      year: '',
      show_menu: true,
      isWaiting: false,
      errors: [],
      modalVisible: false,
      number: '',
      phone_number: '',
      showMessage: false
    };
  }

  componentDidMount() {
    TimerMixin.setTimeout(() => {
      this.setState({
        showMessage: true
      });
    }, 480000);

    getActiveTrip()
      .then(res => {
        if (res.user) {
          this.setState(res.user);
        }
        if (res.driver) {
          this.setState(res.driver);
        }
        this.monitorTrip();
      })
      .catch(err => {
        this.props.navigation.navigate('Login');
      });
    
    firebase.messaging().requestPermission()
      .then(() => {
        // User has authorised  
        firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              Api.put('/users/profile', { device_id: fcmToken }).then(res => {
                console.log(res)
              });
            } else {
              // user doesn't have a device token yet
            }
          });
      })
      .catch(error => {
        // User has rejected permissions  
      });
  }

  monitorTrip = () => {
    let { trip_id } = this.state;
    let counter = 0;
    firebase
      .database()
      .ref(`server/taken_trips/${trip_id}/`)
      .on('value', snapshot => {
        let trip = snapshot.val();
        if (trip) {
          this.setState(parseTrip(trip));
        } else if (!trip && counter) {
          getActiveTrip()
            .then(res => {
              if (res.user) {
                this.setState({
                  ...res.user,
                  ...parseTrip({ status: res.user.status })
                });
                if (res.user.status == 'holding') {
                  alert('Tu viaje ha regresado a la fila de espera');
                }
              }
            })
            .catch(err => {
              alert('Ha ocurrido un error');
            });
        }
        counter++;
      });

    firebase
      .database()
      .ref(`server/finished_trips/${trip_id}/`)
      .on('value', snapshot => {
        let trip = snapshot.val();
        if (trip) {
          this.setState({ status: 'finished' });
        }
      });
    
  };

  handleCancel = () => {
    Alert.alert(
      'Cancelar',
      '¿Está seguro que desea cancelar el servicio?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        { text: 'Si', onPress: () => this.cancelTrip() }
      ],
      { cancelable: false }
    );
  };

  shareTrip = () => Share.share({
    message: `Estoy viajando con Cytio, sigue mi viaje: http://cytio.com.mx/ubicame/${this.state.guid}`,
    title: 'Localización de mi viaje'
  })

  cancelTrip = (Route = 'Map') => {
    this.setState({ isWaiting: true }, () => {
        Api.put(`/users/cancel_trip`)
          .then(res => {
            this.setState({
              status: 'canceled',
              isWaiting: false
            });
            this.props.navigation.navigate(Route);
          })
          .catch(err => {
            let errors = ['No fue posible cancelar el viaje, porfavor inténtalo de nuevo'];
            if (err.response.status == 422 && Array.isArray(err.response.data.errors)) {
              errors = [
                `${err.response.data.errors[0]}. El viaje no puede cancelarse después de 1 minuto que el taxista lo haya aceptado.`
              ];
            }
            this.setState({
              isWaiting: false,
              errors: errors,
              modalVisible: true
            });
          });
      }
    );
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  };

  render() {
    const {
      origin,
      status,
      created_at,
      driver_name,
      rate,
      organization,
      license_plate,
      model,
      year,
      number,
      phone_number,
      driver_id,
      showMessage
    } = this.state;

    return (
      <Container style={styles.container}>
        {this.state.isWaiting && <Loading />}
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon
                style={styles.menuIcon}
                name="ios-menu"
                style={{ color: '#e3c463' }}
              />
            </Button>
          </Left>
          <Body style={styles.body}>
            <Title style={styles.title}>Información del viaje</Title>
          </Body>
          <Right>
            <Icon
              style={{
                ...styles.menuIcon,
                color: '#e3c463'
              }}
              onPress={this.shareTrip}
              android="md-share"
              ios="ios-share-alt"
            />
          </Right>
        </Header>

        <Content contentContainerStyle={{ flex: 1 }}>
          <Modal
            errors={this.state.errors}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
          />
          <ScrollView>
            <View
              style={[
                styles.statusWrapper,
                { backgroundColor: colors[status] }
              ]}
            >
              <Text style={styles.statusText}>{traductions[status]}</Text>
            </View>

            <View style={styles.origin}>
              <VIcon style={styles.pinIcon} name="map-marker-outline" />
              <View>
                <Text style={styles.originText}>{origin}</Text>
              </View>
            </View>

            {driver_id &&
              organization && (
                <Driver {...{ driver_name, organization, phone_number, number, rate }} />
              )}

            <View style={styles.messageWrapper}>
              <View style={styles.message}>
                <Text style={styles.mainMessageText}>{spinnerMessage[status]}</Text>
              </View>
              {status=='holding' &&
                <View>
                  <Image source={waitingTaxi} style={styles.waitingTaxiImg} />
                  {!showMessage &&
                    <View style={styles.message}>
                      <Text style={styles.messageText}>
                        El tiempo promedio de respuesta es de 7 minutos
                      </Text>
                    </View>
                  }
                </View>
              }
              
              {spinnerColor[status] && (
                <Spinner
                  style={styles.spinner}
                  isVisible={true}
                  size={50}
                  type="Pulse"
                  color={spinnerColor[status]}
                />
              )}

              {(status == 'holding' && showMessage) && 
                <View style={{ width: '100%' }}>
                  <View style={styles.message}>
                    <Text style={styles.messageText}>
                      Hay pocos choferes disponibles, puedes ayudarnos invitando a más taxistas a unirse al proyecto para modernizar el servicio.
                    </Text>
                  </View>
                  <View style={styles.message}>
                    <Text style={styles.messageText}>
                      ¡Con tu ayuda lo lograremos!
                    </Text>
                  </View>
                  <View style={styles.message}>
                    <Text style={styles.messageText}>
                      www.cytio.com.mx/taxista
                    </Text>
                  </View>
                  <View style={styles.message}>
                    <Button transparent onPress={() => this.cancelTrip('Directory')}>
                      <Text>¿No quieres esperar?</Text>
                    </Button>
                  </View>
                </View>
              }
            </View>

            {status !== 'finished' && (
              <View style={styles.cancelButtonWrapper}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={this.handleCancel}
                >
                  <Text style={styles.cancelText}>Cancelar servicio</Text>
                </TouchableOpacity>
              </View>
            )}

            {status === 'finished' && (
              <View style={styles.newServiceWrapper}>
                <Button
                  sucess
                  style={styles.newServiceButton}
                  onPress={() => this.props.navigation.navigate('Map')}
                >
                  <Text style={styles.newServiceText}>
                    Solicitar otro servicio
                  </Text>
                </Button>
              </View>
            )}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
