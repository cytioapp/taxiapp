import SInfo from 'react-native-sensitive-info';
import { AsyncStorage } from 'react-native';
import { Container } from 'unstated';
import Api from '../utils/api';

const options = {
  sharedPreferencesName: 'cytiouser',
  keychainService: 'cytiouser'
};

class SessionState extends Container {
  state = {
    isLogued: null,
    loginErrors: null,
    signupErrors: null
  };

  login = (email, password, full_name, provider) => {
    this.setState({ errors: false });
    Api.post('/users/login', { email, password, full_name, provider })
      .then(res => {
        if (res.data.jwt) {
          SInfo.setItem('jwt', res.data.jwt, options).then(() => {
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
        this.setState({ loginErrors: err.response.data.errors });
      });
  };

  verify = () => {
    return new Promise((resolve, reject) => {
      return SInfo.getItem('jwt', options)
        .then(value => {
          if (value)
            this.setState({ isLogued: true }, () => {
              return resolve();
            });
          else
            this.setState({ isLogued: false }, () => {
              return resolve();
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  logout = () => {
    this.setState({ isLogued: false }, () => {
      SInfo.deleteItem('jwt', options);
      AsyncStorage.removeItem('tutorialFinished') // Delete the tutorial checker, so on new session we can show it again
    });
  };

  validations = data => {
    const nameRegex = /^[áÁéÉíÍóÓúÚñÑa-z ,\-']+$/i;

    if (!data.full_name.match(nameRegex)) {
      this.setState({
        signupErrors: ['Nombre inválido']
      });
      return false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email.match(emailRegex)) {
      this.setState({
        signupErrors: ['Email inválido']
      });
      return false;
    }

    if (data.phone_number.length < 6) {
      this.setState({
        signupErrors: ['El número teléfonico no cumple la longitud minima']
      });
      return false;
    }

    if (data.password.length < 6) {
      this.setState({
        signupErrors: ['La contraseña debe tener mínimo 6 caracteres']
      });
      return false;
    }
    return true
  };

  signup = data => {
    if (this.validations(data)) {
      Api.post('/users/signup', data)
        .then(() => {
          this.login(data.email, data.password);
          this.setState({ errors: false });
        })
        .catch(err => {
          alert(
            'Ha ocurrido un error al intentar registrarte, vuelve a intentarlo.'
          );
        });
    }
  };
}

export default SessionState;
