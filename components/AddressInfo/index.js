import React, { Component } from 'react';
import {StyleSheet, KeyboardAvoidingView, View} from 'react-native';
import {
  Body,
  Button,
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
import Geocoder from 'react-native-geocoder';

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  form: {
    flex: 1,
    marginTop: 10,
    marginRight: 15
  },
  buttonWrapper: {
    padding: 10
  },
  text: {
    fontFamily: 'Nunito-Regular',
    margin: 15,
    paddingLeft: 10
  },
  label: {
    color: '#000000',
    fontFamily: 'Nunito-Bold',
  }
});

export default class AddressInfo extends Component{
  constructor(){
    super()

    this.state = {

    }
  }

  render(){
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <Container style={styles.container}>
          <Header>
            <Body>
               <Title>Información del viaje</Title>
            </Body>
          </Header>

          <Content contentContainerStyle={{flex: 1}}>
            <Form style={styles.form}>
              <View>
                <Item>
                  <Icon name="map" />
                  <Label style={styles.label}>Origen</Label>
                </Item>
                <View>
                  <Text style={styles.text}>Aquí se va a poner la dirección que se jale de la BD</Text>
                </View>
              </View>

              <View>
                <Item>
                  <Icon name="pulse" />
                  <Label style={styles.label}>Estatus del viaje</Label>
                </Item>
                <View>
                  <Text style={styles.text}>En espera</Text>
                </View>
              </View>

              <View>
                <Item>
                  <Icon name="clock" />
                  <Label style={styles.label}>Tiempo de espera</Label>
                </Item>
                <View>
                  <Text style={styles.text}>00:00 min</Text>
                </View>
              </View>
            </Form>
          </Content>

          <Footer>
            <FooterTab>
              <Button vertical>
                <Icon name="person" />
                <Text>Perfil</Text>
              </Button>
              <Button vertical active onPress={() => this.props.navigation.navigate('AddressInfo')}>
                <Icon name="paper" />
                <Text>Info</Text>
              </Button>
              <Button vertical>
                <Icon active name="navigate" onPress={() => this.props.navigation.navigate('Home')}/>
                <Text>Viaje</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </KeyboardAvoidingView>
    )
  }
}
