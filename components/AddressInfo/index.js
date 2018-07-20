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
  },
  buttonWrapper: {
    padding: 10
  }
});

export default class AddressInfo extends Component{
  constructor(){
    super()

    this.state = {
      // latitude: 19.266836,
      // longitude: -103.717531,
      // error: null,
      // address: ''
    }

  //   if (!this.state.address) {
  //     Geocoder.geocodePosition({lat: this.state.latitude, lng: this.state.longitude}).then(res => {
  //       let { formattedAddress } = res[0]
  //       this.setState({
  //         address: formattedAddress
  //       }, () => console.log(this.state.address));
  //     }).catch(err => console.log(err))
  //   }
  }

  // changeAddress = (address) => {
  //   this.setState({address})
  // }

  render(){
    // let {address} = this.state;
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
              <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Icon active name='home' />
                <Label>Dirección</Label>
              </Item>
              <Textarea style={{flex: 1}}
                        onChangeText={this.changeAddress}
                        value={'Aquí va la dirección'}
                        rowSpan={3}/>
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
