import { Container } from 'unstated';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';
import TimerMixin from 'react-timer-mixin';

class TripState extends Container {
  state = {
    isOnTrip: false
  };

  startTrackingTrip = guid => {
    this.setState(
      {
        isOnTrip: true
      },
      () => this.trackTrip(guid)
    );
  };

  stopTrackingTrip = () => {
    this.setState({
      isOnTrip: false
    });
  };

  trackTrip = guid => {
    if (this.state.isOnTrip && guid) {
      try {
        Geolocation.getCurrentPosition(
          position => {
            let { latitude: lat, longitude: lng } = position.coords;
            firebase
              .database()
              .ref(`server/tracking/${guid}`)
              .child('positions')
              .push({ lat, lng });
            TimerMixin.setTimeout(() => this.trackTrip(guid), 5000);
          },
          error => console.log(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export default TripState;
