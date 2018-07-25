import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from '../components/Home';
import AddressInfo from '../components/AddressInfo';

export default createDrawerNavigator({
  Home: {
    screen: Home
  },
  AddressInfo: {
    screen: AddressInfo
  }
},{ headerMode: 'none'});
