import React from 'react';
import { View } from 'react-native';
import { Icon, Item } from 'native-base';

const StarsRate = ({ rate, stars }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {new Array(stars).fill(0).map((Item, index) => {
        return <Icon key={index} name="md-star" style={{ color: index <= rate ? '#e3c463' :'#dedede' }} />
      })}
    </View>
  )
}

export default StarsRate;