import { Container } from 'unstated';
import Geolocation from 'react-native-geolocation-service';
import Api from '../utils/api'
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
            const { latitude: lat, longitude: lng } = position.coords;
            Api.get(`/trips/update_position/${guid}?lat=${lat}&lng=${lng}`)
              .catch(error => console.log(error))
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
