import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login';
import AddressInfo from '../components/AddressInfo';

export default createStackNavigator({
  Login: {
    screen: Login
  }
},{ headerMode: 'none'});
