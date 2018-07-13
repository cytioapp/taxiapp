import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Icon } from 'native-base';

export default class AddressInfo extends Component{
  render(){
    return(
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Icon active name='home' />
              <Label>Dirección</Label>
              <Input/>
            </Item>
            <Button block rounded>
              <Text>Enviar dirección</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

