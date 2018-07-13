import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

export default class Login extends Component{
  render(){
    return(
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
            <Button block rounded success onPress={() => this.props.navigation.navigate('Home')}>
              <Text>Iniciar Sesión</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

