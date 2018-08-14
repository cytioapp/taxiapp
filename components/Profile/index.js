import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import Loading from '../Loading';
import Modal from '../Modal';

const styles = StyleSheet.create({

});

export default class Profile extends Component {
  render(){
    return(
      <View>
        <Header>
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
              <Title>Perfil</Title>
          </Body>
          <Right></Right>
        </Header>
        <Text>Profile</Text>
      </View>
    )
  }
}
