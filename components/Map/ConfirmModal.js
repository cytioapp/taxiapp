import React from 'react';
import { Modal, View, TextInput, Button as RCTButton } from 'react-native';
import { Body, Button, Header, Icon, Left, Right, Text, Title, Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Api from '../../utils/api';
import styles from './style';

class ConfirmModal extends React.Component {
  state = {
    address: this.props.tripInfo.address,
    region: this.props.tripInfo.region,
    references: '',
    isWaiting: false,
    isServiceButtonDisabled: false
  };

  createTrip = () => {
    this.setState(
      {
        isWaiting: true,
        isServiceButtonDisabled: true
      },
      () => {
        let {
          address,
          region: { latitude, longitude },
          references
        } = this.state;
        Api.post('/trips', {
          address_origin: address,
          lat_origin: latitude,
          lng_origin: longitude,
          references
        })
          .then(res => {
            this.setState(
              {
                isWaiting: false
              },
              () => {
                if (res.status == 201) {
                  this.props.navigation.navigate('AddressInfo');
                }
              }
            );
          })
          .catch(err => {
            this.setState({
              isWaiting: false,
              errors: [`${err.response.data.errors[0]}. Vuelve a intentarlo.`],
              modalVisible: true,
              isServiceButtonDisabled: false
            });
            alert('Algo salió mail. Vuelve a intentarlo.');
          });
      }
    );
  };

  handleReturn = () => {
    this.props.toggleConfirmModal();
  }

  render() {
    const { address, references, isWaiting } = this.state;
    const { tripInfo } = this.props;
    return (
      <Modal
          animationType="slide"
          transparent
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
        <View style={styles.keyboard}>
          <View style={styles.confirmContainer}>
            <View style={styles.buttonCancelActionsheet}>
              <RCTButton
                title='Cancelar'
                onPress={this.handleReturn}
              />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Text style={styles.label}>Dirección:</Text>
              <TextInput 
                multiline={true}
                style={{ fontSize: 19 }}
                numberOfLines={2}
                textAlignVertical="top"
                value={address}
                onChangeText={text => this.setState({ address: text })}
              />
            </View>
            <View style={{ paddingBottom: 40 }}>
              <Text style={styles.label}>Indicaciones: (opcional)</Text>
              <TextInput 
                multiline={true}
                style={{ fontSize: 19 }}
                numberOfLines={2}
                textAlignVertical="top"
                value={references}
                placeholder="Casa verde de dos pisos frent..."
                placeholderTextColor="#D3D3D3"
                onChangeText={text => this.setState({ references: text })}
              />
            </View>
            <View style={styles.buttonContinue}>
              <Button
                dark
                style={styles.button}
                onPress={this.createTrip}
              >
                {!(isWaiting) ? <Text style={styles.buttonText}>Solicitar</Text> : <Spinner color="black" />}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmModal;
