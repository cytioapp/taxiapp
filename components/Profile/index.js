import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { Body, Button, Header, Icon, Left, Right } from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Profile extends Component {
  state = {
    full_name: '',
    email: '',
    phone_number: ''
  };

  componentDidMount() {
    this.fetchDriverData();
  }

  fetchDriverData = () => {
    Api.get('/users/profile')
      .then(res => {
        this.setState({
          full_name: res.data.full_name,
          email: res.data.email,
          phone_number: res.data.phone_number
        });
      })
      .catch(err => console.log(`Fetch user's info error: ${err}`));
  };

  render() {

    const { email } = this.state
    const showEmail = !(/facebook/.test(email)) // Check if we should render the email

    return (
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <View style={styles.headerTop}>
            <Left style={styles.leftHeader}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name="ios-menu" style={styles.menuIcon} />
              </Button>
            </Left>
            <Body />
            <Right style={styles.rightHeader} />
          </View>
          <View style={styles.headerBottom}>
            <View style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={profile} />
            </View>
            <View style={styles.driverInfoWrapper}>
              <View style={styles.rowWrapper}>
                <Text style={styles.name}>{this.state.full_name}</Text>
                <Button
                  transparent
                  style={styles.editButton}
                  onPress={() => {
                    this.props.navigation.navigate('EditName');
                  }}
                >
                  <Icon name="create" style={styles.menuIcon} />
                </Button>
              </View>
            </View>
          </View>
        </Header>

        {
          showEmail && (
            <View style={styles.container}>
              <View style={styles.darkFieldWrapper}>
                <Text style={styles.label}>Correo:</Text>
                <View style={styles.rowWrapper}>
                  <Text style={styles.text}>{this.state.email}</Text>
                  <Button
                    transparent
                    onPress={() => {
                      this.props.navigation.navigate('EditEmail');
                    }}>
                      <Icon name="create" style={styles.menuIcon} />
                  </Button>
                </View>
              </View>
            </View>)
        }
        <View style={styles.container}>
          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Teléfono:</Text>
            <View style={styles.rowWrapper}>
              <Text style={styles.text}>{this.state.phone_number}</Text>
              <Button
                transparent
                onPress={() => {
                  this.props.navigation.navigate('EditPhone', { isSetPhone: false });
                }}
              >
                <Icon name="create" style={styles.menuIcon} />
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
