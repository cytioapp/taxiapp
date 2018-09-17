import React, { Component } from 'react';
import { View } from 'react-native';
import { Body, Button, Header, Icon, Left, Right, Title, Content, List, Container } from 'native-base';
import styles from './style';
import SitioItem from './SitioItem';
import call from 'react-native-phone-call';

export default class EditEmail extends Component {
  state = {
    sitios: [
      {
        name: 'Radio Taxi 1',
        phone_number: '3114848'
      },
      {
        name: 'Radio Taxi 2',
        phone_number: '3114949'
      },
      {
        name: 'Sitio Libertad 1',
        phone_number: '3120003'
      },
      {
        name: 'Sitio Libertad 2',
        phone_number: '3121446'
      },
      {
        name: 'Sitio Madero y Juarez',
        phone_number: '3120081'
      },
      {
        name: 'Sitio de los Maestros',
        phone_number: '3130757'
      },
      {
        name: 'Sitio Alameda',
        phone_number: '3120409'
      },
      {
        name: 'Sitio Fátima',
        phone_number: '3134003'
      },
      {
        name: 'Sitio Guadalajarita',
        phone_number: '3123171'
      },
      {
        name: 'Sitio Infonavit',
        phone_number: '3129260'
      },
      {
        name: 'Sitio Nuñes',
        phone_number: '3120050'
      },
      {
        name: 'Sitio Oriental',
        phone_number: '3126565'
      },
      {
        name: 'Sitio Parque Hidalgo',
        phone_number: '3124198'
      },
      {
        name: 'Sitio Revolución',
        phone_number: '3120338'
      },
      {
        name: 'Sitio Tívoli',
        phone_number: '3142313'
      },
      {
        name: 'Taxi Estándar & Ejecutivo 1',
        phone_number: '3144087'
      },
      {
        name: 'Taxi Estándar & Ejecutivo 2',
        phone_number: '3122234240'
      },
      {
        name: 'Taxi Estándar & Ejecutivo 3',
        phone_number: '3121340276'
      },
      {
        name: 'Taxi Express',
        phone_number: '3133109'
      },
      {
        name: 'Taxi Plus',
        phone_number: '3144016'
      },
    ]
  };

  makeCall = (phone_number) => {
    const args = {
      number: phone_number,
      prompt: false
    };
    call(args).catch(err => alert(err));
  };

  render() {
    return (
      <Container style={styles.keyboard}>
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <Left style={styles.leftHeader}>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name="ios-menu" style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Radio Taxi</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <Content>
          <List>
            {this.state.sitios.map((sitio, index) => {
              return <SitioItem key={index} name={sitio.name} phone_number={sitio.phone_number} makeCall={this.makeCall} />
            })}
          </List>

          <View style={styles.buttonWrapper}>
            
          </View>
        </Content>
      </Container>
    );
  }
}
