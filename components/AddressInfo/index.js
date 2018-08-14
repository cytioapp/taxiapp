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
import styles from './styles';
import { colors, spinnerColor, spinnerMessage } from './variables';
import { getActiveTrip, parseTrip } from '../../services/information';
import Loading from '../Loading';
import Modal from '../Modal';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseconfig.json';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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

  }

  componentDidMount(){
    getActiveTrip().then(res => {
      if(res.user){
        this.setState(res.user);
      }
      if(res.driver){
        this.setState(res.driver);
      }
      this.monitorTrip();
    }).catch(err => {
      this.props.navigation.navigate('Login');
    });
  }

  monitorTrip = () => {
    let { trip_id } = this.state;
    let counter = 0;
    firebase.database().ref(`server/taken_trips/${trip_id}/`).on('value', (snapshot) => {
      let trip = snapshot.val();
      if (trip) {
        this.setState(parseTrip(trip));
      } else if (!trip && counter) {
        getActiveTrip().then(res => {
          if(res.user){
            this.setState({...res.user, ...parseTrip({ status: res.user.status }) });
            if (res.user.status == 'holding') {
              alert('Tu viaje ha regresado a la fila de espera');
            }
          }
        }).catch(err => {
          alert('Ha ocurrido un error');
        })
      }
      counter++;
    });

    firebase.database().ref(`server/taken_trips/${trip_id}/`).once('child_removed', (snapshot) => {
      this.setState({ status: 'finished' });
    });
  }

  handleCancel = () => {
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
          err.response.data.errors ?
          err = err.response.data.errors :
          err = [{message: "No fue posible cancelar el viaje, porfavor inténtalo de nuevo"}]
          this.setState({
            isWaiting: false,
            errors: err,
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
            
            {status != 'finished' && 
              <View style={styles.cancelButtonWrapper}>
                <Button rounded danger style={styles.cancelButton} onPress={this.handleCancel}>
                  <Text style={styles.cancelText}>Cancelar viaje</Text>
                </Button>
              </View>
            }

            {status == 'finished' && 
              <View style={styles.cancelButtonWrapper}>
                <Button rounded sucess style={styles.cancelButton} onPress={() => this.props.navigation.navigate('Map')}>
                  <Text style={styles.cancelText}>Solicitar otro servicio</Text>
                </Button>
              </View>
            }

          </ScrollView>
        </Content>
      </Container>
    )

  }
}
