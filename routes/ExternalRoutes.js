import { createStackNavigator } from 'react-navigation';
import Home from '../components/Home';
import AddressInfo from '../components/AddressInfo';
import Login from '../components/Login';

export default createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  AddressInfo: {
    screen: AddressInfo
  }
},{ headerMode: 'none'});
