import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 10
  }
})

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
            <View style={styles.buttonWrapper} >
              <Button block rounded success onPress={() => this.props.navigation.navigate('Home')}>
                <Text>Iniciar Sesión</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    )
  }
}

