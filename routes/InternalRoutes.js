import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import MapComponent from '../components/Map';
import AddressInfo from '../components/AddressInfo';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  Map: {
    screen: MapComponent
  },
  AddressInfo: {
    screen: AddressInfo
  }
},{ headerMode: 'none'});
