import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import MapComponent from '../components/Map';
import AddressInfo from '../components/AddressInfo';
import DrawerMenu from '../components/DrawerMenu';
import Profile from '../components/Profile';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  Map: {
    screen: MapComponent
  },
  AddressInfo: {
    screen: AddressInfo
  },
  Profile: {
    screen: Profile
  }
},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
