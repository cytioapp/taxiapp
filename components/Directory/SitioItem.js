import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon, ListItem, Body, Right, Left } from 'native-base';
import styles from './style';

const SitioItem = ({ name, phone_number, makeCall }) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Icon name="ios-call" />
      </Left>
      <Body>
        <Text>{name}</Text>
        <Text note numberOfLines={1}>Teléfono {phone_number}</Text>
      </Body>
      <Right>
        <Button transparent onPress={() => makeCall(phone_number)}>
          <Text>Llamar</Text>
        </Button>
      </Right>
    </ListItem>
  )
}

export default SitioItem;
