import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login';

export default createStackNavigator({
  Login: {
    screen: Login
  }
},{ headerMode: 'none'});
