import React, { Component } from 'react';
import Loading from '../Loading';
import Api from '../../utils/api';

class Home extends Component {
  componentDidMount() {
    Api.get('/users/active_trip')
      .then(res => {
        if (res.data && res.data.active) {
          this.props.navigation.navigate('AddressInfo');
        } else {
          Api.get('/users/profile')
            .then(res => {
              if (!res.data.phone_number) {
                this.props.navigation.navigate('EditPhone', { isSetPhone: true });
              } else {
                this.props.navigation.navigate('Map')
              }
            })
        }
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.props.screenProps.session.logout();
        }
      });
  }

  render() {
    return <Loading />;
  }
}

export default Home;
