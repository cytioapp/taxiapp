import React from 'react';
import { View, Image } from 'react-native';
import { Icon, Text, Button } from 'native-base';
import StarsRate from './StarsRate';
import styles from './styles';
import profileHolder from '../../assets/profile.png';

const Driver = ({ driver_name, organization, license_plate }) => {
  return (
    <View>
      <View style={styles.driverImageWrapper}>
        <Image style={styles.driverImage} source={profileHolder}/>
        <Text style={styles.driverLabel}>Conductor</Text>
        <Text style={styles.driverName}>{driver_name}</Text>
        <StarsRate stars={5} rate={2} />
      </View>

      <View style={styles.vehicleWrapper}>
        <View style={styles.vehicleCol}>
          <Text style={styles.vehicleLabel}>Sitio</Text>
          <Text style={styles.vehicleText}>{organization}</Text>
        </View>
        <View style={styles.vehicleCol}>
          <Text style={styles.vehicleLabel}>Placas</Text>
          <Text style={styles.vehicleText}>{license_plate}</Text>
        </View>
        <View style={styles.vehicleCol}>
          <Text style={styles.vehicleLabel}>Taxi</Text>
          <Text style={styles.vehicleText}>D035</Text>
        </View>
      </View>

      <View style={styles.callDriverWrapper}>
        <Button style={styles.callDriverButton}>
          <Icon name="ios-call" style={styles.phoneIcon}/>
          <Text style={styles.callText}>Llamar al conductor</Text>
        </Button>
      </View>
    </View>
  )
}

export default Driver;