import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ChangePassword from '../components/ChangePassword';

export default createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  ChangePassword: {
    screen: ChangePassword
  }
},{ headerMode: 'none'});
