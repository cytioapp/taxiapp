import SInfo from 'react-native-sensitive-info';
import { NavigationActions } from 'react-navigation';
import { Container } from 'unstated';
import Api from '../utils/api';

const options = {
  sharedPreferencesName: 'taxiapp',
  keychainService: 'taxiapp'
};

class SessionState extends Container {
  state = {
    isLogued: null
  };

<<<<<<< HEAD
  login = () => {
    Api.post('/users/login', {email: 'user8@user.com', password: '123456'})
=======
  login = (email, password) => {
    Api.post('/users/login', { email, password })
>>>>>>> master
      .then(res => {
        if (res.data.jwt) {
          SInfo.setItem('jwt', res.data.jwt, options)
            .then(() => {
              this.setState({
                isLogued: true
              });
            });
        } else {
          this.setState({
            isLogued: false
          });
        }
      })
      .catch(err => {
        console.log('Login error', err.response);
      })
  }

  verify = () => {
    return new Promise((resolve, reject) => {
      return SInfo.getItem('jwt', options)
        .then(value => {
          console.log(value)
          if (value)
            this.setState({ isLogued: true }, ()=> {
              return resolve();
            });
          else
            this.setState({ isLogued: false }, ()=> {
              return resolve();
            });
        }).catch(err => {
          return reject(err);
        });
    })
  }

  logout = () => {
    this.setState({ isLogued: false }, () => {
      SInfo.deleteItem('jwt', options)
    });
  }
}

export default SessionState;
