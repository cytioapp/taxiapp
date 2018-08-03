import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
},{ headerMode: 'none'});
