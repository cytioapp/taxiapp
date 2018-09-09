import React from 'react';
import { View, Image, PermissionsAndroid } from 'react-native';
import { Icon, Text, Button } from 'native-base';
import StarsRate from './StarsRate';
import styles from './style';
import profileHolder from '../../assets/profile.png';
import call from 'react-native-phone-call';

const Driver = ({ driver_name, phone_number, number, rate, organization: { name } }) => {
  makeCall = () => {
    const args = {
      number: phone_number,
      prompt: false
    };
    call(args).catch(err => alert(err));
  };

  return (
    <View style={styles.driverInfoWrapper}>
      <View style={styles.driverImageWrapper}>
        <Image style={styles.driverImage} source={profileHolder} />
        <Text style={styles.driverLabel}>Conductor:</Text>
        <Text style={styles.driverName}>{driver_name}</Text>
        <StarsRate stars={5} rate={5} />
      </View>

      <View style={styles.vehicleWrapper}>
        {/* <View style={styles.vehicleCol}>
          <Text style={styles.vehicleLabel}>Sitio</Text>
          <Text style={styles.vehicleText}>{name}</Text>
        </View> */}

        <View style={styles.vehicleCol}>
          <Text style={styles.vehicleLabel}>Taxi</Text>
          <Text style={styles.vehicleText}>{name} {number}</Text>
        </View>
      </View>

      <View style={styles.callDriverWrapper}>
        <Button style={styles.callDriverButton} onPress={() => this.makeCall()}>
          <Icon name="ios-call" style={styles.phoneIcon} />
          <Text style={styles.callText}>Llamar al conductor</Text>
        </Button>
      </View>
    </View>
  );
};

export default Driver;
