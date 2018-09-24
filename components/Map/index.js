import React, { Component } from 'react';
import {
  View,
  TextInput,
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Button, Container, Spinner, Icon, Item, Text } from 'native-base';
import { Header } from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';
import StepTooltip from './StepTooltip';
import Geolocation from 'react-native-geolocation-service';
import Api from '../../utils/api';
import Modal from '../Modal';
import styles from './style';
import TimerMixin from 'react-timer-mixin';
import ConfirmModal from './ConfirmModal';

var timer;

const TouchableOpacityStep = walkthroughable(TouchableOpacity)
const ViewStep = walkthroughable(View)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      error: null,
      errors: [],
      isServiceButtonDisabled: false,
      isWaiting: false,
      modalVisible: false,
      drawerVisible: false,
      isWaitingLocation: false,
      showConfirmModal: false
    };
  }

  componentDidMount() {
    this.updatePosition();

    // Init the instructions
    this.props.start()
  }

  componentWillUnmount() {
    TimerMixin.clearTimeout(this.timer);
  }

  updatePosition = () => {
    Platform.select({
      ios: () => this.getCurrentPosition(),
      android: () => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentPosition();
          } else {
            this.setState({ error: 'Se requieren permisos de ubicación' });
          }
        });
      }
    })();
  };

  getCurrentPosition = () => {
    let { region } = this.state;
    try {
      Geolocation.getCurrentPosition(
        position => {
          let { latitude, longitude } = position.coords;
          this.setState({
            region: {
              ...region,
              latitude,
              longitude
            }
          });
          // Este cambio ejecuta automaticamente formattedAddress ya se dispara en la actualizacion de region
        },
        error =>
          this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (err) {
      console.log(err);
    }
  };

  formattedAddress = (lat, lng) => {
    Geocoder.geocodePosition({ lat, lng })
      .then(res => {
        const { streetName, streetNumber, subLocality, locality } = res[0];
        this.setState({
          address: `${streetName} ${streetNumber}, ${subLocality}, ${locality}`,
          isWaitingLocation: false,
          isServiceButtonDisabled: false
        });
      })
      .catch(err => {
        console.log(`Formatted address error: ${err}`);
      });
  };

  onRegionChange = region => {
    this.setState({
      region,
    });

    this.setState({ isWaitingLocation: true, isServiceButtonDisabled: true })
    timer = TimerMixin.setTimeout(() => {
      this.formattedAddress(region.latitude, region.longitude);
    }, 1100);
  };

  onRegionStartChange = () => {
    TimerMixin.clearTimeout(timer);
  };

  makeRequest = () => {
    Api.get('/service_types').then(res => {
      console.log(res.data);
    });
  };

  setModalVisible = visible => {
    this.setState({
      modalVisible: visible,
      errors: visible ? this.state.errors : []
    });
  };

  toggleConfirmModal = () => {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal
    });
  }

  render() {
    let { region, error, showConfirmModal, address } = this.state;
    return (
      <Container contentContainerStyle={{ flex: 1, width: '100%' }}>
        <Header
          style={styles.header}
          iosBarStyle="light-content"
          androidStatusBarColor="#262626"
        >
          <CopilotStep text="Puedes ver la dirección y modificarla si es necesario" order={4} name="address">
            <ViewStep style={styles.searchWrapper}>
              <Item style={styles.searchContainer}>
                <Icon name="ios-search" style={{ color: '#989898' }} />
                <TextInput
                  placeholder="Selecciona tu ubicación..."
                  value={address}
                  onChangeText={address => this.setState({ address })}
                  style={styles.searchText}
                />
              </Item>
            </ViewStep>
          </CopilotStep>
        </Header>

        <View style={{ flex: 1, width: '100%' }}>

          <CopilotStep text="Usa el menú para ver configurar tu cuenta, consultar numero de las bases, etc." order={1} name="menu">
            <TouchableOpacityStep
              style={styles.buttonMenuWrapper}
              onPress={this.props.navigation.openDrawer}
            >
              <Icon style={styles.buttonMenuIcon} name="ios-arrow-forward" />
            </TouchableOpacityStep>
          </CopilotStep>
 
          <Modal
            errors={this.state.errors}
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
          />
          {region.latitude && (
            <View style={{ flex: 1 }}>
              <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={region}
                onRegionChangeComplete={this.onRegionChange}
                onRegionChange={this.onRegionStartChange}
              />
              <CopilotStep text="Desliza la pantalla para ubicar el marcador en el lugar donde necesites el servicio" order={2} name="map">
                <ViewStep pointerEvents="none" style={styles.markerFixed}>
                  <Icon style={styles.marker} name="ios-pin" />
                </ViewStep>
              </CopilotStep>

              <CopilotStep text="Usa el botón para obtener tu ubicación actual" order={3} name="location">
                <TouchableOpacityStep
                  onPress={this.updatePosition}
                  style={styles.iconLocate}
                >
                  <Icon name="md-locate" />
                </TouchableOpacityStep>
              </CopilotStep>

              <CopilotStep text="¡Listo! Pide tu cytio y disfruta tu viaje" order={5} name="confirm">
                <ViewStep style={styles.buttonContainer}>
                  <Button
                    dark
                    style={styles.button}
                    onPress={this.toggleConfirmModal}
                    disabled={this.state.isServiceButtonDisabled}
                  >
                    {!(this.state.isWaitingLocation || this.state.isWaiting) ? <Text style={styles.buttonText}> Solicitar servicio </Text> : <Spinner color="black" />}
                  </Button>
                </ViewStep>
              </CopilotStep>
            </View>
          )}
          {error && (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
        {showConfirmModal && 
          <ConfirmModal
            modalVisible={showConfirmModal}
            toggleConfirmModal={this.toggleConfirmModal}
            tripInfo={{
              address,
              region
            }}
            navigation={this.props.navigation}
          />
        }
      </Container>
    );
  }
}

export default copilot({
  animated: true,
  tooltipComponent: StepTooltip
})(Home);
