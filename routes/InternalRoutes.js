import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import MapComponent from '../components/Map';
import AddressInfo from '../components/AddressInfo';
import DrawerMenu from '../components/DrawerMenu';
import Profile from '../components/Profile';
import EditName from '../components/EditName';
import EditEmail from '../components/EditEmail';
import EditPhone from '../components/EditPhone';
import Directory from '../components/Directory';

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
  },
  EditEmail: {
    screen: EditEmail
  },
  EditName: {
    screen: EditName
  },
  EditPhone: {
    screen: EditPhone
  },
  Directory: {
    screen: Directory
  }

},{
  headerMode: 'none',
  contentComponent: DrawerMenu
});
