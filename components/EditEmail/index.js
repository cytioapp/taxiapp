import React, { Component } from 'react';
import { Alert, Image, Text, View, TextInput } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Title,
} from 'native-base';
import styles from './style';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditEmail extends Component {
  state = {
    original_email: '',
    new_email: '',
    buttonDisabled: true
  }

  componentDidMount(){
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/users/profile')
    .then(res => {
      this.setState({
        original_email: res.data.email,
        new_email: res.data.email,
      });
      this.difference();
    }).catch(err => console.log(err))
  }

  handleReturn = () => {
    if(this.difference() === true){
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [
          {text: 'No'},
          {text: 'Si', onPress: () => this.handleSave()},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  handleSave = () => {
    Api.put('/users/profile', {email: this.state.new_email}).then( () => {
      this.props.navigation.navigate('Profile')
    });

  }

  difference = () => {
    if(this.state.original_email !== this.state.new_email){
      this.setState({buttonDisabled: false})
      return true
    } else {
      this.setState({buttonDisabled: true})
      return false
    }
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <Left style={styles.leftHeader}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name='ios-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar email</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <View style={styles.container}>
          <View style={styles.darkFieldWrapper}>
            <View style={styles.generalItem}>
              <Text style={styles.label}>Correo electrónico:</Text>
              <TextInput
                  placeholder="Correo"
                  autoCapitalize="none"
                  onChangeText={new_email => {
                    this.setState({ new_email }, () => this.difference())
                  }}
                  value={this.state.new_email}
                  placeholderTextColor="#5C5C5C"
                  style={styles.input}
              />
            </View>
          </View>

          <View style={styles.buttonWrapper} >
            <Button
              block
              style={ this.state.buttonDisabled ? styles.buttonDisabled : styles.button }
              disabled = {this.state.buttonDisabled}
              onPress={() => this.handleSave()}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </Button>
          </View>

        </View>
      </KeyboardAwareScrollView>
    )
  }
}
