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
          this.props.navigation.navigate('Map');
        }
      });
  }
  
  render() {
    return <Loading />;
  }
}

export default Home;