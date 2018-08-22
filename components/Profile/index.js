import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right
} from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Profile extends Component {
  state = {
    full_name: '',
    email: ''
  }

  componentDidMount(){
    this.fetchDriverData();
  }

  fetchDriverData = () => {
    Api.get('/users/profile')
      .then(res => {
        console.log(res)
        this.setState({
          full_name: res.data.full_name,
          email: res.data.email
        })
      }).catch(err => console.log(`Fetch user's info error: ${err}`))
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <View style={styles.headerTop}>
            <Left style={styles.leftHeader}>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' style={styles.menuIcon} />
              </Button>
            </Left>
            <Body/>
            <Right style={styles.rightHeader} />
          </View>
          <View style={styles.headerBottom}>
            <View style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={profile} />
            </View>
            <View style={styles.driverInfoWrapper}>
              <View style={styles.rowWrapper}>
                <Text style={styles.name}>{this.state.full_name}</Text>
                <Button transparent style={styles.editButton} onPress={() => {this.props.navigation.navigate('EditName')}}>
                  <Icon name='create' style={styles.menuIcon} />
                </Button>
              </View>
            </View>
          </View>
        </Header>

        <View style={styles.container}>

          <View style={styles.darkFieldWrapper}>
            <Text style={styles.label}>Correo:</Text>
            <View style={styles.rowWrapper}>
              <Text style={styles.text}>{this.state.email}</Text>
              <Button transparent onPress={() => {this.props.navigation.navigate('EditEmail')}}>
                <Icon name='create' style={styles.menuIcon} />
              </Button>
            </View>
          </View>

        </View>

      </KeyboardAwareScrollView>
    )
  }
}
