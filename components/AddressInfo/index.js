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
// import Spinner from 'react-native-spinkit';

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
  }
});

const colors = {
  'holding': '#FDE74C',
  'taken': '#5BC0EB',
  'active': '#9BC53D',
  'finished': '#211A1E',
  'canceled': '#C3423F'
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
      year: '',
      color: ''
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
          created_at,
          color: colors[status]
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
      year,
      color
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
              <View style={[styles.circleStatus, {backgroundColor: color}]}>
              </View>
              <Text style={styles.statusText}>{status}</Text>
            </View>

            <View style={styles.origin}>
              <Icon style={styles.pinIcon} name="ios-pin" />
              <View>
                <Text style={styles.originText}>{origin}</Text>
              </View>
            </View>

            <View style={styles.message}>
              <Text style={styles.messageText}>Mensaje de ejemplo</Text>
              {/* <Spinner isVisible={true} size={50} type='ChasingDots' color={color}/> */}
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
