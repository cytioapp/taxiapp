import React, { Component } from 'react';
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native';
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
  Text,
  Textarea,
  Title
} from 'native-base';
import Api from '../../utils/api';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  container:{
    flex: 1,
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
    fontFamily: 'Nunito-Regular',
    paddingLeft: 10
  },
  origin: {
    flexDirection: 'row',
    padding: 10
  },
  pinIcon: {
    fontSize: 40
  },
  originText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 15,
    paddingRight: 20
  },
  messageWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
  'holding': '#FFF5AF',
  'taken': '#AFDAEC',
  'active': '#D2E3AD'
}

const spinnerMessage = {
  'holding': 'Esperando que algún taxista acepte el viaje 👀',
  'taken': 'Tú viaje ha sido tomado, el taxista va en camino 🚖',
  'active': 'Estás llendo a tu destino, disfruta el viaje ☺️',
  'finished': 'Ha terminado tu viaje, gracias por usar NOMBRE 🤗',
  'canceled': 'Se ha cancelado tú viaje 😢'
}

export default class AddressInfo extends Component{
  constructor(){
    super()

    this.state = {
      origin: '',
      status: '',
      created_at: null,
      driver_name: '',
      organization: '',
      license_plate: '',
      model: '',
      year: ''
    }
  }

  componentDidMount(){
    Api.get('/trips/1').then(res =>{
      console.log(res.data);
      if(res.data.address_origin){
        let {address_origin, status, created_at} = res.data;
        this.setState({
          origin: address_origin,
          status,
          created_at
        })
      }else{
      }
    })
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
      year
    } = this.state;

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Header>
            <Body>
               <Title>Información del viaje</Title>
            </Body>
          </Header>

          <Content contentContainerStyle={{flex: 1}}>
            <View style={styles.status}>
              <View style={[styles.circleStatus, {backgroundColor: colors[status]}]}>
              </View>
              <Text style={styles.statusText}>{status}</Text>
            </View>

            <View style={styles.origin}>
              <Icon style={styles.pinIcon} name="ios-pin" />
              <View>
                <Text style={styles.originText}>{origin}</Text>
              </View>
            </View>
            <View style={styles.messageWrapper}>
              <View style={styles.message}>
                <Text style={styles.messageText}>{spinnerMessage[status]}</Text>
                <Spinner style={styles.spinner} isVisible={true} size={50} type='Pulse' color={spinnerColor[status]}/>
              </View>
            </View>

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
