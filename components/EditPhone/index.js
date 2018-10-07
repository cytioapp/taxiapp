import React, { Component } from 'react';
import { Alert, Image, Text, View, TextInput } from 'react-native';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import styles from './style';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from '../Modal';

export default class EditPhone extends Component {
  state = {
    phone_number: '',
    buttonDisabled: false,
    errors: [],
    modalVisible: false,
    isSetPhone: this.props.navigation.getParam('isSetPhone', false)
  };

  componentDidMount() {
    this.fillFields();
  }

  componentWillUnmount() {
    this.setState({ isSetPhone: false })
  }

  fillFields = () => {
    Api.get('/users/profile')
      .then(res => {
        this.setState({
          phone_number: res.data.phone_number || '',
        });
      })
      .catch(err => console.log(err));
  };

  handleReturn = () => {
    if (!this.state.isSetPhone) {
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [{ text: 'No' }, { text: 'Si', onPress: () => this.handleSave() }],
        { cancelable: false }
      );
    }
  };

  handleSave = () => {
    if (this.state.phone_number.length > 0) {
      Api.put('/users/profile', {
        phone_number: this.state.phone_number
      }).then(() => {
        if (this.state.isSetPhone) {
          this.props.navigation.navigate('Map');
        } else {
          this.props.navigation.navigate('Profile');
        }
      });
    } else {
      this.setState({
        errors: ['Teléfono inválido'],
        modalVisible: true
      });
    }
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  };

  render() {
    const { isSetPhone } = this.state

    return (
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Modal
          errors={this.state.errors}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
        />
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <Left style={styles.leftHeader}>
            <Button transparent onPress={() => this.handleReturn()}>
              { isSetPhone ? 
                  <Icon name="md-tablet-portrait" style={styles.menuIcon} />
                  : <Icon name="ios-arrow-back" style={styles.menuIcon} />
              }
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>{isSetPhone ? 'Agrega un teléfono' : 'Editar Teléfono'}</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <View style={styles.container}>
          <View style={styles.darkFieldWrapper}>
            <View style={styles.generalItem}>
              <Text style={styles.label}>Teléfono:</Text>
              <TextInput
                placeholder="312..."
                autoCapitalize="none"
                onChangeText={phone_number => {
                  this.setState({ phone_number });
                }}
                value={this.state.phone_number}
                placeholderTextColor="#5C5C5C"
                style={styles.input}
              />
            </View>
          </View>
          {
            isSetPhone && <View style={styles.phoneInfo}>
              <Text style={styles.phoneInfoText}>* Necesitas un número de teléfono valido para poder usar la aplicación, esto con la finalidad de ofrecerte un mejor servicio</Text>
            </View>
          }

          <View style={styles.buttonWrapper}>
            <Button
              block
              style={
                this.state.buttonDisabled
                  ? styles.buttonDisabled
                  : styles.button
              }
              disabled={this.state.buttonDisabled}
              onPress={() => this.handleSave()}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
