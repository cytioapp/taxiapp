import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import AddressInfo from '../components/AddressInfo';
import Login from '../components/Login';

export default createDrawerNavigator({
  Login: {
    screen: Home
  },
  Home: {
    screen: Home
  },
  AddressInfo: {
    screen: AddressInfo
  }
},{ headerMode: 'none'});
